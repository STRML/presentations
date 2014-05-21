var fs = require('fs');
var unzip = require('unzip');

var fileCount = 0;
// Faster without console.log
fs.createReadStream('./lastfm_train.zip')
  .pipe(unzip.Parse())
  .on('entry', function(entry) {
    fileCount++;
    if (fileCount % 100 === 0) console.log(fileCount);
    entry.autodrain();
  })
  .on('error', function(e){
    console.error(e);
  })
  .on('close', function() {
    console.log('Unzip ended. File count:', fileCount);
  });
