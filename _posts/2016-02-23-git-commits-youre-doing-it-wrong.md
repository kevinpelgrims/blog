---
layout: post
title: "Git commits: You're doing it wrong"
date: 2016-02-23 13:00:00
tags: general git
comments: true
---

Git is an amazing tool that makes development in a team a lot easier for everyone. But easy comes with a downside: people think less about what they are doing. I quite often come across commits that hurt my eyes. I will address two common issues that annoy me, and I hope to convince you that they are wrong _and_ that there is a better way.

## The "fix previous commit" commit

A common pattern in a lot of repositories on Github is the double commit that is actually the same commit, but the first one had a mistake and the second is a fix:

```
664e6ac  (HEAD, master) Fix one line in verification method  (4 minutes ago)
3945ef1  Add verification method  (5 minutes ago)
```

Now what is actually one commit, is split into two commits. This is bad for several reasons. The obvious reason is that it becomes harder to read through the commit history, which is now cluttered with useless entries. Another reason is that it becomes harder to use `git blame` to figure out when code was written and why. The fixed line is now part of a separate commit, and that commit's message just says "fixed issue". The person that stumbles upon that commit has no context.

### Disclaimer

All suggestions will rewrite the history of the repository. If you have already pushed the code, and someone else has already pulled the latest commits, be extremely careful. Any kind of history rewriting could make it very complicated for your teammates to merge later. So keep that in mind as you apply these tricks.

### The simple solution

It is easy to fix these commits. If you discover that you made a mistake in the last commit, you can just make new changes and amend the last commit:

```
git add .
git commit --amend
```

In practice, this removes the last commit, and creates a new one with the changes from the last commit and the new changes combined.

Amending a commit only works if there is a problem with the last commit. What if you find issues with the last 2 commits, or decide that it would make sense to combine them?

### Fixing multiple commits

If you want to make changes to the 2 (or more) last commits, you can do a soft reset. This reset will cause the commits to disappear, while keeping all changes made. You can then make a new commit, combining all changes from the last couple of commits:

```
git reset HEAD~2
git add .
git commit
```

If you want to reset more than 2 commits, simply change the number after `HEAD~`.

If you want to reset multiple commits and split the changes up into more than one commit, check out the paragraph on `git add -i` below.

### More complicated situations

For more complicated situations, you can always use interactive rebase:

```
git rebase -i
```

I will not write an entire rebase manual here, as that has [already](https://git-scm.com/docs/git-rebase) [been](https://www.atlassian.com/git/tutorials/merging-vs-rebasing/) [done](http://nathanleclaire.com/blog/2014/09/14/dont-be-scared-of-git-rebase/). It is a powerful tool, though, and if you want to look like a Git wizard in front of your geeky friends, be sure to read up on rebasing.

## The "875 lines changed" commit

We have all seen people make huge commits:

```
511 lines added, 364 lines deleted
```

This is horrible because it is completely impossible to figure out what this commit does. You need to delve into the code and figure out yourself which changes belong together. Also, consider the following scenario: Someone finds a bug in the application you are working on, and the decision is made to temporarily exclude the feature that causes the bug. You can either comment everything out (aka the bad way), or find the commit that introduced the feature and [revert](https://git-scm.com/docs/git-revert) it (aka the good way). If the entire feature is added in one huge commit that also added 4 other features, it becomes extremely hard to remove it. You would need to comment out chunks of code, or in the worst case even manually rewrite methods, or even entire classes, to a previous state.

### The solution

So, you ended up making completely unrelated changes without committing. Worry not, we can fix this! Interactive staging to the rescue:

```
git add -i
```

There is a [complete tutorial on interactive staging](https://git-scm.com/book/en/v2/Git-Tools-Interactive-Staging) on the official Git website, so you can read up on it. But simply put, it makes it easy for you to partially commit changes you have made within the same file. For example, if you have added 2 methods in one class that are used for two different features, you can use interactive staging to do a commit with only the first method, and then a second commit with the other method.

## Why bother?

Some people think I'm wasting my time when I'm carefully splitting up commits, or merging several commits into one. I think they are wrong. Every time I go through my own repositories' history to find something specific, I am either really glad that my commits are well-structured, or annoyed with myself for not always doing it. I see a commit as a piece of the code, and I want every piece of code to have one responsibility.
