const Joi = require('joi');

const validationToGetPartyData = body => {
  const schema = {
    name: Joi.string()
      .min(5)
      .required()
  };
  const resl = Joi.validate(body, schema);
  return resl;
};

const validationToAddParty = body => {
  const schema = {
    party_name: Joi.string()
      .min(5)
      .required(),
    president: Joi.string()
      .min(5)
      .required()
  };
  const resl = Joi.validate(body, schema);
  return resl;
};

const validationToUpdatePresident = body => {
  const schema = {
    president: Joi.string()
      .min(5)
      .required(),
    party_name: Joi.string()
      .min(10)
      .required()
  };
  const resl = Joi.validate(body, schema);
  return resl;
};

const validationToDeleteParty = body => {
  const schema = {
    party_name: Joi.string()
      .min(5)
      .required()
  };
  const resl = Joi.validate(body, schema);
  return resl;
};

const validationRegistration = body => {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(30)
      .required(),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string()
      .min(6)
      .max(100)
      .required()
  };
  const resl = Joi.validate(body, schema);
  return resl;
};

const validationLogin = body => {
  const schema = {
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    password: Joi.string()
      .min(6)
      .max(100)
      .required()
  };
  const resl = Joi.validate(body, schema);
  return resl;
};

module.exports = {
  validationToGetPartyData: validationToGetPartyData,
  validationToAddParty: validationToAddParty,
  validationToUpdatePresident: validationToUpdatePresident,
  validationToDeleteParty: validationToDeleteParty,
  validationRegistration: validationRegistration,
  validationLogin: validationLogin
};
