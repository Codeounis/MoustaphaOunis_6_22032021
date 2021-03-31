const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// Routes des requêtes liées à l'inscription et connexion utilisateurs
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;