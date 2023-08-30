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

## Other stuff you can do

Since I've only tested this on linux, I don't really know how to do this on Windows or MacOS, but you can create a custom command that will run this script.
**For Linux**:
1) Edit your ~/.bashrc file. I usually use `nano`, but you can use other things like `vim` if you want: `nano ~/.bashrc`.
2) Now, use the arrow keys to navigate to the very bottom of the file. On a new line, add this: `alias schedule='node <DIR>/main.js'`. Make sure you replace `<DIR>` with the directory the project is installed in. You can also replace `schedule` with the command name you want this to be.
3) Use `CTRL + X`, `Y`, and  `ENTER` to leave the `nano` editor and save, and restart the terminal. If all went well, you should be able to type 	`schedule` in a fresh terminal and it will run the program.

Made by [@TylerSelden](https://github.com/TylerSelden).
