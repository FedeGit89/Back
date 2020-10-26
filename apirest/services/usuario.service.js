const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../../apirest/models/usuario.model");

module.exports = {
  login,
  getAll,
  create,
  update,
  delete: _delete,
};

async function login(req, res, next) {
  let email = req.email;
  let password = req.password;
  console.log(email);
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

async function create(req) {
  if (usuarioDB = await Usuario.findOne({ email: req.email })){
    throw "Usuario " + req.email + " ya existe";
  }

  const usuario = new Usuario(req);

  // Generar hash password
  if (req.password) {
    usuario.password = bcrypt.hashSync(req.password, 10);
  }

  // Alta de usuario
  await usuario.save();
}

async function update(id, usuarioParam) {
  const usuario = await Usuario.find(id);

  // validate
  if (!usuario) throw "Usuario not found";
  if (
    usuario.username !== usuarioParam.username &&
    (await Usuario.findOne({ username: usuarioParam.username }))
  ) {
    throw 'Usuarioname "' + usuarioParam.username + '" is already taken';
  }

  // hash password if it was entered
  if (usuarioParam.password) {
    usuarioParam.hash = bcrypt.hashSync(usuarioParam.password, 10);
  }

  // copy usuarioParam properties to usuario
  Object.assign(usuario, usuarioParam);

  await usuario.save();
}

async function _delete(id) {
  await Usuario.findByIdAndRemove(id);
}
