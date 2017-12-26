import fn from './functions'
// import * as assert from 'assert'

const url = process.argv[2]
const skip = parseInt(process.argv[3]) || 0
// assert.ok(url, 'Please provide valid youtube url for video')

main()

async function main(){
  const formatInfo = await fn.getAvailableFormats(url)
  const highest = fn.getHighestBitrateFormat(formatInfo.formats)
  if(highest) { 
    const file = await fn.grabFile(formatInfo.title, url, highest)
    fn.convertFile(file, skip)
  }
}