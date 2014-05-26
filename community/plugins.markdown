---
layout: default
title:  Plugins
subtitle:  "Bundled and community contributed plugins"
---

Go publishes a list of extension points for which plugins can be provided. An extension point defines the interface and the lifecycle that governs the respective plugin.
At present only java based extension points and plugins are supported by Go.
Details about available extension points and their lifecycle can be obtained from <a href="http://www.thoughtworks.com/products/docs/go/current/help/go_plugins_basics.html">plugins documentation</a> along with the <a href="http://www.thoughtworks.com/products/docs/go/current/help/resources/javadoc/index.html">Go plugin API reference</a>.


Below is the listing of bundled as well as other available plugins contributed by the community (that are not bundled with the Go Server as yet). 
Please refer the <a href="http://www.thoughtworks.com/products/docs/go/current/help/plugin_user_guide.html">plugin user guide</a> to know more about plugin installation etc. 

### Available Plugins

#### Package Repository plugin

| Name |  |  | Author | Bundled |
|:---|:---:|:---:|:---:|:---:|
| Yum repository poller | - | [Code](https://github.com/gocd/go-plugins/tree/master/yum-plugin) | [ThoughtWorks Inc.](http://www.thoughtworks.com/products/) | Yes |
| Debian repository poller | [Download](https://github.com/srinivasupadhya/deb-repo-poller/releases) | [Code](https://github.com/srinivasupadhya/deb-repo-poller) | [Srinivas Upadhya](https://github.com/srinivasupadhya) | No |
| Nuget repository poller | [Download](https://github.com/ThoughtWorksInc/go-nuget-poller-plugin/releases) | [Code](https://github.com/ThoughtWorksInc/go-nuget-poller-plugin/) | [Sriram Narayan](http://www.sriramnarayan.com/) | No |
| Maven (Nexus) repository poller | [Download](https://github.com/ThoughtWorksInc/go-maven-poller/releases) | [Code](https://github.com/ThoughtWorksInc/go-maven-poller) | [Sriram Narayan](http://www.sriramnarayan.com/) | No |
| Maven (Artifactory Pro) repository poller | [Download](https://github.com/ThoughtWorksInc/go-artifactory-poller/releases) | [Code](https://github.com/ThoughtWorksInc/go-artifactory-poller) | [Sriram Narayan](http://www.sriramnarayan.com/) | No |
| Puppet Forge repository poller | [Download](https://github.com/drrb/go-puppet-forge-poller/releases) | [Code](https://github.com/drrb/go-puppet-forge-poller) | - | No |
| NPM repository poller | [Download](https://github.com/varchev/go-npm-poller/releases) | [Code](https://github.com/varchev/go-npm-poller) | [Deyan Varchev](https://github.com/varchev) | No |

#### Task plugin

| Name |  |  | Author | Bundled |
|:---|:---:|:---:|:---:|:---:|
| XUnit Converter | [Download](https://github.com/srinivasupadhya/xunit-converter-task/releases) | [Code](https://github.com/srinivasupadhya/xunit-converter-task) | [Srinivas Upadhya](https://github.com/srinivasupadhya) | No |
