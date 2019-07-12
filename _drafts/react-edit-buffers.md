---
title: "React Pattern: Edit Buffer Components"
layout: post
---

I've found myself repeating a pattern in React lately.
I call it an _edit buffer_; it's any component that

1. Copies passed data to local state
2. Provides a UI to edit that state
2. Emits changes only once a valid edit is made

Here's a concrete example: 

```
PlotContainer
  Plot
    RegionSelector
  PlotSettings
    SomeMiscSettings
    RegionInputs
```

### Avoiding a common pitfall with "one way" state hooks

```
function useOneWayState(initialState) {
  const ref = useRef(initialState)
  const [state, setState] = useState(initialState)

  if (ref.current === initialState) {
    return [state, setState]
  }

  ref.current = initialState

  return [initialState, setState]
}
```

```
function useOneWayReducer<R extends Reducer<any, any>>(
  reducer: R,
  defaultState: ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
  // ...
}
```


- sequence diagrams to explain problematic data flow

<div class="note">
  By the way, when I say "pattern" I'm thinking of the original interpretation put forth in [this talk][pattern talk].
</div>

[pattern talk]: https://www.deconstructconf.com/2017/brian-marick-patterns-failed-why-should-we-care
[ember one way]: https://api.emberjs.com/ember/2.15/namespaces/Ember.computed/methods/oneWay?anchor=oneWay
