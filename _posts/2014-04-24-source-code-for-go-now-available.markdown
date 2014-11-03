---
layout: post
title: Source code for Go now available
status: public
type: post
published: true
author: ThoughtWorks Go team
---

Source code for Go® is now available!

We’re incredibly proud to announce that the source code for Go is now available at [https://www.github.com/gocd/gocd](https://www.github.com/gocd/gocd). It’s exciting to see what you, the community, will come up with to make Go even better. 

### Contributing

If you’d like to contribute to Go, please check out the guide which can be found at [http://www.go.cd/contribute/](http://www.go.cd/contribute/). As mentioned on that page, it will be necessary for you to fill out the contributor’s license agreement at [http://www.go.cd/contribute/cla.html](http://www.go.cd/contribute/cla.html) to have your pull request accepted.

### New plugin end-point available

We’re also releasing Go 14.1, which now includes the ability to write your own custom task plugins. Is there a system you want to manage with Go but you’d prefer not to create command line scripts? Creating a plug-in could be a great way to extend Go without the need to modify the core source code. Check out [Whats_new_in_Go](http://www.go.cd/documentation/user/current/release_history/whats_new_in_go.html) for more information.

### Current post-merge process

When your pull request is merged, it will be built by Go as outlined at [http://www.go.cd/contribute/#after-commit-is-merged](http://www.go.cd/contribute/#after-commit-is-merged). We’re still building out the infrastructure for the public facing Go servers and don’t have Windows based agents live yet. Downloads for Windows will be available as normal, but we’ll be running the Windows specific tests on internal ThoughtWorks grids. We’re sorting out licensing and hardware details to get these going, and will make sure they are available ASAP. 
