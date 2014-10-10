---
layout: post
title: Distributed Test Execution with Go + TLB
status: public
type: post
published: true
author: Go Team
---

## Problem

Writing tests has become the norm. Consequently, running tests for every commit is central & most time consuming activity in any CI/CD setup. In a decent sized production quality project you tend to have thousands of tests. That means the cycle time, i.e. the time it takes for a commit to reach deployable state (after running all unit, integration & functional tests), keeps growing.

It gets worse if teams follow agile practices like "small commits, frequent commits" since it causes parallel builds & resource starvation.

One such example is Go's codebase. Just the "Common" & "Server" components of Go which comprises of unit & integration tests, together has ~6000 tests which will take about ~5hrs if run serially! The function test sweet is about 260+ tests with combined runtime of ~15 hrs. Thats close to a day & we haven't even run everything for a single commit!

Note that the number of tests is soo huge just putting in a powerful box & running test in parellel will not bring it down to acceptable limits.

## Solution [Go + TLB]

Go is trying to improve cycle-time by making test execution faster, distributing it across many agents (machines). After this "Common" + "Server" takes 20 minutes. All functional tests run in 45 minutes. Thats close to an hour! :)

### TLB

TLB is a library which provides the ablility to run part of tests. It garantees 'Mutual Exclusion' & 'Collective Exhaustion' properties that are essential to reliably running tests in distributed fashion.

Note: As of this writing, TLB integrates with JUnit (through Ant, Maven & Buildr), RSpec (through Rake), Cucumber (through Rake), Twist (through Ant & Buildr).

#### Quick Setup

[Download](https://code.google.com/p/tlb/downloads/detail?name=tlb-complete-0.3.2.tar.gz&can=2&q=) TLB

Unzip `tlb-complete-0.3.2.tar.gz` to `tlb-complete-0.3.2`

```
$ cd tlb-complete-0.3.2/server
$ chmod +x server.sh
$ ./server.sh start
```

This should start server at `http://host-ip-address:7019`

*Resources:*

* [Getting Started](http://test-load-balancer.github.io/doc-0_3_2/getting_started_with_tlb.html)
* [Concepts](http://test-load-balancer.github.io/doc-0_3_2/concepts.html)
* [Configuration](http://test-load-balancer.github.io/doc-0_3_2/configuration.html)

### Go

While TLB is doing all the distribution & execution, Go does what it does best - orchestrate. 

#### 'run-x-instance'

Starting release 14.3 you can spwan 'x' instances of a job. So if you want to distribute your tests across 10 machines you just need to set `run instance count` to 10 & Go will spawn 10 instances of the job when scheduling.

*Sample Configuration*

Setup a pipeline with material (SCM) that contains your tests.

[](/images/blog/run-x-instance/1.png)

Setup TLB related environment variables at Stage / Job level.

[](/images/blog/run-x-instance/2.png)

Setup Job to spawn required number of instances (run instance count).

[](/images/blog/run-x-instance/3.png)

Setup the task to consume `GO_PIPELINE_NAME` & `$GO_STAGE_NAME`, `$GO_PIPELINE_COUNTER` &`$GO_STAGE_COUNTER`, `GO_JOB_RUN_INDEX` & `GO_JOB_RUN_COUNT` environment variables that Go exposes.

[](/images/blog/run-x-instance/4.png)

Upload junit xmls as test artifacts.

```xml
<pipeline name="maven-project">
    <materials>
        <git url="https://github.com/test-load-balancer/sample_projects.git" dest="sample_projects"/>
    </materials>
    <stage name="unit-tests">
        <environmentvariables>
            <variable name="TLB_BASE_URL">
                <value>http://192.168.68.8:7019</value>
            </variable>
            <variable name="TLB_TMP_DIR">
                <value>/tmp</value>
            </variable>
        </environmentvariables>
        <jobs>
            <job name="test-split" runInstanceCount="3">
                <tasks>
                    <exec command="/bin/sh" workingdir="sample_projects/maven_junit">
                        <arg>-c</arg>
                        <arg>TLB_JOB_NAME=$GO_PIPELINE_NAME-$GO_STAGE_NAME TLB_JOB_VERSION=$GO_PIPELINE_COUNTER-$GO_STAGE_COUNTER TLB_PARTITION_NUMBER=$GO_JOB_RUN_INDEX TLB_TOTAL_PARTITIONS=$GO_JOB_RUN_COUNT mvn clean test -DskipTests -Drun.tests.using.tlb=true</arg>
                        <runif status="passed"/>
                    </exec>
                </tasks>
                <artifacts>
                    <test src="sample_projects/maven_junit/target/reports/*.xml" dest="test-reports"/>
                </artifacts>
            </job>
        </jobs>
    </stage>
</pipeline>
```

#### Wait for all jobs to finish

Go's modelling capability gives it the ability to run jobs in parallel but wait for all of them to finish before the next Stage / downstream Pipelines are triggered.

[](/images/blog/run-x-instance/6.png)

#### Stop the downstream flow

If any of the test (and as a result the Job running the test) fails the Stage is considered as failed. This causes the flow to stop as expected.

[](/images/blog/run-x-instance/5.png)

#### Consolidated Test Report

Once all the Jobs are done running Go consolidates test reports & shows the result at stage level for easy consumption.

[](/images/blog/run-x-instance/7.png)

#### Drill down

You can drill down at job level to know more information like 'test count', 'console output' for the Job (test) etc.

[](/images/blog/run-x-instance/8.png)
[](/images/blog/run-x-instance/9.png)
[](/images/blog/run-x-instance/10.png)

#### Partition re-run

Go also provides ability to re-run a Job of a stage. This provides ability to run the partition that could have failed due to flaky test etc.

[](/images/blog/run-x-instance/11.png)

### Power of dynamic splitting

Go's one knob control to amount of parallelization means that when the number of tests increase/decrease all you will need to do is change the `run instance count` based on number of tests & resource availability.

As always, Go questions can be asked at [go-cd](https://groups.google.com/forum/#!forum/go-cd)
