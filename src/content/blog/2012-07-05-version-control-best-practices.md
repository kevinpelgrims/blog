---
title: "Version control best practices"
date: 2012-07-05 07:51:19
tags: ["general"]
---
I'm one of the poor guys who had to deal with Visual SourceSafe, I used to work with TFS on a daily basis, I'm using Git every day at work with a few other people, I've been using Hg for some pet projects with a friend and everybody has used Subversion.

<img style="float: right; margin: 5px 0 5px 10px;" alt="version control logos" src="/img/2012/07/vc_logos.png" />

Version control is everywhere and is much needed when programming. But everybody who has worked with a version control system with a number of people before knows that it is inevitable that at some point someone will commit something that doesn't build, or something that compiles but doesn't run. I have made mistakes like this, so have my colleagues and so have you!

## Best practices

So to prevent this from happening again, I made a small list of best practices that I will try and follow myself. This list is applicable to every system out there!

* **Diff before you commit**

I use a GUI to check my changes in an easy way before I commit changes. That makes it easier to see if I forgot anything or if a commit needs to be split up in several commits.

* **Keep commits small and logical**

A commit should be a logical grouping of changes in your code. If you change some code in one class and add two completely unrelated classes, consider doing three commits. This will make it easier to find changes in the history later. Also, keep your commits small. Even if you're working on different classes that are logically grouped together, it might be a good idea to split up some changes. This way it'll be easier to revert changes if necessary.

* **There is room for comments, use it!**

I always try to have a "header" and a full explanation in my commit messages. That way I can easily see what it's about on the first line and I can read the complete commit message if I need to dig deeper. Titles like "fixed bug" are useless, try to use descriptive titles.

* **Build and test code before a commit**

We managed to make two related mistakes at work in one week recently. First a colleague committed code that didn't compile after a heavy merge, a few days later I committed code that could build but did not work. Double check this before you commit, even when you think nothing could've gone wrong! In a distributed version control system like git, this rule might read "build and test before you **push**", although I believe you should be able to at least build every commit.

* **Don't leave commented-out code in there**

If you want to remove some code that you might need again later, don't comment it out, remove it. You can always retrieve it, it's in source control! Commented-out code pollutes the code base and makes no sense when you can easily check the history of a file.

* **Check other people's commits**

Read the commit message and take a look at the code. This will improve your understanding of your colleagues' code, it can serve as a very simple code review and you might learn a thing or two.

## Live by the rules, man

I'm trying to follow these rules every day to make work nicer for me and my colleagues. We don't have a pink sombrero around, so there's no fun in broken builds at the office ;-)
