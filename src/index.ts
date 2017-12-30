export * from './functions'
// import fn from './functions'
// import * as assert from 'assert'

<<<<<<< HEAD
const url = process.argv[2]
const skip = parseInt(process.argv[3]) || 0
assert.ok(/^https:\/\/(www\.youtube\.com)|(youtu\.be)\/.+/.test(url), 'Please provide a valid YouTube url for a video')
=======
// const url = process.argv[2]
// const skip = parseInt(process.argv[3]) || 0
// assert.ok(url, 'Please provide valid youtube url for video')
>>>>>>> develop

// main()

<<<<<<< HEAD
async function main(){
  const formatInfo = await fn.getAvailableFormats(url)
  const highest = fn.getHighestBitrateFormat(formatInfo.formats)
  if(highest) { 
    const file = await fn.grabFile(formatInfo.title, url, highest)
    fn.convertFile(file, skip)
  }
}
=======
// async function main(){
//   const formatInfo = await fn.getAvailableFormats(url)
//   const highest = fn.getHighestBitrateFormat(formatInfo.formats)
//   if(highest) { 
//     const file = await fn.grabFile(formatInfo.title, url, highest)
//     fn.convertFile(file, skip)
//   }
// }
>>>>>>> develop
