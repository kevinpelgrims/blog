---
layout: post
title: "Android development tips - Style inheritance"
date: 2012-06-25 07:45:04
categories: android
---
It's a good habit to use styles in your Android application to do layouts or style fonts that occur in multiple places. It also makes it a lot easier to change the layout of your app later. And styles in Android get even cooler once you figure out how to reuse them!

##Styles

<img style="float: right; margin: 5px 0 5px 10px; width: 250px;" alt="android logo" src="http://kevinpelgrims.com/blog/files/images/2012/05/android.png" />

In a project at work, we have a style called "NormalText" which takes care of a lot of the text in the app. So instead of this:

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="14sp"
        android:textColor="#000000"
        android:text="@string/hello" />

You can just do this:

    <TextView
        style="@style/NormalText"
        android:text="@string/hello" />

Thanks to this styles.xml file:

    <?xml version="1.0" encoding="utf-8"?>
    <resources>
        <style name="NormalText">
            <item name="android:layout_width">wrap_content</item>
            <item name="android:layout_height">wrap_content</item>
            <item name="android:textSize">14sp</item>
            <item name="android:textColor">#000000</item>
        </style>
    </resources>

##Inheritance
Now if you need to layout some text with the same properties as another style, this is actually pretty straight forward in Android. All you need to do is prefix your new style name with the name of the parent style.

    <style name="NormalText.Green">
        <item name="android:textColor">#00ff00</item>
    </style>

Not only will this make it easier to create styles, it will also make it easier to change styles. If you need the font to be bigger, you only need to change it in one place. This makes maintaining styles a lot easier!

##Inherit from built-in Android styles
There are also a bunch of built-in Android styles available when you're developing an app. It is possible to inherit from these styles as well, but you need to take a different approach. Instead of prefixing the name, you set the parent attribute of the style you're creating.

    <style name="RedText" parent="@android:style/TextAppearance">
        <item name="android:textColor">#ff0000</item>
    </style>
 
The sad thing is that the built-in Android styles are not really documented by Google. All you get is [a list of the constants in the R.style class](http://developer.android.com/reference/android/R.style.html). So to actually figure out what these styles look like, you will have to experiment with them. I tried to find an overview online, but it seems that doesn't exist. If you know of such an overview, please let me know, so I can link it here - and use it myself :-)

This simple technique can speed up styling in your app and makes it a lot easier to reuse styling you already did. And don't forget to take advantage of the built-in Android styles!
