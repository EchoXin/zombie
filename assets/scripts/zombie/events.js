'use strict';

const getFormFields = require('../../../lib/get-form-fields');
const api = require('./api');
const ui = require('./ui');

const onCreate = function (event) {
  // let diarydata = getFormFields(this);
  // console.log(diarydata);
  console.log("yse");
  event.preventDefault();

  api.create()
    .done(ui.success)
    .fail(ui.onError);
};

// const onDelete = function () {
//   event.preventDefault();
//   api.destroy()
//     .done(api.getAllDiary)
//     .fail(ui.onError);
//
// };

const addHandlers = () => {

  $('.new-game').on('click', onCreate);
};

module.exports = {
    addHandlers,
  };
