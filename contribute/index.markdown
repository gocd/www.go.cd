---
layout: default
title: Contributor's Guide
subtitle: All you need to know about contribution
---

#### <a name="quick-links"></a> Quick Links

* [Go User Documentation](http://www.thoughtworks.com/products/docs/go/current/help/)
* [Go User's Group](https://groups.google.com/forum/#!forum/go-cd)
* [Go Developer's Group](https://groups.google.com/forum/#!forum/go-cd-dev)
* [Issue Tracker](https://github.com/GoCD/GoCD/issues)
* [Main codebase](https://github.com/GoCD/GoCD)
* [Plugins codebase]()
* [Development Environment Setup](https://github.com/GoCD/go-development-environment-setup)
* [Go Design Documentation](https://github.com/GoCD/design-documentation)
* [www.go.cd website code](https://github.com/GoCD/GoCD.github.io)

### <a name="skills-needed"></a> Skills needed

If you are a developer and know any of the following:

- _HTML, CSS, JavaScript_ - you can contribute to front-end. You might need an understanding of Ruby on Rails (RoR) to help you understand and make changes to the views and/or fix ruby-specs (rspec).

- _Ruby, Ruby on Rails_ - you can contribute to front-end or installer creation. The controllers & views have been written in RoR. Installer creation happens through buildr scripts.

- _Java_ - you can contribute to any part of server or agent. Server component involves performing CRUD on database via hibernate / ibatis, write plugins or extend plugin framework (felix), expose useful APIs etc.

You can also contribute by:

- Submitting [issues](#submit-bug) & [feature requests](#submit-feature-request)

- Participating on [user's group]((https://groups.google.com/forum/#!forum/go-cd) & [developer's group](https://groups.google.com/forum/#!forum/go-cd-dev)

- Answering [stackoverflow](http://stackoverflow.com/questions/tagged/thoughtworks-go) questions

- Helping us improve [user docs](http://www.thoughtworks.com/products/docs/go/current/help/), [design docs](https://github.com/GoCD/design-documentation) etc.

### <a name="submit-bug"></a> Submit Bug

#### <a name="is-it-already-filed"></a> Check to see if it's already been filed
We're using [GitHub Issues](https://github.com/GoCD/GoCD/issues) to track bugs and enhancements on this project. Please go there
and check if someone has already reported the same issue or made the same enhancement request. There's a
good chance that if they have, there may be information which will benefit you.

#### Ask the community
If you're not sure the behavior you're seeing is a bug, you can always ask on our [user's group](https://groups.google.com/forum/#!forum/go-cd) or [developer's group](https://groups.google.com/forum/#!forum/go-cd-dev).

#### Be as complete as possible
We understand that you can't be expected to know exactly why something doesn't work, but just
saying "it doesn't work" doesn't help us help you. Adding as much information as possible into
your report is very important.

+ Describe what you were doing when you ran into the issue
+ Describe what you expected to happen
+ Describe what actually happened
+ Let us know exactly which version of Go you're using (it's on the bottom of every page)
  + By the way, if you're using a very old version it's possible the bug has already been fixed.
  + Also by the way, if you're using a very recent build and not a supported release it's possible you're using some feature that's not done.
+ Let us know what operating system your server and agents are installed on
+ Let us know which web browser(s) you were using

#### Some things we may ask for
We don't always need all of these, but if you'd like to attach them when you submit your issue
it definitely couldn't hurt.

+ Screen shots of errors when they show up in the user interface
+ The output of http://[YOUR\_GO\_URL]/go/api/support
+ The configuration and log files listed on the page above.

#### If you REALLY want to help
As we said above, just finding and submitting issues is helpful. If you're so inclined, a pull request or even a patch which addresses the issue is even better!

<!--
## <a name="submit-feature-request"></a> Submit Feature Request

#### [Check to see if it's already been filed](#is-it-already-filed)

#### Be as complete as possible

## <a name="submit-security-issue"></a> Submit Security Issue
-->
### <a name="code-contribution-process"></a> Code Contribution Process ([credits](http://edgeguides.rubyonrails.org/contributing_to_ruby_on_rails.html#contributing-to-the-rails-code))

If you're new to contributing to open source software, please see [this excellent guide] (http://contribute.jquery.org/open-source/) by the jQuery foundation.

#### Sign the CLA (Contributor License Agreement)
If you're planning to contribute any code or content, we will have to ask you to sign our [Contributor License Agreement](/contribute/cla.html) before we can accept your pull request.

#### Fork
Navigate to the [Go GitHub repository](https://github.com/GoCD/GoCD) and press "Fork" in the upper right hand corner.

Add the new remote to your local repository on your local machine:

```
$ git remote add mine git@github.com:<your user name>/GoCD.git
```

Push to your remote:

```
$ git push mine
```

You might have cloned your forked repository on your machine and might want to add the original Go repository as a remote instead, if that's the case here's what you have to do.

In the directory you cloned your fork:

```
$ git remote add go-cd git://github.com/GoCD/GoCD.git
```

Download new commits and branches from the official repository:

```
$ git fetch go-cd
```

Merge the new content:

```
$ git checkout master
$ git rebase go-cd/master
```

Update your fork:

```
$ git push origin master
```

#### [Setup Development Environment](https://github.com/GoCD/go-development-environment-setup)

#### Write Tests & Then Code

Understand the feature by reading [user docs](http://www.thoughtworks.com/products/docs/go/current/help/) & [design docs](https://github.com/GoCD/design-documentation).

Debug the flow to make sure you understand the code fully.

Follow [Test Driven Development](http://en.wikipedia.org/wiki/Test-driven_development) (TDD) while you write code. i.e. if you are:

* fixing a bug write a failing test first which reproduces the scenario and then fix the bug.
* writing a new feature write tests which assert the particular behavior you are expecting in the new feature & then implement it.


#### Code conventions

* [Java](https://source.android.com/source/code-style.html)
* [Rails](http://edgeguides.rubyonrails.org/contributing_to_ruby_on_rails.html#follow-the-coding-conventions)
* [Java Script](http://javascript.crockford.com/code.html)

#### Granularity of change ([credits](http://wiki.eclipse.org/EGit/Contributor_Guide#Granularity_of_Changes))
* Make small commits, as small as reasonable. This makes them easy to review.
* Each commit should have a commit message that explains very clearly what the commit sets out to achieve (unless this is abundantly clear from the code itself, which is basically only the case for trivial patches).
Also, when you fix a bug then report which bug you fix. When there are deeper reasons for doing things the way the commit does, then explain these as well. This all is for the reviewers and yourself: the context of the commit is completely clear.
* Do not mix concerns in commits: have a commit do a single thing. This makes them reviewable 'in isolation'. The purpose of the commit is clear and can be understood easily by the reviewers and yourself.
* Write new tests for any commit: this is very important for bug hunting.
* Split your work into multiple smaller pieces of work (when possible) and implement each of these pieces in a series of commits.
* A series of commits should work towards a 'feature' in a clear way and only 'enable' the feature in the last commit of the series.
* In a series of commits first lay the groundwork and then build on that towards the feature.
* Do not mix concerns in branches: when you encounter a bug while working on something then create a new branch to fix the bug. If your work depends on the bug being fixed then rebase your work on that new branch.

#### Try not to break the build
On Go we follow TDD. Which means most of the code is covered with tests. When you make a change to the code expect tests to fail!

You will need to make sure your code does not break anything, which means running tests that are around your code. We know this does not guarantee all tests will pass but we expect you to have done this before issuing a pull request.

#### Issue Pull Request
Navigate to the Go repository you just pushed to (e.g. https://github.com/your-user-name/GoCD) and click on "Pull Requests" seen in the right panel. On the next page, press "New pull request" in the upper right hand corner.

Click on "Edit", if you need to change the branches being compared (it compares "master" by default) and press "Click to create a pull request for this comparison".

Ensure the changesets you introduced are included. Fill in some details about your potential patch including a meaningful title. When finished, press "Send pull request". The committers will be notified about your submission.

### <a name="review-process"></a> Review Process

#### Get Feedback
Most pull requests will go through a few iterations before they get merged. Different contributors will sometimes have different opinions, and often patches will need to be revised before they can get merged.

Some contributors to Go have email notifications from GitHub turned on, but others do not. Don't despair! Sometimes it's quick, sometimes it's slow. Such is the open source life.

If it's been over a week, and you haven't heard anything, you might want to try and nudge things along. You can use the [developer's group](https://groups.google.com/forum/#!forum/go-cd-dev) mailing list for this. You can also leave another comment on the pull request.

While you're waiting for feedback on your pull request, open up a few other pull requests and give someone else some feedback! I'm sure they'll appreciate it in the same way that you appreciate feedback on your patches.

#### Iterate as necessary
It's entirely possible that the feedback you get will suggest changes. Don't get discouraged: the whole point of contributing to an active open source project is to tap into community knowledge.
If people are encouraging you to tweak your code, then it's worth making the tweaks and resubmitting.

### <a name="after-commit-is-merged"></a> After Commit is merged

#### Build
We build Go using Go! So once your commit is merged relevant pipelines get triggered. You can track them [here](https://build.go.cd/).

#### Spec, Unit test, Integration test failures
After the commit is merged there might be Spec failures (rails) or Unit / Integration test failures (Java), in which case we will notify you about the failures & revert your commit so that you can fix them and issue a fresh pull request.

#### Acceptance test failures
We have significant amount of acceptance tests that test features end-to-end. If there is acceptance failure which is genuine, again, we will notify you about it.
If its a failure because of change of behavior & tests need to be changed then we will take care of doing that.

#### Update User & Design docs if necessary

## Sign-up
<iframe src="https://docs.google.com/forms/d/11j84gdSHX2SFjVyqZsAh_BgyAuNSMjdMWOMWoWSy5dg/viewform?embedded=true" width="760" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
