var fs = require('fs');
var JSONStream = require('JSONStream');
var es = require('event-stream');
var unzip = require('unzip');

var fileCount = 0;
var artistMap = {};
// Write artist frequency
fs.createReadStream('./lastfm_subset.zip')
  .pipe(unzip.Parse())
  .on('entry', function(entry) {
    fileCount++;
    if (fileCount % 100 === 0) console.log(fileCount);
    if (entry.type === "File"){
      entry
        .pipe(JSONStream.parse("artist"))
        .pipe(es.mapSync(function(data){
          if (!artistMap[data]) {
            artistMap[data] = 1;
          } else {
            artistMap[data]++;
          }
        }));
    } else {
      entry.autodrain();
    }
  })
  .on('error', function(e){
    console.error(e);
  })
  .on('close', function() {
    console.log('Unzip ended. File count:', fileCount);
    fs.writeFileSync('./artists.json', JSON.stringify(artistMap, null, 2));
  });

