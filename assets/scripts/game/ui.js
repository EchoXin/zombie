'use strict';

const success = (data) => {
  console.log('create success');
};

const failure = (error) => {
  console.error(error);
};

module.exports = {
  failure,
  success,
};
