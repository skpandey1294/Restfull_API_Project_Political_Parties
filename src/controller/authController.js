const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const TOKEN_SECRET = require('../models/secrete_token');
const {
  validationRegistration,
  validationLogin
} = require('../utils/validation');
const authentication = require('../models/authModel');

const registration = async (req, res, next) => {
  const result = validationRegistration(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const table = 'registration';
  const salt = await bcrypt.genSalt(10);
  const hashpass = await bcrypt.hash(req.body.password, salt);
  await authentication.validRegister(req.body, hashpass, table).then(data => {
    if (data.name === 'error') {
      res.send(data.detail);
    } else
      res.send(
        `you have successfully registered with email: ${req.body.email}`
      );
  });
};

const login = async (req, res, next) => {
  const result = validationLogin(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const table = 'registration';

  await authentication
    .validateLogin(req.body, table)
    .then(data => {
      if (data.rowCount === 0) {
        res.send(`Invalid Email`);
        return;
      } else return data.rows[0].password;
    })
    .then(async password => {
      const validPass = await bcrypt.compare(req.body.password, password);
      if (!validPass) {
        res.send(`Invalid Password`);
      } else {
        // res.send(`Logged in Successfully!!!`);

        const token = jwt.sign({ id: req.body.email }, TOKEN_SECRET);
        res.header('auth-token', token).send(token);
      }
    });
};

module.exports = {
  registration: registration,
  login: login
};
