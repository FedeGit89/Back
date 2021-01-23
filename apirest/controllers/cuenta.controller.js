const express = require("express");
const router = express.Router();
const cuentaService = require("../services/cuenta.service");

// router
router.post('/', grabar);
router.get('/:email', getEmail);
router.put('/:email&:opcion&:importe', update);
router.get('/', mascara);

module.exports = router;

function grabar(req, res, next) {
  cuentaService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => res.json({ mensaje: err }));
}

function getEmail(req, res) {
  cuentaService
    .getEmail(req.params.email)
    .then((Cuenta) => res.json(Cuenta))
    .catch((err) =>  res.json({ mensaje: err }));
}

function update(req, res, next) {
  cuentaService
    .update(req.params.email, req.params.opcion, req.params.importe)
    .then(() => res.json({}))
    .catch((err) => next(err));
}

function mascara(req, res, next) {
  cuentaService
    .mascara(req)
    .then(() => res.json({}))
    .catch((err) => next(err));
}