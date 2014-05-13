#  Streams in Node.JS: 
## The Unix Philosophy Meets the Web

---

### `1984`, `The Unix Programming Environment`

> Even though the UNIX system introduces a number of innovative programs and techniques,
> no single program or idea makes it work well. Instead, what makes it effective is the
> approach to programming, a philosophy of using the computer. 

> Although that philosophy can't be written down in a single sentence, at its heart is the idea that the power of
> a system comes more from the relationships among programs than from the programs themselves.

> Many UNIX programs do quite trivial things in isolation, but, combined with other programs, 
> become general and useful tools.

---

## Typical forms of stream programming

```
# Searching a web page
$ curl -s http://prog21.dadgum.com/ | grep 'Nintendo'

<p class="about">I'm a <a href="56.html">recovering programmer</a> who has been designing video games 
since the 1980s, doing things that seem baroquely hardcore in retrospect, 
like writing Super Nintendo games entirely in assembly language. 
These days I use whatever tools are the most fun and give me the biggest advantage.</p>


# Ghetto compressed scp
$ gzip -c aFile | ssh user@host 'cat | gunzip > file.txt'
```

---

### What's happening?

<div style="background:white; display: inline-block;">
![unix_streams](/img/dig_unix_multiple_streams.png)
</div>

---

### Node.JS Streams are the same

<div style="background:white; display: inline-block;">
![unix_streams](/img/stream-transform.png)
</div>

---

### Why?

* Do one thing, and do it well

---

### Check out the pipes on this guy

> readable.pipe(writable)

---

### Simple Example

`simpleThrough.js`
```javascript
var through = require('through');

var tr = through(function write(data) {
  var str = data.toString().slice(0, -1); // Remove trailing \n
  this.queue('> ' + str + ':' + str.length + '\n');
});

process.stdin.pipe(tr).pipe(process.stdout);
```

---

### Another Example, From Securesha.re
  * Send file to S3, while zipping it, while receiving from client 
  * Minimal buffering on webserver
  * Automatic backpressure handling

```javascript
  // simplified...
  app.post('/putfile', function(req, res){
    var s3Req = s3Client.put('/fileName');
    req.pipe(zlib.createGzip()).pipe(s3Req);
  });
```
  
---

### EVEN MORE

TODO: Streaming server mesh
```javascript
fs.createReadStream()
```

---



