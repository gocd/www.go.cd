---
layout: post
title: Update - The path to open source
status: public
type: post
published: true
author: Ken Mugrage
---

If you're in London (or would like to go there) we're giving a sneak preview to setting up
and using a Go development environment on 7 April at Skills Matter. You can register for free
<a href="https://skillsmatter.com/meetups/6303-introduction-to-developing-open-source-go">here</a>. Huge thanks to Skills Matter for hosting this!

Sessions in other cities will be announced soon as we get very close to releasing the code
publicly. 

In case you're wondering, here are some examples of what we're working on...

- Public Go server - Go was previously built and tested using a pretty big and relatively
complex pipeline in a Go instance (of course) at ThoughtWorks.
Go will still be building Go, so we're building out a public facing instance that will
run tests that wouldn't be practical for contributors to run locally. 

- Updates to code - There's quite a bit going on with the code. Changing the way tests are
run, removal of license enforcement, more help for people new to the code and a lot more. 
A small sample of some recent commits...

		commit c8e46b37d9611da6772aa98cb049b860a3edda38
			moved gadgets to com.thoughtworks.studios from com.thoughtworks.go

		commit 7d55eaac06191910e665cb80bd178ea921d877d9
			#8012 - Removing license details from view in Server Details page

		commit 65b515db0f363e895ad0925967a4ddf5f8638b7e
			# - added comments to help start dev server and agent

		commit 867a7a754d3057ce910ad0eba51de668dcfbc865
			#8059 - Submodule update. Getting rid of TW credentials from code/tests.
			
- Speaking of the code base - We're also doing a pretty massive clean-up on the repository
itself. There is a lot of information in there that's many years old and doesn't really serve
any purpose other than making the repository a lot bigger than it needs to be.
