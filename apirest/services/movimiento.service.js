const express = require("express");
const Movimiento = require("../models/movimiento.model");

module.exports = {
  grabar,
  getAll,
  getEmailDeb
};

async function grabar(req) {
  const movimiento = new  Movimiento(req);

  // Alta de movimiento
  await movimiento.save();
}

async function getAll() {
  return await Movimiento.find();
}

async function getEmailDeb(email) {
  let movimientoDB = await Movimiento.find({ mailDebito : email });
  // validate
  if (!movimientoDB) throw "Usuario no encontrado";

  return await movimientoDB;
}