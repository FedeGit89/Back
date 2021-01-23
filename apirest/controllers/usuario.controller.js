const express = require("express");
const router = express.Router();
const usuarioService = require("../services/usuario.service");

// router
router.post("/login", login);
router.post("/registrar", registrar);
router.get("/:email", getEmail);
router.put("/:email", update);

module.exports = router;

function login(req, res, next) {
  usuarioService
    .login(req.body)
    .then((Usuario) => res.json(Usuario))
    .catch((err) => res.json({ mensaje: err }));
}

function registrar(req, res, next) {
  usuarioService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => res.json({ mensaje: err }));
}

function getEmail(req, res, next) {
  usuarioService
    .getEmail(req.params.email)
    .then((Usuario) => res.json(Usuario))
    .catch((err) => res.json({ mensaje: err }));
}

function update(req, res, next) {
  usuarioService
    .update(req.params.email, req.body)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
