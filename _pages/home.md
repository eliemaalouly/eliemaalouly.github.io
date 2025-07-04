---
title: " "
layout: splash
permalink: /
date: 2025-06-15
search: false
header:
  overlay_color: "#000"
  overlay_filter: "0.4"
  overlay_image: /assets/images/home/hero.png
  min_height: 45vw
  max_height: 66.7vw
  image_position: bottom center
intro: 
  - excerpt: 'Finding clarity in the things no one asked to be clarified.'
feature_row1:
  - image_path: /assets/images/posts/greek-myth-network1/hero.png
    title: "Part I: Assembling the Cast of Gods, Heroes and Monsters"
    excerpt: "In this first part, I scrape a dataset of greek mythological texts and characters and cleaned the data for information extraction. Using the scraped data I was able to extract connections between characters. This structured dataset sets the stage for uncovering patterns of influence and centrality in the mythological universe."
    url: "/posts/greek-myth-network1/"
    btn_label: "Read More"
    btn_class: "btn--primary"
feature_row2:
  - image_path: /assets/images/posts/greek-myth-network2/hero.png
    title: "Part II: Who's Really at the Center of the Drama?"
    excerpt: "In this second part, I analyze the network of Greek mythological characters, revealing who is most central, how communities form, and how character roles shift between Greek and Roman texts."
    url: "/posts/greek-myth-network2/"
    btn_label: "Read More"
    btn_class: "btn--primary"
---

{% include feature_row id="intro" type="center" %}{: style="text-align: center;"}

<div style="text-align: center;">
  <h1>Selected Favorites</h1>
</div>

## Mapping the Mythos

A series of posts exploring the social network of Greek mythological characters, revealing the intricate relationships and central figures in these ancient stories.

{% include feature_row id="feature_row1" type="left" %}

{% include feature_row id="feature_row2" type="right" %}

<div id="homepage-duck-counter" class="duck-highlight">
  <img src="/assets/images/misc/rubber_duck.svg" alt="Rubber Duck" style="height: 1.5em; vertical-align: middle; margin-right: 0.4em;">
  <span id="duck-count">...</span> ducks found by curious readers! <a class="btn btn--small btn--primary" id="confusedBtn">I'm confused</a><div id="confusedTooltip" class="custom-tooltip">Then you haven't found one yet!</div>
</div>{: style="text-align: center;"}


<script>
  document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("confusedBtn");
    const tooltip = document.getElementById("confusedTooltip");

    btn.addEventListener("click", function (e) {
        e.preventDefault();

        const rect = btn.getBoundingClientRect();
        tooltip.style.left = `${rect.left + window.scrollX - 120}px`;
        tooltip.style.top = `${rect.top + window.scrollY + 40}px`;
        tooltip.style.display = "block";

        setTimeout(() => {
            tooltip.style.display = "none";
        }, 3000);
    });
  });
</script>

