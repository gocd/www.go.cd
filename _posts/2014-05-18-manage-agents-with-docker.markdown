---
layout: post
title: Using Go CD and Docker to manage your Go CD agents
status: public
type: post
published: true
author: Ken Mugrage
---

I'm convinced that the ability to automatically create and destroy build agents is key to having a flexible continuous delivery
setup. I'm equally convinced that this particular use case is better satisfied using very fast container technologies instead of
virtual machines. This is blog entry talks about using Docker for this challenge.

__IMPORTANT__ It should be noted that this blog entry and code is the result of a spike. This definitely isn't production ready,
but could be useful if you're thinking about doing the same sort of thing. This will only work on Linux
machines, because Docker only works on Linux machines.

If anyone with more current programmer skills wants to fork and make it more production like, I'd be very happy to assist in any way
I can.

### Setting it up

- Install Docker
- Install Go server
- Install at least one Go agent if you want to use the pipeline - Yup, even though the whole idea here is to create and destroy 
agents automatically, we have to install at least one to run the process. The server needs this to actually run the scripts. 

		Once the Go agent is installed, go to the Agents tab in your Go user interface and assign this agent a resource of "manager" if you intend to use the Go pipeline below.
	
- In order for Go (and anyone else) to run this without having to become root, you'll have to follow the instructions under 
"Giving non-root access" at <a href="http://docs.docker.io/installation/ubuntulinux/">http://docs.docker.io/installation/ubuntulinux/</a>. 
I make absolutely no warranties for the security of following those instructions! Again, the point here (for me) was to spike out 
creating agents on the fly, this is not production code.

### The pieces

All of the scripts I'm using can be found at <a href="https://github.com/kmugrage/go-agent-docker">https://github.com/kmugrage/go-agent-docker</a>.
Please feel free to clone / fork / send pull requests.

- __Dockerfile__

This is the file that defines how the docker image will be created. Normally you would run the docker build
program against this file, but I used a shell script so that I could call it from Go easier later.

- __go-agent-14.1.0-18882.deb__ (no longer included)

Update on 22 June - The Dockerfile has been updated to use wget to download
the Go 14.1 agent debian installer. If you need the RPM version visit 
www.go.cd/download and change the Dockerfile to match your system.

- __go-agent__

You'll need to modify this file to set the IP address of your server. Just to make this more interesting, it needs to be the
IP address that Docker is aware of, so probaly not the one you're used to using. 

You can find this IP address using ifconfig...

	ifconfig | grep -A 1 docker

On my system, that returns...

	docker0   Link encap:Ethernet  HWaddr 56:84:7a:fe:97:99  
			  inet addr:172.17.42.1  Bcast:0.0.0.0  Mask:255.255.0.0

Because that's my address, that's what you'll see in the go-agent file. As much as I might appreciate your help in supplying
agents for me, they won't be able to connect if you don't make this match your Go server. 

- __autoregister.properties__

This file takes advantage of the autoregister feature in Go so that I don't have to manually approve the new agents. You'll 
need to update the key based on the instructions at [http://www.go.cd/documentation/user/current/advanced_usage/agent_auto_register.html](http://www.go.cd/documentation/user/current/advanced_usage/agent_auto_register.html)

- __build\_docker\_image.sh__

Once you've modified the above, you're ready to build your containers. Execute this script at a command prompt.

This step could take quite a while depending on the speed of your internet connection. It has to download the base box, 
add Java and a bunch of other things and then create the image you'll be using.

- __start\_agent\_containers.sh__

This shell script starts docker containers from the image. You can control how many containers get started by editing
the script itself. 

- __stop\_agent\_containers.sh__

This shell script _stops and removes all docker containers_ - __WARNING:__ I do mean all. 
If you run this on your box every single Docker container will be stopped and deleted. Did I mention this will remove
_every single container_ on your machine?

If someone that's better with sed / awk / ? would like to modify to only remove the containers tagged with gocd/go-agent
please feel free!


- __remove\_agents.rb__

This Ruby script removes disables and removes all agents on the Go server tagged with a "docker\_created"
resource. 

- __go\_config\_xml\_excerpt.txt__

Everything above can be run from the command line just fine. Of course I wanted to have a Go pipeline manage all of this. 
This text file shows the pipeline definition for mine. You'll need to change the github URL to point to your own. You're welcome
to use mine from above, but I removed it here just so your pipeline doesn't get executed with my GitHub changes if you don't
want it to.

### Summary

It's my sincere hope that my first attempt to actually use Docker (and Ruby for that matter) will help you get something real
done. Please feel free to comment / ask questions / etc. 




