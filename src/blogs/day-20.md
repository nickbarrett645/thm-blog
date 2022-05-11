---
title: Day 20
date: 2022-05-03
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}

It's day 20 and I'm picking back up on the [OWASP Top](https://tryhackme.com/room/owasptop10) module.

## XML External Entity - Severity 4
An XML External Entity (XXE) attack is a vulnerability in XML parsers/data. XXE can lead a number of issues like DoS, Server-Side Request Forgery, and RCE.

There are two kinds of XXE attacks:
- In-band XXE is one where the attackers receives an immediate response from the XXe payload.
- Out-of-band XXE or blind XXE is when there is no immediate response from the server.

### XML
XML (eXtensible Markup Language) is a set of rules for encoding a document in a format that is both human and machine reable.

It is independent of platform and programming language, can be validated using DTD or Schema, and is used for transporting data.

Most documents will start with a prolog at the top that looks like:
`<?xml version="1.0" encoding="UTF-8"?>`

It should have a single root element and each tag is case sensitive.

### DTD
Document Type Definition (DTD) defines the structure, legal elements, and attributes of an XML document. 

it would look something like this:

`<!DOCTYPE note [ <!ELEMENT note (to,from,heading,body)> <!ELEMENT to (#PCDATA)> <!ELEMENT from (#PCDATA)> <!ELEMENT heading (#PCDATA)> <!ELEMENT body (#PCDATA)> ]>`

whihc would lead to an xml document like the following be valid:
>`<?xml version="1.0" encoding="UTF-8"?>`
>
>`<!DOCTYPE note SYSTEM "note.dtd">`
>
>`<note>`
>
>    `<to>falcon</to>`
>
>    `<from>feast</from>`
>
>    `<heading>hacking</heading>`
>
>    `<body>XXE attack</body>`
>
>`</note>`


### XXE Payload
Here is an example of an XML document using an Entity
> `<!DOCTYPE replace [<!ENTITY name "feast"> ]>`
>
>
> `<userInfo>`
>
>`  <firstName>falcon</firstName>`
>
>`  <lastName>&name;</lastName>`
>
>` </userInfo>`

Here is an exmaple of using an Entity to read a file on the system
>`<?xml version="1.0"?>`
>
>`<!DOCTYPE root [<!ENTITY read SYSTEM 'file:///etc/passwd'>]>`
>
>`<root>&read;</root>`


I was able to use that to display the contents of `/etc/passwd` where I saw the user falcon. I thne changed the path to `/home/falcon/.ssh/id_rsa` and I was able to dump the contents of his ssh private key.

## Broken Access Control - Severity 5
This is when you have protected pages or data in your website and users that do not have the right permission are able to access the pages or data. For example if the api looks at the account number when retreiving information, but does nothing to validate that the request is coming from the person who owns the account number a person could put in anything they want.

### IDOR
Insecure Direct Object Reference (IDOR) is when user input is not validated by the system and you can send customized user input to retrieve data you should not have access to.

In this exercise I logged in as a user and it took me to `/note.php?note=1` I then changed the paramters all and was able to successfully retrieve pages but I saw nothing. I then put in 0 and got the flag.

## Security Misconfiguration - Severity 6
Security misconfigurations are when systems could have been configured differently but were not.
For example:
- Poorly configured permission on cloud services like S3 buckets.
- Having unnecessary feature enabled
- Default accounts with unchanged passwords
- Error messages that are overly detailed and allow the user to learn more about the system
- Not using [HTTP security headers](https://owasp.org/www-project-secure-headers/).

For this exercise I went to the website and I tried a few variations of admin / password with no louck. I then looked at the page source and javascript files and I was able to find any comments that may be helpful. Then I googled the name of the app Pensive Notes and I found a github repo with the code and the README.md contained the default credentials. I was then able to login and get the flag.

## XSS
Cross-site scripting (XSS) is a vulnerability in web applications where an attacker can inject malicious scipts and have them execute on a victims machine.
There are three main types:
1. Stored XSS
    - Where a malicious string is stored in the applications database.
2. Reflected XSS
    - The malicious payload is in the request to the server. Here the attacker needs to trick a victim to click a link.
3. DOM-BASED XSS

Heres come example payloads:
- `<script>alert(“Hello World”)</script>`
- `document.write`
- `http://www.xss-payloads.com/payloads/scripts/simplekeylogger.js.html)` - key logger
- `http://www.xss-payloads.com/payloads/scripts/portscanapi.js.html` - local port scanner

The first reflected XSS payload I used was `<script>alert('Hello')</script>` then `<script>alert(document.location.hostname)</script>`.

In the stored XSS payload I did `<strong>test</strong>` then `<script>alert(document.cookies)</script>` then `<script>document.getElementById('thm-title').innertext = 'I am a hacker'</script>`

## Insecure Deserialization
This is when data that is suppose to be processed by an appliation is replaced with malicious code. This can result in anything from a DOS to an RCE.

This is rated low because it is difficult to exploit and there are not any reliable tools to help attacks accomplish it easily.

Serialization is the process of converting objects into simple compatible formatting for transmitting between systems or networks.

Deserialization is the opposite and converts serialized information into it more complex form.

In the first exerciseI was asked to create an account and login to a website and investigate the cookies.
In Firefox you can open up the devtools and then go to storage and cookies.
In the first exercise I changed the cookie name userType from `user` to `admin` and I was able to access the admin page.
In the second exercise I just use a base64 decode tool to decode the sessionId and there was a flag in there.

For the second more involved part I was asked to click a link which gave me a cookie which was base64 encoded, then I navigated to a different page to "provide feedback" I downloaded this [script](https://assets.tryhackme.com/additional/cmn-owasptopten/pickleme.py) and changed the IP to the one for the attack box. I ran script and then changed the cookies value to be the base64 encoded value of my script which woudl spawn a reverse shell. I set up a netcat listener on my box and then refreshed the page and I had the shell. A quick look around and I found `flag.txt`.

## Component With Known Vulnerabilities - Severity 9
This is when you use out of date software that has well documented known vulnerabilities that are easily executed.

For this exercise I launched the VM and went to the website. It was an application for a bookstore I didnt see anything in the source code that stuck out to me. I looked around the website and saw a ling to a site called projects world. I search for that in exploid-db, but did'nt find anything. The name of the site was CSE Bookstore and there were a couple of vulnerabilities on there but not anything I could use to get on the box. I then just google projectsworld vulnerability and a link to a vulnerability came up on exploit-db. If feel like the searchable of that site isnt that great. I downloaded a python script for an RCE and it with the ip of the website and got a shell right away then all I had to do was run `wc -c /etc/passwd` and I got the word count.

## Insufficient Logging and Monitoring - Severity 10
This is when you do not generate enough logs to accurately monitor and audit the state of your site.

The exercise here was pretty simple it was looking at a log file and determing what the attacker IP was and what attack they were doing.








