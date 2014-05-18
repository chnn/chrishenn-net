---
title: Modular Templates in Backbone with RequireJS
layout: post
---

In small Backbone applications, it's a common pattern to keep track of templates as `<script>` tags in the end of a HTML file:

```html
<body>
    <div id="some-el"></div>
    <ul id="item-list" class="more-markup"></ul>

    <!-- templates -->
    <script type="text/template" id="item-template">
        <li><%= name %></li>
    </script>
</body>
```

In this case, loading the template into the Backbone view is achieved by selecting the template with jQuery, and passing it to underscore: `template: _.template($("#item-template").html())`. What happens if you have more templates? You don't want to keep track of ten or twenty templates in the end of your HTML file. You need a solution that lets you keep each template in it's own file that is available in `Backbone.View`.

RequireJS is a JavaScript library for [modularizing](http://addyosmani.com/largescalejavascript/) your code. It does much more then let you externalize your templates. For example, this is how I define Backbone views with RequireJS:

```coffeescript
define ['dependencyA', 'backbone'], (DependencyA, Backbone) ->

    class ItemView extends Backbone.View

        DependencyA.doSomething()
        # more view code...
```

Here, a Backbone view is defined as a module with dependencies. The module provides it's own namespace (variables don't pollute the global scope), and can require dependencies, which are either normal JavaScript files or other RequireJS modules. There's a [whole slew of reasons](http://requirejs.org/docs/why.html) to modularize your JavaScript code with something like RequireJS; one benefit it brings is the ease of using external templates.

RequireJS has a plugin called [text](https://github.com/requirejs/text) to specify text files as dependencies. Any RequireJS dependency prefixed with `text!` will be loaded as plain html (or more precisely, a multi-line string in JavaScript.)

Now our view code might look something like this:

```coffeescript
define ['dependencyA', 'backbone', 'text!../path/to/template.html'], (DependencyA, Backbone, myTemplate) ->

    class ItemView extends Backbone.View

        template: _.template(myTemplate)

        # view code
```

RequireJS will load the file for you using the text plugin. You can split your templates into separate files and load them individually with the text plugin only when you need to. 

```
├── templates
│   ├── item.html
│   └── someothertemplate.html
└── views
    ├── item.coffee
    └── someotherview.coffee
```

Loading templates with `text!` will work for any templating engine, of course. The previous example, with Handlebars instead of Underscore:

```highlight coffeescript
define ['dependencyA', 'backbone', 'handlebars', 'text!../path/to/template.html'], (DependencyA, Backbone, Handlebars, myTemplate) ->

    class ItemView extends Backbone.View

        template: Handlebars.compile(myTemplate)

    # view code
```

If you're structuring an application with Backbone, the chances are it's complex enough to have several templates. Backbone leaves a lot of decisions up to the developer, so this isn't the only way to keep templates out of your main html page. It is, however, quite simple to grasp and provides you with an easy way to keep your code modular.
