const path = require('path');
const pool = require('./poolpkg');
//pool.connect();​
function getPath(fileName) {
  return path.resolve(`${fileName}`);
}

async function dropTable() {
  const query = `DROP TABLE IF EXISTS PARTIES_DETAIL, PARTIES_CM;`;
  await pool.query(query);
}

async function createPartiesTable() {
  try {
    const filePath = getPath('../csvData/parties.csv');
    const query = `CREATE TABLE IF NOT EXISTS PARTIES_DETAIL (
PARTY_NAME VARCHAR(30) PRIMARY KEY,
PRESIDENT  VARCHAR(30) NOT NULL
);`;

    await pool.query(query);
    await pool.query(
      `\copy PARTIES_DETAIL from '${filePath}' with delimiter ',' csv header`
    );
  } catch (e) {
    console.log('SQL Exception');
    console.log(e);
  }
}
async function createCMTable() {
  try {
    const filePath = getPath('../csvData/parties_cm.csv');
    const query = `CREATE TABLE IF NOT EXISTS PARTIES_CM (

PARTY_NAME VARCHAR(30),
CHIEF_MINISTER VARCHAR(30),
STATE_NAME VARCHAR(30) PRIMARY KEY,
FOREIGN KEY (PARTY_NAME)
REFERENCES PARTIES_DETAIL(PARTY_NAME)
ON DELETE CASCADE
);`;
    await pool.query(query);
    await pool.query(
      `\copy PARTIES_CM from '${filePath}' with delimiter ',' csv header`
    );
  } catch (error) {
    console.log('SQL Exception');
    console.log(error);
  }
}

async function seed() {
  // await pool.connect();​
  await dropTable();
  await createPartiesTable();
  await createCMTable();
  await pool.end();
  console.log('seeding done');
}
seed();
