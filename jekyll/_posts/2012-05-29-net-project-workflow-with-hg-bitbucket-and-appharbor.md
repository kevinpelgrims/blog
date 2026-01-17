---
layout: post
title: ".NET project workflow with Hg, BitBucket and AppHarbor"
date: 2012-05-28 07:48:00
tags: [".net", "tools", "web"]
---
The past few weeks I've been working on a project with a friend who lives in Belgium. You can read more about that in a previous post, [Introducing NuGetFight](http://kevinpelgrims.com/blog/2012/05/21/introducing-nugetfight). Since we're living 1000km apart, we need the right tools to deal with all this. The project is a ASP.NET MVC3 website in C#, we're using Visual Studio to develop it. But as we're not able to sit in the same room and code, we need some extra tools to enhance the workflow.

## Mercurial on BitBucket
For source control we're using [Mercurial](http://mercurial.selenic.com) on [BitBucket](https://bitbucket.org). We both worked a bit with git before, but Mercurial (Hg) felt more natural for us beginners to the [DVCS](https://en.wikipedia.org/wiki/Distributed_revision_control) scene. I started out using the command line for Hg, but now I'm using [TortoiseHg](http://tortoisehg.bitbucket.org) for commits and pushes and pulls. It gives me a way to visualize the changes in an easier way than with the command line. BitBucket also has a nice way of keeping track of issues. This gives us a way of putting some stuff on the to-do list, with some information attached and to flag it as important when necessary. For me this is very important, because I tend to forget things ;-)

To set up Hg and BitBucket you simply need to follow [the instructions](http://confluence.atlassian.com/display/BITBUCKET/Set+up+SSH+for+Mercurial) in the documentation. It seems a bit complicated, but it's all pretty straight forward. You also need to have "pageant.exe" (the PuTTY authentication agent) running with your SSH key anytime you wish to connect to BitBucket.

## AppHarbor for easy deployment
After a couple of days we were getting sick of always telling each other "hey, I changed something, pull and run to see how cool it is". So we decided to deploy the website on [AppHarbor](https://appharbor.com). The cool thing about this is that you can connect AppHarbor and BitBucket to automatically do everything for you. Setting this up is fairly easy, just follow [this guide](http://support.appharbor.com/kb/3rd-party-integrations/integrating-with-bitbucket) and five minutes later you can benefit!

![NuGetFight on AppHarbor]({{ site.baseurl }}/files/images/2012/05/ngf_apphb.png)

This makes testing the website so much easier. Now I just do some commits locally, when I decide to push to BitBucket it also deploys the website to AppHarbor and my friend can check out the website without having to build it himself.

## Saving data on MongoLab
After some developing we decided to save some data. We didn't want to set up a SQL Server for something this simple. In fact, we didn't even want to host the database ourselves. So we decided to try something and went for [MongoLab](https://mongolab.com/home), which is basically Mongo hosting in the cloud. They have a free plan, so we could just check it out to see how it works.

To be honest, there is a lot of work yet to be done for MongoLab. It seriously annoys me that there can be only one administrator on a project, for example. But it does its job and it didn't take a lot of time to set up. You simply create an account, create a database, create a user for the database and copy the connection string. For more information on how to use MongoLab, I recommend [Koen Metsu's blog](http://koenmetsu.com/2012/03/26/starting-up-fast-with-nosql-first-steps), he has some interesting posts about this topic and he also explains how to use MongoLab with .NET.

## NuGetFight
The result of all this work is [NuGetFight](http://nugetfight.com), a website that makes it easier to decide on which [NuGet](http://nuget.org) package to choose.

![NuGetFight]({{ site.baseurl }}/files/images/2012/05/ngf.png)

Check it out and feel free to contribute, it's [open source](https://bitbucket.org/kevinpelgrims/nugetfight/).
