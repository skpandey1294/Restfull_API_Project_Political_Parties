const client = require('../routes/clientpkg');

const tableName = 'parties_cm ';

const selectAllData = () => client.query(`select * from ${tableName}`);

const selectDataByState = state =>
  client.query(`select * from ${tableName} where state_name = $1`, [state]);

const addNewData = body => {
  const data = client.query(
    `INSERT INTO ${tableName} (party_name, chief_minister, state_name) VALUES ($1, $2, $3) RETURNING *`,
    [body.party_name, body.chief_minister, body.state_name]
  );
  return data;
};
const updatingChiefMinister = body =>
  client.query(
    `UPDATE ${tableName} SET chief_minister = $1 WHERE state_name = $2`,
    [body.chief_minister, body.state_name]
  );

const deleteData = body =>
  client.query(`DELETE FROM ${tableName} WHERE state_name = $1`, [
    body.state_name
  ]);

module.exports = {
  selectAllData: selectAllData,
  selectDataByState: selectDataByState,
  addNewData: addNewData,
  updatingChiefMinister: updatingChiefMinister,
  deleteData: deleteData
};
