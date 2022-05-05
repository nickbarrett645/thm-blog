---
title: Day 22
date: 2022-05-05
layout: post.njk
---

{{ page.date.toDateString }}
Today I'm continuing on the [OWASP Juice Shop](https://tryhackme.com/room/owaspjuiceshop) module.

## Broken Access Control
In this exercise it asked to look at the javascript sourcce code. I search for the term admin and found reference to
>`{`
>
>`path: 'administration',`
>
>`component: Xi.`
>
>`...`
>
>`},`

I put `administration` in the url and got access to the administration control panel.

Next it me intercept the call when going to my basket. The call was `GET /basket/1` I changed it to a 2 and saw someone elses basket and got the flag.

Finally for this section I went to the administration page again and deleted the 5 star review and got a flag.

## XSS
Last section is on XSS. The first one is a DOM XSS attack. I put the following payload into the search bar: 
`<iframe src="javascript:alert(`xss`)">`
This is also know as Cross Frame Scripting because I am using an iFrame. After pressing enter the search went out and the alert box appeared.

Next it had me navigate to last login ip page and note that it was there. I then intercepted the logout and added a header to the request: `True-Client-IP: <iframe src="javascript:alert(`xss`)">`.

When I logged back in and returned to the page it then displayed the alert box.

The last XSS vulnerability was on the order history page. There was a truck icon that took you to a tracking page with an id in the url I replaced the url with `<iframe src="javascript:alert(`xss`)">` and when I refreshed the alert box appeared. 


Last exercise was to access the `/score-board` page. I add that to the url and got access to it pretty simple.

I really like the OWASP Juice Shop as a tool, but the exercise kind of felt like it was holding your hand a little too much and giving away some of the answers. I look forward to doing this again on my own. [Here](https://hub.docker.com/r/bkimminich/juice-shop) is a link to a docker image that runs it.