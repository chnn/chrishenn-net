---
title: Limiting responses with the Streams API
layout: post
---


I noticed recently that the [Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) has been de-feature flagged in Firefox.

It provides a really nice way to limit response sizes;

```javascript
function fetchWithLimit(url: string, init: RequestInit, maxBytes: number) {
  const response = await fetch(url, init)

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  let bytesRead = 0
  let bodyString = ''
  let currentRead = await reader.read()

  while (!currentRead.done) {
    const currentText = decoder.decode(currentRead.value)

    bytesRead += currentRead.value.byteLength

    if (bytesRead >= maxBytes) {
      reader.cancel()

      return bodyString
    } else {
      bodyString += currentText
    }

    currentRead = await reader.read()
  }

  reader.cancel()

  return bodyString
}
```
