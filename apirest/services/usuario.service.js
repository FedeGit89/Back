const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../../apirest/models/usuario.model");

module.exports = {
  login,
  getAll,
  getEmail,
  create,
  update,
  delete: _delete,
};

async function login(req, res, next) {
  let email = req.email;
  let password = req.password;
  let usuarioDB = await Usuario.findOne({ email: email });

  // Verifica que exista un usuario con el mail escritao por el usuario.
  if (!usuarioDB) {
    throw "Usuario " + email + " no existe";
  }

  // Valida que la contraseña escrita por el usuario, sea la almacenada en la db
  if (!bcrypt.compareSync(password, usuarioDB.password)) {
    throw "Contraseña incorrecta";
  }

  // Genera el token de autenticación
  let token = jwt.sign(
    {
      usuario: usuarioDB,
    },
    process.env.SEED_AUTENTICACION,
    {
      expiresIn: process.env.CADUCIDAD_TOKEN,
    }
  );
  return await usuarioDB;
}

async function getAll() {
  return await Usuario.find();
}

async function getEmail(email) {
  let usuarioDB = await Usuario.find({ email: email });
  // validate
  if (!usuarioDB) throw "Usuario no encontrado";

  return await usuarioDB;
}

async function create(req) {
  const usuario = new Usuario(req);

  // Generar hash password
  if (req.password) {
    usuario.password = bcrypt.hashSync(req.password, 10);
  }
  // Alta de usuario
  await usuario.save();
}

async function update(email, req) {
  let usuarioModif = new Usuario(await Usuario.findOne({ email: email }));

  if (!usuarioModif) throw "Usuario no encontrado";

  usuarioModif.nombre = req.nombre;
  usuarioModif.apellido = req.apellido;
  usuarioModif.dni = req.dni;
  usuarioModif.fechaNacimiento = req.fechaNacimiento;
  usuarioModif.password = bcrypt.hashSync(req.password, 10);

  await usuarioModif.save();
  // await usuarioModif.updateOne();
}

async function _delete(email) {
  await Usuario.deleteOne({ email: email });
}
