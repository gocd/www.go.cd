---
layout: default
title: How to submit an issue to Go
---

Bug reports, enhancement requests, constructive comments; these are all example of valuable
contributions to any open source project. The following guidelines are designed to help you
file these issues.

###Check to see if it's already been filed
We're using [GitHub Issues](https://github.com/GoCD/GoCD/issues) to track bugs and enhancements on this project. Please go there
and check if someone has already reported the same issue or made the same enhancement request. There's a
good chance that if they have, there may be information which will benefit you.

###Ask the community
We're using Google Groups for Go related discussions. If you're not sure the behavior you're seeing is a 
bug, you can always ask on one of those lists. See our [resources](/community/) page for mailing list information.

###Be as complete as possible
We understand that you can't be expected to know exactly why something doesn't work, but just
saying "it doesn't work" doesn't help us help you. Adding as much information as possible into
your report is very important.

+ Describe what you were doing when you ran into the issue
+ Describe what you expected to happen
+ Describe what actaully happened
+ Let us know exactly which version of Go you're using (it's on the bottom of every page)
  + By the way, if you're using a very old version it's possible the bug has already been fixed.
  + Also by the way, if you're using a very recent build and not a supported release it's possible you're using some feature that's not done.
+ Let us know what operating system your server and agents are installed on
+ Let us know which web browser(s) you were using
		
###Some things we may ask for
We don't always need all of these, but if you'd like to attach them when you submit your issue
it definitely couldn't hurt.

+ Screen shots of errors when they show up in the user interface
+ The output of http://[YOUR\_GO\_URL]/go/api/support
+ The configuration and log files listed on the page above.
		
###If you REALLY want to help
As we said above, just finding and submitting issues is helpful. If you're so inclined, a pull request
or even a patch which addresses the issue is even better!