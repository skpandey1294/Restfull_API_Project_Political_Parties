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

// 2)const

const fun1 = body => {
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

const fun2 = body => {
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

const fun3 = body => {
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
  fun1: fun1,
  fun2: fun2,
  fun3: fun3
};
