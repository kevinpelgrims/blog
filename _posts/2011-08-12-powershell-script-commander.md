---
layout: post
title: "PowerShell Script Commander"
date: 2011-08-13 05:07:00
tags: powershell
comments: true
---
>I wrote this entry last year September, but for several reasons the post and the code never made it to the interwebs.
>After running into it again I decided to post it anyway and upload the code to [Codeplex](http://pscommander.codeplex.com/).
>So, here goes!

A while back I created this PowerShell script to remotely manage services (see [Remote Service Manager]({% post_url 2010-02-24-powershell-remote-service-manager %})), a bit later I made the available help a bit more professional (see [Add help to your own PowerShell scripts]({% post_url 2010-05-10-add-help-to-your-own-powershell-scripts %})). Now I was thinking it would be cool to create an interface in .NET for this script. So I started developing a WinForm application around the script. Initially, it looked like this:

{% include
    figure.html url="/files/images/2011/08/remoteservicemanager.png"
    description="Remote Service Manager"
    width="510"
%}

This was the first (working) prototype of the RSM-GUI. But then I started thinking it would be much cooler to create an application that can run all scripts, even those with parameters. I started thinking about how to do this and actually it didn't seem so hard. I started by creating a form that can execute simple PowerShell commands and show the output, then added support for running scripts stored on the hard drive. For the parameters I just made sure they are all displayed in a grid, where you can give them a value by simply typing something in. And that was it! I now have a Windows application that can run scripts on a more visual way. Now you can simply load the script with an OpenFileDialog and see what parameters are available. If you still don't fully understand how the script works, you can press the Get-Help button to display the help information in the outputbox.

And now, it looks like this:

{% include
    figure.html url="/files/images/2011/08/scriptcommander-help.png"
    description="PowerShell Script Commander help function"
    width="510"
%}

{% include
    figure.html url="/files/images/2011/08/scriptcommander-rsm.png"
    description="PowerShell Script Commander running the RSM script, with parameters"
    width="510"
%}

A lot of work needs to be done to make this more reliable and to make it work with all scripts on the planet ;-) But I think it's already pretty cool.

The source code can be found here: [http://pscommander.codeplex.com/](http://pscommander.codeplex.com/)
