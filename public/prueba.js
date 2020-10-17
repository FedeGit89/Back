const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.use(express.static(__dirname + "/public"));

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var str = "";

app.route("/consultaUsuarios").get(function (req, res) {
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db("proyecto");
    var cursor = dbo.collection("usuarios").find();

    cursor.each(function (err, item) {
      if (item != null) {
        str = str + " No se " + item.nombre + "&lt;/br&gt;";
      }
    });
    res.send(str);
    db.close();
  });
});

var server = app.listen(3000, function () {
  console.log("tu servidor está listo en " + this.address().port);
});
