---
layout: default
title: Go Features - Fail fast to learn fast
---

<div class="full-width">
	<div class="container-12 features" >
		<div class="grid-5">
			<!-- Inline style here because I didn't want to touch the css files - KLM -->
			<h3 class="features__title" style="margin-top:0px">Build Pipelines</h3>
			<p>A pipeline allows you to break down a complex build into a sequence of simple stages for fast feedback, exhaustive validation and continuous delivery. Go is designed from the ground up to use pipelines as a first class concept</p>
			<a href="http://www.thoughtworks.com/products/docs/go/current/help/concepts_in_go.html" target="_blank">More information</a>
		</div>
		<div class="grid-4">
			<img src="/images/pipeline_graphic.png">
		</div>
	</div>
</div>

<div class="full-width">
	<div class="container-12 features" >
		<div class="grid-5">
			<h3 class="features__title"  style="margin-top:0px">Value Stream Map</h3>
			<p>Go's Value Stream Map helps you visualize your CI/CD workflow. With a single click, it allows you to trace a commit from when it is checked in up to when it is deployed.</p>
			<a href="http://www.thoughtworks.com/products/docs/go/current/help/value_stream_map.html" target="_blank">More information</a>
		</div>
		<div class="grid-4">
			<img src="/images/whole_map.png">
		</div>
	</div>
</div>

<div class="full-width">
	<div class="container-12 features" >
		<div class="grid-5">
			<h3 class="features__title"  style="margin-top:0px">Fan-in Dependency Management</h3>
			<p>Fan-in material resolution will ensure that a pipeline triggers only when all its upstream pipelines have triggered off the same version of an ancestor pipeline or material. This will be the case when you have multiple components building in separate pipelines which all have the same ancestor and you want downstream pipelines to all use the same version of the artifact from the ancestor pipeline.</p>
			<a href="http://www.thoughtworks.com/products/docs/go/13.4/help/fan_in.html" target="_blank">More information</a>
		</div>
		<div class="grid-4">
			<img src="/images/fanin_graphic.png">
		</div>
	</div>
</div>
