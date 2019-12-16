const client = require('../routes/clientpkg');

const tableName = 'parties_detail';

const selectAllData = tblName => client.query(`select * from ${tblName}`);

const selectParty = name =>
  client.query(`select * from ${tableName} where president = $1`, [name]);

const addParty = (party, president) =>
  client.query(
    `INSERT INTO ${tableName} (party_name, president) VALUES ($1, $2) RETURNING *`,
    [party, president]
  );

const changingPresident = (president, party_name) =>
  client.query(`UPDATE ${tableName} SET president = $1 WHERE party_name = $2`, [
    president,
    party_name
  ]);

const deleteParty = body =>
  client.query(`DELETE FROM ${tableName} WHERE party_name = $1`, [
    body.party_name
  ]);

module.exports = {
  selectAllData: selectAllData,
  selectParty: selectParty,
  addParty: addParty,
  changingPresident: changingPresident,
  deleteParty: deleteParty
};
