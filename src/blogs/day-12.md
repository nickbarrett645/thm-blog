---
title: Day 12
date: 2022-04-25
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}


Today I started on the [Network Services Module](https://tryhackme.com/room/networkservices). This one should be fun because I'll get to interact with and explolit SMB, Telnet, and FTP services on real servers.

I was only able to finish the SMB section. I thought the exercise was good and it was pretty easy using the attack box with both enum4linux and smbclient already installed.

The only part I was confused about was when it asked about the owner of the file. I was looking for a `ls` option that showed the owner but there doesn't appear to be one. The I was looking to open the file on the server with the open command, but I wasn't able to get that to work. The I jsut downloaded the Work From Home Information.txt file and the answer was there.

Im looking forward to trying to finish the other two exercises tomorrow.