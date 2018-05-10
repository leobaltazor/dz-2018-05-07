var express = require("express");
var json = express();
var fs = require("fs");
var cors = require("cors");
var bodyParser = require("body-parser");

let message = null;
let connectArr = [];

json.use(express.static("public"));
json.use(cors());
json.use(bodyParser.urlencoded({ extended: false }));
json.use(bodyParser.json());

// json.get("/", function(req, res) {
//   res.send("ok");
// });

json.post("/message", (req, res) => {
  if (req.body && req.body.message) {
    while (connectArr.length) {
      var user = connectArr.pop();
      user.res.send(JSON.stringify(req.body));
    }
    res.send(req.body);
  } else {
    res.send("Неправильный параметр");
  }
});

json.get("/message", (req, res) => {
  connectArr.push({req, res});
});

json.listen(3000, function() {
  console.log("app statr on port 3000");
});
