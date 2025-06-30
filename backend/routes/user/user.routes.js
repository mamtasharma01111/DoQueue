const express = require('express');
const { login } = require('../../controlller/user/user.controller.js');

const router = express.Router();

router.post('/login', login);

module.exports = router;