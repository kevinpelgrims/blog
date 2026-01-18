---
title: "MapGuide OS - Failed while processing WebVirtualDirs"
date: 2011-08-11 14:01:12
tags: ["gis"]
---
<img style="float:left;margin-right:5px;" title="Error!" src="{{ site.baseurl }}/files/images/2011/08/error.png" alt="" width="120" />
When you are installing MapGuide OS and you encounter following error:

`Failed while processing WebVirtualDirs`

Fear not, because here is the solution!

The problem is with how MapGuide OS is trying to install its websites. This is not configurable during the installation and will by default be installed in a website called "Default Web Site" on port 80. This is the website that is created for you when IIS is installed. If you change the name of the website or the port number, the MapGuide OS installation freaks out!

So the simplest solution is to create a website called "Default Web Site" and have it run at port 80. You can then edit those settings after the installation is done without any problems, so you can still run the MapGuide OS websites on a different port.

If you need some more explanation, there is an [interesting thread](http://osgeo-org.1803224.n2.nabble.com/Installation-error-td3858392.html) with a [good answer by Jason Birch](http://www.jasonbirch.com/nodes/).
