---
title: Day 24
date: 2022-05-07
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}

Today I'm still working on the [Upload Vulnerabilities](https://tryhackme.com/room/uploadvulns) module.

## Filtering

There is client side filtering done in the browser using JavaScript or HTML, which is easy to bypass and server side validation done by the backend.

### Extension Validation
Either using a whitelist to define what file extensions are allowed or a blacklist to define what files are not allowed. I would think a whitelist would be better. File extensions are also somewhat meaning less as they can be changed by the owner.

### File Type Filtering
This is a little more intensive than extension validation. Theres two main types:
- MIME validation (Multipurpose Internet Mail Extension). This is a header attached to a HTTPS request that will look like the following: `Content-Type: <type>/<subtype>`. For example a .jpg file woll be `image/jpeg`. This can be bypassed though because its based on the extension of the file.
- Magic Number validation: Magic numbers are more accurate but are not impossible to bypass. The magic number is a sring bytes at the beginning of the file that signify what kind of content it is.

### File Length Filtering
This prevents huge files from being uploaded, but should not prevent me from uploading a shell.

### File Name Filtering
This is when you check the name of the file uploaded to see if it already exists on the server. You should also check for bad characters in the name like null bytes, forward slashes, backwards slashes, semi-colons, etc.

### File Content Filtering
Scanning the full contents of the file to see if it extension, mime type and Magic number all make sense.

None of these filters a full proof and should be used together byt will not gurantee perfect safety.

This task just asked three simple questions where two of the answers are in the reading material and the third is a trivial google search.

I answered three questions to keep my streak alive and I'll pick back up with this tomorrow. I probably will only get to one exercise.

