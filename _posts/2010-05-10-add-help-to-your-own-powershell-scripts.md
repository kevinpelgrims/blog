---
layout: post
title: "Add help to your own PowerShell scripts"
date: 2010-05-10 08:21:56
tags: powershell
comments: true
---
A while ago I created a script to manage services on a remote server (see [Remote Service Manager]({{ site.baseurl }}{% post_url 2010-02-24-powershell-remote-service-manager %})). Included in that script was a way to display some information with the use of a switch (`-help`). A few days later I was wondering if there wasn't a better way to include help in own PowerShell scripts. And of course there is! It's even in the help files.

So, here's what to do. First, check the information in PowerShell help by running following command:
```powershell
Get-Help about_Comment_Based_Help
```

There we can see this help thing will be pretty straightforward to implement. Here's what it says:
```powershell
The syntax for comment-based Help is as follows:

    # .help keyword
    # help content

-or -

    <#
        .help keyword
        help content
    #>
```

This means we just have to make a comment block, with some specific keywords. Cool. So, what are the right keywords? They're also in the help. Here's a small list of the most important stuff:
* `.SYNOPSIS`
* `.DESCRIPTION`
* `.PARAMETER &lt;Parameter-Name&gt;`
* `.EXAMPLE`
* `.NOTES`
* `.LINK`

For more details and a complete list of keywords, I suggest you look at the help in PowerShell. Here is a little example of how we're going to put this to work:

```powershell
<#

.SYNOPSIS
This is a simple Powershell script to explain how to create help

.DESCRIPTION
The script itself will only print 'Hello World'. But that's cool.
Its main objective is to show off the cool help thingy anyway.

.EXAMPLE
./HelloWorld.ps1

.NOTES
Put some notes here.

.LINK
http://kevinpelgrims.wordpress.com

#>

Write-Host ‘Hello World!’
```

There, that's all there is to it. I wish I looked at that before I made the RSM script :) It adds some kind of professionalism to a script, don't you think? And also, it's intuitive for users to use the Get-Help command. Everyone is happy!

{% include
    figure.html url="/files/images/2010/05/get-help.png"
    description="Our very own help"
    width="510"
%}
