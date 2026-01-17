---
layout: post
title: "PowerShell 2.0 - Background Jobs"
date: 2010-04-27 19:19:07
tags: ["powershell"]
---
I already told you about a few [cool new features]({% post_url 2010-02-17-powershell-2-what-is-it-and-whats-new %}) in PowerShell 2.0, now it's time to play with them. I've divided one large article into four small ones, to make it a bit more readable. We'll start with **background jobs**, **transactions** and **modules** and end with **remoting**. These will become very useful for the PowerShell master.

## Background jobs

What do these things do again? Background jobs are commands that run asynchronously. When you run a background job, the command prompt returns immediately, even if the command is still running.

Background jobs can be really useful to run complex commands on the background, while continuing some other work. Let's see how this works and start off with the commands, it's actually pretty easy.

The basic (and most important) commands are `Start-Job`, `Get-Job` and `Stop-Job`. A small demonstration:

{% include
    figure.html url="/files/images/2010/04/backgroundjobs1.png"
    width="510"
%}

As you can see, Start-Job starts a background job (surprise, surprise!) and shows us some info of the newly created job.

In the small script above I created a command that would normally pause the execution of it for 30 seconds. Now, because of the use of a background process we can immediately continue our work, while the first piece of script keeps running in the background.

{% include
figure.html url="/files/images/2010/04/backgroundjobs1.png"
width="510"
%}

Get-Job gets a list of running or completed jobs in the current session, as you probably expected. Using this command we also get a lot of useful information, like state and command of the job.

Using the Id we can find with the Get-Job command, we can also stop the execution a running job with `Stop-Job`.
``` powershell
PS D:\ProjectsPS> Stop-Job 3
```

If we want to get rid of the job completely, we simply remove it:
```powershell
PS D:\ProjectsPS> Remove-Job 3
```

What if you want to run a command that returns data? Use `Receive-Job`!
```powershell
$job = Start-Job -scriptblock {Get-Process}
Receive-Job -job $job
```

The Receive-Job command will output the data from the scriptblock used in Start-Job (in this case, a list of processes on the computer).

These are pretty basic uses of background jobs, but it demonstrates how powerful this can be when creating large scripts that have to execute fast. For more information on this topic, use the PowerShell help, it's all there! Tip: Get-Help about_Jobs

Do try this at home!

## Resources
* [All available cmdlets on Technet](http://technet.microsoft.com/en-us/library/dd347701.aspx)
* [Some info on background jobs](http://bartdesmet.net/blogs/bart/archive/2008/03/25/windows-powershell-2-0-feature-focus-background-jobs.aspx)
