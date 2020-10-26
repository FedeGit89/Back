const express = require('express');
const router = express.Router();
const usuarioService = require('../services/usuario.service');

// router
router.post('/login', login);
router.post('/registrar', registrar);
router.get('/', getAll);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function login(req, res , next) {
    usuarioService.login(req.body)
        .then(Usuario => res.json(Usuario))
        .catch(err => res.json({mensaje:err}));
}

function registrar(req, res, next) {
    usuarioService.create(req.body)
        .then(() => res.json({}))
        .catch(err => res.json({mensaje:err}));
}

function getAll(req, res, next) {
    usuarioService.getAll()
        .then(Usuario => res.json(Usuario))
        .catch(err => next(err));
}

function update(req, res, next) {
    usuarioService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    usuarioService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}