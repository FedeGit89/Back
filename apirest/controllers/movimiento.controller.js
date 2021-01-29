const express = require("express");
const router = express.Router();
const movimientoService = require("../services/movimiento.service");

// router
router.post('/', grabar);
router.get('/:email', getEmail);



module.exports = router;

function grabar(req, res) {
  movimientoService
    .grabar(req.body)
    .then(() => res.json({}))
    .catch((err) => res.json({ mensaje: err }));
}

function getEmail(req, res, next) {
  movimientoService
    .getEmail(req.params.email)
    .then((Usuario) => res.json(Usuario))
    .catch((err) => next(err));
}
