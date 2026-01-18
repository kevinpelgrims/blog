---
title: "Android development tips - Eclipse crash on deploy"
date: 2012-05-23 07:43:00
tags: ["android", "eclipse"]
---
<img style="float: right; margin: 0 0 5px 10px" alt="eclipse logo" src="{{ site.baseurl }}/img/2012/05/eclipse.png" />
Last week I added a new external library to an Android project and all of a sudden Eclipse started crashing half of the times I wanted to deploy my app to a phone. The error I got looked like this: "Conversion to Dalvik format failed: Unable to execute dex: Java heap space". But sometimes I would get "Internal error – An out of memory error has occurred" or "GC overhead limit exceeded". I restarted Eclipse, I even rebooted my laptop, nothing seemed to work.

## Heap space
So I found some questions of other people with the same problems on the Net. It seems that the best way to fix this is by changing some values in the eclipse.ini file.

At the bottom of that file there are two values that, by default, say -Xms40m and -Xmx384m. If you change those to make them bigger, for example -Xms512m and -Xmx512m the error stops occurring (or at least it did for me).

## Not only an error fix
What we're actually doing here is setting the heap space to 512MB, instead of the default 40MB with a maximum of 384MB. The nice thing is that this does not only fix the problem, it also makes your builds faster and deployment to Android ... a little less slow. So definitely try this, even if you don't get an error!
