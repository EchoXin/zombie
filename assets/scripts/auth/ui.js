'use strict';

const app = require('../app');

const signInSuccess = (data) => {
  app.user = data.user;
  $('#change-password-button').css('display', 'block');
  $('#sign-out').css('display', 'block');
  $('#startbutton').css('display', 'block');
  $('#rank').css('display', 'block');
  $('.after-sign-in').css('display', 'none');

};

const success = (data) => {
  console.log(data);
};

const failure = (error) => {
  console.error(error);
};

const signOutSuccess = () => {
  delete app.user;
  $('#change-password-button').css('display', 'none');
  $('#sign-out').css('display', 'none');
  $('#startbutton').css('display', 'none');
  $('#rank').css('display', 'none');
  $('.after-sign-in').css('display', 'block');
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
