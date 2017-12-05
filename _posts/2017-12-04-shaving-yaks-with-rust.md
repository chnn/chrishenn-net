---
title: Shaving yaks with Rust
layout: post
---

I'm supposed to be writing a big ol' thesis at the moment, which involves the minor tedium of collecting citation data into BibTeX. Naturally this is a great opportunity to stop doing everything important and start a project to automate the process :)

I hacked together [a tool](https://github.com/chnn/mathbib) that works like this:

<script type="text/javascript" src="https://asciinema.org/a/3jk2SzOVZgSrinv9M7oUsodNw.js" id="asciicast-3jk2SzOVZgSrinv9M7oUsodNw" async></script>

I'm mostly excited about this since it is my first project written in Rust. The experience was more productive than I anticipated, largely due to the healthy Cargo-based ecosystem in Rust-land. After reading the first few chapters of [the book](https://doc.rust-lang.org/book/), it was easy to wire up some plumbing between [various crates](https://github.com/chnn/mathbib/blob/6abbc95848b5a80b932eb4e6a74f3f6fa8eaa43a/Cargo.toml#L7-L13) to get a working prototype very rapidly. 

I did receive lots of bewildering feedback from the compiler along the way, which is a nice way to work (much better than bewildering feedback during runtime!) For the most part though, I haven't had to deal with ownership trickiness as much as I expected. I think questions of ownership are not as complicated for a small program like this one. I was also pleasantly surprised to find how ergonomic and comprehensive error handling is in Rust—it's perhaps my favorite aspect of the language so far. Kinda like error handling in Go, except it feels less ad-hoc.

I plan to work on this project a little more. I want to make the code more idiomatic, and perhaps make the tool pluggable next for multiple citation databases.
