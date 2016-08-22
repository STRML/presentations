#  Streams in Node.JS: 
## The Unix Philosophy Meets the Web

---

## Why you should use Node.JS

---

## Things that Sam likes

---

### `1984`, `The Unix Programming Environment`

> Even though the UNIX system introduces a number of innovative programs and techniques,
> no single program or idea makes it work well. Instead, what makes it effective is the
> approach to programming, a philosophy of using the computer. 

> Although that philosophy cannot be written down in a single sentence, at its heart is the idea that the power of
> a system comes more from the relationships among programs than from the programs themselves.

> Many UNIX programs do quite trivial things in isolation, but, combined with other programs, 
> become general and useful tools.

---

## Typical forms of stream programming

```
# Searching a web page
$ curl -s http://prog21.dadgum.com/ | grep 'Nintendo'


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

![layin pipes](/img/layingpipe.png)

---

### Check out the pipes on this guy

> readable.pipe(writable)

---

### Examples

---

### A simple `through` stream

---

### Duplex streams

> a.pipe(b).pipe(a)

![Duplex](/img/duplexer.png)

---

### Simple stream transforms

---

### Processing large files

---

### Dnode

![Dnode](/img/dnode.png)

---

### Turtles all the way down

![OH SHIT TURTLES](/img/dnode2.png)

---

### HTML Streams

Realtime data, direct to your page, server & client rendered

Create a data.txt that streams directly to the browser,
but is rendered properly as static html from the server.

---

### Scuttlebutt

![scuttlebutt](/img/scuttlebutt.png)

^

---

### Gossip Protocol

![gossip](/img/gossip_protocol.png)

---

### Shared state among multiple webservers

---

## The End
