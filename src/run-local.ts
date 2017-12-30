import * as yt from './index'
import * as assert from 'assert'

const url = process.argv[2]
const skip = parseInt(process.argv[3]) || 0
assert.ok(url, 'Please provide valid youtube url for video')

main()

async function main(){
  const formatInfo = await yt.getAvailableFormats(url)
  const highest = yt.getHighestBitrateFormat(formatInfo.formats)
  if(highest) { 
    const file = await yt.grabFile(formatInfo.title, url, highest)
    yt.convertFile(file, skip)
  }
}