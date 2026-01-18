---
title: "Track your BitBucket repository with Google Analytics"
date: 2012-07-11 06:52:00
tags: ["version control", "analytics"]
---
Recently I released [my first open source code out in the wild]({{ "2012-05-21-introducing-nugetfight.md" | inputPathToUrl }}), but I had no idea if people were actually looking at the code at all. We use Google Analytics on [NuGet Fight](http://nugetfight.com), so I figured it would be nice to have the statistics for the repository in there as well. As it turns out this is possible with BitBucket!

## Setting it up

First, in Google Analytics go to account administration and click the "New Account" button. Set this up with [http://bitbucket.org](http://bitbucket.org) as the URL. Fill in the other information and click "Create Account".

Google Analytics now creates your account and a website profile automatically and brings you to a page that displays your Google Analytics key. Copy that key and go to the admin page of your BitBucket repository. The repository details screen actually has a field called "Google Analytics key", paste your key there and save the settings.

![Google Analytics for BitBucket](/img/2012/07/GoogleAnalyticsBitBucket_Key.png)

Now go back to the Google Analytics page from before and open the "profiles" tab. As mentioned before Analytics already created a profile for you, but you'll need to change some settings. It's probably a good idea to change the name of the profile, which has the same name as the account by default. More importantly, change the website URL to the full URL to the repository.

![Google Analytics for BitBucket](/img/2012/07/GoogleAnalyticsBitBucket.png)

Now when you save this and check the status on the "Tracking Code" tab, it should say "Receiving Data" instead of "Tracking Not Installed". Keep in mind this might take a few minutes.

## Start tracking!

If you have multiple repositories on BitBucket and want to add all of them, it gets easier after the first time. You can use the same account and just add more website profiles. You just have to insert the full URL and save the Google Analytics key on BitBucket.

Tracking visitors on your repository can give you some insight into how interested people actually are in seeing your code and where those people come from. I sure thought it was interesting to see visitor stats for [the NuGet Fight repository](https://bitbucket.org/kevinpelgrims/nugetfight)!
