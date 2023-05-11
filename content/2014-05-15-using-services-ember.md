---
title: "Implementing Services in an Ember.js Application"
---

{% aside type="warning" %}
These examples are now out of date. Use the [injection API](http://emberjs.com/blog/2015/02/07/ember-1-10-0-released.html#toc_injected-properties) available in Ember 1.10 instead.
{% /aside %}

The following examples assume your project uses [ember-cli](https://github.com/stefanpenner/ember-cli). Names of files and objects will be a little different if you're working in globals mode.

Define the service in the file `app/services/myservice.js`:

```javascript
export default Ember.Object.extend({
  logFoo: function () {
    console.log("foo");
  },
});
```

Initialize the service using an [initializer](http://emberjs.com/api/classes/Ember.Application.html#toc_initializers) under `app/initializers/services`:

```javascript
export default {
  name: "services",
  initialize: function (container, app) {
    // Inject into all routes and controllers
    app.inject("route", "myService", "service:myservice");
    app.inject("controller", "myService", "service:myservice");

    // Or if you wanted, into a specific route
    app.inject("route:some-route", "myService", "service:myservice");
  },
};
```

Your service is now available in the classes you specified. Try it out by with `this.myService.logFoo()` in a route.

You can also inject other objects into a service:

```javascript
export default {
  name: "services",
  initialize: function (container, app) {
    // Make the ember-data store available in the service
    app.inject("service:myservice", "store", "store:main");

    // Then inject service into all routes
    app.inject("route", "myService", "service:myservice");
  },
};
```

“Services” is a fancy name. But you can imagine a number of practical applications:

- Geolocation
- WebSockets
- WebWorkers
- Alternate data stores (other than ember-data)

Ember’s `inject` (and corresponding `register`) methods are pretty powerful. But it's easy to get carried away with dependency injection; keep in mind that just because you are ‘inject’ dependencies doesn't mean you avoid tight-coupling and all the issues that comes with it.

There's a proposal to make services an official convention in Ember.js. You can read more about it [here](http://discuss.emberjs.com/t/services-a-rumination-on-introducing-a-new-role-into-the-ember-programming-model/4947).
