---
layout: none
permalink: /random
sitemap: false
search: false
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Redirecting...</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: #fff;
      color: #000;
      font-family: sans-serif;
      display: none;
    }
  </style>

  <script>
    const posts = [{% for post in site.posts %}"{{ post.url | relative_url }}",{% endfor %}];
    const pick = posts[Math.floor(Math.random() * posts.length)];
    window.location.replace(pick);
  </script>
</head>
<body>
  <noscript>
    <p>JavaScript is required to view a random post.</p>
    <p><a href="{{ site.posts | sample | relative_url }}">Click here for one.</a></p>
  </noscript>
</body>
</html>
