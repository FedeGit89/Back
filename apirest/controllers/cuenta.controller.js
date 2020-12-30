const express = require("express");
const router = express.Router();
const cuentaService = require("../services/cuenta.service");

// router
router.post('/', grabar);
router.get('/:email', getEmail);
router.put('/:email&:opcion&:importe', update);

module.exports = router;

function grabar(req, res, next) {
  cuentaService
    .create(req.body)
    .then(() => res.json({}))
    .catch((err) => res.json({ mensaje: err }));
}

function getEmail(req, res, next) {
  cuentaService
    .getEmail(req.params.email)
    .then((Cuenta) => res.json(Cuenta))
    .catch((err) => next(err));
}

function update(req, res, next) {
  cuentaService
    .update(req.params.email, req.params.opcion, req.params.importe)
    .then(() => res.json({}))
    .catch((err) => next(err));
}
