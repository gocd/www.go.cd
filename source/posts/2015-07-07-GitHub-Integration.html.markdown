---
layout: post
title: Integrating GoCD with GitHub
status: public
type: post
published: true
author: Go Team
---

With the upcoming 15.2 release we're announcing some new API endpoints that will make integrating with GoCD with GitHub easier and fun.

In this blog we will show you how you can integrate GoCD with GitHub using a few plugins for profit and fun.

# Login using the [GitHub OAuth Plugin](https://github.com/srinivasupadhya/gocd-oauth-login)

This plugin allows you to login, search and add existing github users to GoCD.

<figure class='extra_small_image'>
  <img src="/assets/images/blog/authentication-plugins/login-page.png" class="has_border"
    alt="GoCD - Login Page" id="mature_ci_cd_setup" title="GoCD - Login Page" />
  <figcaption>Login Page with GitHub icon</figcaption>
</figure>

<figure class='extra_small_image'>
  <img src="/assets/images/blog/authentication-plugins/search-user.png" class="has_border"
    alt="GoCD - Search User" id="mature_ci_cd_setup" title="GoCD - Search User" />
  <figcaption>Search and Add User</figcaption>
</figure>

---

# Build pull requests with [GitHub Pull Request Poller](https://github.com/ashwanthkumar/gocd-build-github-pull-requests) & [GitHub Status Notifier](https://github.com/srinivasupadhya/gocd-build-status-notifier)

The combination of these plugins will help you configure GoCD such that any pull-requests that are submitted will automatically be built, and their statuses updated on the pull request on GitHub.

<figure class="extra_small_image">
  <img src="/assets/images/blog/feature-branch/update-status-1.png" class="has_border full_size"
    alt="GitHub PR page gets updated" id="github_pr_update" title="GitHub PR page gets updated" />
  <figcaption>GitHub PR page gets updated</figcaption>
</figure>

<figure class="extra_small_image">
  <img src="/assets/images/blog/feature-branch/update-status-2.png" class="has_border full_size"
    alt="GitHub PR listing page gets updated" id="github_pr_update" title="GitHub PR listing page gets updated" />
  <figcaption>GitHub PR listing page gets updated</figcaption>
</figure>

---

# GitHub Issues Integration with [Custom Project Management Setup](http://www.go.cd/documentation/user/current/integration/go_integration.html#integration-with-bug-tracking-and-story-management-tools)

Any commit messages that contain references to issues or pull requests using the popular means to mention issue (#42) can is something that Go already understands.

To configure this, edit the pipeline material and setup a pattern and a link under "Project Management" tab.

<figure class="extra_small_image">
  <img src="/assets/images/blog/github-integration/github-issues-integration.png" class="has_border full_size"
    alt="GoCD - GitHub Issue Tracker Integration" id="mature_ci_cd_setup" title="GoCD - Login Page" />
  <figcaption>GitHub Issue Tracker Integration</figcaption>
</figure>

Any commit messages with issue numbers will be linked to the correct GitHub issues:

<figure class="extra_small_image">
  <img src="/assets/images/blog/github-integration/github-issue-link-in-build-cause.png" class="has_border full_size"
    alt="GoCD - Comment with GitHub issue link" id="mature_ci_cd_setup" title="GoCD - Login Page" />
  <figcaption>Comment with GitHub issue link (build cause pop-up)</figcaption>
</figure>

You can also compare pipelines and get the release notes or changelog straight out of Go.

<figure class="extra_small_image">
  <img src="/assets/images/blog/github-integration/github-issue-link-in-compare-pipeline.png" class="has_border full_size"
    alt="GoCD - Comment with GitHub issue link" id="mature_ci_cd_setup" title="GoCD - Login Page" />
  <figcaption>Comment with GitHub issue link (compare pipeline page)</figcaption>
</figure>

---

If you think Go CD can provide more integrations to GitHub or provide similar integrations with other tools/services please do leave a comment or ask on the [mailing list](https://groups.google.com/forum/#!forum/go-cd).

---

<script>
$(function(){
  $('figure').on('click', function(){
    var figure = $(this);
    figure.toggleClass('extra_small_image');
    figure.toggleClass('small_image');
  });

  $('figure figcaption').append(' (Click on image to enlarge)');
});
</script>
