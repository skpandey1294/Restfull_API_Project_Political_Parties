const express = require('express');
const { registration, login } = require('./authController');

const authRouter = express.Router();
authRouter.use(express.json());

authRouter.post('/register', registration);

authRouter.post('/login', login);

module.exports = { authRouter: authRouter };
