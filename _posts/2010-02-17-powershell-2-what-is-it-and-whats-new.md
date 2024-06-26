---
layout: post
title: "PowerShell 2 - What is it and what's new"
date: 2010-02-17 11:17:16
tags: ["powershell"]
---
## What is PowerShell?

PowerShell is an object-oriented programming language and interactive command line shell for Microsoft Windows that is built on top of the .NET framework.

It was designed to automate system tasks and create systems management tools for commonly implemented processes.

PowerShell offers a variety of ways to automate tasks, including:
* Cmdlets, which are very small .NET classes that appear as system commands.
* Scripts, which are combinations of cmdlets and associated logic.
* Executables, which are standalone tools.
* Instantiation of standard .NET classes.

PowerShell integrates with the .NET environment and can also be embedded within other applications. Over a hundred cmdlets are included that can be used separately or combined with others to automate more complex tasks. Users can also create and share cmdlets.

PowerShell 2.0 is installed by default with Windows 7 and Windows Server 2008 R2. It has also been released for older platforms, i.e.Windows XP SP3, Windows Server 2003 SP2, Windows Vista SP1 and Windows Server 2008.

Some good info on PowerShell in general can be found on Wikipedia: [http://en.wikipedia.org/wiki/Windows_PowerShell](http://en.wikipedia.org/wiki/Windows_PowerShell)

## What are the cool new features of version 2.0?

PowerShell 2.0 has a lot of great improvements over version 1.0, listed here are some of the more important new features.

* **Remoting**
  <br />
  PowerShell 2.0 lets you run commands on one or many remote computers with a single Windows PowerShell command. You can run individual commands, or you can create a persistent connection (a session) to run a series of related commands. You can also start a session with a remote computer so that the commands you type run directly on the remote computer.

  The remoting features of Windows PowerShell are built on Windows Remote Management (WinRM).
* **Windows PowerShell ISE and debugger**
  <br />
  PowerShell 2.0 includes Windows PowerShell Integrate Scripting Environment (ISE), an application that lets you run commands, and design, write, test, and debug scripts in a graphical,  color-coded environment. It does not contain code completion, as opposed to <a id="qfja" title="PowerGUI" href="http://www.powergui.org/">PowerGUI</a>.

  PowerShell 2.0 also includes a debugger for scripts and functions. You can add breakpoints and display the call stack.
* **Background jobs**
  <br />
  Background jobs are commands that run asynchronously. When you run a background job, the command prompt returns immediately, even if the command is still running. You can use the background job feature to run a complex command in the background so that you can use your session for other work while the command runs.
* **Lots and lots of new Cmdlets!**
  <br />
  There are 107 new Cmdlets in PowerShell 2.0 for you to play with. Ranging from Cmdlets to take advantage of the new Remoting capabilities to Computer Management and WS-Management Cmdlets.
* **Event notification**
  <br />
  Users can register and subscribe to events, such as Windows PowerShell events, WMI events, or .NET Framework events. And users can listen, forward, and act on management and system events both synchronously and asynchronously.
* **Modules**
  <br />
  Modules let you divide and organize your PowerShell scripts into independent, self-contained, reusable units. Code from a module executes in its own context, so it does not conflict withthe variables, functions and other resources in the session.
* **Transactions**
  <br />
  Transactions let you undo an entire series of operations. They are available only for operations that support transactions. Transactions are designed for applications that require atomicity, consistency, isolation and recoverability, like databases and message queuing.
* **And a lot more..**
  <br />
  There are a whole lot more new features in version 2.0, you can find more information at the resources below.

## Installing PowerShell

Installing PowerShell 2.0 is pretty straightforward, just run the installer. If you want to use the remoting feature, be sure to install PowerShell 2.0 on all machines.
<br />
Here is the link: [http://support.microsoft.com/kb/968929](http://support.microsoft.com/kb/968929) (it's all there at the bottom of the page).

## Resources

A list of resources on PowerShell 2.0:
* Scripting with Windows PowerShell - [http://technet.microsoft.com/en-us/scriptcenter/dd742419.aspx](http://technet.microsoft.com/en-us/scriptcenter/dd742419.aspx)
* Windows PowerShell Blog - [http://blogs.msdn.com/powershell/default.aspx](http://blogs.msdn.com/powershell/default.aspx)
* Windows PowerShell Getting Started Guide - [http://msdn.microsoft.com/en-us/library/aa973757(VS.85).aspx](http://msdn.microsoft.com/en-us/library/aa973757(VS.85).aspx)
* And, of course, PowerShell help commands are very useful (example: `help about_Remote`)
