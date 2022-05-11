---
title: Day 21
date: 2022-05-04
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}

Today I'm starting on the [OWASP Juice Shop](https://tryhackme.com/room/owaspjuiceshop). This is a real app that was made intentionally vulnerable so that people can test out vulnerablities in a safe way. [Here](https://owasp.org/www-project-juice-shop/) is the link to the OWAS page.

## Basic Recon
The first thing I did was navigate to the website turn on burp suit and turn on foxy proxy. I then added the site to my scope and started to navigate around to map the site.

The first exercise is just doing some basic reconnaissance.
1. What is the admin's email address?
    - I found it in a product review comment.
2. What is the parameter for searching?
    - Search something and look at the URL
3. What show does Jim reference in his review?
    - If you look through a few products you'll find a comment by Jim. He mentions a replicator, so I googled it.

## Injection
In this exercise I am focusing on injections vulnerabilites (SQL, Command, Email). I turned on intercept mode in burp suit.

I go to the login page and I put in random data for the login. I intercept the login call in burp suit. The post body is:
>`{`
>
> `"email":"test"`,
>
> `"password":"test"`
>   
>`}`

I changed it to:
>`{`
>
> `"email":"' or 1=1--"`,
>
> `"password":"test"`
>   
>`}`

The first single quote closes the original quote, the `or 1=1` causes ever statement to be evaluated to try and the `--` comment out anything after the line to skip whatever code is there. This logged me as the admin.

Next I log it said log into Benders account so I made the same inital call and changed it to this:
>`{`
>
> `"email":"bender@juice-sh.op'--"`,
>
> `"password":"test"`
>   
>`}` 

This works because the email is valid and the single quote and `--` comments out the rest of the code to bypass it.

## Broken Authentication
This next exercise involved brute forcing the admins password and taking advantage of the fact that there aren't account lockouts and the password is weak.

I started by intercepting the login call in burp suit. I then forwarded the request to the intruder tool.
In the positions tab I cleared out the password field and added in the following symbols.
>`{"email":"admin@juice-sh.op","password":"§§"}`

I then uploaded a list of passwords in the payload section. I used `/usr/share/dirb/wordlists/others/best1050.txt`.
I then clicked start and waited for it to slowly work through the passwords. The community edition has a rate limited version of the intruder tool so it takes a while. Eventually one of the requests receives a 200 response and that password was the correct one.

The next task was to change the password for jim@juice-sh.op. If you go to the forgot password page and put in his email the security question is the middle name of your oldest sibling. From the previous exercise it referenced the replicator which is in star trek so I googled jim star treck and it comes up with James T Kirk. His siblings are listed on the wikipedia page. I was then able to change the password.

## Sensitive Data Exposure
Here the exercise said to navigate to the about us page. There was a link to a terms of use document. If you look at the link it contained the directory `/ftp`. I then navigated to the `/ftp` directory in the browser and was able to see a number of documents. I downloaded the acquisitions.md document and receieved the flag

Next it had me watch a video on mc safesearch and he reveals his password in the video.

Lastly for this section is wanted me to download the `package.json.bk` in the `/ftp` directory but only `.md` files could be downloaded. To get around this I added `%2500.md` to the end of the string and it let me download it. `%2500` is a null byte which terminates the string.

## Broken Access Control
- Horizontal Privilege escalation is when you perform an action or access data on another user with the same permissions
- Vertical Privilege escalation is when you perform an action or access data on anoter user with higher permissions

This seemed like a good palce to stop for the day so I'll finish this one up tomorrow.

