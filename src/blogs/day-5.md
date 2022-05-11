---
title: Day Five
date: 2022-04-18
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}

I am starting on task 7 of [Linux Fundamentals 1](https://tryhackme.com/room/linuxfundamentalspart1) an introduction to shell operators
This exercise was easy but did not include examples for && or &
Here’s some examples:
    - `$ touch test.txt && echo hello > test.txt`
    - `$ find /home/tryhackme -name test.txt > found.txt &`
There was nothing interesting to do with 8 and 9.
I started [Linux Fundamentals 2](https://tryhackme.com/room/linuxfundamentalspart2) and I'm using the AttackBox but you can use your own machine if you have OpenVPN set up.

## Note
An interesting note I read in the man page was `-A` for the `ls` command doesn’t display implied `.` And `..` which is nice.

I thought part 2 was easy.
Lastly I also got to [Linux Fundamentals 3](https://tryhackme.com/room/linuxfundamentalspart3)

Starting a python web server is interesting, and probably useful in CTFs. My first instinct would be to change the port to something else, and I'll  make sure to check if other people have one running and are using the default port

The systemctl tool is also probably useful in CTFs. If you leverage some service to get onto the server just stop it after so no one else can use it.
The automation section confused me when it asked when the job will run, I thought I was missing something. I ran crontab -e and saw @reboot opt/something/processes.sh. I looked up what `@reboot` was and found that `@reboot` signals a job to run when a system reboots. The answer is always there, it just may require a little googling. 