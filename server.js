//make the endpoint object to hold data that coming from the frontend (clinet side)
let projectData = {};
//require the express application framework
const express = require("express");
//app instance from express library
var app = express();
// localHost port setup
const port = 8000;
// parse json files (middleware function)
app.use(express.json()); //parse the json format to string;
app.use(express.urlencoded({ extended: false })); //is a body parser for html post form
app.use(express.static("website")); // website folder path
const cors = require("cors"); // setup cors to listen to other https requests out of the server localHost

app.use(cors()); // corls middleware

app.post("/add", async (req, res) => {
  const body = await req.body;
  console.log(projectData);
  projectData = body;
  res.send(projectData);
});

app.get("/all", async (req, res) => {
  console.log(projectData);

  res.send(projectData);
});

//listening for the server through the express.listen
app.listen(port, (_) => console.log(`listening on port ${port}`));
