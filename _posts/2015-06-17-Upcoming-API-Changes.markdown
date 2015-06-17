---
layout: post
title: Upcoming API Changes
status: public
type: post
published: true
author: Ketan Padegaonkar
---

With the upcoming release of Go 15.2, we'd like to begin unifying and improving some of the existing APIs that Go supports.

Go's APIs are fairly old, have [inconsistent and unpredictable content types](https://github.com/gocd/gocd/issues/572) (csv, xml, json, plain text).

Going forward, we would like to announce an ongoing effort to improve these APIs to use something that is more modern, easy to discover, learn and build API clients for.

We would be using the [JSON HAL specification](http://stateless.co/hal_specification.html). Our API guidelines are [published on our RFC](https://github.com/gocd/gocd/issues/1100).

This will give us the opportunity to leverage Ruby and Rails to build these APIs, which should make it easier to incrementally iterate through and improve existing APIs to bring them to parity with our new guidelines.

We welcome [any feedback](https://github.com/gocd/gocd/issues/1100) to improve our guidelines and [contributions](https://github.com/gocd/gocd/issues?q=is%3Aopen+label%3Aapis+label%3Aenhancement) to improve existing APIs.
