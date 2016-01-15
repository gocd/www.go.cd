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
    <span class="title">Week of Jan 15, 2016</span>
  </div>

  <div class="updates">
    <div class="update">
      <span class="title">Pipeline config UI rewrite</span>
      <div class="content">
        Tracked as <a href="https://github.com/gocd/gocd/issues/1404">#1404 (re-design)</a>, <a
        href="https://github.com/gocd/gocd/issues/1724">#1724 (materials)</a> and <a
        href="https://github.com/gocd/gocd/issues/1727">#1727 (tasks)</a>, work on the single-page application to reduce
        clickiness and performace of the configuration UI continues.

        Some design work on this page was done. The design vision can be seen <a
        href="https://thoughtworks.box.com/s/vhqd1gvakqepu0ntfjr81gxjhju28idx">here</a>. Currently, the page looks as
        shown below (click to enlarge). It is undergoing some work to add missing functionality (such as check
        connection and looking up on commands) and to improve the UI to look closer to the intended design. Feedback on
        the design is, as always, welcome. <a href="https://github.com/gocd/gocd/issues/1404">#1404</a> is probably the
        right place for it.

        <p>
          <figure>
            <a href="/images/contribute/roadmap/2016_01_15_state_of_config_ui.png">
              <img src="/images/contribute/roadmap/2016_01_15_state_of_config_ui.png" class="small-image"></img>
            </a>
            <figcaption>Fig 1: New config UI page - In progress (click to enlarge)</figcaption>
          </figure>
        </p>

      As a part of this work, there has been a time-limited spike done on moving functional tests from Sahi to
      Webdriver. This work can be seen <a
      href="https://github.com/maheshp/functional-tests/commit/3a7298b1605802953acd81dd10001c50683ec962">here</a> and
      was partly because of Sahi making the functional tests be dependent on an old version of Firefox and general
      issues with making it work well.
      </div>
    </div>

    <div class="update">
      <span class="title">Elastic agents</span>

      <div class="content">
        You can see some commits going on towards this in <a href="https://github.com/gocd/gocd/issues/1082">#1082</a>. Most
        of it is groundwork that needs to be done to enable a new extension point and figuring out where the extension
        points need to be enabled. However, I have been assured that this image below represents a working early
        prototype of <a href="https://github.com/gocd-contrib/docker-elastic-agents">elastic docker agents</a>. I
        suspect we will be able to see it live soon. Exciting!

        <p>
          <figure>
            <a href="/images/contribute/roadmap/2016_01_15_docker-agents-elastic.png">
              <img src="/images/contribute/roadmap/2016_01_15_docker-agents-elastic.png" class="small-image"></img>
            </a>
            <figcaption>Fig 2: Docker elastic agents - In progress (click to enlarge)</figcaption>
          </figure>
        </p>

        Also, there has been some <a href="https://github.com/gocd/gocd/pull/1793">really good work</a> done to
        move the communication between GoCD Server and its Agents to use websockets. The pull request is being
        reviewed. This can completely change the speed of GoCD's communication with its agents and is a stepping stone
        towards having non-java GoCD agents. This change was a pre-requisite for elastic agents to be feasible.
      </div>
    </div>

    <div class="update">
      <span class="title">More releases</span>
      <div class="content">
        <p>
        The roadmap for 2016 mentioned more releases this year: Speaking about this, <span class="attention">the next
        release, 16.1 is expected on Monday, 18th Jan 2016</span>. The idea was to release on 16th Jan (for 16.1), but it's
        a Saturday. As mentioned earlier, this is the start of getting towards more releases and maybe a release every
        build. It will not have any major features complete, but it will have some useful bug fixes, for which you don't
        need to wait months and features which are hidden behind flags.

        <p>
        I'd mentioned a <a href="https://github.com/gocd/gocd/issues/1088">performance pipeline</a> last week and it is
        being used this time. Unfortunately, it is on an internal network box and I cannot provide a link to it yet. We
        will work on getting it out into the wild, wild interwebs so that everyone can see it. It also needs more probes
        and work done around performance checking scenarios. This will continue to be a work in progress for a while.

        <p>
        Installer testing across platforms is continuing. A <a
        href="https://github.com/gocd/installer-testing/pull/1">pull request</a> has been submitted to the repository
        and some feedback needs to be incorporated. Once that is done, it'll be integrated with the GoCD pipelines on
        build.go.cd and other platforms will be included in the tests.
      </div>
    </div>

    <div class="update">
      <span class="title">More content around CD and GoCD</span>
      <div class="content">
        There is some work going on around content. Watch out for a getting started guide to GoCD and a blog post or
        article about moving towards CD and blockers you might encounter.
      </div>
    </div>

    <div class="update">
      <span class="title">Other (subset of changes)</span>

      <div class="content">
        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/issues/1489">#1489</a> - GoCD's config schema should be valid according
        to xmllint.
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/issues/1753">#1753</a> - Deadlock while updating config from filesystem
          and UI concurrently.
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1779">#1779</a> - Check approvers against roles in configuration UI.
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

<h3>Previous weeks:</h3>

<div class="work_update old">
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
  </div>
</div>

<script>
  (function($) {
    $('.work_update.old .updates').hide();
    $(".work_update.old .heading .title").append("<span class='click_to_show'> (click to show)</span>").click(function(evt) {
      var currentWorkUpdate = $(evt.target).parents(".work_update");
      currentWorkUpdate.find(".updates").slideDown();
      currentWorkUpdate.find(".heading .title .click_to_show").hide();
    });
  })(jQuery);
</script>

<link rel="stylesheet" type="text/css" href="/css/roadmap.css">
