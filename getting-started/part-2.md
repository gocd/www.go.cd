---
layout: default
title:  Getting Started with <span class="notransform">GoCD</span> - Part 2
title_tag: Getting Started | GoCD
meta_tag_description: New to GoCD? Start here.
meta_tag_keywords: getting started, documentation, gocd, continuous delivery, go
page_name: getting-started page-2
extra_headers: "<link rel='stylesheet' href='/css/getting-started.css'>"
---

In <a href="/getting-started/part-1.html">Part 1</a> of this guide, the concepts of GoCD Server, GoCD Agents,
pipelines, materials, stages, jobs and tasks were introduced. You were also able to get a simple pipeline with a single
stage, job and task each working.

Let us continue, in this part, by learning about pipelines as materials, about artifacts and about custom tabs.

<h2 class="small_margins">Using a pipeline as a material</h2>

Instead of using a source code repository on GitHub as a material, it is possible to use a stage of any pipeline as a
material for another pipeline. This seemingly simple feature provides a lot of power. This allows pipelines to be
chained together, allowing very complex workflows to be modeled well and is a basis for the more advanced features in
GoCD, such as Value Stream Map (VSM) and fan-in/fan-out.

<div class="concept">
  <h3>Concept 5: Pipeline Dependency Material</h3>

  <figure class="concept">
    <img src="/images/getting-started/part-2/image01.png">
    <figcaption></figcaption>
  </figure>

  <p>
    A pipeline dependency material links pipelines together. The pipeline which has the material which points to another
    pipeline is called the "Downstream Pipeline". The actual pipeline which is the dependency material is called the
    "Upstream Pipeline". Even though it is called a "Pipeline Dependency" the real dependency is to a stage in an
    upstream pipeline.
  </p>

  <p>
    As soon as that stage completes successfully, the first stage of each of the configured downstream pipelines triggers.
    If the stage does not complete successfully, its configured downstream pipelines do not trigger.
  </p>

  <p>
    In the image above, as soon as "Stage 2" of "UpstreamPipeline" completes successfully, "DownstreamPipeline1"
    starts. Concurrently, "Stage 3" of "UpstreamPipeline" also starts.
  </p>
</div>

Let's see how we can get a pipeline dependency to work. Clicking on "Admin" and then "Pipelines" takes you to the
"Pipeline Configuration" page which lists all the pipelines in the system. It looks like this:

<figure class="screenshot">
    <img src="/images/getting-started/part-2/image02.png">
    <figcaption>Pipeline Configuration page</figcaption>
  </figure>

<ol start="1">
  <li>Create another pipeline, using the "Create a new pipeline within this group" link.</li>
  <li>Name this new pipeline "MySecondPipeline" and click "Next" to reach step 2, to choose a material.</li>
  <li>Choose "Pipeline" as the Material Type, and you'll be in a screen like the one below.</li>
</ol>

<figure class="screenshot">
    <img src="/images/getting-started/part-2/image03.png">
    <figcaption>Start adding a pipeline dependency material</figcaption>
  </figure>

As soon as you start typing the name of your first pipeline in the "Pipeline [Stage]" textbox, it will autocomplete and give you the name of the first pipeline and the only stage that is in it. Selecting that will link these two pipelines together.

<figure class="screenshot">
    <img src="/images/getting-started/part-2/image04.png">
    <figcaption>Autocompletion of the pipeline dependency material</figcaption>
  </figure>

Click "Next" and choose some task in the "Initial Job and Task" section and click "Finish".

<figure class="screenshot">
    <img src="/images/getting-started/part-2/image05.png">
    <figcaption>Create the downstream pipeline</figcaption>
  </figure>

That's it! You'll now have a pipeline which will run when un-pause. Un-pause it and let it finish. This is how it will look on the Pipelines list (dashboard) when finished.

<figure class="screenshot">
    <img src="/images/getting-started/part-2/image06.png">
    <figcaption>Dependent pipelines on the dashboard</figcaption>
  </figure>

That doesn't look very different. But, this allows for some powerful features such as fan-in, fan-out and the Value
Stream Map (VSM), which we will learn about in Part 3. Click on the label of the "MyFirstPipeline" (the part highlighted
in the image above) for a sneak peek at a small Value Stream Map.

  <p>[TODO: Link to Part 3 above]</p>

<figure class="screenshot">
    <img src="/images/getting-started/part-2/image07.png">
    <figcaption>Dependent pipelines in a Value Stream Map</figcaption>
  </figure>

