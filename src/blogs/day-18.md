---
title: Day 18
date: 2022-05-01
layout: post.njk
tags: daily
---

{{ page.date.toDateString }}

Today I'm working on the [Burp Suite: The Basics](https://tryhackme.com/room/burpsuitebasics) room. This will be the first tool with a GUI that I'll be using. I'm interested in learning the basics here and then maybe taking a look at what the [PortSwigger Web Security Academy](https://portswigger.net/web-security) offers.

The module will be more theory based and less practical so I'll make some notes along the way and we will do some experimenting on our own.

Theres 3 versions of Burp Suite:
- Burp Suite Community (free)
    - Used by regular everyday users
- Burp Suite Professional ($399/user/year)
    - Used by professionals
- Burp Suite Enterprise
    - Run continuously on a web server to scan web apps

Although the community edition has a limited set of features it has some important ones like:
- Proxy
    - Intercept traffic and modify it before sending it on.
- Repeater
    - Resend the same requests multiple times.
- Intruder
    - Bruteforce and fuzz endpoints but it rate limited.
- Decoder
    - Decodes intercepted traffic.
- Comparer
    - Compares two pieces of data at the word or bytes level.
- Sequencer
    - Useful for testing the randomness of tokens.


Theres 4 quadrants on the Burp Suite Dashboard:
- The tasks panel
    - Allows you to define background tasks.
- The Event Log
    - The logs of what Burp Suite is doing.
- The Issue Activity
    - Exclusive to the Pro version, lists the vulnerabilities found by an automated scan.
- The Advisory Section 
    - This gives more information about the vulnerabilities found.

User options are global configurations for Burp Suite and Project options are project specific.


## Proxy

This tool is used to intercept traffic from the browser before going to the server. BurpSuit intercepts the request and can edit and then forward by clicking the `Forward` button (Ctrl+F) or Dropping the intercepted request by clicking the `Drop` button.

On the proxy page there is a button: `Intercept On` which means the request will be intercepted, that can be turned off by clicking it. All requests will still be logged however. Requests can also be intercepted on the way back but that needs to be turned on.

### FoxyProxy
FoxyProxy is a browser extension that sets up a proxy. You can install the extension in Firefox, open it, click add and by default Burp Suite is on 127.0.0.1:8080. Then select it from the list to turn it on.

### Proxying HTTPS
If you going to a site using HTTPS you need to the browser to trust the Portswigger CA.

Steps to configure:
- Navigate to http://burp/cert.
- Save the cert on your machine.
- In the Firefox search bar type about:preferences
- Find the `Certificates` section and click `View Certificates`
- Import the downloaded certificate.

### The Burp Suite Browser

Burp Suite comes with a Chromium browser built in that can be used without setting up the proxy yourself.

If you are running Burp Suite as the root user a notification will pop up saying the browser could not be opened because a sandbox could not be created. This is done for security purposes because if you were to get compromised through the browser the attacker would have root. This can be turned off, but isnt recommended. The better option is to created a lower privileged user.

### Scoping and Targeting

You don't want Burp Suit to necessarily capture everything becuase you will get to bogged down going through every request. To prevent this you can use scoping and targting. Go to the `Target` tab and you will see a list of targets. Right click on the target you want and select `Add to scope`. You will then be presented with an option to only intercept scoped items and you probably want to say yes.

### Site Map

Under the `Targets` tab there is a submodule Site map. It creates a tree hierarchy of pages as you navigate a website. In this exercise it said navigate the links on the home page and then check the site map for something unusual. There was a weird endpoint with a bunch of letters and numbers so I right clicked on that and chose the option `Show in browser` and it showed me the flag.

## Practical example

Finally after all the theory we get to actually use the tool.

First step was to navigate to the `/ticket` page. There was a form there. I attempted to enter a XSS example: `<script>alert("Succ3ssful XSS")</script>`in one of the fields, but there was client side filtering.

I entered real data, clicked submit and intercepted the call. I replaced the email parameter with the XSS string and then encoded the characters by highlighting it and pressing `Ctrl+U`. I then forwarded the call and then the alert displayed on the screen!

There was a lot of info in this one and less practical exercises but it was still enjoyable and I got to mess around with the tool on my own.

I'm almost 50% through the Complete Beginner learning path so I've made a lot of progress in 18 days and I'm looking forward to more!





