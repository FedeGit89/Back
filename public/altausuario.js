const express = require("express");
const bodyparser = require("body-parser");
const app = express();

app.use(express.static(__dirname + "/public"));

port = process.env.PORT || 3000;

app.use(bodyparser.json());

// en cada request http para cualquier método, se invoca esta funcion
app.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});

app.listen(port, function () {
  console.log("Example app listening on port 3000!");
});

app.post("/altaUsuario", function (req, res) {
  var MongoClient = require("mongodb").MongoClient;
  var url = "mongodb://localhost:27017/";

  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err, db) {
      if (err) throw err;
      var dbo = db.db("proyecto");
      dbo
        .collection("usuarios")
        .insertOne({ nombre: "Juan", apellido: "Perez" }, function (
          err,
          result
        ) {
          if (err) throw err;
          console.log(result.name);
          db.close();
        });
    }
  );
});
