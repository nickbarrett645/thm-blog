---
title: Day 12
date: 2022-04-25
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}


Today I started on the [Network Services Module](https://tryhackme.com/room/networkservices). This one should be fun because I'll get to interact with and exploit SMB, Telnet, and FTP services on real servers.

I was able to finish the SMB section. I thought the exercise was interesting and the AttackBox is easy to use with both enum4linux and smbclient already installed.

The part that confused me was when it asked about the owner of the file. I was looking for a `ls` option that showed the owner but there doesn't appear to be one. The I was looking to open the file on the server with the open command, but I wasn't able to get that to work. The I just downloaded the Work From Home Information.txt file and the answer was there.

I'm looking forward to trying to finish the other two exercises tomorrow.