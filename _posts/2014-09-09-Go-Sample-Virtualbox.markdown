---
layout: post
title: Sample Go CD Virtualbox based environment
status: public
type: post
published: true
author: Ken Mugrage
---

If you're interested in checking out Go but don't want to spend the time automating your
own system, this might be a great option for you.

We've created an environment using Vagrant and Virtualbox. Once it's up, you'll have a full
Go installation including several example pipleines. 

### System Requirements

__In order to run this you'll need [Virtualbox](https://www.virtualbox.org/) 
and [Vagrant](https://www.vagrantup.com/).__ Both of these are available for most operating 
systems.

### Using the box
To get started, open a command prompt in an empty directory and type...

<blockquote>
vagrant init vagrant init gocd/gocd-demo
</blockquote>

This will create a file called Vagrantfile in your current directory. 

Next, type...

<blockquote>
vagrant up
</blockquote>

Completion of this (especially the first time) will take quite a while, depending on your
bandwidth. Vagrant will be downloading the full box image (almost 1.4GB) from Vagrantcloud 
while you wait.

__Note:__ If you have an existing Go installation on the same machine as this virtual machine
you may get a port conflict. Vagrant will automatically map to a new port which will be 
shown in the startup messages. 

After a few minutes, you should be able to navigate to http://localhost:8153/ on your local
machine and see the following...

![](/images/blog/sample-virtualbox/pipelines.png)

These pipelines are all related, as shown in the following value stream map screenshot...

![](/images/blog/sample-virtualbox/vsm.png)

Feel free to play around with the installation and see how everything works. You can always
reset the box to it's orginal state if you need to!

### What's on the machine?

The box will be updated as new things come out, but as of this writing...

* Go 14.2 Server
* Go 14.2 Agent
* 3 very small PHP applications
* Basic Capistrano deployment scripts
* Local Git repo using Gitolite to manage permissions
* A couple simple phpunit tests
* A couple simple watir scripts

All of the code is on the Virtualbox machine at /home/vagrant/projects. The easiest way
to access this is to type 'vagrant ssh' at the command prompt in the same place you 
started the machine.

The hope is that using this box you can see how real applications (even if they are small)
are built, tested and deployed with Go. 

As always, Go questions can be asked at [https://groups.google.com/forum/#!forum/go-cd](https://groups.google.com/forum/#!forum/go-cd)




