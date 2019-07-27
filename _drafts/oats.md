---
title: "Oats: an OpenAPI to TypeScript HTTP client generator"
layout: post
---

At work, we generate a TypeScript HTTP client from an [OpenAPI spec][openapi spec].
I felt frusterated by the [existing][original generator] code generation tools we were using, so I wrote a replacement.

I get poked fun of at work for reinventing the wheel (previously stuff like [lodash's `get` and `set` functions][get and set], [vega lite][vega lite]), and this is no exception :)
But I think it's a genuine improvement for our needs.
The main contributions I felt I could make were generating higher quality union types and safer error response types.

We rely on good TypeScript definitions extensively to catch issues during development, so better type definitions are a huge benefit.

Given the following schema:

```yaml
Plot:
  type: object
  required: [attributes]
  properties:
    title:
      type: string
    attributes:
      oneOf:
	- $ref: '#/components/schemas/HistogramPlotAttributes'
	- $ref: '#/components/schemas/LinePlotAttributes'

HistogramPlotAttributes:
  type: object
  required: [kind, xField]
  properties:
    kind:
      type: string
      enum: [histogram]
    xField:
      type: string

LinePlotAttributes:
  type: object
  required: [kind, xField, yField]
  properties:
    kind:
      type: string
      enum: [line]
    xField:
      type: string
    yField:
      type: string
```

The previous generator would create types like this:

```ts
interface HistogramPlotAttributes {
    kind: HistogramPlotAttributesKindEnum;
    xField: string;
}

enum HistogramPlotAttributesKindEnum {
    Histogram = 'histogram'
}

interface LinePlotAttributes {
    kind: LinePlotAttributesKindEnum;
    xField: string;
    yField: string;
}

enum LinePlotAttributesKindEnum {
    Line = 'line'
}

interface Plot {
    title?: string;
    attributes: OneOfHistogramPlotAttributesLinePlotAttributes;
}
```

The generator doesn't output the referenced `OneOfHistogramPlotAttributesLinePlotAttributes`, so this won't compile.
In other situations, we've see the `Plot['attributes']` type be generated simply as `any`, which isn't useful.

[Oats][oats], the replacement generator, generates types like this:

```ts
export interface Plot {
  title?: string;
  attributes: HistogramPlotAttributes | LinePlotAttributes;
}

export interface HistogramPlotAttributes {
  kind: "histogram";
  xField: string;
}

export interface LinePlotAttributes {
  kind: "line";
  xField: string;
  yField: string;
}
```

It also supports the more complex `discriminator` property of the OpenAPI spec, so the schema could be instead specified as:

```yaml
Plot:
  type: object
  required: [attributes]
  properties:
    title:
      type: string
    attributes:
      oneOf:
        - $ref: '#/components/schemas/HistogramPlotAttributes'
        - $ref: '#/components/schemas/LinePlotAttributes'
      discriminator:
        propertyName: kind
        mapping:
          line: "#/components/schemas/HistogramPlotAttributes"
          histogram: "#/components/schemas/LinePlotAttributes"

HistogramPlotAttributes:
  type: object
  required: [kind, xField]
  properties:
    xField:
      type: string

LinePlotAttributes:
  type: object
  required: [kind, xField, yField]
  properties:
    xField:
      type: string
    yField:
      type: string
```

In which case the following types would be created:

```ts
interface Plot {
  title?: string;
  attributes:
      | (HistogramPlotAttributes & { kind: "histogram" })
      | (LinePlotAttributes & { kind: "line" });
}

interface HistogramPlotAttributes {
  xField: string;
}

interface LinePlotAttributes {
  xField: string;
  yField: string;
}
```

(Aside: wow isn't TypeScript great?)

Oats also takes a slightly different approach to enum types.
For the following schema:

```yaml
Scale:
  type: string
  enum: [log, linear]
```

We'll generate the type `type Scale = "a" | "b"` instead of `enum Scale {A = "a", B = "b"}`.
This is because string literal unions are more flexible than enums.
For example, it allows things like

```
type PlotKind = Plot['attributes']['kind'] // same as "histogram" | "line"
```

If we tried to do this with enums, then we get the following type:

```
HistogramPlotAttributesKindEnum | LinePlotAttributesKindEnum
```

which is pretty awkward.

I'm no type theorist, but the way I've been thinking of this is that enums are [nominal types][nominal vs structural] while string literals are structural.
And TypeScript is successful and a joy to use because it's mostly structural---that's what enables smooth interop with existing untyped JavaScript.

On a more minor stylistic level, I also feel like string literal unions are less verbose while still clarity (e.g. `"a"` vs. `Scale.A`).
It's also nice that string literals don't have to be imported to be used (I feel like I'm drowning in `import`s sometimes). 

### Typed error responses

One other cool aspect of Oats is that it will generate safer error response types.
For example, suppose we have the following OpenAPI spec:

```
'/plots':
  get:
```

Previously we would use the generated HTTP method like so:

```
```

But since the error in the `catch` path of a `try` / `catch` in TypeScript is necessarily untyped, we get no guidance from TypeScript about what the `error` is (even though we completely specified it in the OpenAPI spec!)

So instead, Oats will generate a utility with the following signature:

```
```

Which is used like this:

```
```

Now, the exceptional path is truly exceptional, and we have full type definitions for the error responses.

### Limitations

This new generator was hacked together on a weekend and definitely has limitations.
It doesn't generate a client for non-JSON APIs very well, and doesn't support significant parts of the OpenAPI spec.
Comments in the spec also won't appear in the generated output (I find they are mostly noise).

### Snapshot testing

Recently, I've been inspired by the approach of a few React folks who advocate for really high-level testing that doesn't break even when you rewrite an entire project's implementation.
I've been focusing most of my energy on these sorts of tests.
For this project, that meant testing the generated code using a [Jest snapshot test][snapshot example].

I haven't lived with this approach for long, but have been pretty happy with it so far.
It takes 0 effort and proven useful in catching regressions during development.
In the future I hope to explore snapshot testing more; I think there's a ton of potential to minimize the pitfalls of snapshot testing with thoughtfully written [custom serializers][devtools custom serializer].

### Open source in the year 2019

The shortcomings of the generator I am trying to replace are [well][first gen issue] [known][second gen issue].
While working on this project I wondered whether I should be instead contributing to openapi-generator.
There were some minor roadblocks: openapi-generator is written in a language I don't u

- Written in a language I don't understand
- Targets a wider use case

But mostly:

- If I write a PR, will it even get accepted? And with how much effort, and in what time frame?
- Fuzzy line between open source as an attitude towards community involvement, and open source as a business strategy 

[snapshot example]:
[openapi spec]:
[devtools custom serializer]:
[get and set]:
[vega lite]:
[original generator]:
[generator shortcomings]:
[oats]: 
[nominal vs structrual]:
