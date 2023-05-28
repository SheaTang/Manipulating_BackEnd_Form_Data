const express = require("express");
const app = express();
var low = require("lowdb");
var fs = require("lowdb/adapters/FileSync");
var adapter = new fs("db.json");
var db = low(adapter);

// configure express to serve static files from public directory
// ------------------------------------------------------------------
app.use(express.static("public"));

// init the data store
db.defaults({ posts: [] }).write();

// list posts
app.get("/data", function (req, res) {
  res.send(db.get("posts").value());
});

// ----------------------------------------------------
// add post - test using:
//      curl http://localhost:3001/posts/ping/1/false
// ----------------------------------------------------
app.get("/posts/:title/:id/:published", function (req, res) {
  var post = {
    id: req.params.id,
    title: req.params.title,
    published: req.params.published,
  };
  db.get("posts").push(post).write();
  console.log(db.get("posts").value());
  res.send(db.get("posts").value());
});

// ----------------------------------------------------
// delete All entries - test using:
//      curl http://localhost:3001/deleteAll
// ----------------------------------------------------
app.get("/deleteAll", function (req, res) {
  // YOUR CODE
  db.get("posts").remove().write();
  // 204 Success No Content
  res.status(204).send();
});

// start server
// -----------------------
app.listen(3001, function () {
  console.log("Running on port 3001!");
});
