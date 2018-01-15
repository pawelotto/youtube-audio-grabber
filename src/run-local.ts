import * as yt from './index'
import * as assert from 'assert'

const url = process.argv[2]
const skip = parseInt(process.argv[3]) || 0
assert.ok(/(^https:\/\/youtu\.be\/.+)|(^https:\/\/(www\.)?youtube\.com\/.+)/.test(url), 'Please provide valid youtube url for video')

main()

async function main(){
  const availableFormats = await yt.getAvailableFormats(url)
  if(availableFormats){
    const highestFormat = yt.getHighestBitrateFormat(availableFormats.formats)
    if(highestFormat && highestFormat.url && availableFormats.title) { 
      const file = await yt.grabFile(availableFormats.title, url, highestFormat)
      if(file) yt.convertFile(file, skip)
    } else { console.error("Invalid video format.") }
  }
}