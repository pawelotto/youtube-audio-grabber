import * as yt from 'ytdl-core'
import * as fstatic from 'ffmpeg-static'
import * as fs from 'fs-extra-promise'
import * as assert from 'assert'
import * as path from 'path'
import * as sanitize from 'sanitize-filename'
import { spawn } from 'child_process'
import { isNumber } from 'util'
import { downloadOptions, videoFormat, videoInfo } from 'ytdl-core'

const ffmpegPath = process.env.FFMPEG_PATH || fstatic.path
const outDir = process.env.YOUTUBE_AUDIO_GRABBER_OUTDIR || './data'

export async function getAvailableFormats(url: string): Promise<any> {
  try {
    if (/(^https:\/\/youtu\.be\/.+)|(^https:\/\/(www\.)?youtube\.com\/.+)/.test(url)) {
      console.log('Getting available formats for ' + url)
      const res: videoInfo = await yt.getInfo(url)
      if (res && res.formats && res.formats.length && res.status === "ok") return { formats: res.formats, title: res.title }
      else console.error('Did you try updating ytdl-core to the latest version? Because there was an error downloading video information:\n\n' + res)
    } else console.error('Invalid YouTube url provided')
  } catch (err) {
    console.error(err)
  }
}

export function getHighestBitrateFormat(formats: Array<videoFormat>) {
  if (formats.length) {
    process.stdout.write('Getting highest bitrate format: ')
    const highest = formats
      .filter(fo => fo['audioBitrate'] != null)
      .reduce((prev, curr) => prev['audioBitrate'] > curr['audioBitrate'] ? prev : curr)
    console.log('Got ' + highest['audioBitrate'] + 'k')
    return highest
  } else console.error('No valid video formats found.')
}

export async function grabFile(title: string, url: string, format: videoFormat): Promise<any> {
  return new Promise((resolve, reject) => {
    if (format.audioBitrate && isNumber(format.audioBitrate)) {
      try {
        let c = 0
        const outdir = outDir as string
        assert.ok(outdir, "Outdir not specified")
        fs.ensureDirSync(outdir)
        const fn = path.join(outdir, sanitize(title) + "." + format.container)
        yt(url, { format: format })
          .on('progress', (chunk, prog, length) => { c++; if (c % 200 === 0 || prog === length) console.log(`Got ${Math.floor(prog / 1000)} of ${Math.floor(length / 1000)} KB`) })
          .on('end', () => { console.log('Grab done'); resolve(fn) })
          .pipe(fs.createWriteStream(fn))
      } catch (err) {
        console.error(err)
      }
    } else console.error('Invalid audio bitrate for specified format')
  })
}

export async function convertFile(fn: string, ss?: number) {
  return new Promise((resolve, reject) => {
    try {
      console.log('Converting file ' + fn + ' with ' + fstatic.path)
      let opts = ['-i', fn, '-vn', '-ab', '320k', fn.replace(/\.(\w|\d){3,4}$/, '.mp3')]
      if (ss) {
        opts.unshift(ss.toString())
        opts.unshift('-ss')
      }
      opts.unshift('-y')
      const child = spawn(ffmpegPath, opts)
      child.stdout.on('data', chunk => console.log(chunk.toString()))
      child.stderr.on('data', chunk => console.log(chunk.toString()))
      child.on('exit', (code, signal) => {
        fs.unlinkSync(fn)
        console.log('Saved file ' + fn)
        resolve(fn)
      })
    } catch (err) {
      console.error(err)
    }
  })
}