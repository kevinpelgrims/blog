---
layout: post
title: "Reference a local .aar in your Android project"
date: 2014-05-18 21:05:01
categories: android gradle
---
If you create an Android library project and you don't want to upload it to Maven central or run a local repository, it's a little tricky to add your .aar to an Android project.

According to the [release notes for Android Studio 0.4.4](http://tools.android.com/recent/androidstudio044released) support for .aar files was added there. To quote the note:
> Newly created projects are initialized with the right build.gradle setup such that you can simply put .jar and .aar files into the libs/ directory and they will automatically be used (similar to how the libs/ folder worked in Eclipse ADT.)

Now, I might be doing something completely wrong, but for me this simply does not work. I have tried to add a library project using things like `compile files('libs/library.aar')` and `compile fileTree(dir: 'libs', include: '*.aar')`, but all of them failed.

So I gave up on that and instead started to use a different way. With Gradle it is possible to create a repository from a basic directory using `flatDir`

    repositories {
        mavenCentral()
        flatDir {
            dirs 'libs'
        }
    }

In this example, we'll put the .aar file in the `libs` folder, but you could use any folder you like. If you prefer to store your library projects in a separate folder like `aars` instead of `libs`, that is a possibility.

The next step is of course to reference the actual library. There are two ways of doing this.

    dependencies {
       compile 'com.kevinpelgrims.library:library:1.0.0@aar'
    }

The `@aar` is necessary to specify the type of the dependency. The namespace though seems to be completely useless. This is definitely a lot easier then setting up your own Maven repository. The annoying thing about this is that you still need to update the version on every update. In recent versions of Android Studio it is also possible to add the dependency in a different way.

    dependencies {
        compile(name:'libraryfilename', ext:'aar')
    }

This makes it a lot easier to maintain the dependency itself. Now when you update the file, you don't need to update the version number in the Gradle build file.

Although this is a good workaround, it seems like there is no official solution yet. I hope Google will address this problem in the near future. You can star/follow [an issue on this on the Android issue tracker](https://code.google.com/p/android/issues/detail?id=55863) that was reported a year ago and is still open.
