const express = require("express");
const bodyparser = require('body-parser');
const app = express();

app.use(express.static(__dirname + '/public'));

port = process.env.PORT || 3000;

app.use(bodyparser.json());

// en cada request http para cualquier método, se invoca esta funcion
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});

app.post('/login', function(req, res) {
  console.log('Request login');
  console.log(req.body);
  let email = req.body.email;
  let clave = req.body.clave;


  const fs = require('fs');

  let rawdata = fs.readFileSync('data/usuarios.json');
  let usuarios = JSON.parse(rawdata);
  //console.log(usuarios);

  usuarios.forEach(element => {
    if (element.email == email && element.clave == clave){
      console.log('Login correcto');
      res.send('Login correcto')
    }
  });

  console.log('Login Incorrecto');
  //res.status(400).send('Login Incorrecto');

  res.statusCode = 400;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Login Incorrecto');
  
})