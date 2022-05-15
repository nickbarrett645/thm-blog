---
title: Day 32
date: 2022-05-15
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}

Today I will finish the [John The Ripper](https://tryhackme.com/room/johntheripper0) module. I have two practical sections left with cracking RAR Archive passwords, and SSH Key passwords.

## Cracking Password Protected RAR Archives
This exercise was just like the ZIP file one except you use the rar2john tool. The one difference was I had to find the tool, which I  found in `/opt/john`. I ran the command:
>`/opt/rar2john secure.rar > hash.txt`

to get the hash and then I ran:
>`john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt`
and I was able to get the password. I then needed to install a tool called unrar to open the file so I ran.
>`apt install unrar`
and once the tool downloaded I ran:
>`unrar e secure.rar`

The utility then asked for the password and I entered it and was able to get the flag.

## Cracking SSH Keys with John
This final exercise was again alike the two previous exercises except this was using a python script: `ssh2john.py`. I again found the script in `/opt/john` and I ran:
>`python3 /opt/john/ssh2john.py idrsa.id_rsa > idhash.txt`

and then:
>`john --wordlist=/usr/share/wordlists/rockyou.txt idhash.txt`

There was no flag to get in this one, but they could have had a box set up where you could use that private key to log in with ssh and then retrieve the flag.

## Final Impression
I thought this was a good module to learn the John The Ripper tool, but using the AttackBox is starting to become untenable. I need to setup my own environment.

Now I'm starting on the [Encryption - Crypto 101](https://tryhackme.com/room/encryptioncrypto101).

## Key Terms

- Ciphertext - The result of encrypting a plaintext, encrypted data

- Cipher - A method of encrypting or decrypting data. Modern ciphers are cryptographic, but there are many non cryptographic ciphers like Caesar.

- Plaintext - Data before encryption, often text but not always. Could be a photograph or other file

- Encryption - Transforming data into ciphertext, using a cipher.

- Encoding - NOT a form of encryption, just a form of data representation like base64. Immediately reversible.

- Key - Some information that is needed to correctly decrypt the ciphertext and obtain the plaintext.

- Passphrase - Separate to the key, a passphrase is similar to a password and used to protect a key.

- Asymmetric encryption - Uses different keys to encrypt and decrypt.

- Symmetric encryption - Uses the same key to encrypt and decrypt

- Brute force - Attacking cryptography by trying every different password or every different key

- Cryptanalysis - Attacking cryptography by finding a weakness in the underlying maths

## Why is Encryption Important?
>"Cryptography is used to protect confidentiality, ensure integrity, ensure authenticity."
You use cryptography everyday whether you know it or not.

I'm stopping here for the day because I have some work I need to get done around the house. Tomorrow I should be able to finish this module and I'll move onto the Windows section.