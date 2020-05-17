---
layout: post
title: "PowerShell 2.0 - Transactions"
date: 2010-04-29 19:37:10
tags: powershell
comments: true
---
This is part two of four in a series of articles on the new features in PowerShell 2.0. Last time we discussed [background jobs]({{ site.baseurl }}{% post_url 2010-04-27-powershell-2-0-background-jobs %}), now it's time for **transactions**!

## Transactions
When you run scripts, generally, three things can happen:
* The script runs, my favorite
* The script fails, this is not cool, but you can probably fix it
* The script runs only partially and dies unexpectedly in the middle of executing stuff. This is very bad and this is probably not what you want.

PowerShell 2.0 has the solution: transactions. They can help you to solve these issues and make sure the script just succeeds, or fails, but nothing in between.

Starting a transaction is pretty easy with the `Start-Transaction` command, but it doesn't magically fix everything. You still have to use the `-UseTransaction` switch on your regular commands. Commands that use this switch will run inside the scope of the transaction, those who don't will run on the outside. To commit the results of the transaction, use `Complete-Transaction`. If there is something wrong and you need to undo the changes, call `Undo-Transaction`. A little transactions demo in the new Microsoft PowerShell ISE:

{% include
    figure.html url="/files/images/2010/04/transactions.png"
    description=""
    width="510"
%}

This small script creates a transaction scope and creates a string object. Then we append some text to it twice. Once out of the transaction scope, the second time inside of the transaction scope. When we do a `ToString()`, we see that the text that is appended inside of the transaction is not visible at this point. This is kind of normal, because the transaction is not yet completed. Then we complete the transaction and do a `ToString()` again, and we can see the second text too.

Again, use the power of the shell for more info: `Get-Help about_Transaction`

## Resources
* [All available cmdlets on Technet](http://technet.microsoft.com/en-us/library/dd347701.aspx)
* [Transactions quickstart on the official PowerShell Blog](http://blogs.msdn.com/powershell/archive/2008/05/09/powershell-transactions-quickstart.aspx)
