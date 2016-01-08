---
layout: default
title:  Roadmap
subtitle:  "GoCD's current roadmap and the work being done towards it"
title_tag: GoCD Roadmap | GoCD
meta_tag_description: GoCD's roadmap and current work being done towards it
meta_tag_keywords: roadmap, product roadmap, gocd, continuous delivery, go
---

The high-level roadmap for 2016 is [detailed in this blog post](https://www.go.cd/2015/12/22/gocd-in-2016.html). Any
changes will lead to an update there.

#### Current work

Since GoCD uses GitHub issues to manage issues and pull requests, there will be an attempt to mark all issues against a
relevant milestone, with upcoming milestones named as "Release xy.z", where "xy" is the current year and "z" is the
release number. The page which shows these milestones can be found [here on
GitHub](https://github.com/gocd/gocd/milestones?direction=desc&sort=completeness&state=open), and you can drill down to
the issues under those milestones there.

Since that is not always easy for everyone to follow (without context), I'll make an attempt to distill the work being
done, at the level of a week and will attempt to keep it as updated and approachable as possible:

<div class="work_update">
  <div class="heading">
    <span class="title">Week of Jan 8, 2016</span>
  </div>

  <div class="updates">
    <div class="update">
      <span class="title">Pipeline config UI rewrite</span>
      <div class="content">
        A part of the work carried over from 2015 is the UI for the new pipeline config page. This is going to be a
        <a href="https://github.com/gocd/gocd/issues/1404">single-page application</a>, which should make pipeline
        configuration less clicky.

        The parts of it that are being worked on currently are <a href="https://github.com/gocd/gocd/issues/1493">this
        task</a> and <a href="https://github.com/gocd/gocd/issues/1724">this task</a>. The pull requests for these are
        going through some feedback and changes.

        I'll share a view of how this page looks, and how it is supposed to look when done, next week.
      </div>
    </div>

    <div class="update">
      <span class="title">More releases</span>
      <div class="content">
        The roadmap for 2016 mentioned more releases this year: Towards that end, one part of the approach is to
        add <a href="https://github.com/gocd/gocd/issues/1088">a good performance pipeline</a> to GoCD and that work
        continues. Proper installer testing for
        new installs and upgrades across all the operating systems supported by GoCD was another issue pending to make this
        happen and that is being tracked <a href="https://github.com/gocd/gocd/issues/1388">here</a>.
      </div>
    </div>

    <div class="update">
      <span class="title">Elastic agents</span>
      <div class="content">
        Some analysis is in progress. <a href="https://github.com/gocd/gocd/issues/1082">This</a>
        has tasks and open questions added to its description and discussions are going on about approaches to get this
        working. One of the key parts of this is to get agent server communication working over websockets rather than
        polling over a long-lived HTTPS connection. This work is being
        done <a href="https://github.com/gocd/gocd/issues/1098#issuecomment-168870491">here</a>.
      </div>
    </div>

    <div class="update">
      <span class="title">Other (subset of changes)</span>

      <div class="content">
        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1749">#1749</a> - Validate number of on-cancel tasks.
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1759">#1759</a> - Fix an XSD validation issue related
          to <a href="https://github.com/gocd/gocd/issues/1489">#1489</a>.
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1751">#1751</a>
          and <a href="https://github.com/gocd/gocd/pull/1756">#1756</a> - Fixes for
          supporting <a href="https://github.com/gocd/gocd/issues/1086">JDK 8</a>.
        </div>

        <div class="issue state_open">
          <a href="https://github.com/gocd/gocd/issues/1762">#1762</a> - Issue related to authorizing an operate user
          for stage approval.
        </div>

        <div class="issue state_open">
          <a href="https://github.com/gocd/gocd/issues/1753">#1753</a> - Pipeline API update issue when updating
          pipelines from API and UI simultaneously.
        </div>
      </div>
    </div>

    <div class="note">
      <span class="note_title">Note</span>: If you're doing some work outside of the gocd GitHub organization and would
      like it to be mentioned here (maybe you'll get some help!), please let me know, by sending a mail to
      <a href="mailto:arvind@thoughtworks.com">me</a> or finding me (username: arvindsv) on
      <a href="https://gitter.im/gocd/gocd">the Gitter developer channel</a> or on the
      <a href="https://groups.google.com/forum/#!forum/go-cd">mailing list</a>.
    </div>

  </div>
</div>

<link rel="stylesheet" type="text/css" href="/css/roadmap.css">