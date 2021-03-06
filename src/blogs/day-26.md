---
title: Day 26
date: 2022-05-09
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}

Today I'm still working on the [Upload Vulnerabilities](https://tryhackme.com/room/uploadvulns) module, and starting the practical for avoiding server side filtering. Client filtering is easy to bypass because you can see the code and manipulate it, but server side is more difficult because you cannot see the code and you can't change it.

## Server Side Filtering - File Extensions
To beat server side filtering you will have to do a lot of experimentation to see what it allows. For example you might have code that is explicitly filtering out anything with a `.php` extension but there are a lot of other extensions that you can [use](https://en.wikipedia.org/wiki/PHP). There may also be a flaw in the logic that checks the extension and allow you to upload a file with the name `dog.jpg.php` where it thinks its a JPEG, but it's a PHP file.

For this exercise I started with `gobuster dir -u annex.uploadvulns.thm -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt` and got `/privacy` and `/assets`. I was able to navigate to `/privacy` so I'll assume.

I tried to upload my `shell.php` file and it failed so I uploaded a JPEG file and it succeed. I then checked `/privacy` and the file was there. so I renamed the file to `shell.jpg.php` and tried to upload that but it still failed. I then tried `shell.jpg.phar` and that failed. I tried `shell.jpg.phtml` and that failed. I then tried `shell.jpg.php5` and that uploaded successfully

I set up my Netcat listener with `nc -lvnp 1234` navigated to the file and popped my shell and got the flag.

## Server Side Filtering - Magic Numbers
The last exercise before the final challenge is spoofing magic numbers. [Magic numbers](https://en.wikipedia.org/wiki/List_of_file_signatures) are always a string of hex digits at the beginning of the file that provide a more accurate signature of what the file is. For example JPEG files start with `FF D8 FF D8`.

To start the exercise I run:
>`file shell.php`
>
>`shell.php: PHP script, ASCII text`

so the file tool thinks it's a PHP script.

I open the file with vi and I add `AAAA` to the top of the file. I then open the file with `hexeditor` (which I had to install even though it said it came with kali by default? `apt install ncurses-hexedit`). I can see the first four bytes of the file are ` 41 41 41 41` 41 is the hex code for capital 'A'. I change the first four to `FF D8 FF D8` and save the file.

Now when I run:
>`file shell.php`
>
>`shell.php: JPEG image data`

it sees it as a JPEG file.

I ran Gobuster again and came up with a `/graphics` directory so I'll start there. I tried to upload `shell.php` with the JPEG magic numbers and I got the message `GIFs only please`. I looked up the signature for GIFs and changed it in the hexeditor. The signature is `47 49 46 38 37 61`. This time the upload worked successfully. I started my Netcat listener then I navigated to `/graphics/shell.php` and I popped the shell and got the flag.

*Note:* Use the web extension [Wappalyzer](https://www.wappalyzer.com/) to find out what tech stack websites are using.

## Strategy
This is the general strategy for exploiting this vulnerability:
1. Use Wappalyzer to figure out what tech stack the website is using or look at headers like `server` or `x-powered-by`.
2. Look at the client side code to determine.
3. Upload an innocent file to see what the application allows and where it goes. Use Gobuster here to find the directory or specific file types using -x. Determine the naming scheme of the file once uploaded.
4. Upload the malicious file by passing the client side filters and do experimentation to by pass any server side errors.

When working on the server side filters try:
- Uploading a file with a invalid extension. If it succeeds it's probably using a blacklist. If it fails its probably using a whitelist.
- Upload an innocent file with the magic number of a file you think the application would filter. If its filtered its looking at the magic number.
- Upload an innocent file but intercept the call and change the MIME type to something the application should filter out.
- Upload progressively bigger files to see if you hit a limit

## Final Challenge
I ran Gobuster on the site and got a hit on some of directories:
>`/content (Status: 301)`
>
>`/modules (Status: 301)`
>
>`/admin (Status: 200)`
>
>`/assets (Status: 301)`
>
>`/Content (Status: 301)`
>
>`/Assets (Status: 301)`
>
>`/Modules (Status: 301)`
>
>`/Admin (Status: 200)`


I went to all the directories and they said page not found but the `/Admin` page took me to a page that said: "As a reminder: use this form to activate modules from the /modules directory." with an input to enter a file name.


I looked at the page source and saw the file input restricted the file type to JPEG files. I then looked a JS file called upload.js and it had checks for file size, a magic number and the file extension.

I tried to upload a JPEG a I kept getting a 500 error.

I moved onto trying to upload just the shell. I started by bypassing the client side filtering I named the file `shell.jpg.php` and I changed the magic number to be `FF D8 FF`. It then failed the server side filtering so I changed the Content-Type header to be `image/jpeg` and it passed. Then I ran Gobuster on `http://jewel.uploadvulns.thm/content` and I a new file listed `EFK.jpg`. It had an error when I tried to go to it like the other images.

The shell wasn't working though so I looked at the headers coming back from the server and is had `X-Powered-By Express` so its actually a node.js server. I went and got a reverse shell from [here](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Reverse%20Shell%20Cheatsheet.md#nodejs) and made a shell.jpg. I changed the magic numbers again and now it uploaded successfully but I still could not get the reverse shell. I'm going to stop here for today and I'll pick it up tomorrow. I think I'm going to have to intercept the JavaScript in upload.js and remove the check for the magic numbers.
