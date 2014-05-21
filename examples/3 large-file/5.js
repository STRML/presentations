var fs = require('fs');
var JSONStream = require('JSONStream');
var es = require('event-stream');
var unzip = require('unzip');
var _ = require('lodash');
var brake = require('brake');

var fileCount = 0;
var artistMap = {};
// Artist frequency - entire dataset
fs.createReadStream('./lastfm_train.zip')
  // .pipe(brake(1000, 100)) // limit to 10kbps
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
  fs.writeFile('./static/artists.json', JSON.stringify(sortedArtists, null, 2));
  if (sockStream) sockStream.write(JSON.stringify(sortedArtists.slice(0, 40)));
}


var http = require('http');
var fs = require('fs');
// Static file serving, similar to express.static()
var ecstatic = require('ecstatic')(__dirname + '/static');

var server = http.createServer(ecstatic);
server.listen(8000);

// Stream updates to sortedArtists.
var shoe = require('shoe');
var sockStream;
var sock = shoe(function (stream) {
  sockStream = stream;
});
sock.install(server, '/sock');
