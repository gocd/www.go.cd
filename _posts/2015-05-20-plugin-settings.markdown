---
layout: post
title: Plugin Settings
status: public
type: post
published: true
author: Go Team
---

Go is continously improving its plugin infrastructure. Last year the Plugin API change from JAVA interface based approach to JSON message based one to support multiple versions of same end-point for backward compatibility is working out quiet well.

Starting 15.2.0 Go will support "Plugin Settings" that will allow plugins to accept global settings from Admins. Currently these configurations had to be supported via system properties or a file that is in specified format in a specified location, which makes it a little hapazard. With this feature "all" plugins will have one approach to accept plugins settings from user & access plugin settings from Go Server.

### How does it work?

* On plugin listing page users will see a gear icon (similar to one on the pipeline dashboard) for the plugins that accept plugin settings.

<figure>
  <img src="/images/blog/plugin-settings/list-plugin.png" class="has_border full_size"
    alt="Figure 1: GoCD - Plugin Listing" id="mature_ci_cd_setup" title="GoCD - Plugin Listing" />
  <figcaption>Figure 1: Plugin listing with gear icon <span class="click_to_enlarge">(Click to enlarge)</span></figcaption>
</figure>

* Clicking on the gear icon opens a pop-up that renders "Plugin Settings" template that is provided by the plugin.

<figure>
  <img src="/images/blog/plugin-settings/configure-plugin.png" class="has_border full_size"
    alt="Figure 2: GoCD - Configure Plugin" id="mature_ci_cd_setup" title="GoCD - Configure Plugin" />
  <figcaption>Figure 2: Configure plugin pop-up <span class="click_to_enlarge">(Click to enlarge)</span></figcaption>
</figure>

* On "Save" the user inputs are validated by plugin.

<figure>
  <img src="/images/blog/plugin-settings/configure-plugin-errors.png" class="has_border full_size"
    alt="Figure 2: GoCD - Configure Plugin Errors" id="mature_ci_cd_setup" title="GoCD - Configure Plugin Errors" />
  <figcaption>Figure 3: Configure plugin pop-up with errors <span class="click_to_enlarge">(Click to enlarge)</span></figcaption>
</figure>

We hope plugin developers are able to use this feature to provide a better experience to their users.

#### References:

* [Developer Docs](http://www.go.cd/documentation/developer/writing_go_plugins/plugin_settings/plugin_settings_overview.html)
* [GitHub Issue](https://github.com/gocd/gocd/issues/1121)
* [Sample Plugin - Email Notifier](https://github.com/srinivasupadhya/email-notifier)

<style type="text/css">
figure {
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
}

figcaption {
  color: #575757;
  font-weight: normal;
}

img.full_size {
  width: 82%;
  margin-left: 8%;
  margin-right: 8%;
}

img.has_border {
  border: 1px solid;
}
</style>

<script type="text/javascript">
  $("figure").on('click', 'img', function() {
    $(this).width("100%").css('margin-left', 0).css('margin-right', 0);
    $(this).parent("figure").find("span.click_to_enlarge").hide();
  });
</script>

---

As always, Go questions can be asked on the [mailing list](https://groups.google.com/forum/#!forum/go-cd).