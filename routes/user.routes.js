const express = require('express');
const router = express.Router();
const { register, login, updateUser } = require('../controllers/user.controller');

router.route('/register')
    .post(register);

router.route('/login')
    .post(login);

router.route('/update/:id')
    .patch(updateUser);

module.exports = router;