---
layout: post
title: "Version control best practices - Git edition"
date: 2012-07-27 06:51:00
categories: general version-control git
---
<img style="float: right; margin: 0 0 5px 10px;" alt="git logo" src="http://kevinpelgrims.com/blog/files/images/2012/07/git_logo.png" />

I already made a list of general [version control best practices](http://kevinpelgrims.com/blog/2012/07/05/version-control-best-practices), but since my day to day work is with git, I felt the list was not complete. So I decided to make an extension on the previous post, this time with some git specific best practices. Of course, there is a lot more to it. But this is a good basic list to make sure working (together) with git becomes easier.

##Git best practices

* **Use .gitignore**

Don't commit generated content like jars or bin folders. Use a [.gitignore](https://help.github.com/articles/ignoring-files) file to filter out the files that don't belong in the repository.

* **Commit often**

Do a lot of small commits, push it when you're ready. You can always do a bunch of changes or rewrite history locally before you push your code to a shared repository.

* **Be careful with `git reset`**

`git reset (--hard)` will reset the current HEAD to a specific commit. This means that if you have any unsaved changes (= not committed or stashed), they will be lost.

* **Rewriting history**

Git makes it easy to rewrite history, but that doesn't mean you should. The rule here is that it's okay to rewrite history locally, working with commits that are not yet pushed to a shared repository. Once something is shared, don't change it or all your team members could run into problems with their repositories once they pull. Even a simple `git commit --amend` to change a commit message is no longer allowed after a push!

* **Branching**
	- **Choose a workflow for branching**
	
	Some people like working with [feature branches](http://nvie.com/posts/a-successful-git-branching-model/), some people even do _all_ their work in a [separate branch](http://lostechies.com/jimmybogard/2010/06/03/translating-my-git-workflow-with-local-branches-to-mercurial/). As long as you don't have any long running branches that are completely separate for weeks, you're good. But be sure to have a defined workflow for the entire team, so everybody is doing the same.

	- **Merge often and stay up to date**
	
	If you work on a feature branch, be sure to merge the develop branch into your feature branch often. This way you stay up to date with development and fixes and as an extra bonus it will be easier to merge the feature branch into development!
	
	- **Post-merge delete**
	
	When you are done merging a feature branch back into develop, be sure to delete the feature branch. This way your repository doesn't get cluttered.

* **Tag releases**

When you do a release, tag the commit the release is based on. This way you can find out when you released what and it will make it easy to go back to that certain state by checking out the tag.

* **Stashing**

Name your stashes. If you don't provide a name, git generates one based on the previous commit. This gives you at least some information, but you still don't know what's in the stash. So unless you're making a quick, temporary stash, consider giving it a name by using `git stash save name` instead of just using `git stash`.

* **Experiment!**

If you think a certain git command can be useful, but you're not completely sure what it does, just try it out. If you're really unsure, try it in a copy/clone of your repository. But usually (if you committed everything) you will never lose data (unless you try _really_ hard).
