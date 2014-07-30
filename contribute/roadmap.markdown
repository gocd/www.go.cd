---
layout: default
title: Roadmap
date:   2014-01-07
---

```
Last Updated: 30-Jul-2014
```

The following are proposed features for Go. While this doesn't mean we will not pick up things that are not in the list, this is what we would like to focus most of our energy on.

### Features

#### API-first design
We want to make the Go Server UI interact with the backend through APIs, even more than it does now. The design of APIs would be such that the same could be used by any 3rd party to interact with Go Server. This would basically mean Go Server can run in head less mode allowing developers to write their own UI. The order in which we would like to go about doing this:

* API for pipeline dashboard - [373](https://github.com/gocd/gocd/pull/373) ongoing
* API for pipeline status - [225](https://github.com/gocd/gocd/issues/225)
* API for pipeline history, stage history, job history, agent job run history - [394](https://github.com/gocd/gocd/issues/394) ongoing
* API for configuration - material list, configuration repository commit list, configuraiton repository diff b/w commits - [395](https://github.com/gocd/gocd/issues/395) ongoing
* API for agents - add resource, environments [264](https://github.com/gocd/gocd/issues/264)
* API for pipeline creation - CRUD for group, pipeline / template, stage, job, task (along with env. var & parameters), material config
* API for environment dashboard
* API for search of pipeline based on parameters (checkin - SHA, message, author / pipeline - counter, label)
* API for compare pipeline

#### Better support for Tests
The biggest time consumer in any CI/CD setup is running tests. It has become fundamental practice to write tests and every new framework supports writing & running tests first. Which means there are more tests to run & make sense of the results. We want to provide features to ease the pain.

* Parallelization - spawn 'x' instances of job [396](https://github.com/gocd/gocd/issues/396), out of box support for TLB? custom runner for each type (junit, rspec etc.) which contacts Go server asking for next test to run? 
* Real time reports - how many ran, how many failed & which ones failed - while the job is running
* Parse test reports - provide pluggability for all kinds of test reports/migrators for other test report formats. Currently only XUnit format is supported. Something on [these](https://github.com/srinivasupadhya/xunit-converter-task) lines?
* Test metrics - make sense of test failures, possibly list flaky tests. Run tests in failed first order etc.

#### Dashboard Revamp/Rewrite
People spend most of their time on Go on dashboard page. With the number of pipelines & users increasing, the dashboard page needs to be optimized for performance, while giving as much info as possible in the best possible way for its consumption.

* Rewrite dashboard to hit API instead of getting the whole markup.
* Move some logic to client side to reduce load on server. more intelligent updates rather than full update?
* UX improvements

#### Agent Management
In a CI/CD setup agent management is the hardest part. Remembering what is installed on what agent, knowing when an agent goes down, accessing agent machine to do some changes are a few things that would like to give first class support for.

* Notification of status when a new agent is available (pending) or goes missing
* Capabilities / Resource (add, edit, remove) - detect software available on agent along with versions & auto update resources of agent
* Key management - manage ssh keys
* Console - to make changes on agent without having to ssh to the agent

### Plugins
Go currently supports 2 extension points. Package Repository Poller & Task. We want to support more extension points the order of which is being dicussed.

### Performance

#### Agent improvements
Improve Agent Server communication to reduce the problem of too many agents pinging the server at same time during start up & too many requests (1 ping + 1 work request = 2 requests / sec / agent) from agents.

* Thundering herd - implement exponential backoff while registering so that Server is not swamped with requests.
* Websocket - move from polling to server push model

### Tech Debt

#### Old version of JRuby and Rails in codebase - [#130](https://github.com/gocd/gocd/issues/130) ongoing
Go uses a 2.3.x release of Rails, which recently got deprecated. It causes Go to not be able to take advantage of new improvements in Rails. Causes people to have to use antiquated Rails contsructs rather than the new ones. We haven't been able to upgrade till now since rails 3 is not backward compatible & it's a daunting task to migrate all views at once - because of API changes in Rails, dependency on JRuby, RSpec and other gems. It feels like one upgrade was missed a few years ago and then it was too late.

Tasks:
Will need to first upgrade JRuby and Jetty to the newer revisions, since newer Rails releases do not support the old JRuby revision that is used (corresponds to Ruby 1.8.6). Then, need to do a pretty big upgrade to all Rails code in the codebase. Need to bring in Bundler into the codebase for gem management.
Biggest hurdles will be:

Default ERB syntax has changed, so most ERB files will not work out of the box, but will silently fail when viewed (will show ERB code on the rendered page).
RSpec needs to be upgraded, since the old gem will not work with the new JRuby/Rails combination. Most tests will fail.
