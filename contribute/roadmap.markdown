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
GitHub](https://github.com/gocd/gocd/milestones?direction=asc&sort=due_date&state=open), and you can drill down to
the issues under those milestones there.

Since that is not always easy for everyone to follow (without context), I'll make an attempt to distill the work being
done, at the level of a week and will attempt to keep it as updated and approachable as possible:

<div class="work_update">
  <div class="heading">
    <span class="title">Week of Feb 26, 2016 to Mar 11, 2016</span>
  </div>

  <div class="updates">
    <div class="update">
      <span class="title">Pipeline config UI rewrite</span>
      <div class="content">
        <p>
          Tracked as <a href="https://github.com/gocd/gocd/issues/1404">#1404 (re-design)</a>, <a
          href="https://github.com/gocd/gocd/issues/1724">#1724 (materials)</a>, <a
          href="https://github.com/gocd/gocd/issues/1727">#1727 (tasks)</a> and <a
          href="https://github.com/gocd/gocd/issues/1404#issuecomment-186051049">design vision</a>, work on the
          single-page application to reduce clickiness and performace of the configuration UI continues.
        </p>

        <p>
          Over the last couple of weeks, there has not been too much work done towards this. Take a look at the video
          below to see the current state of it.
        </p>

        <p>
          <figure>
            <video src="https://thoughtworks.box.com/shared/static/1bfkmuwsqwx8qd65m69nfpfsmznnpvju.mov" controls width="100%">
              Your browser does not support the <code>video</code> element. You can download the video from
              <a href="https://thoughtworks.box.com/shared/static/1bfkmuwsqwx8qd65m69nfpfsmznnpvju.mov">here</a>.
            </video>
            <figcaption>Fig 1: Pipeline Config UI - Work in progress</figcaption>
          </figure>
        </p>

        <p>
          The main parts of this that are missing are:
          <ul>
            <li>Support for pipeline dependency (upstream pipeline)</li>
            <li>Better support for server-side error message (this work is in progress currently)</li>
            <li>UI and UX improvements</li>
          </ul>
        </p>
      </div>
    </div>

    <div class="update">
      <span class="title">Elastic agents</span>

      <div class="content">
        <p>
          There hasn't been much work done towards this in the last couple of weeks. There have been some changes made
          in the core codebase to allow more flexible configuration of this endpoint, so that it does not depend on the
          concept of "resources" which already existed in GoCD. This means that, unlike shown in earlier showcases, the
          docker plugin for elastic agents can use a Dockerfile as its configuration, rather than using resources. The
          relevant pull request for this is <a href="https://github.com/gocd/gocd/pull/1874">#1874</a>.
        </p>
      </div>
    </div>

    <div class="update">
      <span class="title">More releases</span>
      <div class="content">
        <p>
          The roadmap for 2016 mentioned more releases this year: There will be a release coming up soon (probably next
          week). The installer tests are <a
          href="https://github.com/gocd/installer-testing/blob/b40431fd44ccd538f919efabb9035544dab06102/Rakefile#L38-L50">now
          being used</a> for upgrade testing on CentOS and Debian based systems, as well as fresh-install testing. Soon,
          we will move on to Windows installer testing.
        </p>
      </div>
    </div>

    <div class="update">
      <span class="title">More content around CD and GoCD</span>
      <div class="content">
        <p>
          The second part of the "Are you ready for CD?" blog post is going to come out soon.
        </p>
      </div>
    </div>

    <div class="update">
      <span class="title">Other notable work (subset of changes)</span>
      <div class="content">
        <p>
          Some recent pull requests:
        </p>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1887">#1887</a>
          - Shallow cloning for git material
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1997">#1997</a>
          - Add UI and API for the new shallow clone option in git materials
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1983">#1983</a>
          - Use "git clone --no-checkout" to reduce size of checkout on server
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/2045">#2045</a>
          - Using unique string for cipher generation
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/2031">#2031</a>
          - Added request headers for ajax requests for pipeline and stage operations on pipeline history page.
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1999">#1999</a>
          - Convert pipeline actions controller end-points to be AJAX only.
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/2022">#2022</a>
          - Turning off websocket based communication (by default) for this release - 16.3
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1991">#1991</a>
          - Clean up KeyPair generation
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1986">#1986</a>
          - Deprecating the old java api based plugin extensions - ie. Task and Package-repo
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1915">#1915</a>
          - Allow pipeline names with periods in them (#1801)
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1978">#1978</a>
          - [OSX] Stop using an internal API for testing if the server is up.
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1874">#1874</a>
          - Allow adding some metadata for jobs that should be run via elastic agent plugins (#1082)
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1811">#1811</a>
          - By @d-led: Let Subversion use the password out of the store
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1906">#1906</a>
          - Add system properties to disable gadget and gadget rendering server (#1908)
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1966">#1966</a>
          - Pipeline Config UI Fixes for jobs #1404
        </div>

        <div class="issue state_open">
          <a href="https://github.com/gocd/gocd/pull/1947">#1947</a>
          - Simply packaging scripts. Use gradle instead of buildr.
        </div>

        <div class="issue state_open">
          <a href="https://github.com/gocd/gocd/pull/1959">#1959</a>
          - Plugin list API - Needed for new config UI
        </div>

        <div class="issue state_open">
          <a href="https://github.com/gocd/gocd/pull/2044">#2044</a>
          - Pluggable SCM listing API (extension to "Plugin list API")
        </div>

        <div class="issue state_open">
          <a href="https://github.com/gocd/gocd/pull/2017">#2017</a>
          - By @mfriedenhagen: Adapt ServerCall to respect the Proxy system properties
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
    <span class="title">Week of Feb 19, 2016</span>
  </div>

  <div class="updates">
    <div class="update">
      <span class="title">Pipeline config UI rewrite</span>
      <div class="content">
        <p>
          Tracked as <a href="https://github.com/gocd/gocd/issues/1404">#1404 (re-design)</a>, <a
          href="https://github.com/gocd/gocd/issues/1724">#1724 (materials)</a>, <a
          href="https://github.com/gocd/gocd/issues/1727">#1727 (tasks)</a> and <a
          href="https://github.com/gocd/gocd/issues/1404#issuecomment-186051049">design vision</a>, work on the
          single-page application to reduce clickiness and performace of the configuration UI continues.
        </p>

        <p>
          Over the last couple of weeks, there has been a <a href="https://github.com/gocd/gocd/pull/1956">lot of work
          (#1956)</a> which has happened towards improving the UI/UX of this page. <b>TODO for Feb 24, 2016</b>: I am going to
          upload an image here to show this.

        <!--
        <p>
          <figure>
            <a href="">
              <img src="" class="small-image"></img>
            </a>
            <figcaption>Fig 1: New config UI page - In progress - Better UI/UX</figcaption>
          </figure>
        </p>
        -->
      </div>
    </div>

    <div class="update">
      <span class="title">Elastic agents</span>

      <div class="content">
        <p>
          There hasn't been much work done towards this in the last couple of weeks. Most of the work has been around
          some bug fixes around the websocket communication work. Some work mentioned under the "Other notable work"
          section below ended up reducing some of this capacity. Need to get back to this soon.
        </p>
      </div>
    </div>

    <div class="update">
      <span class="title">More releases</span>
      <div class="content">
        <p>
          The roadmap for 2016 mentioned more releases this year: On 16th Feb, 2016, GoCD 16.2.1 was released. Because
          there has been an increased reliance on a new (and growing) suite of automated installer tests, there might be some
          hiccups around the installers. This will be ironed out as more installers are tested, and releases are done.
        </p>

        <p>
          The <a href="https://github.com/gocd/installer-testing">installer tests</a> are used for fresh-install testing
          on CentOS and Debian based systems. This is being enhanced to do upgrade testing. Soon, we will move on to
          Windows installer testing. There has been <a href="https://github.com/gocd/gocd/pull/1943">work done
          (#1943)</a> to make Windows installer fully headless.
        </p>
      </div>
    </div>

    <div class="update">
      <span class="title">More content around CD and GoCD</span>
      <div class="content">
        <p>
          To coincide with the 16.2 release, there is now a "Getting Started with GoCD" series of articles on go.cd. It
          can be reached from the <a href="https://www.go.cd/help/">Need Help?</a> page. Take a look, if you haven't.
        </p>
      </div>
    </div>

    <div class="update">
      <span class="title">Other notable work (subset of changes)</span>
      <div class="content">
        <p>
          There is a bit of a backlog of pull requests which needs to be handled (such a nice problem to have!). Some
          interesting pull requests from this week are:
        </p>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1909">#1909</a>
          - Fix system call to kill processes on Java 8. More and more users are using Java 8, and though GoCD doesn't
            yet officially support it, this was a problem that felt like it needed to be fixed soon.
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1937">#1937</a>
          - The previously mentioned PR (#1909) caused an issue, because of a mistake upstream (in javasysmon).
        </div>

        <div class="issue state_open">
          <a href="https://github.com/gocd/gocd/pull/1810">#1810</a> and <a href="https://github.com/gocd/gocd/pull/1825">#1825</a>
          - By <a href="https://github.com/tomzo">@tomzo</a>
          - Being reviewed and is taking some time and effort. These are two of the last few PRs for this long-running
            effort of making configuration external to GoCD.
        </div>

        <div class="issue state_open">
          <a href="https://github.com/gocd/gocd/pull/1947">#1947</a>
          - Simplifying packaging
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1932">#1932</a>
          - Security issues such as the recent Rails vulnerabilities (#1932)
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

<div class="work_update old">
  <div class="heading">
    <span class="title">Week of Jan 29, 2016</span>
  </div>

  <div class="updates">
    <div class="update">
      <span class="title">Pipeline config UI rewrite</span>
      <div class="content">
        <p>
          Tracked as <a href="https://github.com/gocd/gocd/issues/1404">#1404 (re-design)</a>, <a
          href="https://github.com/gocd/gocd/issues/1724">#1724 (materials)</a>, <a
          href="https://github.com/gocd/gocd/issues/1727">#1727 (tasks)</a> and <a
          href="https://thoughtworks.box.com/s/vhqd1gvakqepu0ntfjr81gxjhju28id">design vision (PDF)</a>, work on the
          single-page application to reduce clickiness and performace of the configuration UI continues. In next week's
          update, I'll try and give you all a sense of of how much work is left (what features need more work).
        </p>

        <p>
          This week, there was a lot of discussion (on <a href="https://github.com/gocd/gocd/issues/1596">#1596</a>)
          about the exec task and how it should work. <a
          href="https://github.com/gocd/gocd/pull/1823">Pull request #1823</a>, which was mentioned last week, was
          extended to try and support both multi-line exec-like arguments (which GoCD had as default) and single-line
          arguments (which will be the new default with the new config UI). This should make it easier for new users to
          use, while allowing more advanced users to specify exactly what they want. You can see how it looks below:
        </p>

        <p>
          <figure>
            <a href="/images/contribute/roadmap/2016_01_29_exec_command_single_to_multi.gif">
              <img src="/images/contribute/roadmap/2016_01_29_exec_command_single_to_multi.gif" class="small-image"></img>
            </a>
            <figcaption>Fig 1: New config UI page - In progress - Exec task single-line and multi-line</figcaption>
          </figure>
        </p>

        The UI is not finalized. The link with the text "Multi" and "Single" will probably be replaced by an icon or
        something nicer, soon. :) There might be changes to reduce some of those boxes and generally make it very easy
        to add simple custom commands.
      </div>
    </div>

    <div class="update">
      <span class="title">Elastic agents</span>

      <div class="content">
        <p>
          The <a href="https://github.com/gocd/gocd/pull/1793">websocket communication work</a> by @xli was merged and
          is behind a feature toggle. This is very exciting! This means that communication between GoCD agents and
          server happens using websockets when the feature is on. Also, messages are sent using JSON rather than Java
          RMI. Using websockets rather than the old-way of polling, should make the communication much faster and jobs
          should be picked up with very little to no delay, once the GoCD server assigns a job to an agent. Thanks, @xli!
        </p>

        <p>
          Showcase of docker elastic agents! - Work on <a href="https://github.com/gocd/gocd/issues/1082">
          elastic agent endpoint (#1082)</a> continues. The API of that endpoint is being decided by using it with a
          plugin which spaws a docker container per job. The API will probably change based on feedback. If
          you're really curious, you can see the code of the plugin (work-in-progress) <a
          href="https://github.com/ketan/docker-elastic-agents/">here</a> and the extension point code <a
          href="https://github.com/ketan/gocd/tree/elastic-agent-extension-point">here</a>. Click on the image below to
          download an early-days, work-in-progress, you-have-been-warned kind of showcase video. Enjoy!
        </p>

        <p>
          <figure>
            <video src="https://thoughtworks.box.com/shared/static/oingqgjhlcvugyg8iq53l8pw9a41uizr.mov"
                   controls width="100%" poster="/images/contribute/roadmap/2016_01_29_docker-elastic-agent-showcase.png">
              Your browser does not support the <code>video</code> element. You can download the video from
              <a href="https://thoughtworks.box.com/shared/static/oingqgjhlcvugyg8iq53l8pw9a41uizr.mov">here</a>.
            </video>
            <figcaption>Fig 2: Elastic agents - Docker - Showcase - Work in progress - You have been warned!</figcaption>
          </figure>
        </p>
      </div>
    </div>

    <div class="update">
      <span class="title">More releases</span>
      <div class="content">
        <p>
          The roadmap for 2016 mentioned more releases this year: On 18th Jan, 2016, GoCD 16.1.0 was released. Next
          supported release is scheduled for mid February. Installer testing across platforms is continuing. The <a
          href="https://github.com/gocd/installer-testing/pull/1">pull request</a> mentioned earlier was merged. It's
          still early days though and more work needs to go in to enable all platforms to have installer tests.
        </p>

        <p>
          There is an idea to include everyone in the community to come up with parameters for the new performance
          tests. Currently, the performance tests are more soak tests, and don't really feel like they're simulating
          anything real. The idea is to give everyone in the community a say in defining what they think the setup of
          the functional tests should look like. The focus will be on response times (to begin with) and how it is
          improving or degrading. Watch out for more on this soon!
        </p>
      </div>
    </div>

    <div class="update">
      <span class="title">More content around CD and GoCD</span>
      <div class="content">
        <p>
          There were a couple of blog posts posted last week. One is called <a
          href="https://www.go.cd/2016/01/17/not-done-unless-its-done.html">It’s not Continuous Delivery if you can’t
          deploy right now</a>. It talks about different kinds of pipelines you should be having as a part of your CD
          pipeline, but probably don't. The other is called <a
          href="https://www.go.cd/2016/01/25/are-you-ready-for-continuous-delivery.html">Are you ready for Continuous
          Delivery?</a>. It suggests taking small steps towards CD before blindly choosing a CD tool (even GoCD!) and
          hoping that it will improve effectiveness. Take a look, if you haven't.
        </p>

        <p>
          Upcoming content: Both the blog posts mentioned above are first part of a mini-series. So, there will be more
          parts to them. There is some "Getting Started with GoCD" content which is being worked on too.
        </p>
      </div>
    </div>

    <div class="update">
      <span class="title">Other notable work (subset of changes)</span>
      <div class="content">
        <p>
          There is a bit of a backlog of pull requests which needs to be handled next week (such a nice problem to
          have!). Some interesting pull requests from this week are:
        </p>

        <div class="issue state_open">
          <a href="https://github.com/gocd/gocd/pull/1842">#1842</a>
          - By <a href="https://github.com/xli">@xli</a>
          - Make pipeline errors more visible on the dashboard. This one was overdue.
        </div>

        <div class="issue state_open">
          <a href="https://github.com/gocd/gocd/pull/1825">#1825</a>
          - By <a href="https://github.com/tomzo">@tomzo</a>
          - Config repository extension point! This is getting closer. Need a bit more of a push to review and merge.
        </div>

        <div class="issue state_open">
          <a href="https://github.com/gocd/gocd/pull/1846">#1846</a>
          - By <a href="https://github.com/wpc">@wpc</a>
          - Shallow cloning for git material. Many users will be very happy when this is merged.
        </div>
      </div>
    </div>
  </div>
</div>

<div class="work_update old">
  <div class="heading">
    <span class="title">Week of Jan 22, 2016</span>
  </div>

  <div class="updates">
    <div class="update">
      <span class="title">Pipeline config UI rewrite</span>
      <div class="content">
        <p>
          Tracked as <a href="https://github.com/gocd/gocd/issues/1404">#1404 (re-design)</a>, <a
          href="https://github.com/gocd/gocd/issues/1724">#1724 (materials)</a> and <a
          href="https://github.com/gocd/gocd/issues/1727">#1727 (tasks)</a>, work on the single-page application to reduce
          clickiness and performace of the configuration UI continues.
        </p>

        <p>
          Last week, I mentioned the <a href="https://thoughtworks.box.com/s/vhqd1gvakqepu0ntfjr81gxjhju28idx">design
          vision</a> of this (feedback in <a href="https://github.com/gocd/gocd/issues/1404">#1404</a> please). This
          week, work has gone towards the command repository lookup in this <a
          href="https://github.com/gocd/gocd/pull/1823">pull request</a>. You can see how it looks below:
        </p>

        <p>
          <figure>
            <a href="/images/contribute/roadmap/2016_01_22_command-repo.gif">
              <img src="/images/contribute/roadmap/2016_01_22_command-repo.gif" class="small-image"></img>
            </a>
            <figcaption>Fig 1: New config UI page - In progress - Command repo lookup</figcaption>
          </figure>
        </p>

        Probably the week before this, work was done on the check connection bit of materials. It looks like this:

        <p>
          <figure>
            <a href="/images/contribute/roadmap/2016_01_22_test-connection.gif">
              <img src="/images/contribute/roadmap/2016_01_22_test-connection.gif" class="small-image"></img>
            </a>
            <figcaption>Fig 2: New config UI page - In progress - Test connection to materials</figcaption>
          </figure>
        </p>

        There's work to be done towards making these look like the design vision mentioned earlier. There's also work
        to be done to enable on-cancel tasks and run-if options.
      </div>
    </div>

    <div class="update">
      <span class="title">Elastic agents</span>

      <div class="content">
        <p>
          You can see some commits going on towards this in <a href="https://github.com/gocd/gocd/issues/1082">#1082</a>.
          Groundwork for this, along with an example docker plugin is in progress. Not much to showcase at this point. Maybe soon.
          The <a href="https://github.com/gocd/gocd/pull/1793">websocket communication work</a> by @xli will be merged soon.
        </p>
      </div>
    </div>

    <div class="update">
      <span class="title">More releases</span>
      <div class="content">
        <p>
          The roadmap for 2016 mentioned more releases this year: On 18th Jan, 2016, GoCD 16.1.0 was released. Next
          supported release is scheduled for mid February. Installer testing across platforms is continuing. The <a
          href="https://github.com/gocd/installer-testing/pull/1">pull request</a> mentioned earlier is going to be
          merged soon. Some more changes in process and automation should allow quicker releases!
        </p>
      </div>
    </div>

    <div class="update">
      <span class="title">More content around CD and GoCD</span>
      <div class="content">
        [Same update as last week] There is some work going on around content. Watch out for a getting started guide to
        GoCD and a blog post or article about moving towards CD and blockers you might encounter.
      </div>
    </div>

    <div class="update">
      <span class="title">Other (subset of changes)</span>

      <div class="content">
        <div class="issue state_open">
          <a href="https://github.com/gocd/gocd/pull/1820">#1820</a> - By <a href="https://github.com/wpc">@wpc</a>
          - Output environment variables once per job, instead of per task.
        </div>

        <div class="issue state_open">
          <a href="https://github.com/gocd/gocd/pull/1810">#1810</a> - By <a href="https://github.com/tomzo">@tomzo</a>
          - Config repository - Disable parts of UI for config repo pipelines.
        </div>

        <div class="issue state_open">
          <a href="https://github.com/gocd/gocd/pull/1822">#1822</a> - By <a href="https://github.com/xli">@xli</a>
          - Performace: Remove jruby invokedynamic.
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1808">#1808</a> - By <a href="https://github.com/grahamc">
            @grahamc</a> - Select multiple agents using shift-click.
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1797">#1797</a> - By <a
        href="https://github.com/mrmanc">@mrmanc</a> - Improves the Material API notification error message.
        </div>

        <div class="issue state_closed">
          <a href="https://github.com/gocd/gocd/pull/1812">#1812</a> - Fix issue of flyweight getting cloned repeatedly
          (when branch is null for git material).
        </div>

      </div>
    </div>
  </div>
</div>

<div class="work_update old">
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
  </div>
</div>

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
