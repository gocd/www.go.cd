---
date: 2014-04-14 08:00:00 -0700
layout: post
title: Agent-bootstrapper upgrade to enable task plugins
status: public
type: post
published: true
author: Sachin Sudheendra
---

As part of Go 14.1, we officially announced Task plugins. Because tasks inherently are executed on an agent, we had to make few changes in the *agent-bootstrapper* component to allow this. Unlike the *agent* component which upgrades automatically to remain compatible with the *server* version, the agent-bootstrapper has to be manually upgraded.

Although we keep the agent-bootstrapper lean and flexible, which rarely requires changes to it, this was one situation where we had to make a change in it. As a result, Go Administrators will need to [upgrade](http://go.cd/download) their agent installations (by using the go-agent installers appropriate to their go-server installation) before they can use the task-plugins in Go.

**Note:** Although *agent-bootstrapper* versions **>= 12.3** is capable of handling this feature, we recommend upgrading your go-server and go-agents to the latest release.
