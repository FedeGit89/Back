const express = require("express");
const Cuenta = require("../models/cuenta.model");

module.exports = {
  getEmail,
  create,
  update
};


async function getEmail(email) {
  let cuentaDB = await Cuenta.find({ email: email });
  // validate
  if (!cuentaDB) throw "Cuenta no encontrado";

  return await cuentaDB;
}

async function create(req) {
  const cuenta = new Cuenta(req);

  // Alta de usuario
  await cuenta.save();
}

async function update(email, opcion, importe) { 
  console.log(email);
  console.log(opcion);
  console.log(importe);
  let cuentaModif = new Cuenta(await Cuenta.findOne({ email: email }));

  if (!cuentaModif) throw "Cuenta no encontrado";

  let importeNum = parseFloat(importe);
  console.log(opcion);
  if (opcion == 'D') {
    console.log("Resto");
    cuentaModif.saldo = cuentaModif.saldo - importeNum;
  } else {
    console.log("Sumo");
    cuentaModif.saldo = cuentaModif.saldo + importeNum;
  }
  console.log(cuentaModif.saldo);
  cuentaModif.email = email;
  

  await cuentaModif.save();
}

