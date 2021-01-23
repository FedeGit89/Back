const express = require("express");
const Movimiento = require("../models/movimiento.model");

module.exports = {
  grabar,
  getAll,
  getEmail
};

async function grabar(req) {
  const movimiento = new  Movimiento(req);

  // Alta de movimiento
  await movimiento.save();
}

async function getAll() {
  return await Movimiento.find();
}

async function getEmail(email) {
  let movimientoDB = await Movimiento.find({$or:[{mailDebito: email},{mailCredito: email}]})
  
  return await movimientoDB;
}
