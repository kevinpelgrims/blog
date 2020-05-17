---
layout: post
title: "Sharepoint tips and tricks"
date: 2010-01-15 22:27:28
tags: sharepoint
comments: true
---
Recently I added a webpart to a page in Sharepoint with some bad code in it. As a result I wasn't able to load the page anymore. The only thing I had to do was remove the webpart, so I found this little trick. If you add <strong>?Contents=1</strong> to the end of the URL of the page containing the webpart it displays the Webpart Page Maintenance page. Here you can remove the bad webpart.

An example of a URL: **http://moss/default.aspx?contents=1**

After that I decided to collect some tricks and add them here, so here is a small list of links to useful Sharepoint resources.

* [http://www.heathersolomon.com/blog/articles/sp07urls.aspx](http://www.heathersolomon.com/blog/articles/sp07urls.aspx)
  <br />
  Sharepoint 2007 **URL Quick List**, containing a list of commonly used Sharepoint URLs (like the one above).
* [http://sharepointjavascript.wordpress.com/2009/09/20/showing-or-hiding-list-fields-based-on-membership-in-a-sharepoint-group/](http://sharepointjavascript.wordpress.com/2009/09/20/showing-or-hiding-list-fields-based-on-membership-in-a-sharepoint-group/)
  <br />
  This one was very useful for **hiding fields** in a form based on the group a user was (not) in. Uses jQuery and some other JavaScript files. Very cool.
* [http://officetoolbox.codeplex.com/](http://officetoolbox.codeplex.com/)
  <br />
  Form settings is a nice feature to completely **hide certain fields** in forms, without writing code. Integrates with Sharepoint nicely.
* [http://geekswithblogs.net/naijacoder/archive/2007/09/23/115552.aspx](http://geekswithblogs.net/naijacoder/archive/2007/09/23/115552.aspx)
  <br />
  When you create **webpartpages the navigation on the left side is gone**. Using Sharepoint Designer this can easily be fixed.
* [http://www.sharepointology.com/development/customize-the-people-search-results-part-1/](http://www.sharepointology.com/development/customize-the-people-search-results-part-1/)
  <br />
  Very good post on **customizing** the results of **people search** in MOSS.
* [http://sqlsrvintegrationsrv.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=17652](http://sqlsrvintegrationsrv.codeplex.com/Release/ProjectReleases.aspx?ReleaseId=17652) 
  <br />
  If you have to migrate data from SQL Server to Sharepoint lists or vice versa and you can use **Integration Services**, this will be very useful. It adds a Sharepoint list source and destination to the toolbox of Business Intelligence Development Studio.
* [http://sharepointmagazine.net/technical/administration/everything-you-need-to-know-about-bdc-part-1-of-8](http://sharepointmagazine.net/technical/administration/everything-you-need-to-know-about-bdc-part-1-of-8)
  <br />
  Everything you need to know about **Business Data Catalog**. Great starting guide.
* [http://blah.winsmarts.com/2007-12-SharePoint_and_SQL_Server_Reporting_Services.aspx](http://blah.winsmarts.com/2007-12-SharePoint_and_SQL_Server_Reporting_Services.aspx)
  <br />
  Very good starting guide on using **Reporting Services** in Sharepoint.