You now know how to chain pipelines together. Let's now learn about artifacts, which are very useful when used with pipeline dependencies.

<h2 class="small_margins">Publishing, fetching and using artifacts</h2>

A very important aspect of GoCD is the way it handles artifacts.

<div class="concept">
  <h3>Concept 6: Artifact</h3>

  <p>
    An artifact in GoCD is a file or directory which is most often produced during the run of a pipeline. Every job in a
    pipeline can be configured to publish its own set of artifacts and GoCD will ensure that these artifacts are moved from
    the Agent where it is created, to the Server and stored there, so that it can be retrieved at any time.
  </p>

  <p>
    Typically, artifacts are created during a job run, by one of the tasks. Some examples of artifacts are: Test reports,
    coverage reports, installers, documentation, meta information about the build process itself and anything else that
    needs to be stored after a pipeline has finished.
  </p>

  <p>
    These artifacts, published by a job, can be fetched and used by <em>any</em> downstream pipeline or <em>any</em>
    stage after the one that produced the artifact in the same pipeline, using a special task called a "Fetch Artifact"
    task. If you recall from "Concept 4" in part 1, jobs are independent of each other. So, a job in the same stage as
    another job that produced an artifact cannot use that artifact. It needs to be used in a stage after that one.
  </p>
</div>

Let's see how to publish an artifact. In the upstream pipeline, "MyFirstPipeline", let's first declare an artifact. The
build script used throughout this guide creates a file called "my-artifact.html" after it finishes. We can use that as
the artifact for this example.

<p>
  <ol start="1">
    <li>Go to "Admin" -&gt; "Pipelines" and the select the stage, "defaultStage" and then the job, "defaultJob".</li>
    <li>Click on the "Artifacts" tab in the job.</li>
    <li>Enter "my-artifact.html" as the artifact source.</li>
    <li>Leave the "Destination" box empty for now.</li>
  </ol>
</p>

<figure class="screenshot">
  <img src="/images/getting-started/part-2/image08.png">
  <figcaption>Adding an artifact</figcaption>
</figure>

Since we have chosen to leave the "Destination" empty, and that means that the artifact will be accessible at the root,
by its own name. We have also chosen the type as "Build Artifact", to signify that it is not a "Test Artifact". Marking
it as a "Test Artifact" means that GoCD will try and parse the file as a test report and if it can, it will use it in
the test aggregation reporting it does. Typically, you'll want to use "Build Artifact" for installers, binaries,
documentation, etc.

After saving this change, retrigger "MyFirstPipeline" by going to the pipeline dashboard and clicking on the play button
against it. Once it is finished, going to the "Artifacts" tab of the pipeline run shows you the artifact for that
run. Every run of that pipeline, from now on, will have that artifact.

<figure class="screenshot">
  <img src="/images/getting-started/part-2/image09.png">
  <figcaption>The artifacts tab - Every job will have one</figcaption>
</figure>

Clicking on it will show you its contents:

<figure class="screenshot">
  <img src="/images/getting-started/part-2/image10.png">
  <figcaption>The contents of the artifact - It is stored on the GoCD Server</figcaption>
</figure>

<h4>Fetching and using artifacts</h4>

We can now use this artifact in any downstream pipeline, or any subsequent stage of the same pipeline. Let's fetch this
artifact in the pipeline "MySecondPipeline" and display it as a part of the output. To do this, we go to the task
configuration section of the "defaultJob" job inside the "defaultStage" stage of "MySecondPipeline" pipeline, and add a
"Fetch Artifact" task.

<figure class="screenshot">
  <img src="/images/getting-started/part-2/image11.png">
  <figcaption>Adding a "Fetch Artifact" task</figcaption>
</figure>

<figure class="screenshot">
  <img src="/images/getting-started/part-2/image12.png">
  <figcaption>The details can be autocompleted</figcaption>
</figure>

Once you provide all the details and click save, you can move the "Fetch Artifact" task above, so that it is done
first. Then, for this demonstration, let us display the fetched file in a "Custom Command" task.

<figure class="screenshot">
  <img src="/images/getting-started/part-2/image13.png">
  <figcaption>Move the fetch artifact task to the top</figcaption>
</figure>

After it is moved up, you can edit the "Custom Command" task to output the contents of the file (for instance). If you
are running this on Windows, use "type" instead of "cat":

<figure class="screenshot">
  <img src="/images/getting-started/part-2/image14.png">
  <figcaption>Display the contents of the fetched artifact</figcaption>
</figure>

