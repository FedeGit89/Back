const express = require("express");
const router = express.Router();
const movimientoService = require("../services/movimiento.service");

// router
router.post('/', grabar);
router.get('/', getAll);
router.get('/:email', getEmailDeb);

module.exports = router;

function grabar(req, res, next) {
  movimientoService
    .grabar(req.body)
    .then(() => res.json({}))
    .catch((err) => res.json({ mensaje: err }));
}

function getAll(req, res, next) {
  movimientoService
    .getAll()
    .then((Movimiento) => res.json(Movimiento))
    .catch((err) => next(err));
}

function getEmailDeb(req, res, next) {
  movimientoService
    .getEmailDeb(req.params.email)
    .then((Usuario) => res.json(Usuario))
    .catch((err) => next(err));
}