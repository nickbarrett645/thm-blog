---
title: Day 19
date: 2022-05-02
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}

Today I'm working on the [OWASP Top 10](https://tryhackme.com/room/owasptop10) room. It looks a little long, but it should go hand in hand with some of the stuff I learned yesterday using Burp Suite.

## Injection - Severity 1
This is when user input is interpreted as actual commands on the system. Two examples include:
- SQL injection
    - When user controlled input is passed to SQL queries.
-Command injection
    - When user controlled input is passed to system commands.

Two main defenses:
- Using an allow list of inputs or characters.
- Stripping the input of dangerous characters.

### Injection Practical
This practical was pretty good. Most of the answers I was able to figure out right away.
Here are the list of commands I used:
- `ls`
    - To read the files on the system
- `cat /etc/passwd`
    - To see the users on the system
- `whoami`
    - To see who was running the app
- `cat /etc/passwd | grep $(whoami)`
    - To get the current users shell
- `lsb_release -a`
    - To get the version on ubuntu
- `cat /etc/motd.d/00-header`
    - To get the message of the day

## Broken Authentication - Severity 2

Most common attacks against authentication:
- Brute force attacks
- Use of weak credentials
- Weak Session Cookies

Most common defenses:
- Strong password policy
- Account lockouts after a certain number of failed attempts
- Implement multi factor authentication

### Broken Authentication Practical
This involved re-registering as users that already exist by adding a space before the username in the form.

## Sensative Data Exposure
This is when a webapp exposes sensitive data likes names, DOBs, financial information, usernames, passwords etc.

### Sensative Data Exposure Practical

We had an ip which loaded a website. There was a hint in the description about a flat file db being located somewhere in the root of the website. I was poking around but didn't see much. I opened up the html and saw a comment that said,
>Must remember to do something better with the database than store it in /assets...

I navigated to /assets and there was a webapp.db file. I downloaded it and opened it with `sqlite3`.

I ran `.tables` to view the tables and saw one was called *users* so I ran `.schame users` and got:
>`sqlite> .schema users`
>
>`CREATE TABLE users(`
>
>`userID TEXT NOT NULL UNIQUE,`
>
>`username TEXT NOT NULL UNIQUE,`
>
>`password TEXT NOT NULL,`
>
>`admin INT NOT NULL,`
>
>`PRIMARY KEY(userID));`

I ran `select * from users;` and got the all the passwords. I was then able to use crackstation to 
get the passwords:
- qwertyuiop
- test2

but I did not get anything for the third password.

I then logged in as the admin user and got the flag.

Something interesting I learned that would mak dumping the passwords a little easier:
>`sqlite> .once hashes.txt`
>
>`select password from users;`
>
>`.exit`
>
>`john --format=Raw-MD5 hashes.txt`

That seemed like a good stopping point for the day. I'll look to knock out another portion of the OWASP Top 10 tomorrow.

