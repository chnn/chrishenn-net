---
title: "Mocking a server for Backbone applications with Sinon.JS"
---

It's not always clear how a [Backbone](http://backbonejs.org/) application will interact with a server during the early stages of it's development process. If you are a front-end oriented developer, you might take the "resource" aspect of an application for granted, leaving the server/api interaction in your application to be implemented last. A more optimal development process would take the persistence functionality into account from the start.

However, it may not always be feasible to serve actual requests to your application. You may be working in a sandboxed environment with no access to a server. Or installing the server on your local machine might be excessive or impractical, and spinning up an actual server instance costs money you would rather not spend. Maybe the iteration process (make changes and restart) of tweaking the server takes too long, and your API is constantly changing and uncertain.

One solution is to create a mock server in JavaScript. The rest of this post details how to do so using [Sinon.JS](http://sinonjs.org/). The examples are in CoffeeScript (sorry, purists.)

Sinon.JS is a standalone library that provides test spies, stubs, and mocks. Except in this case, we aren't going to use it in a typical testing environment (such as [Mocha](http://visionmedia.github.io/mocha/) or [Jasmine](http://visionmedia.github.io/mocha/).) Sinon.JS provides a fake server that acts exactly like a real server would to your Backbone app.

Lets say we have a model and a collection:

```coffeescript
class WidgetModel extends Backbone.Model


class WidgetsCollection extends Backbone.Collection

  model: WidgetModel

  url: '/api/widgets'

```

Per the [Backbone CRUD mappings](http://backbonejs.org/#Sync), fetching the `WidgetsCollection` would make a `GET` request to `/api/widgets`. A specific model could be retrieved from `/api/widgets/[id]`, and a model could be created by `POST`ing to `/api/widgets`.

Let's make a fake database with some nested objects:

```coffeescript
database = {
  widgets: [
    {
      id: 0
      foo: 'bar'
    }
    {
      id: 1
    }
  ]
}
```

Yeah, not exactly big data. Now we can create a fake server with Sinon.JS that uses this data to respond to requests:

```coffeescript
server = sinon.fakeServer.create()
server.autoRespond = true
server.autoRespondAfter = 400
```

I set the `autoRespond` flag so that when the server receives a request, it will automatically respond. Otherwise you have to run `server.respond()` after every request you make (like a `WidgetCollection.fetch()`, for example.) I also added a delay, which forces you to face the fact that things happen asynchronously in your web application.

Now, to make the server to respond to a `GET` on the collection, we can do this:

```coffeescript
server.respondWith('GET', '/api/widgets',
  [
    200
    {'Content-Type': 'application/json'}
    JSON.stringify(database.widgets)
  ]
)
```

Creating a new model on your fake server requires a little more:

```coffeescript
server.respondWith('POST', '/api/widgets', (request) ->
  widget = JSON.parse(request.requestBody)
  widget.id = (new Date()).getTime()  # Ghetto id creation

  database.widgets.push(widget)

  request.respond(
    200,
    {'Content-Type': 'application/json'},
    JSON.stringify(widget)
  )
)
```

Models created by Backbone don't have IDs, only a "client" id (cid.) Syncing a model with the server for the first time should create an ID, so that's what `(new Date()).getTime()` is doing. Hopefully your real server has a better process for assigning IDs :)

Sinon.JS' fake server is a high level API for manipulating the FakeXMLHTTPRequest interface it provides, so there's a lot more flexibility if you need it. Additionally the server has a bunch of other options, like support for regular expressions in routes (this is how to would implement a response to a `/api/widgets/[id]` `POST`.)

More information is available [at the Sinon.JS docs](http://sinonjs.org/docs/#fakeServer). Happy mocking!
