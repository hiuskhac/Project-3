const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let projectData = {};

app.use(express.static("public"));

app.get("/projectData", (req, res) => {
  res.json(projectData);
});

app.post("/projects", (req, res) => {
  const newProject = req.body;
  projectData = newProject;
  res.json({
    message: "Update zip code and feelings success",
    project: projectData,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
