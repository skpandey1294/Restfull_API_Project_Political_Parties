const cm_query = require('../models/CMQueries');
const valid = require('../utils/cmValidation');

// 1) Find All teh data of the table parties_cm

const getAllCMDetails = (req, res, next) => {
  cm_query
    .selectAllData()
    .then(data => {
      if (data.rows === 0) {
        next({
          message: `No Data Present`,
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

// 2) Get Chief Minister By State Name

const getCMBystate = (req, res, next) => {
  const result = valid.cmStateValid(req.params);
  if (result.error) {
    next(result.error.details[0]);
    return;
  }

  cm_query
    .selectDataByState(req.params.state)
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

// 3) Adding New State Details
const addNewStateAndCM = (req, res, next) => {
  const result = valid.fun1(req.body);
  if (result.error) {
    next(result.error.details[0]);
    return;
  }
  cm_query
    .addNewData(req.body)
    .then(data => {
      if (!data.rows) {
        res.send(data.details);
      }
    })
    .catch(err => {
      next(err.details);
    });
};

//  4) Updating Chief Minister Of a State

const updateCM = (req, res, next) => {
  const result = valid.fun2(req.body);
  if (result.error) {
    next(result.error.details[0]);
    return;
  }

  cm_query
    .updatingChiefMinister(req.body)
    .then(data => {
      res.send(`${data.rowCount} row updated`);
    })
    .catch(err => {
      next(err);
    });
};

//  5) Delete State Details

const deleteState = (req, res, next) => {
  const result = valid.fun3(req.params);
  if (result.error) {
    next(result.error.details[0]);
    return;
  }

  cm_query
    .deleteData(req.params)
    .then(data => {
      if (data.rowCount === 0) {
        next({
          message: 'State does not exist',
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

module.exports = {
  getAllCMDetails: getAllCMDetails,
  getCMBystate: getCMBystate,
  addNewStateAndCM: addNewStateAndCM,
  updateCM: updateCM,
  deleteState: deleteState
};
