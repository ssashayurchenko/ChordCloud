const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  const data = `Login: ${login}, Password: ${password}\n`;

  fs.appendFile("form-data.txt", data, (err) => {
    if (err) {
      console.error("Error saving data", err);
      res.status(500).send("Error saving data");
    } else {
      res.send("Data saved successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
