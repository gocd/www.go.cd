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

<table>
<thead><tr>
<th align="left">Name</th>
<th align="center"></th>
<th align="center"></th>
<th align="center">Author</th>
<th align="center">Bundled</th>
</tr></thead>
<tbody>
<tr>
<td align="left">Yum repository poller</td>
<td align="center">-</td>
<td align="center"><a href="https://github.com/gocd/go-plugins/tree/master/yum-plugin">Code</a></td>
<td align="center"><a href="http://www.thoughtworks.com/products/">ThoughtWorks Inc.</a></td>
<td align="center">Yes</td>
</tr>
<tr>
<td align="left">Debian repository poller</td>
<td align="center"><a href="https://github.com/srinivasupadhya/deb-repo-poller/releases">Download</a></td>
<td align="center"><a href="https://github.com/srinivasupadhya/deb-repo-poller">Code</a></td>
<td align="center"><a href="https://github.com/srinivasupadhya">Srinivas Upadhya</a></td>
<td align="center">No</td>
</tr>
<tr>
<td align="left">Nuget repository poller</td>
<td align="center"><a href="https://github.com/ThoughtWorksInc/go-nuget-poller-plugin/releases">Download</a></td>
<td align="center"><a href="https://github.com/ThoughtWorksInc/go-nuget-poller-plugin/">Code</a></td>
<td align="center"><a href="http://www.sriramnarayan.com/">Sriram Narayan</a></td>
<td align="center">No</td>
</tr>
<tr>
<td align="left">Maven (Nexus) repository poller</td>
<td align="center"><a href="https://github.com/ThoughtWorksInc/go-maven-poller/releases">Download</a></td>
<td align="center"><a href="https://github.com/ThoughtWorksInc/go-maven-poller">Code</a></td>
<td align="center"><a href="http://www.sriramnarayan.com/">Sriram Narayan</a></td>
<td align="center">No</td>
</tr>
<tr>
<td align="left">Maven (Artifactory Pro) repository poller</td>
<td align="center"><a href="https://github.com/ThoughtWorksInc/go-artifactory-poller/releases">Download</a></td>
<td align="center"><a href="https://github.com/ThoughtWorksInc/go-artifactory-poller">Code</a></td>
<td align="center"><a href="http://www.sriramnarayan.com/">Sriram Narayan</a></td>
<td align="center">No</td>
</tr>
<tr>
<td align="left">Puppet Forge repository poller</td>
<td align="center"><a href="https://github.com/drrb/go-puppet-forge-poller/releases">Download</a></td>
<td align="center"><a href="https://github.com/drrb/go-puppet-forge-poller">Code</a></td>
<td align="center">-</td>
<td align="center">No</td>
</tr>
<tr>
<td align="left">NPM repository poller</td>
<td align="center"><a href="https://github.com/varchev/go-npm-poller/releases">Download</a></td>
<td align="center"><a href="https://github.com/varchev/go-npm-poller">Code</a></td>
<td align="center"><a href="https://github.com/varchev">Deyan Varchev</a></td>
<td align="center">No</td>
</tr>
</tbody>
</table>

#### Task plugin

<table>
<thead><tr>
<th align="left">Name</th>
<th align="center"></th>
<th align="center"></th>
<th align="center">Author</th>
<th align="center">Bundled</th>
</tr></thead>
<tbody><tr>
<td align="left">XUnit Converter</td>
<td align="center"><a href="https://github.com/srinivasupadhya/xunit-converter-task/releases">Download</a></td>
<td align="center"><a href="https://github.com/srinivasupadhya/xunit-converter-task">Code</a></td>
<td align="center"><a href="https://github.com/srinivasupadhya">Srinivas Upadhya</a></td>
<td align="center">No</td>
</tr></tbody>
</table>
