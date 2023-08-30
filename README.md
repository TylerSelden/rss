# iCal Sallies scheduler

This program will let you know what your daily schedule is at Salesianum.


## How it works

The program works by using an OnCampus API called iCal. You can use this to get both your schedule and your assignments due that day. From there, it parses the data and uses `console.log()` to give you the details of your day.

## Setup

If you happen to think this is a cool project, and want to use it, you can follow these steps to set it up. **This is only tested on Linux, but it should work on other operating systems as well.**

1) Clone the repository using `git clone https://github.com/TylerSelden/rss`.
2) Open the newly made folder by typing `cd rss`.
3) You'll need to get the HTTP links to the iCal API for you specifically. These are found in OnCampus:
a) Go to your schedule tab, and at the top right, click `month`. Once in the monthly calendar, you should see a small icon similar to the WiFi logo. Click on this, and then copy the `Feed URL` to `./rss/schedule.txt`.
b) Now, go to your Assignment Center. Again, there should be a small symbol in the top right corner. Click it and copy the `Feed URL` to `./rss/assignments.txt`. **Make sure you do not copy the WebCal URL, but the Feed URL.**
4) Once all this is done, the script should be ready to go. Make sure you're in the `./rss` directory and just run `node main.js`.

Made by [@TylerSelden](https://github.com/TylerSelden).