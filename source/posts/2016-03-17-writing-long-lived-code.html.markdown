---
layout: post
title: "Writing long-lived Code"
status: public
type: post
published: true
author: David Rice
excerpt: "ThoughtWorks has been building products for 10 years. We’ve learned some hard lessons while trying to keep fairly large codebases malleable year after year."
summary_image: "/assets/images/blog/are-you-ready-for-continuous-delivery/woodline.jpeg"
---

ThoughtWorks has been building products for 10 years. We’ve learned some hard lessons while trying to keep fairly large codebases malleable year after year. There are many great techniques for writing long-lived code. I am going to write about what we learned from our biggest challenges. And my writing these thoughts down isn’t my saying we’ve got it down cold. Like any team, we’re struggling to get better each and every day.

## Upgrade everything, all the time

You should aspire to upgrade your dependencies and frameworks all the time. OK, so maybe this is almost in the realm of the obvious now. But very few people thought this way 10 years ago. And I wonder whether even teams that know this is the right thing to do actually prioritize it. It just needs to be something you do all the time and not be handled via technical debt. There are a number of reasons.

The first is the obvious one. [If it hurts, do it more often](http://martinfowler.com/bliki/FrequencyReducesDifficulty.html). Upgrading can be hard. There’s very often an unpredictable cascade of broken dependencies. The amount of work is mostly unknown. Do it more often and it becomes a non-issue. But there’s more to this than simple pain avoidance.

A primary motivator for upgrading dependencies is fixing security vulnerabilities. One of the biggest differences in building software now versus 10 years ago is the seemingly non-stop flow of vulnerability reports against our libraries, frameworks, and applications. Fixing vulnerabilities will almost always involve upgrading some of your dependencies. The upgrades must to be easy in order to quickly ship vulnerability fixes.

Teams that don’t upgrade regularly typically will label the activity as technical debt. Despite the industry being much more willing to talk about technical debt than 10 years ago, it’s still a very painful conversation to convince a product manager to pay down technical debt. If your team works in an upgrade everything all the time mode, you can avoid any conversation around upgrade technical debt altogether.

## It’s about the unit tests

The primary pain point for working with legacy code is how long it takes to make changes. So if you intend for you code to be long-lived you need to ensure that it will be entirely pleasurable for future developers to make changes. And there’s one thing that dominates all the others for this: an extremely fast and thorough unit test suite.

The cycle for adding new features, including any refactoring, is roughly: write failing test, code, get to green, make it right. If you’re doing it right, you’re executing a lot of unit tests along the way, sometimes a focused set and sometimes the entire suite. If these tests aren’t fast, the development cycle will not be enjoyable. The coding experience should not be make a couple of changes and sit around for 10 or 20 minutes while tests run. That’s a bad place to be.

Keeping a unit suite fast isn’t just about how you design and code. Yes, you can do a lot of things to keep tests fast such as avoiding files, databases, sockets, creation of huge graphs of objects, etc. But the other key piece is picking frameworks and languages that lend themselves to fast tests. If you find yourself subverting your framework to make your tests fast, you need to consider a different framework. And, yes, you can read this as my being unlikely to use Rails the next time I'm building a traditional multi-page application.

There’s also something about the size of the application. Once a codebase is a certain size, you need to figure out how to split it up. This is the only way to keep a fairly complete understanding of a piece of software in your head. Finding the seams along which to split is not an academic modeling exercise. You will spend a lot of time playing with your code, moving things around, redesigning, refactoring. Having a fast test suite to quickly validate your work along the way will make this work several orders of magnitude easier.

Actually, several orders of magnitude is likely underselling it. If you need to split up a monolith and have a painfully slow unit test suite, well... you just might be stuck. That’s learning a lesson the hard way. So do everything in your power to keep your unit tests extremely fast and able to run in a single thread on a dev machine.

## Branch by abstraction should not be a permanent state

Long-lived products are going to have a number of tech leads over the years. A certain type of tech lead will come in and start making noise about what stinks in the stack and immediately want to start swapping in new stuff. And that's OK. New shiny toys aren't always bad. For a long-lived codebase, it requires some fresh energy to generate enough momentum to swap out the parts that are no longer holding their weight. That said, I want to make two important points.

A new tech lead should not swap out any tech until they’ve been working on the team for 2-3 months. There’s too much context to understand. The new tech lead needs to learn empathy for the team and the codebase. The team and tech lead need to build trust and a rhythm.  Better decisions will be made with an initial pause.

The typical means of swapping out new tech (outside the absurdity of long-lived branches) is to utilize [branch by abstraction](http://martinfowler.com/bliki/BranchByAbstraction.html):

* An abstraction is placed in front of component X.
* Component Y is introduced as a replacement for X
* The abstraction routes intelligently between X & Y while...
* X is gradually made obsolete
* X is removed; the abstraction is maybe removed

I have many times seen this process stop at step 3 due to discovering how difficult it is to remove that final 20% of the old component. I cannot stress how painful it is to drag around multiple ways of doing things for multiple years. It slows everything down and is demoralizing. Branch by abstraction is a great pattern. It’s the only way I’d do this sort of component swapping. But it needs to be accompanied by complete commitment by the team to eliminate the old component within a specified timebox.

## Technical debt can kill you

Just because we talk about technical debt more than we used to does not provide any guarantee that it will be paid down. Perversely, maintaining a backlog of technical debt makes it easy to never pay it down. It’s too easy for a manger to say “It’s OK to hold off on that. We’ve got this other pressing need over here. It’s logged. We can come back to it.”  And in that moment it’s probably a sound decision. But those pressing needs never go away. Urgent lists only grow longer.

And it gets worse. My experience is that there is a point when the technical debt backlog grows so large that the team will give up on wanting to pay it off. The team will feel hopeless. The developers cannot achieve flow. The business isn’t getting new value. I have a few thoughts on how to avoid insurmountable technical debt.

A good development team won’t play the same technical debt card over and over again. When a team realizes it’s playing the same type of technical debt card repeatedly, it must bring the pain forward and quickly assume that work into its normal everyday way of working.

My colleague Badri suggests that a team must agree to take on debt collectively. No one individual has the right to make the codebase worse while signing up the entire team to fix it later.

Most importantly, technical leaders and product leaders need to trust each other. Neither side should be able to play the “because I said so” card. Good technical leaders understand the priorities of the business. Good product managers value being able to deliver. Both sides need to talk about risks, costs, and benefits. If you can’t ship, your technical debt has converted into a business problem and that’s bad for everyone.

There’s obviously much more a team can do to write long-lived code: code for the reader, don’t be clever, and always think of your future colleagues to name a few. I’d love to hear what you think should be added to this list.