<figure class="screenshot">
  <img src="/images/getting-started/part-2/image15.png">
  <figcaption>This is how the tasks should look like</figcaption>
</figure>

Running "MySecondPipeline" now will show you the contents of the file created in "MyFirstPipeline" and fetched as an
artifact. The importance of fetching an artifact this way is that GoCD will ensure that the correct version of the
artifact will be fetched and provided to the job in "MySecondPipeline".

If more instances of "MyFirstPipeline" ran (because it is fast) while "MySecondPipeline" has run fewer times, GoCD will
ensure that every time "MySecondPipeline" runs, the correct (and compatible) version of the artifact is fetched and
used. When you now check the output of the pipeline, you should see something like this:

<figure class="screenshot">
  <img src="/images/getting-started/part-2/image16.png">
  <figcaption>The output - The artifact is fetched and displayed</figcaption>
</figure>
<br>

<div class="concept">
  <h3>Concept 7: Ancestor artifacts and building artifacts only once</h3>

  <p>
    In GoCD, you can even fetch artifacts from pipelines which are not immediately downstream of the pipeline which produces
    an artifact. It can be fetched from any pipeline which is downstream, however many levels that is. So, with a Value
    Stream Map like this:
  </p>

  <figure class="screenshot">
    <img src="/images/getting-started/part-2/image17.png">
    <figcaption></figcaption>
  </figure>

  <p>
    The pipeline "MyFifthPipeline" can be configured to fetch an artifact from "MyFirstPipeline" like this:
  </p>

  <figure class="screenshot">
    <img src="/images/getting-started/part-2/image18.png">
    <figcaption>Fetching artifacts from ancestor pipelines</figcaption>
  </figure>

  <p>
    GoCD will complete the name of the pipeline and the path through the upstream pipelines for you and you can then use an
    artifact from an ancestor pipeline in a downstream pipeline.
  </p>

  <p>
    The ability to do this is important because of how artifacts are expected to be used in a Continuous Delivery
    pipeline. A core concept of CD is "Only Build Your Binaries Once". This prevents problems such as inconsistencies
    between a binary which went through various levels of testing and a new "duplicate binary" which is released after being
    built on a box which has a slightly different environment. So, the ability to move an artifact between pipelines and
    more importantly, knowing that it is the same binary being used (GoCD ensures that) is important.
  </p>

  <p>
    We can then take the same binary across different kinds of tests, getting more confident about it as it progresses
    through the pipelines, eventually reaching a production-deployment pipeline, knowing that the binary that is getting
    deployed is the same as the one that went through tests.
  </p>
</div>

<h2 class="small_margins">Custom tabs</h2>

The final part of this guide introduces the concept of a custom tab. A question that gets asked all the time is: "Does
GoCD integrate with &lt;application-x&gt; and show its output?". The answer is usually: "Yes, as long as that
application can generate a report or output that needs to be shown". Here is the concept:

<div class="concept">
  <h3>Concept 8: Custom tab</h3>

  <p>
    A custom tab in GoCD is a way of showing an artifact as a user-defined tab at the job level. Any file which is published
    as an artifact by a job can be shown. Usually, these are HTML files, with images. The GoCD Server will serve these files
    from its internal artifact repository.
  </p>
</div>

Let's use the example artifact we had used earlier as a custom tab. To do that, let's go to the configuration of
"MyFirstPipeline" and then to the "Custom Tab" section of the "defaultJob" and create one. It should look like this:

<figure class="screenshot">
  <img src="/images/getting-started/part-2/image19.png">
  <figcaption>Configuring a custom tab</figcaption>
</figure>

That's it! If you now go to the pipeline, and navigate to the job "defaultJob", you'll see a custom tab called
"SomeCustomName". Clicking on it will show you the artifact for that run of the pipeline.

<figure class="screenshot">
  <img src="/images/getting-started/part-2/image20.png">
  <figcaption>A custom tab in action</figcaption>
</figure>

This can be used to integrate with coverage tools, unit test reports and anything else which creates an artifact. 

In this part of the guide, you learnt about pipeline dependencies, artifacts and custom tabs. [TODO: Link to Part 3] In
[Part 3]() of this guide, we dive deeper into the Value Stream Map and into the powerful fan-in and fan-out concepts.

<script>
  jQuery(document).ready(function($) {
    $("p:contains('TODO')").each(function() { this.innerHTML = this.innerHTML.replace(new RegExp("TODO"), '<span style="background-color: red">TODO</span>'); })
  });
</script>
