---
layout: post
title: "Adding a badge to an ActionBar tab"
date: 2014-06-24 20:12:02
tags: android ui
comments: true
---
An app I worked on a while ago has a notifications screen where the notifications are divided into tabs. So in order to make it very clear how many notifications are on each tab, we decided to have a "badge" on every tab. Here's an example of what I mean:

![ActionBar tab badge example]({{ site.baseurl }}/files/images/2014/06/android_actionbar_tab_badge.png)

It's not possible to just add views to the tab view, so to do this you need to completely override it instead. I've seen a bunch of questions on StackOverflow regarding custom tab views and even adding a badge, but none of them seem to have a good answer. So I decided to write things up here when I was done with my solution.

## Re-create the standard tab view

The first thing you need to do is re-create the standard tab view. It's possible to do this in code, creating a `TextView` and setting its properties. To make sure you get the text to look exactly like the standard tab view text, you can use the `TabText` `TextAppearance` from the support library. The code snippet below also sets a custom background, because one of the requirements was to have different colors for the tab indicators. You could possibly use a background from the support library there as well.

```java
public static View renderTabView(Context context, int titleResource, int backgroundResource) {
    TextView view = new TextView(context);
    view.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,  ViewGroup.LayoutParams.MATCH_PARENT));
    view.setGravity(Gravity.CENTER);
    view.setText(titleResource);
    view.setTextAppearance(context, android.support.v7.appcompat.R.style.Widget_AppCompat_Light_ActionBar_TabText);
    view.setBackgroundResource(backgroundResource);
    return view;
}
```

This works, but I prefer using XML for views. If you want to add a badge to the tab view later, creating the layout in XML is a lot easier anyway.

```xml
<TextView
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:textAppearance="@style/Widget.AppCompat.Light.ActionBar.TabText"/>
```

The layout file sets most of the visual elements of the view, but you still need to set the `LayoutParams` in code, because of how the views get drawn by Android. The background resource here is still set in code, but if you have a fixed background, you can handle that in XML as well.

```java
public static View renderTabView(Context context, int titleResource, int backgroundResource) {
    TextView view = (TextView) LayoutInflater.from(context).inflate(R.layout.tab_default, null);
    // We need to manually set the LayoutParams here because we don't have a view root
    view.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
    view.setText(titleResource);
    view.setBackgroundResource(backgroundResource);
    return view;
}
```

## Add the tab to the ActionBar

Now you need to set the custom view when you add the tab to the `ActionBar`. The `renderTabView()` method from before will create the view you need.

```java
actionBar.addTab(actionBar.newTab()
	.setCustomView(renderTabView(NotificationsActivity.this, R.string.tab_invitations, R.drawable.tab_orange))
	.setTabListener(tabListener));
```

The `R.drawable.tab_orange` drawable is a selector that has a transparent background in most states, but has the tab indicator when selected.

## Add the badge

Now you can add the actual badge to the tab view. You should wrap the `TextView` from before in a `FrameLayout` and add a new `TextView` that will act as the badge.

```xml
<FrameLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/tab_text"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:gravity="center"
        android:textAppearance="@style/Widget.AppCompat.Light.ActionBar.TabText"/>

    <TextView
        android:id="@+id/tab_badge"
        android:layout_width="@dimen/badgeSizeHome"
        android:layout_height="@dimen/badgeSizeHome"
        android:background="@drawable/badge_background"
        android:layout_marginRight="4dp"
        android:layout_marginTop="4dp"
        android:layout_gravity="top|right"
        android:gravity="center"
        android:textColor="@color/white"
        android:textSize="8dp"/>

</FrameLayout>
```

The `@drawable/badge_background` drawable is just an oval shape with a background color.

You then also need to update `renderTabView` to take in a number to display in the badge. If you want to update the number in the badge after creating the tab view, you can use `updateTabBadge`. That method will also hide the badge if the number is not bigger than 0.

```java
public static View renderTabView(Context context, int titleResource, int backgroundResource, int badgeNumber) {
    FrameLayout view = (FrameLayout) LayoutInflater.from(context).inflate(R.layout.tab_badge, null);
    // We need to manually set the LayoutParams here because we don't have a view root
    view.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
    ((TextView) view.findViewById(R.id.tab_text)).setText(titleResource);
    view.findViewById(R.id.tab_text).setBackgroundResource(backgroundResource);
    updateTabBadge((TextView) view.findViewById(R.id.tab_badge), badgeNumber);
    return view;
}

public static void updateTabBadge(ActionBar.Tab tab, int badgeNumber) {
    updateTabBadge((TextView) tab.getCustomView().findViewById(R.id.tab_badge), badgeNumber);
}

private static void updateTabBadge(TextView view, int badgeNumber) {
    if (badgeNumber > 0) {
        view.setVisibility(View.VISIBLE);
        view.setText(Integer.toString(badgeNumber));
    }
    else {
        view.setVisibility(View.GONE);
    }
}
```

And that's it. You now have a way to easily set a different background to every tab and add and update a badge on the tab view.

If you want to see all the used code and layouts, check out [this gist](https://gist.github.com/kevinpelgrims/8685c8e1a68e3cd9cff9).

<script src="https://gist.github.com/kevinpelgrims/8685c8e1a68e3cd9cff9.js"></script>
