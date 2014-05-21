#  Streams in Node.JS: 
## The Unix Philosophy Meets the Web

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

### Examples

---
