---
title: Day 28
date: 2022-05-11
layout: post.njk
---

{{ page.date.toDateString }}

Today I'm working on the [Pickle Rick](https://tryhackme.com/room/picklerick). This is my first CTF since starting so I'm going to try and use everything I've learned so far. I'll be using the AttackBox, but in the future I'm thinking about setting up my own environment to do this because its a little slow at times and it has limited screen real estate.

The first thing I ran was a quick Nmap scan:
>`nmap -sT <ip>`

And I got back:
>`PORT   STATE SERVICE`
>
>`22/tcp open  ssh`
>
>`80/tcp open  http`
>
>`MAC Address: 02:76:CE:97:8B:D5 (Unknown)`

That was the first 1000 ports so If I get stuck I'll scan more. For now I'll start with the web app.

I navigate to the page and it says:
>`Help Morty!`
>
>`Listen Morty... I need your help, I've turned myself into a pickle again and this time I can't change back!`
>
>`I need you to *BURRRP*....Morty, logon to my computer and find the last three secret ingredients to finish my pickle-reverse potion. The only problem is, I have no idea what the *BURRRRRRRRP*, password was! Help Morty, Help!`

I look at the page source and I see an HTML comment that says:
>`<!--`
>
>`Note to self, remember username!`
>
>`Username: R1ckRul3s`
>
>`-->`

I'm guessing that might be the SSH username.

I don't see anything else that interesting in the source code, It's getting images and JavaScript files from `/assets` and that directory is indexed but I don't see anything useful there so I'm going to run Gobuster and hopefully enumerate some new pages. I run:
>`gobuster dir -u http://<ip> -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt`

I got back `/assets` and `/server-status` and I couldn't access `server-status`.

I ran an Nmap scan on the rest of the ports and nothing was open.

I used a different word list for Gobuster `/usr/share/wordlists/dirb/common.txt` and I got back:
>`/.hta (Status: 403)`
>
>`/.htpasswd (Status: 403)`
>
>`/.htaccess (Status: 403)`
>
>`/assets (Status: 301)`
>
>`/index.html (Status: 200)`
>
>`/robots.txt (Status: 200)`
>
>`/server-status (Status: 403)`

I looked at robots.txt and it had:
`Wubbalubbadubdub`

I tried to use the username I found as an ssh username but it said permission denied. It also said that for any username I tried so I'm not sure what is up with that.

I ran Gobuster again with: `gobuster dir -u http://10.10.227.251 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php,js`
and this time I got hits on `/login.php`, `/portal.php`, and `/denied.php`. I am able to access `/login.php` and I get redirected to the login screen by the other two.

I used the username and password that I found and the application redirected me to `/portal.php` and it had a command input.

I put in `ls` and I got:
>`Sup3rS3cretPickl3Ingred.txt`
>
>`assets`
>
>`clue.txt`
>
>`denied.php`
>
>`index.html`
>
>`login.php`
>
>`portal.php`
>
>`robots.txt`

I tried to run `cat Sup3rS3cretPickl3Ingred.txt` but the command wasn't allowed. I was able to run `whoami` and `id`.

I looked at the source code of the page and saw this in an HTML comment: `Vm1wR1UxTnRWa2RUV0d4VFlrZFNjRlV3V2t0alJsWnlWbXQwVkUxV1duaFZNakExVkcxS1NHVkliRmhoTVhCb1ZsWmFWMVpWTVVWaGVqQT0==` which looks like base64.
I tried decoding it but it didn't appear to be base64.

I found links on the page but they all go to `/denied.php`.

Since the file was in the same directory as index.html I tried to just navigate to the URL `/Sup3rS3cretPickl3Ingred.txt` and I got the first flag.

Then I did the same thing to open `clue.txt` and it said:
>Look around the file system for the other ingredient.

In the command input I ran `cd ..; ls` and I was able to moved up a directory.
I started moving around and I managed to get to `/` I was able to look in `/home` and saw there was a user `rick` and inside there was a file called `second ingredients`. I couldn't use `cat`, but I could use `less` so I ran `less /home/rick/'second ingredeints` and I got the second flag.

After this I didn't know where to go from here, so I looked at a walk through and it said check the user permissions with `sudo -l`

I ran that and it said that my user: `www-data` could run any command on the box without a password. This lead me to want to look at the `/root` directory. I ran `sudo ls /root` and got:
>`3rd.txt`
>
>`snap`

I then ran `sudo less /root/3rd.txt` and I got the final flag.

Even though the room has a rating of easy, I thought the room was challenging. There was a lot experimentation and I had to look some stuff up. If I had to sum up my attack plan moving forward it would be:
1. run Nmap
2. Run Gobuster and look for `.php` and `.js` files to find other potential login pages.
3. Look at links and source code.
4. If there is a command portal run `sudo -l` to see permission and see if you can move around.





