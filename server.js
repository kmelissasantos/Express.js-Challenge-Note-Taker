
// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require ('./db/db.json');

// Express configuration at port 3000
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require ('./routes/routing');

// Use public folder
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use (express.urlencoded({ extended: true }));
app.use (express.static('public'));
app.use (express.json());
app.use ('/api', routes);

// get route for index.html
app.get ('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// get route for notes.html
app.get ('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
// 'wildcard' routing
app.get ('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen (PORT, () => {
    console.log (`Active server on port ${PORT}!`);
});