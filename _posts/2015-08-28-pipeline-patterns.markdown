---
layout: post
title: Pipeline Patterns
status: public
type: post
published: true
author: Ken Mugrage
---

Intro

##Build things once

When you're taking software from initial code change to production in an automated fashion, it's incredibly important
that you deploy the exact same thing you've tested.

Once you've built a binary, you should upload that back to your CD server or artifact repository for later use.

![Upload Artifacts](/images/blog/pipeline-patterns/upload-artifact.png)

When you're ready to deploy to a downstream system, you should fetch and install that build artifact. This way you make
sure that you're running your functional tests.

![Fetch Artifacts](/images/blog/pipeline-patterns/fetch-artifact.png)

##Do as much as possible in parallel

It's not uncommon for teams to practice Continuous Integration on small parts of code before "throwing it over the wall"
to someone else to put that together with other parts of the application. In these cases, it's usually OK to set up a
linear flow. The entire thing might run end to end in a just few minutes.

One of the most common mistakes when graduating from Continuous Integration (CI) to Continuous Delivery is applying the
same linear thinking. When we're automating the progression of all of the code from commit to deployment on a production system, it's very
likely that there will be a much longer running set of jobs to be done.

Take the example in the image below for example. Here we have a team who has decided to implement a manual approval for
user acceptance. We want to make it easy for the team responsible to do a one click deployment to their application, but
they may not look at it immediately. There's really no reason we can't run the automated acceptance tests while that is
going on.

![Parallel Pipelines](/images/blog/pipeline-patterns/parallel-pipelines.png)

Hopefully you noticed one other really important thing about the image above. The production pipelines have _not_ run. If
you're doing things in parallel it's incredible important that your Continuous Delivery system is smart about handling
dependencies. This is a screenshot from Go CD, which uses fan in/fan out dependency management to make sure the project
doesn't get deployed until both of the upstream pipelines have gone green.

##You can run the same kinds of things in parallel too

Any moderately complicated application is likely to have a very large number of of automated tests. Every time someone on the
[Mingle](http://www.thoughtworks.com/mingle/) team at ThoughtWorks commits some code, the application is subjected to well
over 11,000 automated tests. If the team ran those tests back to back, they would take a couple days. Of course you can't
wait a couple days before you know the state of your software.

Too often this leads to teams only running part of their tests.

What you should do is split those tests up into manageable size chunks and run them in parallel. In the case of the Mingle
team those tests run on 65 Go CD agents at the same time.

![Jobs Screenshot](/images/blog/pipeline-patterns/testing-jobs.png)

Of course it's also vitally important that you're able to quickly determine what went wrong if something fails, so you
should make sure the tests results from all of the jobs can be viewed in one consolidated place.

![Failures Screenshot](/images/blog/pipeline-patterns/testing-failures.png)






