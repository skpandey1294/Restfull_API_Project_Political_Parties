const model = require('../models/PartyQueries');

const {
  validationToGetPartyData,
  validationToAddParty,
  validationToUpdatePresident,
  validationToDeleteParty
} = require('../utils/validation');

//  1) Getting All the Parties

const getAllParties = (req, res, next) => {
  model
    .selectAllData(`parties_detail`)
    .then(data => {
      if (data.rows === 0) {
        next({
          message: `No Party Present`,
          status: 404
        });
      } else {
        res.send(data.rows);
      }
    })
    .catch(err => {
      next(err);
    });
};

//  2) Getting Party Using President Name

const getPartyByPresidentName = (req, res, next) => {
  const president = req.params.name;
  const result = validationToGetPartyData(req.params);
  if (result.error) {
    next(result.error.details[0]);
    return;
  }
  model
    .selectParty(president)
    .then(data => {
      if (data.rows.length === 0) {
        next({
          message: `Bad Request`,
          status: 503
        });
      } else {
        res.send(data.rows);
      }
    })
    .catch(err => {
      next(err);
    });
};

//  3) Adding a New Party

const addParty = (req, res, next) => {
  const result = validationToAddParty(req.body);
  if (result.error) {
    next(result.error.details[0]);
    return;
  }
  const party = req.body.party_name;
  const president = req.body.president;
  model
    .addParty(party, president)
    .then(data => {
      res.send(data.rows);
    })
    .catch(err => {
      next(err.details);
    });
};

// 4) Changing President of a Party

const updatePresident = (req, res, next) => {
  const result = validationToUpdatePresident(req.body);
  if (result.error) {
    next(result.error.details[0]);
    return;
  }
  model
    .changingPresident(req.body.president, req.body.party_name)
    .then(data => {
      res.send(`${data.rowCount} row updated`);
    })
    .catch(err => {
      next(err);
    });
};

// 5)  delete party

const deleteParty = (req, res, next) => {
  const result = validationToDeleteParty(req.body);

  if (result.error) {
    next(result.error.details[0]);
    return;
  }
  model
    .deleteParty(req.body)
    .then(data => {
      if (data.rowCount === 0) {
        next({
          message: 'Party does not exist',
          status: 404
        });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      next(err);
    });
};

module.exports = {
  getAllParties: getAllParties,
  getPartyByPresidentName: getPartyByPresidentName,
  addParty: addParty,
  updatePresident: updatePresident,
  deleteParty: deleteParty
};
