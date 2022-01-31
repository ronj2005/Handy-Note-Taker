//Require Dependicies
const fs = require("fs");
const path = require('path');
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// Routes
require('./routes/request')(app);

// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
