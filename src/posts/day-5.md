---
title: Day Five
---

Starting on exercise 7 an introduction to shell operators
This exercise was easy but did not include examples for && or &
Here’s some examples:
    - $ touch test.txt && echo hello > test.txt
    - $ find /home/tryhackme -name test.txt > found.txt &
Nothing really to do with 8 and 9
Started linux fundamentals part 2
Used the attack box but you can easily use your own machine if you have openvpn set up
Interesting note -A doesn’t display implied . And .. which is nice
Overall part 2 was easy
Starting part 3
Starting a python web server is interesting, and probably very useful in ctf, my first instinct would be to change the port to something else, and Ill definitely check if other people have one running and are using the default port
Systemctl is probably very useful in ctf, if you utilize some service to get in just stop if after so no one else can
Was really confused on the automation section it asked when the job will run, I thought I was missing something. I ran crontab -e and only saw @reboot opt/something/processes.sh  finally looked up what @reboot was and got it the answer is always there, just may require a little googling. 