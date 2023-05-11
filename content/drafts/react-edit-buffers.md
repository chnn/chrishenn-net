---
title: "React pattern: resetting to initial state"
layout: post
---

Here's a hooks pattern I've found myself repeating often.

The setup:

1. I have a model that appears in more than one location in the UI
2. The model can be edited from different locations simultaneously
3. Edits to the model are buffered into state and propogated only when valid

```tsx
const ThresholdEditor = ({threshold, onSaveThreshold}) => {
  const [draftThreshold, dispatch] = useReducer(reducer, threshold)

  return (
    <div className="threshold-editor">
      {/* ... */}
    </div>
  )
}
```

```tsx
const ThresholdEditor = ({threshold, onSaveThreshold}) => {
  const initialThresholdRef = useRef(threshold)

  const [draftThreshold, dispatch] = useReducer((state, action) => {
    // If the `threshold` has changed since we started editing it, reset the
    // state to the `threshold`
    if (initialThresholdRef.current !== threshold) {
      initialThresholdRef.current = threshold

      return threshold
    }

    // Otherwise proceed as normal
    return reducer(state, action)
  }, threshold)

  return (
    <div className="threshold-editor">
      {/* ... */}
    </div>
  )
}
```

```tsx
const useResettingReducer = (reducer, initialState) => {
  const initialStateRef = useRef(initialState)

  return useReducer((state, action) => {
    if (initialStateRef.current !== initialState) {
      initialStateRef.current = initialState

      return initialState
    }

    return reducer(state, action)
  }, initialState)
}
```

```tsx
const ThresholdEditor = ({threshold, onSaveThreshold}) => {
  const [draftThreshold, dispatch] = useResettingReducer(reducer, threshold)

  return (
    <div className="threshold-editor">
      {/* ... */}
    </div>
  )
}
```







[ember one way]: https://api.emberjs.com/ember/2.15/namespaces/Ember.computed/methods/oneWay?anchor=oneWay
