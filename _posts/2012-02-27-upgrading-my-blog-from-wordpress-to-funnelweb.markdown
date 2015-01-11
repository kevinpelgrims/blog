---
layout: post
title: "Upgrading my blog from WordPress to FunnelWeb"
date: 2012-02-27 21:02:45
categories: general .net tools web
---
#Moving my blog away from WordPress

One of my resolutions for the year was to move my blog from WordPress to my own personal hosting. I have a few reasons for this.

* First of all, the editor in WordPress is really, really, really bad. I want to have control over the generated output and WordPress always wants to change everything I do.
* Second reason is control. I want a blogengine that I can adjust or extend more easily. I do realize that I could install WordPress on my own hosting account and use plugins, but I'd like to dig in the code as well.
* Third reason is statistics. I like looking at my blogstatistics, even though they're not that spectacular. The stats in WordPress are very limited and very slow. Though I guess you could have third party stats in a WordPress installation..
* It's very tightly coupled. It should be easy to change blogengine, WordPress makes this really complicated.

#The quest for the right blogengine

So based on my "complaints" about WordPress, I made the following requirements for my choice of blogengine:

* Markdown support. This is absolutely the nicest way to write blogposts. Heck, I want to write all my documents in markdown! No hassle with closing tags (as in HTML) and no selecting and clicking toolbars (as in Word).
* Open source. A blogengine that has its source publicly available is not only more easy to adjust to my needs, but might also have a lot of other users sending in their own adjustments. Which I believe will lead to better quality in the end. I don't care that much about the language it is written in. I know .NET, some PHP and Java and have played with Ruby. Besides, once you know one language, you know them all!
* Google analytics. I haven't seen a better way to get some nice stats without paying for it.
* Disqus for comments. It's being used on a lot of blogs now and has proven it's value.
* FeedBurner to keep people informed. I can easily change the address of the feed later without anyone noticing it.

#FunnelWeb VS Octopress

After some research there were two blogengines left. One written in C# and ASP.NET MVC, the other one in Ruby. The bigger difference however, is the way they generate output. [FunnelWeb](http://www.funnelweblog.com/) takes the traditional database approach. [Octopress](http://octopress.org/) is more of a static page generator. In the end I went for FunnelWeb because I prefer to have a database online, that makes it easier to make quick changes to the layout for example.

#The plan

* [FunnelWeb](http://www.funnelweblog.com/)
* [Disqus](http://disqus.com)
* [FeedBurner](http://feedburner.google.com/)
* [Google Analytics](http://www.google.com/analytics/)

#Getting everything out of WordPress

Getting my blogposts out of WordPress is pretty straightforward. WordPress has an export function, which creates a XML file. You can choose to export only your posts, only your pages, or everything (pages, posts, comments and some other stuff). It's nice that they provide a simple way to do this. The format was not all that user friendly though...

#Getting everything in FunnelWeb

It took some Googling and puzzling to get the posts in FunnelWeb. The format of the XML provided by the WordPress export is not really standard, so you have to do some conversion first. FunnelWeb has the option to import stuff from BlogML, so I needed a tool to convert the WordPress file to regular BlogML. I used an application called [WXR 2 BlogML](http://www.visualsoftware.net/Blog/post/2009/10/27/WordPress-eXtended-RSS-to-BlogMl-converter-WXR-2-BlogML.aspx). That did its job fine. One thing to note though, it's best to remove the lines that contain references to "atom" from the original XML, because it tends to throw some exceptions when those are still in there.

#Getting comments in Disqus

This was definitely the hardest part! I spent a LOT of time figuring out what was going wrong here. I used the export from WordPress to get the comments in Disqus, with the nice import functionality on the Disqus website. I could see the comments in Disqus, but they never showed up on my blog. I could add comments on my blog, they would show up in Disqus and then they would be there on my blog too. But what about the old comments? Something weird was going on there. I thought the problem was with FunnelWeb and spent some time digging in the code and abusing developer tools in every browser to figure things out. But I couldn't find a thing. When I was close to giving up [Koen Metsu](http://koenmetsu.com/) came up with the (strange) solution. Apparently all I needed to do was remove the trailing slashes in links to posts from the comments in the XML file from WordPress.

For example, this:
{% highlight xml %}
<wp:comment_author_url>http://kevinpelgrims.wordpress.com/2010/04/27/powershell-2-0-background-jobs/</wp:comment_author_url>
{% endhighlight %}

Becomes:
{% highlight xml %}
<wp:comment_author_url>http://kevinpelgrims.wordpress.com/2010/04/27/powershell-2-0-background-jobs</wp:comment_author_url>
{% endhighlight %}

Yes, the only difference is the frikkin slash... Then when I imported to Disqus everything just magically worked! That was a nice moment, because I was getting seriously annoyed and almost considered just dropping all the old comments. Thanks Koen for figuring that out!

#Google Analytics

Setting up Google Analytics is pretty much just following the steps, everything is very straightforward. A nice tip though is [this explanation](http://aijazansari.com/2011/12/20/excluding-yourself-from-google-analytics/) on how to exclude yourself from the results using a cookie. You basically need to set up an exclusion rule in Analytics, create a HTML file with some JavaScript from Google and visit that page. Again, follow the steps described on the website.

#FeedBurner

I also decided to get my feed on [FeedBurner](http://feedburner.google.com/). It's one more building block to the whole flexible construction my blog has become. If I decide to change blogengine again, I don't have to tell people to change their subscription, I just change the feed in FeedBurner and it's taken care of.

#MarkPad

To write this blogpost I'm using [MarkPad](http://code52.org/DownmarkerWPF/). While not completely perfect yet, it is the most beautiful markdown editor out there (at least, that's what I think). It's also an open source effort, started by the [Code52](http://code52.org/) initiative. Be sure to check them out, as they have a lot of cool projects going on.

Also useful is [this good markdown reference](http://daringfireball.net/projects/markdown/syntax).

#Result

My blog has become a very loosely coupled project. Everything can be taken apart and if I ever decide to change blogengine again, I can easily just use the comments from Disqus, change my feed in FeedBurner and export my comments in BlogML. The markdown layout makes it look pretty in the backend. I like!

I still have some styling to do, but I can do that while the blog is online. A bit more pressure to get things done will only be more motivating ;-) So far I'm using a standard theme with some adjustments. FunnelWeb has really nice theming and extension features that make it pretty easy to create your own stuff on top of what is already there, without changing all of the FunnelWeb code itself. Check out the [FunnelWeb website](http://www.funnelweblog.com/) if you're interested!

It didn't go as smooth as I'd hoped, but I guess I never really expected it to be a walk in the park. Damn computers! Overall I'm very pleased about the whole process and all the tools I'm using do their job very well!
