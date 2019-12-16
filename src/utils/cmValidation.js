const Joi = require('joi');
const cmStateValid = body => {
  const schema = {
    state: Joi.string()
      .min(5)
      .required()
  };
  const result = Joi.validate(body, schema);
  return result;
};

const stateDetails = body => {
  const schema = {
    party_name: Joi.string()
      .min(5)
      .required(),
    chief_minister: Joi.string()
      .min(4)
      .max(30),
    state_name: Joi.string()
      .min(3)
      .max(15)
  };
  const result = Joi.validate(body, schema);
  return result;
};

const cmDetailsValid = body => {
  const schema = {
    chief_minister: Joi.string()
      .min(4)
      .max(30)
      .required(),
    state_name: Joi.string()
      .min(3)
      .max(15)
      .required()
  };
  const result = Joi.validate(body, schema);
  return result;
};

const deletingDataValid = body => {
  const schema = {
    state_name: Joi.string()
      .min(3)
      .max(15)
      .required()
  };
  const result = Joi.validate(body, schema);
  return result;
};

module.exports = {
  cmStateValid: cmStateValid,
  stateDetails: stateDetails,
  cmDetailsValid: cmDetailsValid,
  deletingDataValid: deletingDataValid
};
