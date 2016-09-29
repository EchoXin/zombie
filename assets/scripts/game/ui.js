'use strict';

const success = function () {
  console.log('create success');
};

const failure = (error) => {
  console.error(error);
};

module.exports = {
  failure,
  success,
};
