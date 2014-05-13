#Building Securesha.re

---

## WTF is this
  * Hackathon
  * Delivering files to Lawyers, Doctors, friends
  * Easy way around learning PGP
  * Self-destructing files can be difficult to use but provide important security

---

## What changed - why now?

---

### Web workers, File API 
### (File, Blob, Blob URLs)
  * Without File API, no raw access to file (fatal)
  * Without Blob URLs, would have to base64 decrypted file & use data-url (bad perf, crashes) (mostly fatal)
  * Without web workers, browser hitches up (unless using setTimeout() loop)
  * Crypto.randomBytes

---

### CryptoJS
  * Jeff Mott, [CryptoJS Project](https://code.google.com/p/crypto-js/)
  * Provides hashing functions, stream ciphers

---

### Typed Arrays, XHR2 for speed
  * Typed arrays allow us to process binary data without hacks
    * Converting between binary data & strings is slow and hacky
    ```javascript
      function ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
      }

      function str2ab(str) {
        var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
        var bufView = new Uint16Array(buf);
        for (var i=0, strLen=str.length; i<strLen; i++) {
          bufView[i] = str.charCodeAt(i);
        }
        return buf;
      }
    ```
  * Our target - encrypt binary data without ever converting it to a string
  * Using Blobs allows us to transfer ownership via Blob URL rather than copy data to web workers
  * XHR2 allows us to send binary data directly without worrying about base64 or bad encoding
  * All this allows us to do minimal reads & writes on the data & incredible speed

---

### NodeJS
  * Easy streaming to S3 via knox
  * Minimal MySQL database
  * Keeps out of the way

```javascript
  // simplified...
  app.post('/putfile', function(req, res){
    var s3Req = s3Client.putStream(req, '/' + generateURL(), function(err, s3Res){
      if (err) return next(err);
      res.send(200);
    });
  });
```
  

---

### Quick securesha.re demo using jQuery version

---

## Polymer

```html
<secureshare-app>
  <file-uploader>
    <file-chooser-button file="{{file}}">
    </file-chooser-button>

    <file-advanced-options closed="true" fileoptions="{{fileOptions}}">
    </file-advanced-options>

    <file-encryptor file="{{file}}" passphrase="{{fileOptions.passphrase}}">
    </file-encryptor>
  </file-uploader>
  <file-downloader>
    <file-decryptor file="{{file}}" passphrase="{{hash.passphrase}}">
    </file-decryptor>

    <file-download-status downloadstatus="{{downloadStatus}}" file="{{file}}">
    </file-download-status>
  </file-downloader>
</secureshare-app>
```

---

### Google project full of polyfills
  * The WHATWG's vision of native applications in the browser, containing:
    * Shadow DOM 
    * Mutation Observers
    * Pointer Events
    * Custom Elements
    * HTML Imports
    * Template binding
    * Node.bind()
    * Web Animations

---

### The important bits:
  * Shadow DOM
  * Mutation Observers
  * Custom Elements / HTML Imports / Template and Node binding

---

### A basic element

```html
<link rel="import" href="button.html" />
<polymer-element name="panel-element" attributes="">
  <template>
    <style>
      @host { :scope {display: block;} }
    </style>
    <span>I'm <b>panel-element</b>. This is my Shadow DOM.</span>
    <content select=".foo"></content>
    <button-element></button-element>
  </template>
  <scripl>
    Polymer('panel-element', {
      created: function() { },
      enteredView: function() { },
      leftView: function() { },
      attributeChanged: function(attrName, oldVal, newVal) { }
    });
  </scripl>
</polymer-element>
```

* Styles on top, content in the middle, javascript on the bottom
  * Can use external styles (preprocessors will work)
* Completely self-contained, portable, no risk of style bleeding
* `<content>` tag allows transclusion

---

### Using this panel element

```html
<panel-element>
  <h2>Not Shown</h2>
  <h2 class="foo">Shown</h2>
  <!-- button-element will show here -->
</panel-element>
```

---

### Elements as dynamic application structure
  * jQuery taught us that the DOM is stupid
  * JS users are used to not trusting DOM methods
    * Most developers don't know `querySelector()`, `getElementByTagName()`, `element.style`, etc.
  * Polymer makes elements the first-class parts of your application


---

### Custom elements provide the best possible API

* Imagine the web as a collection of rich component parts
* No need to define every piece of each component, e.g. bootstrap:

```html
<nav class="navbar navbar-default" role="navigation">
  <div class="navbar-header">
    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="#">Brand</a>
  </div>

  <div class="collapse navbar-collapse navbar-ex1-collapse">
    <ul class="nav navbar-nav">
      <li class="active"><a href="#">Link</a></li>
      <li><a href="#">Link</a></li>
      <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
        <ul class="dropdown-menu">
          <li><a href="#">Action</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li><a href="#">Separated link</a></li>
          <li><a href="#">One more separated link</a></li>
        </ul>
      </li>
    </ul>
  </div><!-- /.navbar-collapse -->
</nav>
```

---

### Simplified bootstrap nav


```html
<bootstrap-nav collapsible>
  <span class="brand">Brand Name</span>
  <span class="nav">
    <li class="active">Link</li>
    <bootstrap-dropdown>
      <span class="toggle">Dropdown <b class="caret"></b></span>
      <li><a href="#">Action</a></li>
      <li><a href="#">Another action</a></li>
      <li><a href="#">Something else here</a></li>
      <li><a href="#">Separated link</a></li>
      <li><a href="#">One more separated link</a></li>
    </bootstrap-dropdown>
  </span>
</bootstrap-nav>  
```

---

### Elements as dynamic application structure

* Elements are selected using DOM methods and methods are called *directly on the elements*
* Elements can represent non-visual elements
  * AJAX
  ```html
    <polymer-ajax auto url="http://gdata.youtube.com/feeds/api/videos/" 
      params='{"alt":"json", "q":"chrome"}'
      handleAs="json"
      on-polymer-response="handleResponse">
    </polymer-ajax>
  ```
  * Web Workers
  ```html
    <webworker-crypto id="worker-{{worker.id}}" on-slice="onSlice"></webworker-crypto>
  ```
  * LocalStorage
  ```html
    <polymer-localstorage name="my-app-storage" value="{{value}}"></polymer-localstorage>
  ```

---

### Elements as dynamic application structure

* See application structure as rich nested elements rather than introspecting JS
  * Similar to binding application a global object
* No window.app object like in most frameworks - just `document`

---

### Two-way binding 
  * Similar to Knockout, Ember, etc., but perhaps more powerful
  * DOM elements gain rich capabilities surpassing plain js objects
  * Bind data directly to elements like `<polymer-localstorage>` for painless persistence
  * Every element using a value is the source of truth
  * Forget DOM munging, underscore templates, and `$(".element").append(string)`
  * DOM is always consistent with data models

---

## Quick securesha.re demo using Polymer
  * Show easy-to-introspect structure
  * Look at an element, find it in the sources panel
  * Data bindings are visible
  * All components are reusable - e.g. you could use `<file-encryptor>` in your projects
  * Extreme ease of refactoring

---

## Now you know everything
   Questions? 

