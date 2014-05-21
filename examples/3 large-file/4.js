var fs = require('fs');
var JSONStream = require('JSONStream');
var es = require('event-stream');
var unzip = require('unzip');
var _ = require('lodash');

var fileCount = 0;
var artistMap = {};
// Artist frequency - entire dataset
fs.createReadStream('./lastfm_train.zip')
  .pipe(unzip.Parse())
  .on('entry', function(entry) {
    fileCount++;
    if (fileCount % 1000 === 0) {
      console.log(fileCount);
      writeArtists();
    }
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
    writeArtists();
  });

function writeArtists() {
  var sortedArtists = _(artistMap)
    .pairs()
    .sortBy(function(data){
      return -data[1];
    })
    .map(function(value){
      return {name: value[0], frequency: value[1]};
    })
    .value();
  fs.writeFile('./artists.json', JSON.stringify(sortedArtists, null, 2));
}
