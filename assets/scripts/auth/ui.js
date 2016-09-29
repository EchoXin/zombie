'use strict';

const app = require('../app');

const signInSuccess = (data) => {
  app.user = data.user;
  // $('#change-password-button').css('display', 'block');
  // $('#sign-out').css('display', 'block');
  // $('#startbutton').css('display', 'block');
  // $('#rank').css('display', 'block');
  $('.before-sign-in').css('display','none');
  $('.after-sign-in').css('display', 'block');

};

const success = (data) => {
  console.log(data);
};

const failure = (error) => {
  console.error(error);
};

const signOutSuccess = () => {
  delete app.user;
  $('.before-sign-in').css('display','block');
  $('.after-sign-in').css('display', 'none');

  $('#maindiv').css('display', 'none');
  $('.before-start').css('display', 'block');


};

module.exports = {
  failure,
  success,
  signInSuccess,
  signOutSuccess,
  app,
};
