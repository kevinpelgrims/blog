---
layout: post
title: "Building CoffeeScript with Sublime on Windows"
date: 2011-12-28 15:15:28
tags: ["tools", "web"]
---
As I’m looking at [CoffeeScript](http://coffeescript.org/) in my spare time, I wanted a fast way to build the scripts. Since I work with [Sublime Text 2](http://www.sublimetext.com/) for all my scripting, it seemed like the right tool for the job.

Sublime is a text editor that has a lot in common with [TextMate](http://macromates.com/) for OS X, but it has the huge advantage of working cross-platform. Sublime can also be extended using plug-ins, like TextMate, and a lot of TextMate bundles are compatible with it.

## Node.js

Now, there are several ways to compile CoffeeScript locally (e.g. [from .NET](http://stackoverflow.com/questions/2879401/how-can-i-compile-coffeescript-from-net) or using [the built-in watch option](http://jashkenas.github.com/coffee-script/#usage)). We are going to use [Node.js](http://nodejs.org/) and [npm](http://npmjs.org/) (the Node Package Manager). Node.js works on Windows these days and the .msi installer also makes sure npm is on your system. You will need to add the folder that contains (default is `C:\Program Files (x86)\nodejs`) node.exe and npm.cmd to your environment variables to make sure you can easily run them from anywhere. Here’s a nice guide to [adding, removing and editing environment variables in Windows 7](http://www.itechtalk.com/thread3595.html). The normal thing to do here, is to add it to the `path` variable, if it’s not there already, feel free to create it.

## CoffeeScript compiler

Installing the CoffeeScript compiler and Node.js tools is pretty straight forward when we open up a command window and use npm:

```console
npm install coffee-script
```

<span style="font-size:smaller;">
    **Warning**: be sure to open the command window on the same folder as your Node.js installation, that means where node.exe lives (default is `C:\Program Files (x86)\nodejs`).
    You will need to open the command windows as administrator to do this.
    Because npm will not use an absolute path to create new folders, but will use `./node_modules`.
    So it will create a new folder in a location you don't want it to be if you don't pay attention.
</span>

This installs CoffeeScript stuff for Node.js and on Windows it has a .cmd to run coffee-related stuff through Node.js automatically. The default folder for these .cmd files is `C:\Program Files (x86)\nodejs\node_modules\.bin` and you should add this to your environment variables too (preferably the existing `path` variable). After doing all that, you should be able to run `coffee` in your command window.

## CoffeeScript in Sublime

To get CoffeeScript support in Sublime, we’re going to download the CoffeeScript package. First off, it’ll be useful to install Sublime Package Control, to make it easier to install packages. Detailed instructions can be found here: [http://wbond.net/sublime_packages/package_control/installation](http://wbond.net/sublime_packages/package_control/installation)

Now, when we restart Sublime, we can access package control through the Command Palette using `Ctrl+Shift+P`. As you start typing commands, you get an overview of the available options. If you execute `discover packages`, a browser pops up giving you a nice overview of all available packages and a search bar. To install a package, we need the command `install package`. After pressing enter we get a list of all available packages. We will install "CoffeeScript".

## Building it

After doing all that we already have some support for the language, i.e. syntax highlighting. But building the scripts will not yet work on Windows. To fix this, click `Preferences –> Browse Packages...` in Sublime. This will open an explorer window where you can see all the packages. Navigate to `CoffeeScript\Commands` and open the file `CoffeeScript.sublime-build`. Remove the line that has the path variable and change the cmd line to have `coffee.cmd` instead of `coffee`.

Original version:
```json
{
"path": "$HOME/bin:/usr/local/bin:$PATH",
"cmd": ["coffee","-c","$file"],
"file_regex": "^(...*?):([0-9]*):?([0-9]*)",
"selector": "source.coffee"
}
```

Edited version:
```json
{
"cmd": ["coffee.cmd","-c","$file"],
"file_regex": "^(...*?):([0-9]*):?([0-9]*)",
"selector": "source.coffee"
}
```

Now create a file, save it as `test.coffee`, add some CoffeeScript, press `Ctrl+B` and Sublime creates a file called `test.js` in the same folder.

CoffeeScript file:
```js
console.log "Hello world!"
```

JavaScript file:
```js
(function() {

console.log("Hello world!");

}).call(this);
```

You can adjust the build settings to your own needs, e.g. change the output directory or include [JSLint](http://www.jslint.com/). But for getting to know CoffeeScript and playing with it locally, this will work. And it makes it a lot easier! We can also for example integrate building LESS files to CSS in the same way. That would provide a uniform way of building different scripts and styles in a project and prevents us from having to use the command line to do everything manually, which would slow us down.
