---
title: "PowerShell 2.0 - Modules"
date: 2010-05-03 07:37:20
tags: ["powershell"]
---
This is part three of four in a series of articles on the new features in PowerShell 2.0.
Last time we discussed [transactions]({{ "2010-04-29-powershell-2-0-transactions.md" | inputPathToUrl }}), now it's time for **modules**!

## Modules
A module is a package that contains a bunch of PowerShell commands, like cmdlets, functions, variables, ..

This can be very useful when sharing your code with others, or deploying it to different servers. Think of a module as kind of an assembly for PowerShell.

Consider the next piece of code:

```powershell
function Add {
  if(!(Test-Path variable:script:count)) { $script:count = 0 }
  $script:count++
  "We add one and the total becomes {0}!" -f $script:count
}

function Substract {
  if(!(Test-Path variable:script:count)) { $script:count = 0 }
  $script:count--
  "We substract one and the total becomes {0}!" -f $script:count
}

function SetCount($value) {
 $script:count = $value
}

# Export only the Add and Substract functions, not SetCount.
Export-ModuleMember Add, Substract
# End of Script
```

This is our module. Now what do we do with it? To deploy this module we just need to create a new folder in `C:\Users\username\Documents\WindowsPowerShell\Modules\` and put our files in there. I'll call this file `Calculatron.psm1` and create the folder Calculatron at the Modules root.

All we need to do now is import the module by calling `Import-Module` and then we can use the new functions we created! They even become available in the tab command completion (you know what I mean, type "subs" and press the tab button).

{% figure "/img/2010/05/modules.png", "", "519" %}

Now you can use this awesome power to do some fun stuff and make your scripts easily reusable.

## Resources
* [All available cmdlets on Technet](http://technet.microsoft.com/en-us/library/dd347701.aspx)
* [About modules](http://tfl09.blogspot.com/2009/01/modules-in-powershell-v2.html)
* [MSDN on modules](http://msdn.microsoft.com/en-us/library/dd878324%28v=VS.85%29.aspx)
