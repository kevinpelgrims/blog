---
title: "PowerShell 2.0 - Remoting"
date: 2010-05-06 10:18:10
tags: ["powershell"]
---
This is the last part (of four) in a series of articles on the new features in PowerShell 2.0. Last time we discussed [modules]({{ "2010-05-03-powershell-2-0-modules.md" | inputPathToUrl }}), now it's time for **remoting**!

## Remoting

One of the coolest new features is remoting. It is kind of like running remote desktop in command line. Although it's an important piece of PowerShell 2.0, there's not a lot to explain about this. It's all pretty easy to use.

What's fun is that we have the option of executing one command on different remote computers at the same time. This will save system administrators a lot of time. To demonstrate this consider following command:

```powershell
Invoke-Command -ComputerName Server1 -scriptblock {Get-Service}
```

This gets all services from Server1. To run this on multiple servers we just adjust the command:
```powershell
Invoke-Command -ComputerName Server1, Server2, Server3 -scriptblock {Get-Service}
```

Now we get all services from Server1, Server2 and Server3 in a really easy way.

Another way to use remoting is by connecting to a remote session with `Enter-PSSession`. You type commands in your local console, but everything is executed on the remote machine. Until you leave the remote session, by using `Exit-PSSession`.

```powershell
PS D:\ProjectsPS> Enter-PSSession -ComputerName Server1

PS Server1> Get-Process powershell

Handles  NPM(K)    PM(K)      WS(K) VM(M)   CPU(s)     Id ProcessName
-------  ------    -----      ----- -----   ------     -- -----------
    547       8    95660       8852   199     6,84   5136 powershell

PS Server1> Exit-PSSession
PS D:\ProjectsPS>
```

Of course, there are a lot of other commands available, so once more, I will tell you to use the PowerShell 2.0 help: `Get-Help about_PSSessions`. Much can be learned from the official documentation (yes, it's really good!).

And another good resource is of course Technet, where all the available cmdlets are explained in a more readable manner (see resources).

So that's all for today folks! I hope you learned some things that will be useful in future projects.

## Resources
* [All available cmdlets on Technet](http://technet.microsoft.com/en-us/library/dd347701.aspx)
