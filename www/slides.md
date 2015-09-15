# Universal Web Applications with React & NodeJS
<hr />
## Building Predictable Client/Server Apps

---

# Reducing Complexity
<hr />
## Building Scalable Web Applications

---

## Things that Sam likes

---

### The Problem

Traditional webapps have complex state on a platform that was never designed for applications.

---

> ...Remember the days before React, when you had to write one piece of code to render your application and
> another to update it? HAHAHAHA. That was awful. React showed us that expressing our views declaratively
> leads to clearer, more predictable, and less error-prone applications.

[Andrew Clark, author of Flummox (Flux implementation)](https://github.com/acdlite/flummox/blob/v3.5.1/docs/docs/guides/why-flux-component-is-better-than-flux-mixin.md)

---

## Typical issues

* **Out-of-date data**: It's easy to forget to change the data on a view in all places it is referenced.

* **Local State**: Views contain complex local state. Views can get into broken state.

* **Cascading Updates**: Changing a model or collection causes another model or collection to change, cascading into complexity.

* **Difficult testing**: Testing components requires rebuilding the app in a browser environment like PhantomJS.

---

### OH GOD WHY

![oh god why](img/healthcare.gov.jpg)

<!-- Problems with HC.gov: spaghetti jquery code, imperative style, different validations on client-server -->

---

### Reducing Complexity

* Simple data flow
* Shared code is less code
* Small modules mean smaller tests

---

### How Desync Starts

```javascript
// This is visual only - expect bugs
onClick: function(e) {
  this.$('.active').removeClass('active');
  $(e.currentTarget).addClass('active');
  // What if we add another control specifying
  // which item is active?
},
```

---

### Solutions?

* Rerender entire view on change:
  - Way too slow / doesn't scale
  - Easy mental model - similar to static pages
<p />
* Two-way Data Binding:
  - Debugging is difficult
  - Slow dirty checking / digest loop
  - Dynamic scoping problems
  - App becomes a giant string parser
  - Tight coupling between views and application logic

---

### Data changing over time is the root of all evil.

To change the DOM, you need to erase or read what was there
before, and make changes.

You have to think about every possible transition between states.

---

### React

Best of all worlds:

- Declare what you want your views to look like, as functions, on every frame.
  (Similar to graphics programming)
- Updates use an efficient tree-diffing function to determine needed DOM mutations.
  - Entire tree branches can be skipped efficiently.
  - The simplicity of static rendering, even better speed than two-way binding

---

### React

Best of all worlds:

- Intermediate state (in the DOM, not in your data) is impossible.
- Rendering is a pure function. Can be run on the server or for non-DOM targets
  - Prerender views for speed or SEO
  - Run similar code on mobile with React Mobile

---

### Constraints help build good applications.

Without setting rules for yourself and your developers, applications will
become more complex with every commit.

---

### React is not about the DOM

React is an application style. The DOM is one possible target (via `react-dom`).

Other targets:

* iOS
* Android (just released)
* Canvas ([react-canvas, Flipboard](https://github.com/Flipboard/react-canvas))
* D3 ([react-d3](https://github.com/esbullington/react-d3))
* Three.js ([react-three](https://twitter.com/ToxicFork/status/642803091969048576))
* Terminal ([react-blessed](https://github.com/Yomguithereal/react-blessed), [demo](https://github.com/gaearon/react-blessed-hot-motion))

---

### Three.js, really?

<video name="media" data-height="632" data-width="488" loop="true" autoplay="true" poster="https://pbs.twimg.com/tweet_video_thumb/COuyAT8WUAAv5yw.png" src="/img/threejs.mp4">
  <source video-src="/img/threejs.mp4" type="video/mp4" class="source-mp4" src="/img/threejs.mp4">
</video>

---

### Terminal, really?

* YEAHHHH!!!

![](/img/hacktime.jpg)

---

### React-Native, iOS vs Android

* 85%+ code reuse, but completely native widgets with JS core

<img src="https://scontent-ord1-1.xx.fbcdn.net/hphotos-xpt1/t39.2365-6/11891380_1627845260812265_211379441_n.png" style="display: inline-block; width: 49%;" />
<img src="https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-xpf1/t39.2365-6/11891342_1121951694500056_1904665184_n.png" style="display: inline-block; width: 49%;" />

---

Examples

---

## 0: Building a basic component.

- To build a component, describe what you want it to look like in terms of functions.

---

## 1: Components are composable.

- You can nest components inside each other.
- Teams can share common components (like `<Table>` or `<Button>`) across projects.

---

## 2. JSX

- Shorthand that looks like traditional HTML.
- Nesting components works as you'd expect.
- Create lists in loops.

---

## 3. Props and State

- Data flows downward from the root component to sub-components.
- Define only the data you need.
- State is useful for use it sparingly.

---

## 4. Hot reloading & DevTools

- React components are pure functions, so they can be replaced at will without a refresh.
- Use Webpack
- <a href="http://localhost:8080/0-bundle" target="_blank">Start</a>
- React-devtools

---

## 5. ES6

- React is ready for ES6 and has nice syntax shortcuts.
- React components will eventually be raw class objects.
- <a href="http://localhost:8080/0-bundle" target="_blank">Start</a>

---

## 6. Deep Applications

- Data flows downward. Actions flow upward.
- Notice that it starts to get awkward as the depth increases.
- <a href="http://localhost:8080/0-bundle" target="_blank">Start</a>

---

### Traditional MVC

<img src="/img/mvc.png" style="width: 90%" />

---

### Flux / Redux

<img src="/img/flux.png" style="width: 90%" />

---

## 7. Flux / Redux

(`counter` example)

- All state of all components lives in a single JSON object.
- Views can trigger actions that create a new root state.
- <a href="http://localhost:3000" target="_blank">Start</a>

---

## 8. Redux DevTools

- Just like React components, Redux actions are pure functions.
- Pure functions can be reversed and re-applied at will.
- <a href="http://localhost:3000" target="_blank">Start</a>

---

## 9. Server rendering and bootstrap

- The server prerenders the entire application and serves it to the client.
- React resumes where the server left off without modifying the DOM.
- Fetch data from some external API, render the app and serve the data.
- `npm start; npm run client;` <a href="http://localhost:8080/?counter=42" target="_blank">Start</a>

---

### Work to make your applications simpler.

Constraints and unidirectional flow create a simpler mental model.
