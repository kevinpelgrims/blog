---
title: "Project progress tracking with Google Docs and Trello"
date: 2012-03-05 08:24:00
tags: ["tools", "analytics"]
---
I recently discovered some really powerful features in Google Docs. When you're in a Google Docs spreadsheet, you can do a whole lot of interesting things. For example it's possible to consume XML, including XPath functionality, and easily parse JSON. For more advanced stuff, you can use [Google Apps Script](https://en.wikipedia.org/wiki/Google_Apps_Script) and you can even access other Google applications from there. You could send an email or add an item to your calendar from there. It's possible to trigger those scripts on certain events or with a timer. You can see that there is A LOT of potential here and I actually wonder why we're not all using this some more. I decided to play with it, to see what the possibilities are. For the purpose of this blog post, I made a progress tracker that uses data from a [Trello](https://trello.com/) board.

## Code52
I wanted to track a project with enough tasks to make sure there's enough data, but also with quick advances. So one of the [Code52](http://code52.org/) seemed like a great idea. They're doing a new project each week of the year and they're doing it open source from the ground up. Everybody is welcome to make suggestions and even participate in the programming! If you haven't heard of them, check out the website. Also an advantage is their use of Trello.

## Trello
[Trello](https://trello.com/) is one of the most popular free/simple project management tools out there. Basically you have a board with some lists to order your tasks. I'm using Trello for personal projects, projects at work and projects with friends. It's simple, gives you a good overview and has no explosion of functionality or settings that are impossible to find. Another cool thing about Trello is that they have a public API. A personal key is necessary to use the API though. All the information needed is in the [API documentation](https://trello.com/docs/), which is really good and has examples on everything.

## Using the Trello API in Google Docs
As I said before, Google Docs can easily parse JSON, which is very convenient when you want to use the [Trello API](https://trello.com/docs/).

The first thing we need to work with the Trello API is a personal key, which is described in the docs. Once you have that you can start messing around with the API to figure out how things work. By looking at the examples and trying a few things straight in the browser it's easy to get a grasp of how everything fits together. When you're done reading the basics and getting a key, it's time to fire up Google Docs and create a new spreadsheet.

![Google Docs script editor](/img/2012/03/googledocs_script_editor.png)

To start using scripts in Google Docs, just create a new spreadsheet, Tools > Script editor... and you can get started. To fetch data there's a little function available called UrlFetchApp.fetch(url). To parse the resulting JSON data, you can just use Utilities.jsonParse(data). The URL needed to fetch JSON from a Trello board is "https://api.trello.com/1/url?key=apikey". In this case we need to get all the lists from a board, so "url" here will be "boards/4f49efbbd105c95e0c12332e/lists". This all works nicely together and should give you a list of the lists on the Trello board for the Code52 project. You can debug through the script to check the results of what you're doing without having to write it to the spreadsheet every time.

## Getting data from Trello

Based on the snippets above, we can now make a function to fetch data from Trello in a generic way. This is how I did that:

```js
function trelloFetch(url) {
  var key = "insertyourkeyhere";
  
  var completeUrl = "https://api.trello.com/1/" + url + "?key=" + key;
  
  var jsondata = UrlFetchApp.fetch(completeUrl);
  var object = Utilities.jsonParse(jsondata.getContentText());
  
  return object;
}
```

This way it's easy to get anything needed from Trello, using the one function. If something needs to change, there's only one place. DRY FTW!

## Automatically fetch data

To make sure the script runs at a certain interval, it's possible to set a timer. In the script editor click Triggers > Current script's triggers... and create a new one. Set it to Time-driven and adjust to the interval at which you want it to run. To get project progress data from a Trello board, 8 hours should be fine. Also, be sure to set up an execution failure notification, so you get informed when the script fails to run.

![Google Docs script trigger](/img/2012/03/googledocs_script_trigger.png)

## Counter

So the whole point is to run this with a timer, every 8 hours. To make sure every increment appears on a new row in the spreadsheet, you will need some kind of counter. This counter needs to be incremented every time the script gets executed. To make sure that happens, you can just put an integer in the spreadsheet and then the script gets the value when it runs. When the script is done, it increments the integer.

```js
var counter = sheet.getRange(1, 9);
var baserow = counter.getValue() + 4;

...

counter.setValue(counter.getValue()+1);
```

So you have to add a counter to the field on 1,9 (or row 1, column I) in the spreadsheet. The baserow var is the integer that's used to determine on which row the data should be saved. The first time the script runs, there's an extra row because the titles need to be added. You can just check if the script has run before using the value of the counter.

```js
if (counter.getValue() == 0) {
  data = getC52I18NMVC4BoardListCount(true);
  sheet.getRange(baserow - 1, basecolumn, 2, 4).setValues(data);
}
else {
  data = getC52I18NMVC4BoardListCount(false);
  sheet.getRange(baserow, basecolumn, 1, 4).setValues(data);
}
```

The first run of the script gets the titles and the values, after that only the values are needed. In this script there is a specified number of columns, this could also be dynamic, that would make the script a bit more dynamic. I should do that later. For now I just want the thing to run.

## The result

After a week my spreadsheet is filled with data and it's easy to use the Google Docs capabilities to make some nice charts. Below is a trend chart (it requires Flash to work, if you can't see anything, I blame Google!) Feel free to play around with it, you can hover over data and change the time range.

<iframe width="600" height="371" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1zC3_g_2hzp_NcSNm7pgRk_MOZDr_EXgEeepogbdb2hY/pubchart?oid=2&amp;format=interactive"></iframe>

Also a very interesting chart, is the area chart. This one shows us the accumulated number of tasks and the growth of the project.

<iframe width="600" height="371" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1zC3_g_2hzp_NcSNm7pgRk_MOZDr_EXgEeepogbdb2hY/pubchart?oid=3&amp;format=interactive"></iframe>

These charts are based on the data in the table below (all times are in the Central European timezone, just so you know).

<iframe width="600" height="371" seamless frameborder="0" scrolling="no" src="https://docs.google.com/spreadsheets/d/1zC3_g_2hzp_NcSNm7pgRk_MOZDr_EXgEeepogbdb2hY/pubchart?oid=1&amp;format=interactive"></iframe>

### Charts update

The charts have stopped working properly and it seems to be impossible to fix them. If you'd like to see them, just open [this page](https://docs.google.com/spreadsheets/d/1zC3_g_2hzp_NcSNm7pgRk_MOZDr_EXgEeepogbdb2hY/pubhtml?gid=0&single=true) which has all the data and the three charts.

## The script

So here's the entire script to fetch data from a Trello of choice, it's actually pretty simple. To use it, a counter is also needed. To make it even cooler it's possible to set it all up so that an email is sent when errors occur. Google Docs can be a nice tool to keep track of progress on a project and this script can be easily extended with some extra functionality. This is just an exploration of the possibilities and apparently Google Docs is really powerful!

```js
function trelloFetch(url) {
  var key = "insertkeyhere";
  
  var completeUrl = "https://api.trello.com/1/" + url + "?key=" + key;
  
  var jsondata = UrlFetchApp.fetch(completeUrl);
  var object = Utilities.jsonParse(jsondata.getContentText());
  
  return object;
}

function getC52I18NMVC4BoardListCount(first) {
  var boardid = "4f49efbbd105c95e0c12332e";
  var url_lists = "boards/" + boardid +"/lists";
  var trello_lists = trelloFetch(url_lists);
  
  var lists = [];
  var listnames = [];
  var listcounts = [];
  
  for (var i = 0; i < trello_lists.length; i++) {
    var listid = trello_lists[i].id;
    var url_cards = "lists/" + listid +"/cards";
    var trello_cards = trelloFetch(url_cards);
    var count = 0;
    
    for (var j = 0; j < trello_cards.length; j++) {
      count++;
    }
    
    listnames[i] = trello_lists[i].name;
    listcounts[i] = count;
  }
  
  if (first) {
    lists[0] = listnames;
    lists[1] = listcounts;
  }
  else {
    lists[0] = listcounts;
  }
  
  return lists;  
}

function getC52I18NMVC4Values() {
  var data;
  var sheet = SpreadsheetApp.getActiveSheet();
  var counter = sheet.getRange(1, 9);
  var baserow = counter.getValue() + 4;
  var basecolumn = 2;
  
  sheet.getRange(baserow, basecolumn - 1).setValue(new Date());
  if (counter.getValue() == 0) {
    data = getC52I18NMVC4BoardListCount(true);
    sheet.getRange(baserow - 1, basecolumn, 2, 4).setValues(data);
  }
  else {
    data = getC52I18NMVC4BoardListCount(false);
    sheet.getRange(baserow, basecolumn, 1, 4).setValues(data);
  }
  
  counter.setValue(counter.getValue()+1);
}
```
