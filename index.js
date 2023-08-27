const express = require("express");
const { google } = require("googleapis");

const app = express();
const port = 3000;

const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const GOOGLE_PROJECT_NUMBER = "107471804909298600487";
const GOOGLE_CALENDAR_ID =
  "f16ah2rbod630a4fa8vgq7pbbs@group.calendar.google.com";

const auth = new google.auth.GoogleAuth({
  keyFile: "/Users/NigelTaylor/Downloads/sorgues-7e2d057fd0e6.json",
  scopes: ["https://www.googleapis.com/auth/calendar.events"],
});

const calendar = google.calendar({
  version: "v3",
  project: GOOGLE_PROJECT_NUMBER,
  auth: auth,
});

console.log("calendar", calendar);

calendar.events.list(
  {
    calendarId: GOOGLE_CALENDAR_ID,
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  },
  (error, result) => {
    if (error) {
      res.send(JSON.stringify({ error: error }));
    } else {
      if (result.data.items.length) {
        res.send(JSON.stringify({ events: result.data.items }));
      } else {
        res.send(JSON.stringify({ message: "No upcoming events found." }));
      }
    }
  }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
