---
title: Day 25
date: 2022-05-08
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}

Today I'm still working on the [Upload Vulnerabilities](https://tryhackme.com/room/uploadvulns) module, and starting the practical for avoiding client side filtering. There are few main ways to do it. First you can turn off javascript on the page, however this could cause the site to potentially be unusable. You can intercept and modify the incoming page by altering the html or the JavaScript. You can send the file directly to the endpoint using something like postman or curl. Last you can use the correct extension, but then intercept the call before it goes out and change the extension and MIME type back.

So the exercise walked through two ways of by passing client side filtering and I did both successfully. First I turned burp suite on and then navigated to the website. I intercepted the first call to `GET /` and right clicked on the body and chose the option `do intercept` and then chose the `Response to this request` This then gave me the html that was returned. In the HTML it was actually requesting some some separate scripts and I needed to intercept one of those to change the JavaScript. I went to options and then the `Intercept Client Requests` section and removed `^js$|` option so that it *would* intercept the separate JavaScript files. There was a file called `client-side-filter.js` so I assumed it was that one doing the filtering. After that response came back I looked at the file and saw the code was defining an event listener when the file input field changed. It checked the type of the file uploaded and if the MIME type was not image/png it would set it to an empty string. So I removed that functionality and I was able to upload a file called `shell.php` successfully. I then ran `gobuster dir -u http://java.uploadvulns.thm -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt` I got a couple of early hits: assets and images. The JavaScript files were coming from assets and the upload was looking for `.png ` files so I assumed it may be putting the files in there. So I checked in `http://java.uploadvulns.thm/images` and I saw the shell.php file. I opened my netcat listener with `nc -lvnp 1234`, opened shell.php and I got the shell.

The second way of doing it I renmaed `shell.php` to `shell.png` and uploaded it. It passed the client side validation so I clicked upload and intercepted that call. I then changed the name to be `shell.php` and changed the Content-Type header to be `text/x-php`. It uploaded successfully and I was able to get the shell in the same way.

I really like exercises like this where you get to exploit vulnerabilites and get access to the target machine. And then writing about it after is allowing me to think about it more and helping me understand the process of how and why these vulnerabilities work.