---
layout: post
title: "Introducing NuGetFight"
date: 2012-05-21 11:01:14
tags: [".net", "web"]
comments: true
---
I've recently been teaming up with [Koen Metsu](http://koenmetsu.com) to create [NuGetFight](http://nugetfight.com), a website that makes it easier to decide on which [NuGet](http://nuget.org) package to choose. We sometimes find it hard to decide which packages to use when we start working on a project. Which one is best supported? Which one has good documentation? We thougth that this should be easier to compare and figured that queries with more packages and downloads also have better support and documentation. Sure, this is not a scientific way, but it can help and also, we're not really taking all of this *too* serious (in case you haven't noticed).

## Technologies
So we decided to make NuGetFight! We went for a ASP.NET MVC 3 project, with C#. We chose this mainly because we're both familiar with C# and MVC and it seemed like a right fit. We also wanted to have some "fancy" animated charts to show the data in a more visible manner. For those we decided to use JavaScript, as it is "pretty easy" to do with the canvas and some scripting.

## JavaScript charts
For the charts we decided to go for JavaScript. Using the canvas element it's pretty fast to get some drawing and some animation going. The first draft of the chart was pretty easy to make.

First draft of the chart:

![first chart version]({{ site.baseurl }}/files/images/2012/05/ngf_barchart.png)

But after that we improved on it a lot and later also added some animation. We also used the script to learn a bit more about some features of JavaScript we hadn't used before. We're not JavaScript wizards, so it would be cool if somebody with some more knowledge on that part could help us make the charts a bit cooler!

## And the winner is ...
It took us a while to find the right formula. In the beginning we used the number of packages, but then when we added the downloads that seemed kind of silly. So Koen came up with the idea to make a spreadsheet and try some formulas in there.

Formula spreadsheet:
![formula spreadhseet]({{ site.baseurl }}/files/images/2012/05/ngf_algorithm.png)

We ended up going for the last one, (packages / download) + downloads. This greatly benefits popular queries. The point of using NuGetFight is finding out which query to use, and finding the most popular one seems like a good reason to use a certain package. Because usually the most popular packages also have good documentation and the biggest community. Of course, this isn't the best way to find out which package to use, but it's the best way to do it programmatically.

## Open source
We decided to [open up the code](https://bitbucket.org/kevinpelgrims/nugetfight), for several reasons. People might be able to use some of it, whether they are trying to figure out how to work with the NuGet API, or how to do simple JavaScript graphics in a canvas. Another important reason is that we would like you to get involved! If you have any cool ideas, make an issue on BitBucket, fork the project and start coding. We'd be really happy with some pull requests. And we chose to use the beer-ware license, so you're also free to use the code for your own projects.

## Future features
Of course, there is a lot of improvement to be made. We definitely need someone to help us with the design. We are both very much programmers with a bad design sense, as you may have noticed... It would also be nice if we could spice up the charts a bit. We also want to add some popular suggestions and make a few nice error pages. The mobile version of the website needs some work as well. Those are the things on our list, feel free to check it out and suggest other possible improvements. It would be really cool to get some contributions!
