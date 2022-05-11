---
title: Day 27
date: 2022-05-10
layout: post.njk
---

{{ page.date.toDateString }}

Today I finished the last challenge on the [Upload Vulnerabilities](https://tryhackme.com/room/uploadvulns) module. 

I realized late yesterday that adding the magic numbers to JavaScript file made it an invalid JavaScript file and that is why I never got the reverse shell. The easiest solution there was to intercept the `upload.js` file and remove the magic number check. I was then able to upload the file with no without issue. I used Gobuster to find the name of the file using the command:
>`gobuster dir -u http://jewel.uploadvulns.thm -x jpg -w wordlist.txt` 

where the word list was the one provided in the exercise. I was then able to navigate to the `/admin` page and execute the module with the command `../content/IME.jpg` I got the reverse shell and then was able to get the flag.

This whole module was great. There was a lot of great theory and a lot of great practical exercises. I also think that the learning path is doing a good job building on the skills from previous modules.

Ill take a break from this for the rest of today and tomorrow Ill start on the Pickle Rick [CTF](https://tryhackme.com/room/picklerick).