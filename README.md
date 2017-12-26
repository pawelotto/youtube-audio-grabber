# README #

Grab file from YouTube with the **highest audio quality** and convert them automatically to **.mp3** files.
### Motivation ###
YouTube is playing so many ads before any music video nowadays, that it became unbearable. Especially when I hit my PR in bench press and then suddenly in the middle of a very hard rep I'm getting annoying and loud ad, which could pose a severe risk to my life with 130kg over my head.

### How to use ###
This software is created using node.js and TypeScript. Before you can run, you must compile. 

Simply run: 
* npm install
* npm run build 
* npm start *https://youtube_video_url [seconds to skip: number]*

Seconds to skip is an optional parameter allowing you to skip number of seconds from the beginning of the video.

### How files are being processed ###
*youtube-audio-grabber* downloads stream with the highest audio bitrate from YouTube and then converts them to .mp3 file using ffmpeg. 

Optional second argument allows you to skip *number of seconds* counting from the stream start. Some music videos include long and boring intros, that's where this option comes handy.

Files are grabbed, converted and stored in the './data' folder. To change that, edit ./config/default.json file.

Happy grabbing! :) 