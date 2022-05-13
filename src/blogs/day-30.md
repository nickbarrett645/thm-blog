---
title: Day 30
date: 2022-05-13
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}

It's day 30! Let's Go! Today I'm starting the [John The Ripper](https://tryhackme.com/room/johntheripper0) module.

You can install John The Ripper on a variety of operating systems, and comes in different distributions. Some of the distributions core distribution, community editions, and one with an extended feature set called Jumbo John.

You will need to use a word list when trying to crack a hash, rockyou.txt is a famous but can find others here at [SecLists](https://github.com/danielmiessler/SecLists) repository.

## Practical Part 1

The exercise gave me a list of 4 hashes to crack. I first downloaded the [hash-identifier](https://gitlab.com/kalilinux/packages/hash-identifier/-/tree/kali/master) tool, which will tell me the format the hash is in.

I would run the hash through the hash identifier tool then run john on the has with rockyou.txt.

The hashes were as follows:
- `2e728dd31fb5949bc39cac5a9f066498 - MD5`
    -`john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyout.txt`
- `1A732667F3917C0F4AA98BB13011B9090C6F8065 - SHA1`
    -`john --format=raw-sha1 --wordlist=/usr/share/wordlists/rockyout.txt`
- `D7F4D3CCEE7ACD3DD7FAD3AC2BE2AAE9C44F4E9B7FB802D73136D4C53920140A - SHA256`
    -`john --format=raw-sha256 --wordlist=/usr/share/wordlists/rockyout.txt`
- `c5a60cc6bbba781c601c5402755ae1044bbf45b78d1183cbf2ca1c865b6c792cf3c6b87791344986c8a832a0f9ca8d0b4afd3d9421a149d57075e1b4e93f90bf - Whirlpool`
    -`john --format=whirlpool --wordlist=/usr/share/wordlists/rockyout.txt`

## Practical Part 2
The next practical involved breaking a windows hash. The format used is `NT` and everything else is the same.

Hash:
- `5460C85BD858A11475115D2DD3A82333 - NT/LM`
    - `john --format=raw-NT --wordlist=/usr/share/wordlists/rockyout.txt`

## Practical Part 3
In part three I had to crack an `/etc/shadow` file. That is the file on Linux systems that contains the users passwords and requires root permission to access. John is not able to ingest that file by itself so you need to create a specific file format that it can ingest. This involves using a tool called `unshadow` and the `/etc/passwd` file. You run the command `unshadow /etc/passwd /etc/shadow > unshadow.txt`. you can the run John as follows:
`john --format=sha512crypt --wordlist=/usr/share/wordlists/rockyou.txt unshadow.txt`. I was able to run that and get the root password for the system.

## Practical Part 4
This exercise involved the using the single crack mode. This is when you provide the username with the hash and John will use word mangling of the username as the word list. The username with this has was Joker, so the process would look like this: "joker, Joker, jOker, JoKer, etc.". John has its own set of rules when it comes to generating the mangled words.

To use single crack mode the file needs to have the structure of `<username>:<hash>`

First I used the hash identifier tool to identify the hash, which was `MD5` I then ran the command: `john --single --format=raw-md5 hash7.txt` and I was able to crack it.

## Practical Part 5
This exercise is a continuation of the last one using single crack mode except it talks about how you can set up custom rules for how the mangling should work. You can define the rules in `john.conf` file which could be in `/etc/john/` or `/opt/john`. [Here](https://www.openwall.com/john/doc/RULES.shtml) is a link to the rules syntax.

The answers to the questions are in the reading.

I think I will stop here for today. One think I have been thinking about is setting up my own environment and downloading the tools that I have been using so far.