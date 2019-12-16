const jwt = require('jsonwebtoken');
const secrete_token = require('../models/secrete_token');
const auth = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, secrete_token);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Inivalid token');
  }
};

module.exports = auth;
