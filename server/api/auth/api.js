const passport = require('passport');

const express = require('express');
const router = express.Router();
const authService = require('./service');
// const getPerfilPropio = require('./controller').getPerfilPropio;
var requireLogin = passport.authenticate('local', {session: false});
const createUsuario = require('../usuarios/controller').createUsuario;

router.post('/register', (req, res, next) => {
  createUsuario(req.body).then(
    (result) => { res.send(Object.assign({}, result, { created: true })); },
    (error) => { next(error); }//console.log(error); res.status(400).send({ created: false }); }
  );
});
router.post('/login', requireLogin, authService.login);

router.get('/me', authService.requireLogin, (req, res) => {
  authService.getPerfilPropio(req.user._id).then(
    (result) => { res.send(result); },
    (error) => { console.log(error); res.status(400).send(error); }
  );
});

router.put('/me', authService.requireLogin, (req, res) => {
  authService.editPerfilPropio(req.user._id, req.body).then(
    (result) => { res.send(result); },
    (error) => { console.log(error); res.status(400).send(error); }
  );
});

router.get('/me/mascotas', authService.requireLogin, (req, res) => {
  authService.getMascotas(req.user._id).then(
    (result) => { res.send(result); },
    (error) => { console.log(error); res.status(400).send(error); }
  );
})
module.exports = router;
