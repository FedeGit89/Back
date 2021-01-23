const express = require("express");
const Cuenta = require("../models/cuenta.model");

module.exports = {
  getEmail,
  create,
  update,
  mascara,
};

async function getEmail(email) {
  let cuentaDB = await Cuenta.findOne({ email: email });
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
  let cuentaModif = new Cuenta(await Cuenta.findOne({ email: email }));

  if (!cuentaModif) throw "Cuenta no encontrado";

  let importeNum = parseFloat(importe);
  if (opcion == "D") {
    cuentaModif.saldo = cuentaModif.saldo - importeNum;
  } else {
    cuentaModif.saldo = cuentaModif.saldo + importeNum;
  }
  cuentaModif.email = email;

  await cuentaModif.save();
}

async function mascara(req) {
  let cuentaDB = "";

  return await cuentaDB;
}
