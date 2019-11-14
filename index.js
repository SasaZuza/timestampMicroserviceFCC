// Importing express
const express = require("express");
const app = express();

// Making new request for the project
app.get("/api/timestamp/:dateString?", (request, response) => {
  // This are route parameters that connects to 'dateString'
  const dateString = request.params.dateString;

  // If the date string is empty it should be equivalent to trigger new Date()
  let date;
  if (!dateString) {
    date = new Date();
  } else {
    // This is if we enter non-empty string
    // If date string is a number convert 'dateString' to integer
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  // If the date string is invalid the api returns a JSON with this message
  if (date.toString() === "Invalid Date") {
    response.json({ error: date.toString() });
  } else {
    // If the date string is valid the api returns a JSON having the structure
    response.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

// Demonstration of the GET request

// This is how we get .css file
app.use(express.static("public"));

app.get("/", (request, response) => {
  // When on homepage return this .html file
  response.sendFile(`${__dirname}/views/index.html`);
});

// Listening on port
app.listen("8000", () => {
  console.log("Listening on port 8000");
});
