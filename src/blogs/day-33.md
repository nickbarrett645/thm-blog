---
title: Day 33
date: 2022-05-16
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}

Today I'm continuing the [Encryption - Crypto 101](https://tryhackme.com/room/encryptioncrypto101) module.

## Types of Encryption
The two main categories of encryption are symmetric and asymmetric. Symmetric means you use the same key to encrypt and decrypt while asymmetric means you use one key to decrypt and a different key to decrypt. 

Government standards consider DES broken, but you can use Triple DES if it uses three different keys.

## RSA - Rivest Shamir Adleman
RSA is an asymmetric algorithm that uses the product of large prime numbers. The question in this section asked what is `n` if `p` is 4391 and `q` is 6659. You just multiply `p` and `q` to get `n`. When looking at RSA the variables are as follows:
- p: large prime
- q: large prime
- n: product of p and q
- public key: n and e
- private key: n and d
- m: plaintext
- c: ciphertext

## Establishing Keys Using Asymmetric Cryptography
When using HTTPS you use asymmetric cryptography to negotiate symmetric cryptography.

## Digital Signatures and Certificates
A signature is when you sign something with the private key and you verify with the public key.

## SSH Authentication
I downloaded the ssh key and then used ssh2john to get the hash and the used John to crack the hash:
>`python3 /opt/john/ssh2john.py idrsa.id_rsa > idhash.txt`

and then:
>`john --wordlist=/usr/share/wordlists/rockyou.txt idhash.txt`

## Explaining Diffie Hellman Key Exchange
One party makes a secret `A` and one party creates a secret `B`. Both parties share a public item `C` and combine that with their respective secrets to get `AC` and `BC`. They then share that with the other party to get `ABC`.

## PGP, GPG and AES.
For this exercise I had to install GPG with `brew install gpg`. Once installed I downloaded the directory. Inside was `message.gpg` and `tryhackme.key` first you need to import the key using `gpg --import tryhackme.key` then you run `gpg -d message.gpg` and that gives you `message` you can then `cat` the file to get the secret word.