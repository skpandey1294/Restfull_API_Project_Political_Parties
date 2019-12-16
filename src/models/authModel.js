const client = require('../routes/clientpkg');

const validRegister = async (body, pass, table) => {
  try {
    const data = await client.query(
      `INSERT INTO ${table} (name, email, password) VALUES ($1, $2, $3)`,
      [body.name, body.email, pass]
    );
    return data;
  } catch (err) {
    return err;
  }
};

const validateLogin = async (body, table) => {
  try {
    const data = await client.query(
      `SELECT password FROM ${table} WHERE email = $1`,
      [body.email]
    );
    return data;
  } catch (err) {
    return err;
  }
};

module.exports = {
  validRegister: validRegister,
  validateLogin: validateLogin
};
