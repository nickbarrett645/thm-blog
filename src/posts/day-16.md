---
title: Day 16
date: 2022-04-29
layout: post.njk
---

{{ page.date.toDateString }}

Today was another long day and I didn't finish working until late so I just knock out a couple questions in the first section for SMTP.

SMTP is Simple Mail Transfer Protocol and is one part of a pair protocols used to send email. It is either paired with POP or IMAP.

SMTP does three basic things:
- Verifies who is sending emails.
- Sends outgoing mail.
- If the outgoing mail can't be sent it sends the message back to the sender.

POP stands for Post Office Protocol.
IMAP stands for Internet Message Access Protocol.

[Here](https://computer.howstuffworks.com/e-mail-messaging/email3.htm) is some more technical details on how SMTP works.
[Here](https://www.afternerd.com/blog/smtp/) are some more details on the implementation.

I'll spend more time digging into the finer details of this later and I'm going to try and finish the rest of this module tomorrow morning hopefully.