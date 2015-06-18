---
layout: post
title: Authentication end-point
status: public
type: post
published: true
author: Go Team
---

Starting 15.2.0 Go Server will expose authentication end-point. What this means is Go users can add "custom" authentication schemes through plugins. With [plugin settings](http://www.go.cd/documentation/developer/writing_go_plugins/plugin_settings/plugin_settings_overview.html) & [web request handling ability](http://www.go.cd/documentation/developer/writing_go_plugins/handling_web_requests.html) plugin developers get enough flexibility to write any authentication plugin they intend to write.

Examples of integrations possible:

* OAuth Login - [GitHub](https://github.com/srinivasupadhya/gocd-oauth-login), [Google](https://github.com/srinivasupadhya/gocd-oauth-login), Hotmail, Yahoo! etc.
* Single Sign-on (SSO) - LDAP, Okta etc.
* 2-factor authentication - SMS verification etc.
* Custom `username` & `password` authentication

### How does it work?

Below is an explanation of how [GitHub OAuth Login plugin](https://github.com/srinivasupadhya/gocd-oauth-login) works.

* Generate OAuth token on GitHub.

<figure>
  <img src="/images/blog/authentication-plugins/generate-oauth-token.png" class="has_border full_size"
    alt="Figure 1: GitHub - Generate Oauth Token" id="mature_ci_cd_setup" title="GoCD - Generate Oauth Token" />
  <figcaption>Figure 1: Generate oauth token <span class="click_to_enlarge">(Click to enlarge)</span></figcaption>
</figure>

* On plugin listing page users will see a gear icon (similar to one on the pipeline dashboard).

<figure>
  <img src="/images/blog/authentication-plugins/list-plugin.png" class="has_border full_size"
    alt="Figure 1: GoCD - Plugin Listing" id="mature_ci_cd_setup" title="GoCD - Plugin Listing" />
  <figcaption>Figure 1: Plugin listing with gear icon <span class="click_to_enlarge">(Click to enlarge)</span></figcaption>
</figure>

* Clicking on the gear icon opens a pop-up that renders "Plugin Settings".

<figure>
  <img src="/images/blog/authentication-plugins/configure-plugin.png" class="has_border full_size"
    alt="Figure 2: GoCD - Configure Plugin" id="mature_ci_cd_setup" title="GoCD - Configure Plugin" />
  <figcaption>Figure 2: Configure plugin pop-up <span class="click_to_enlarge">(Click to enlarge)</span></figcaption>
</figure>

* Login Page

<figure>
  <img src="/images/blog/authentication-plugins/login-page.png" class="has_border full_size"
    alt="Figure 2: GoCD - Login Page" id="mature_ci_cd_setup" title="GoCD - Login Page" />
  <figcaption>Figure 3: Login Page with GitHub icon <span class="click_to_enlarge">(Click to enlarge)</span></figcaption>
</figure>

* Click on GitHub icon

<figure>
  <img src="/images/blog/authentication-plugins/github-login.png" class="has_border full_size"
    alt="Figure 2: GoCD - Authorize Go Server on GitHub" id="mature_ci_cd_setup" title="GoCD - Authorize Go Server on GitHub" />
  <figcaption>Figure 3: Authorize Go Server to access GitHub <span class="click_to_enlarge">(Click to enlarge)</span></figcaption>
</figure>

* Successful login

<figure>
  <img src="/images/blog/authentication-plugins/successful-login.png" class="has_border full_size"
    alt="Figure 2: GoCD - On Successful Login" id="mature_ci_cd_setup" title="GoCD - On Successful Login" />
  <figcaption>Figure 3: On successful login <span class="click_to_enlarge">(Click to enlarge)</span></figcaption>
</figure>

* Ability to Search & Add users

<figure>
  <img src="/images/blog/authentication-plugins/search-user.png" class="has_border full_size"
    alt="Figure 2: GoCD - Search User" id="mature_ci_cd_setup" title="GoCD - Search User" />
  <figcaption>Figure 3: Search User <span class="click_to_enlarge">(Click to enlarge)</span></figcaption>
</figure>

We hope plugin developers are able to use this feature to support their organizations authentication mechanism.

#### References:

* [Developer Docs](http://www.go.cd/documentation/developer/writing_go_plugins/authentication/authentication_plugin_overview.html)
* [GitHub Issue](https://github.com/gocd/gocd/issues/851)
* [Sample Plugins](http://www.go.cd/community/plugins.html#authentication-plugins)

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