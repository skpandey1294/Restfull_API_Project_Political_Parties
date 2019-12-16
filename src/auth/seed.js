const pool = require('../utils/poolpkg');

async function dropTable() {
  const query = `DROP TABLE IF EXISTS REGISTRATION, LOGIN;`;
  await pool.query(query);
}

async function createRegistrationTable() {
  try {
    const query = `CREATE TABLE IF NOT EXISTS REGISTRATION (
NAME VARCHAR(30) NOT NULL,
EMAIL  VARCHAR(30) PRIMARY KEY,
PASSWORD VARCHAR(100) NOT NULL
);`;

    await pool.query(query);
  } catch (e) {
    console.log('SQL Exception');
    console.log(e);
  }
}

async function seed() {
  await dropTable();
  await createRegistrationTable();
  await pool.end();
  console.log('seeding done');
}
seed();
