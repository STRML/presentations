var fs = require('fs');
var unzip = require('unzip');

var fileCount = 0;
fs.createReadStream('./lastfm_subset.zip')
  .pipe(unzip.Parse())
  .on('entry', function(entry) {
    console.log(entry.path);
    fileCount++;
    entry.autodrain();
  })
  .on('error', function(e){
    console.error(e);
  })
  .on('close', function() {
    console.log('Unzip ended. File count:', fileCount);
  });
