---
layout: post
title: "Format source code on WordPress"
date: 2010-03-04 12:23:27
tags: ["general"]
---
I had a few people asking me how I managed to format the source code for my PowerShell posts, so here's a short explanation. Just type (or paste) your post and when it's time to insert the source code, switch to HTML view.

There you can insert these tags:
```
[sourcecode language="csharp"]
somecode
[/sourcecode]
```

And it will come out like this:

```
if(formatting)
{
  return &quot;Yay!&quot;;
}
```

Yes, that's all there is to it.

There are actually quite a few languages that are supported. You can see the full list and an explanation on some extra parameters on this official WordPress page: [http://en.support.wordpress.com/code/posting-source-code/](http://en.support.wordpress.com/code/posting-source-code/)
