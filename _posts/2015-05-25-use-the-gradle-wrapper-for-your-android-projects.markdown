---
layout: post
title: "Use the Gradle Wrapper for your Android projects"
date: 2015-05-25 19:00:00
tags: android gradle
comments: true
---
<img src="http://kevinpelgrims.com/blog/files/images/2015/05/gradle_icon.png" style="float: right; width: 250px; margin: 10px;"/>
I sometimes meet Android developers that are using Android Studio and Gradle for their projects, but have no idea what is happening when I start executing `gradlew` in the command line interface. They usually installed Gradle manually, because they figured it was necessary to get their builds to work now that Google is pushing Gradle. Using the Gradle wrapper, however, has huge advantages.

## What is the Gradle wrapper?

Gradle is under constant development, and new versions could potentially break functionality. The Gradle wrapper is a batch file on Windows called `gradlew.bat` or a shell script on Mac OS X and Linux called `gradlew`. When you run this script and the selected version of Gradle is not present, it will be downloaded automatically. If the selected version of Gradle is already downloaded, it functions as a proxy to the local Gradle binary.

The idea behind this is that developers and automated systems that need to build the app can do so just by downloading the repository and running the wrapper, which will take care of the rest. Manually installing Gradle is not necessary, and you don't need to manage several version of Gradle yourself.

Another advantage of using the wrapper is that it enables you to use different versions of Gradle for different projects. If you start a project using Gradle 2.2.1 and start another project using Gradle 2.4, those projects can both be built with the Gradle version they require, even on the same machine.

## It's there by default

When you create a project with Android Studio, the Gradle wrapper is included by default. The necessary files will be copied into the project directory, and you should include them in your repository. (You are using a source control system, right?) So whenever you start a new Android project, you can immediately run the wrapper from the command line interface without extra setup. Instead of running the `gradle` command, just run the `gradlew` command. All the rest is the same.

## Get the wrapper yourself

If you are not creating your Android projects using Android Studio, you can get the wrapper by executing a Gradle task. Of course, in that case, you will need to have Gradle installed. You can download Gradle from the [official website](http://gradle.org/downloads "Gradle download page"), or use a package manager like Homebrew if you're on Mac OS X. Once you have Gradle and it is added to your PATH, run following command in your project folder:

	$ gradle wrapper --gradle-version 2.4

This task will download the wrapper and set the preferred version to 2.4 (the latest at the time of writing this post). If you do not add the version, it will just download the latest version by default.

## Android Studio

Internally, Android Studio uses the version of Gradle that is defined in the wrapper configuration. That configuration can be found in `gradle/wrapper/gradle-wrapper.properties`.
When Google decides that it is time to use a new version of Gradle, Android Studio will display a message nudging you to upgrade. All you need to do then is click the message and Android Studio will edit the properties file and synchronize the Gradle installation for you.

## Read more

You can find more information on the Gradle wrapper in the [Gradle documentation](https://docs.gradle.org/current/userguide/gradle_wrapper.html "Gradle Wrapper documentation").

## TL;DR

Use `gradlew` instead if `gradle`:

* It's there by default
* It's everywhere
* It's always the right version
* You can use different versions of Gradle for different projects

## By the way...

I wrote a book! It is titled "Gradle for Android" and will be available in June. (You can already order it on [Packt's website](https://www.packtpub.com/application-development/gradle-android "Gradle for Android - Packt Publishing").) I got a lot of inspiration and ideas while I was writing, and there are a few things that I had to leave out of the book, but would still like to get out there. This means that I will be doing some more Gradle posts the coming weeks. So stay tuned for more Gradle goodness!

[![Gradle for Android cover](http://kevinpelgrims.com/blog/files/images/2015/05/gradle_for_android_cover.jpg)](https://www.packtpub.com/application-development/gradle-android "Gradle for Android - Packt Publishing")