---
title: Day 37
date: 2022-05-20
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}

## Introduction to Metasploit
Metasploit is a widely used exploitation framework that can support all phases of a penetration test. Metasploit comes in two versions, and commericial version, and an opensource version.

The main components of Metasploit are:
- MSFconsole: the command line interface
- Modules: supporting modules like exploits, scanners, and payloads
- Tools: standalone tools like MSFvenom

## Main Components of Metasploit
You mainly interact with Metasploit through the console, which you can start up using the command: `msfconsole`.

Metasploit contains modules used for accomplishing different tasks like:
- Auxiliary: Supporting module like scanners, crawlers, and fuzzers.
- Encoders: Encode an exploit to try and avoid signature detection software.
- Evasion: Used as a direct attempt to evade signature detection software.
- Exploits: Exploits for different target systems
- NOPs: NOPs for different target architectures
- Payloads: Code to run on target systems
- Post: Post exploitation modules

All the answers to the questions were in the reading.

## MSFconsole
MSFconsle is close to a regular Linux terminal, and contains most Linux commands, but not all. You will set variables within the context of modules, so unless you set a global variable you will lose the variable as you jump between modules.

You use the `use` command to select an exploit like: `use exploit/windows/smb/ms17_010_eternalblue`.
You use the `show options` command to list the variables that you need to set.
You can use the `info` command to learn more about the module in the current context.
You can use `search` to find an exploit.

## Working with modules
You use the `set` command to set variables needed for the module like `RHOST` or `PORT`.
You use `unset` to clear a variable.
You use `setg` and `unsetg` to set and unset global variables






