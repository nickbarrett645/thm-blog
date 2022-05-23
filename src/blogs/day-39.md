---
title: Day 39
date: 2022-05-23
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}

Today I'm continuing on the [Metasploit: Exploitation](https://tryhackme.com/room/metasploitexploitation) room. The second task invovles using the scanning module
I ran: `search portscan` to identify all the modules you can use for port scanning.
You can also run Nmap directly from the Msfconsole.

The first question asked the number of ports that are open on the host. I ran a simple Nmap scan with:
`nmap -sS <ip>`
and I got the open ports.

The next question asked about what NetBIOS name could I find. I first ran: `search netbios` and it had 7 modules related to netbios. I wanted `auxiliary/scanner/netbios/nbname`. I ran: `use 3` as a shortcut because the module was the third item in the list. I ran: `set RHOSTS <ip>` and then `run`. The scan came back with the netbios name.

The next question asked about what is running on port 8000. I search for `http_version` and used that module. I had to set the `RHOST` and `RPORT`. I ran the scan and it came back with the service running on that port.

The last question was what is the password for the "peny" user's SMB password. I searched for the smb_login module. I selected that module and then looked at the available options. I set the `RHOST` `PASS_FILE` and `SMBUser`. I ran the scan, which was able to brute force the password.
