---
title: "PowerShell - Remote Service Manager"
date: 2010-02-24 10:58:13
tags: ["powershell"]
---
On my last project I had a few problems with a Sharepoint service on a server, we couldn't find the problem straightaway, but restarting the service always seemed to help for a while. Connecting to the server with Remote Desktop and restarting the service, however, is pretty timeconsuming for such a simple task, so I made a little PowerShell script to restart the service remotely.

{% figure "/files/images/2010/02/powershell_rsm.png", "A screenshot with the script in action", "510" %}

## Show me the script!
So, how do I start to write this script? As a PowerShell beginner I Google a bit, and stumble upon this nice [post on The PowerShell Guy blog](http://thepowershellguy.com/blogs/posh/archive/2007/01/03/powershell-using-net-to-manage-remote-services.aspx]).

```powershell
[System.ServiceProcess.ServiceController]::GetServices('server')

(new-Object System.ServiceProcess.ServiceController('Service','server')).Start()
(new-Object System.ServiceProcess.ServiceController('Service','server')).WaitForStatus('Running',(new-timespan -seconds 5))
```

Alright, that's pretty easy! This gives me a good way to deal with the services, now all I have to do is write a script around it that is easy to use for everyone working on the project.

Time to start thinking about the actions I'm going to implement.

Getting a list of all services, or a filtered list (based on the displayname of a service) is a pretty important function. I can pretty much copy the line from the blogpost mentioned above, but I will also provide the possibility to filter the list.

```powershell
[System.ServiceProcess.ServiceController]::GetServices($server) | where {$_.DisplayName -match $filter}
```

To manage the services I'm going to implement start, stop and restart. Let's do this the clean way and create two functions, `startService` and `stopService`, I think this is pretty straightforward.

```powershell
function startService()
{
    $serviceController = (new-Object System.ServiceProcess.ServiceController($service,$server))
    if($serviceController.Status -notlike 'Running')
    {
        $serviceController.Start()
        $serviceController.WaitForStatus('StartPending', (new-timespan -seconds 10))
        $service + " is starting.."
        $serviceController.WaitForStatus('Running',(new-timespan -seconds 20))
        $service + " is " + $serviceController.Status
    }
    else {Write-Host "$service is already Running."}
}
```

Now, the server to target and the service to manage can always be different and should be provided by the user of the script. I also need a way to determine which action a user want to perform. When listing the services a filter could be useful. Including some help in the script is probably a good idea. I will use named parameters to implement all this. This should be on the first line in the script.

```powershell
param([string]$server, [string]$command, [string]$filter, [string]$service, [switch]$help)
```

There are my parameters, this makes the script a bit universal in it's use. But this also means a user can provide a service that doesn't exist. Let's write a function to check for that.

```powershell
function checkServiceExists()
{
  if($service -like '')
  {
    Write-Host 'Please provide service name.'
    exit
  }

  $svcexists = 0
  $svcs = [System.ServiceProcess.ServiceController]::GetServices($server);

  foreach($svc in $svcs)
  {
    if($svc.Name -like $service) {$svcexists = 1; break;}
  }
  if(!$svcexists)
  {
    Write-Host 'Service does not exist on remote machine.'
    exit
  }
}
```

So, I'm checking if the service name contains a value and, if it does, that it exists on the remote machine. Otherwise the script tells the user to edit the parameter. Great!

Now I need to check which action a user wants to perform. This can simply be done using `If` and `ElseIf`, it could also be done with the `Switch` statement. When a user types a command that doesn't exist, a message will clarify this.

```powershell
if($command -like '') {}
elseif($command -like 'get')
{
  [System.ServiceProcess.ServiceController]::GetServices($server) | where {$_.DisplayName -match $filter}
}
elseif($command -like 'start')
{
  startService
}
elseif($command -like 'stop')
{
  stopService
}
elseif($command -like 'restart')
{
  stopService
  startService
}
else
{
  Write-Host "'$command' is an invalid command."
}
```

This PowerShell stuff is actually pretty easy! Now all I need to implement is the help.

```powershell
if($help)
{
  Write-Host @"

RemoteServiceManager.ps1

Manage services on a remote computer.

Parameters explanation.

"@
  exit
}
```

## The complete 'manage services remotely' script

Alright, I now have a working script to remotely manage services, that provides some feedback when users provide wrong information. This will definately be useful in future projects too.

There is still a lot of room for improvements, so feel free to play around with my script and let me know if you add something cool to it. You can download the complete script here.

**UPDATE**: I updated the code for the file, because it's changed since first posting this, by adding the help in a standard way and some adjustments here and there.

```powershell
###################################
##  RemoteServiceManager.ps1     ##
##   by Kevin Pelgrims           ##
##  kevinpelgrims.com            ##
##   February 23, 2010           ##
###################################

# Get parameters
param([string]$server, [string]$command, [string]$filter, [string]$service)

# Load ServiceController assembly, if it is not already loaded
if (-not ([appdomain]::CurrentDomain.getassemblies() |? {$_.ManifestModule -like &quot;system.serviceprocess&quot;})) {[void][System.Reflection.Assembly]::LoadWithPartialName('system.serviceprocess')}

# Check if a servicename is given and if the service exists
function checkServiceExists()
{
    if($service -like '')
    {
        "Please provide service name."
        exit
    }

    $svcexists = 0
    $svcs = [System.ServiceProcess.ServiceController]::GetServices($server);
    foreach($svc in $svcs)
    {
        if($svc.Name -like $service) {$svcexists = 1; break;}
    }
    if(!$svcexists)
    {
        "Service does not exist on remote machine."
        exit
    }
}

# Start the service, if it is not already running
function startService()
{
    checkServiceExists
    $serviceController = (new-Object System.ServiceProcess.ServiceController($service,$server))
    if($serviceController.Status -notlike 'Running')
    {
        $serviceController.Start()
        $serviceController.WaitForStatus('StartPending', (new-timespan -seconds 10))
        $service + " is starting.."
        $serviceController.WaitForStatus('Running',(new-timespan -seconds 20))
        $service + " is " + $serviceController.Status
    }
    else {"$service is already Running."}
}

# Stop the service, if it is not already stopped
function stopService()
{
    checkServiceExists
    $serviceController = (new-Object System.ServiceProcess.ServiceController($service,$server))
    if($serviceController.Status -notlike 'Stopped')
    {
        $serviceController.Stop()
        $serviceController.WaitForStatus('StopPending', (new-timespan -seconds 10))
        $service + " is stopping.."
        $serviceController.WaitForStatus('Stopped',(new-timespan -seconds 20))
        $service + " is " + $serviceController.Status
    }
    else {"$service is already Stopped."}
}

# Check the command parameter to determine the action to be undertaken
if($command -like '') {}
elseif($command -like 'get')
{
    [System.ServiceProcess.ServiceController]::GetServices($server) | where {$_.DisplayName -match $filter}
}
elseif($command -like 'start')
{
    startService
}
elseif($command -like 'stop')
{
    stopService
}
elseif($command -like 'restart')
{
    stopService
    startService
}
else
{
    "'$command' is an invalid command.";
}

<#

.SYNOPSIS
RemoteServiceManager.ps1

Manage services on a remote computer.

Input:
  None.

Output:
  None.

Parameters:
  server             - Name of the remote machine on which commands should be executed
  command            - The command that should be executed
                       Available commands: get, start, stop, restart
  filter             - Filter on DisplayName for &quot;get&quot; command
  service            - Name of the service

.DESCRIPTION
Manage services on a remote computer.

.LINK

http://kevinpelgrims.com

#>
```
