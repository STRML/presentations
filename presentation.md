# Universal webapps with React & NodeJS

AKA

# Reducing WebApp Complexity
# Making WebApps Predictable


### The Goal

Traditional webapps have complex state on a platform that was never designed for applications.

Where does this complexity come from?

* Out-of-date data: When doing traditional DOM mutation, it's easy to forget to change the data on a view in all
  places it is referenced.
* Local State: Views contain complex local state, which is hard to recreate reliably. Views can get
  into broken state.
* Cascading Updates: Changing a model or collection causes another model or collection to change, making tracking
  where a chance came from difficult.
* Difficult testing: Testing components requires rebuilding most or all of the app in a browser environment
  like PhantomJS.

Solutions to the above:

* Data out of date:
  - Rerender each and every view every time the data changes. This makes the app more like a traditional static
    application. But what about local state?
  - This is extremely expensive. See Backbone.LayoutManager which used this technique. It becomes somewhat manageable
    when batching updates via document fragments, but performance quickly becomes very bad.
  - React solves this with the Virtual DOM - a layer above the actual DOM. This is much like immediate-mode rendering
    in graphics: you describe exactly what the views will look like, at every point in time. The DOM cannot
    get out of sync with its description. This means no jQuery plugins and no manual DOM munging. This improves
    performance and predictability massively.
  - React synchronizes the virtual DOM with the real DOM smartly and provides hooks for skipping wasted work.
    How the virtual DOM is synchronized with the real DOM is an implementation detail and the details aren't necessary
    for the developer to know.

* Local State:
  - Move all view-local state to a single root data store and propagate it down to the individual components.
  - This is nice! Views can now be completely pure functions: (attributes) -> html.
  - This means that any custom component, given the same attributes, always produces the same HTML.

* Cascading Updates:
  - As above, as much local state moves up to the root data store as possible.
  - We then create a self-imposed constraint - any action flows to the root. Data stores receive actions, decide how
    to act on them, and update themselves. Data store *cannot* trigger additional actions. This is not strictly
    necessary but greatly helps with complexity.
  - When root data changes, because of React's smart updates via the Virtual DOM, it's actually feasible to update
    every single view in most apps. If performance becomes a problem, React provides an easy optimization method.
  - This is called *undirectional data flow* and is the cornerstone of Flux/Redux applications.

* Testing:
  - Pure functions without side effects are easy to test. The same data always produces the same view.
  - The virtual DOM is just JS data structures! This means you can render your entire app without actually attaching
    to a real DOM.
  - Use simple unit tests rather than rendering your whole app in a browser.

### The Tenets of a Good Webapp

These principles, if stuck to, create a simple, predictable webapp that scales for your developers:

* Single source of truth:
  - All application data exists in only one place and is not duplicated. This means an application's entire state
    can be moved from server to client and is fundamentally easier to test. State can also be tracked, mutated,
    and debugged by external tools with a minimum of effort. With immutable data stuctures, undo/redo is not only
    free, but efficient. [Show an example using react-json-editor]()

* Data is read-only:
  - This is enforced by React and is a conscious choice in your data stores and network callbacks.
  - Rather than mutating data directly on a network callback, stores express the intent to mutate by throwing an action.
    Actions execute one at a time (async or not), which helps prevent race conditions.

* Actions are pure functions:
  - In Redux applications, Reducers (Actions) are simply functions that take the existing state, the intended
    action name (like 'DELETE_TODO') and return a new state. They are prevented from having side effects and can
    even be reused.
  - Reducers are easy to test in isolation because they are pure functions.

> Getting the pattern? Pure functions and immutable data make an application easier to test, easier to reason about,
> and easier to scale.


## Universal / Isomorphic WebApps

While not required, building a webserver with NodeJS gives us a lot of advantages:

* One language for your frontend and middleware/backend developers
* Share code between your webserver and frontend. This means you can share data fetching code, validation code, and
  testing frameworks.
* Because the Virtual DOM is just JS data structures, this means we can run the whole thing without a DOM!
  React offers React.renderToString(), so your webserver can actually run your whole webapp! Compare this to approaches
  like AirBNB's `rendr`, which actually spawns a whole headless browser to run the app and has other disadvantages.

### What happens when your server runs your webapp?

* Your server fetches the exact same data it plans to send to the client.
* React creates the HTML for the app and attaches a `data-checksum` attribute to the root component.
* This template is sent down and rendered in the browser.
* The browser renders this HTML like it was any other static page. This is great for SEO and response time!
  - When the JS finally loads, React grabs the application data and renders the app on the client.
  - It then generates a checksum for this rendered data.
  - Does the checksum match? If so, React does something really magical - nothing! It simply attaches event
    handlers to the DOM and doesn't render anything new at all. You now have a fully interactive webapp with all
    the advantages of static applications!



