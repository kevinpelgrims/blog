---
layout: page
title: "Blog"
permalink: /blog/
---

<div class="home">

    <h1 class="page-heading">Posts</h1>

    <ul class="post-list">
        {% for post in site.posts %}
        <li>
            <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>

            <h2>
                <a class="post-link" href="{{ site.baseurl | append: post.url }}">{{ post.title }}</a>
            </h2>
        </li>
        {% endfor %}
    </ul>

    <p class="rss-subscribe">Subscribe <a href="http://feeds.feedburner.com/KevinPelgrims">via RSS</a></p>

    {% include all-tags.html %}

</div>
