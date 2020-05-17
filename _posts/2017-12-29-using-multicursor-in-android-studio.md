---
layout: post
title: "Using multicursor in Android Studio"
date: 2017-12-29 16:30:00+01:00
tags: android tools
comments: true
---

One of the most useful methods for editing multiple lines of code or XML in Android Studio (or IntelliJ) is multicursor. This is a feature that makes it possible to edit multiple lines at the same time. There are a few shortcuts you need to remember before you can really take advantage of multicursor, and this is basically a cheat sheet with the most useful multicursor-related shortcuts.

## Multiple carets

There are a few different ways to add and remove carets, depending on the situation.

With the **mouse**, use `Shift+Alt+Click` to add a caret and `Shift+Alt+Click` on a caret to remove it. If you need a faster way to add a bunch of carests, you can press `Alt` while clicking and dragging vertically to select a block or a line.

With the **keyboard**, press `Ctrl`(Windows & Linux) / `Alt`(macOS) twice, and then without releasing it, press up or down arrow keys. To delete all the existing carets, except the primary one, press `Esc`.

## Multiple selections

There are also several ways to select multiple occurrences of the same text.

You can manually create new selections by pressing `Shift+Alt` and double-clicking the left mouse button. If you want to select matching pieces of text, press `Alt+J` (Windows & Linux) / `Ctrl+G` (macOS) to automatically find and select the next occurrence of the currently selected text.

![Select next occurrence demo]({{ site.baseurl }}/files/images/2017/12/multicursor_ctrl_g.gif)

If you need to select all the occurrences, you can speed it up by using `Shift+Ctrl+Alt+J` (Windows & Linux) / `Ctrl+Cmd+G` (macOS).

![Select all occurrences demo]({{ site.baseurl }}/files/images/2017/12/multicursor_ctrl_cmd_g.gif)

## Editing

When you make multiple selection, you can edit all the pieces of text at the same time, and use `Esc	` to deselect all, except the primary one.

![Edit and escape demo]({{ site.baseurl }}/files/images/2017/12/multicursor_edit_escape.gif)

![Deselect demo]({{ site.baseurl }}/files/images/2017/12/multicursor_deselect.gif)

## Resources

* [https://www.jetbrains.com/help/idea/multicursor.html](https://www.jetbrains.com/help/idea/multicursor.html)
* [https://blog.jetbrains.com/idea/2014/03/intellij-idea-13-1-rc-introduces-sublime-text-style-multiple-selections/](https://blog.jetbrains.com/idea/2014/03/intellij-idea-13-1-rc-introduces-sublime-text-style-multiple-selections/)
* [https://www.jetbrains.com/help/idea/selecting-text-in-the-editor.html#column_selection](https://www.jetbrains.com/help/idea/selecting-text-in-the-editor.html#column_selection)
