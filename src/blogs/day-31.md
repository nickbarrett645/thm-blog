---
title: Day 31
date: 2022-05-14
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}

I'm continuing the [John The Ripper](https://tryhackme.com/room/johntheripper0) module today. I've had a busy day so I'm doing one module and then calling it a night.

## Cracking Password Protected Zip File
This task involves cracking the password for a password protected zip file. First you use a tool called `zip2john`.
>`zip2john secure.zip > hash.txt`

Then you run john the ripper on the output of that command.
>`john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt`

I then got the password and was able to open the zip file and get the flag.