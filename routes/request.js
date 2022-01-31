//Require Dependicies
const fs = require("fs");
const path = require("path");

module.exports = function (app) {
  
  // Accessing fs to read db.json
  fs.readFile("db/db.json", "UTF-8", function (error, data) {
  
    if (error) {
      throw error;
    }
  
    //Declaring notes variable and parsing the json notes data
    var notes = JSON.parse(data);
  
    // Retrieves the notes from the database
    app.get("/api/notes", function (req, res) {
      res.json(notes);
      console.log(notes)
    });
  
    // Creates a new notes post
    app.post("/api/notes", function (req, res) {
      var postNote = req.body;
      notes.push(postNote);
      fs.writeFile(
        "db/db.json",
        JSON.stringify(notes),
        "UTF-8",
        function (error) {
          if (error) {
            throw error;
          }
        }
      );
      console.log(notes);
      res.json(postNote);
    });
  
    // Retrieves the notes from the updated database
    app.get("/api/notes/:id", function (req, res) {
      res.json(notes[req.params.id]);
    });
  
    // Deletes old notes post from database
    app.delete("/api/notes/:id", function (req, res) {
      notes.splice(req.params.id, 1);
      fs.writeFile(
        "db/db.json",
        JSON.stringify(notes),
        "UTF-8",
        function (error) {
          if (error) {
            throw error;
          }
        }
      );
      
      res.send(notes);
    });
  
    // Returns the `notes.html` file  from "/notes".
    app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
  
    // Returns the `notes.html` file from "/".
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  });
};
