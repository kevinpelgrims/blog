---
layout: post
title: "Cool tool - Neptune (SMTP Testing Server)"
date: 2011-05-12 23:28:09
tags: ["general", "tools"]
---
## Testing e-mails sent from .NET code
It's always a big hassle to test sending e-mails from websites or applications written in .NET (or any other platform/language). Your inbox gets flooded or even worse, customers' inboxes get flooded. Or you've set up a dummy account to test if e-mails get sent. But sometimes e-mail addresses need to be picked up dynamically depending on certain parameters, from a database, for example. Testing gets annoying here. You can debug and check if the address you want is the right one, you can bother people to check their inbox every time you're testing, ...

There has to be a better solution, right? Yes there is!

## Developers, let's start testing!
Thanks to this little tool I found last week, this has become a lot easier. It's actually been around for about 2,5 years already. Too bad I never found out about it earlier :-)

> **UPDATE**: Just found out about this thing, which is on CodePlex, so we can play with the code! It's called smtp4dev and can be found here: [http://smtp4dev.codeplex.com/](http://smtp4dev.codeplex.com/).

Here are URLs to the 3 blogposts by Donovan Brown about the little server app:
* [Neptune](http://donovanbrown.com/post/Neptune.aspx">http://donovanbrown.com/post/Neptune.aspx)
* [Neptune (future features)](http://donovanbrown.com/post/Neptune-(future-features).aspx">http://donovanbrown.com/post/Neptune-(future-features).aspx)
* [Neptune with POP3](http://donovanbrown.com/post/Neptune-with-POP3.aspx">http://donovanbrown.com/post/Neptune-with-POP3.aspx)

_Note: Don't download the application from the first blogpost! The post about POP3 has the latest version._

Be sure to read the documentation, it has everything you need to know about using this tool.

Too bad Donovan has never put this on Codeplex (or any other open source repository), because I think we can all imagine some nice features to add to this little useful thing..
