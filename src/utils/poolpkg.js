const { Pool } = require('pg');

const connectionString = 'postgresql://postgres:test123@localhost:5432/api';

pool = new Pool({
  connectionString: connectionString
});

module.exports = pool;
