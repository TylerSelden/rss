const axios = require('axios');
const fs = require('fs');
const ical2json = require("ical2json");
const he = require('he');
const scheduleURL = fs.readFileSync('./schedule.txt', 'utf8');
const assignmentsURL = fs.readFileSync('./assignments.txt', 'utf8');
var script = "";
var assignments = [];


// get data
axios.get(assignmentsURL).then(response => {
  var ical = response.data; // This will output the ical feed as text
  var data = ical2json.convert(ical);
  var ical = data["VCALENDAR"][0]["VEVENT"];
  parseAssignments(ical);
});
axios.get(scheduleURL).then(response => {
  var ical = response.data; // This will output the ical feed as text
  var data = ical2json.convert(ical);
  var ical = data["VCALENDAR"][0]["VEVENT"];
  parseSchedule(ical);
});


function parseAssignments(ical) {
  for (var i in ical) {
    var raw = ical[i];
    var start = raw["DTSTART;VALUE=DATE"];
    var end = raw["DTEND;VALUE=DATE"];
    assignments[i] = {
      start: getDate(start),
      end: getDate(end)
    }
    assignments[i].class = he.decode(raw["SUMMARY"].split(/: (.*)/s)[0]);
    assignments[i].name = he.decode(raw["SUMMARY"].split(/: (.*)/s)[1]);
    if (raw["DESCRIPTION"] !== undefined) assignments[i].desc = he.decode(raw["DESCRIPTION"]);
  }

  fs.writeFileSync("assignments.json", JSON.stringify(assignments, null, 2));
}

function getDate(str) {
  var date = {
    year: str.substring(0, 4),
    month: str.substring(4, 6),
    day: str.substring(6, 8)
  };
  try {
    date.hour = str.substring(9, 11);
    date.minute = str.substring(11, 13);
  } catch {};
  return date;
}

function parseSchedule(ical) {
  var schedule = [];
  for (var i in ical) {
    var raw = ical[i];
    try {
      var start = raw["DTSTART;VALUE=DATE"];
      var end = raw["DTEND;VALUE=DATE"];
      schedule[i] = {
        start: getDate(start),
        end: getDate(end)
      }
    } catch {
      try {
        var start = raw["DTSTART;TZID=America/New_York"];
        var end = raw["DTEND;TZID=America/New_York"];
        schedule[i] = {
          start: getDate(start),
          end: getDate(end)
        }
      } catch {
        console.log("Cannot parse schedule :/");
      }
    }
    schedule[i].name = raw["SUMMARY"];
  }
  fs.writeFileSync("schedule.json", JSON.stringify(schedule, null, 2));

  displaySchedule(schedule);
}

function displayAssignments(date) {
  var today = [];
  for (var event of assignments) {
    if (event.start.year == date.year && event.start.month == date.month && event.start.day == date.day) {
      today.push(event);
    }
  }
  return today;
}


function displaySchedule(schedule) {
  var now = new Date();
  var date = getDate("20230828");
  var date = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    weekday: now.getDay()
  }
  
  var today = [];
  for (var event of schedule) {
    if (event.start.year == date.year && event.start.month == date.month && event.start.day == date.day) {
      today.push(event);
    }
  }
  if (today.length == 1) {
    // no school (use labor day as an example)
    script = `You have no school today, for the following reason: ${today[0].name}`;
  } else if (today.length == 0) {
    // usually a weekend
    console.log("There is nothing scheduled for this date.");
    script = "You do not have school today";
  } else {
    script = "You have school today.\n";
    if (date.weekday == 1 || date.weekday == 4) {
      script += "Today is a chapter day.\n";
    } else if (date.weekday == 2 || date.weekday == 5) {
      script += "Today is a prep day.\n";
    } else {
      script += "You do not have prep or chapter today, school begins at nine.\n";
    }
    script += "Your schedule is as follows:\n";
    for (var i = 1; i < today.length; i++) {
      script += today[i].name.split(" - ")[0] + "\n";
    }
    var a = displayAssignments(date);
    script += `You have ${a.length} assignments due today.\n`;

    script += "Have a nice day, Tyler!";
  }
  console.log(script);
}