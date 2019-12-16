const { Client } = require('pg');

const connectionString = 'postgresql://postgres:test123@localhost:5432/api';

client = new Client({
  connectionString: connectionString
});

module.exports = client;
