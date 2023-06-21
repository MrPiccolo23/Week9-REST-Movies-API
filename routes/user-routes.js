const { check } = require('express-validator');
const usersController = require('../controllers/user-controller');
const express = require('express');
const router = express.Router();

// Register Routes 
router.post('/register',
  [ check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 })],
usersController.register)

// Login Routes

router.post('/login',
  [ check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 })],
usersController.login)

module.exports = router;