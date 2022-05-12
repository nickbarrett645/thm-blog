---
title: Day 29
date: 2022-05-12
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}

Today I'm starting on the cryptography section of the [Complete Beginner]() learning path. The first module is [Hashing - Crypto 101](https://tryhackme.com/room/hashingcrypto101).

The first task contains some definitions:
- Plaintext - Data before encryption or hashing, often as text but could be other mediums.
- Encoding - This is **not** a form of encryption, just a form of data representation.
- Hash - a hash is the output of a hash function.
- Brute force - Attacking cryptography by trying every different password or key.
- Cryptanalysis - Attacking cryptography by finding a weakness in the underlying math.

## What's a has function?

Hashing functions are not encryption. A hashing function takes in data and returns a summary or "digest" of that data in a fixed size. It should be hard to predict what the output will be, and a small even change in the input, even one bit, should cause a drastically different output. Hashing algorithms should be fast to output and slow to reverse.

## Why should I care?
Hashing has a lot of applications in cyber security. Your passwords are not stored in plaintext, at least they shouldn't be, instead the application should store the hash of the password. This protects the user if someone is able to obtains access to the server that has the user database they still can't determine the password without a considerable amount of work.

## Hashing for password verification
You should not encrypt your passwords because the application has to store the key somewhere to decrypt the password and if someone steals the key they can decrypt every password with ease. Instead you store the hash of the password and when someone logs in you put the plaintext through the same hashing algorithm and if the outputs match then the password is correct. You should also add a salt to your hash which is a random value that prevents malicious attackers from using rainbow tables which are tables with precomputed hashes.

## Practical
To crack the passwords I used [CrackStation](https://crackstation.net/) and [Hashes](https://hashes.com/en/decrypt/hash). I had issues running hashcat on the VM so for other exercise involving hash cracking I will have to find an alternative.

