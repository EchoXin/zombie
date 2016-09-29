'use strict';

const app = require('../app');
const authApi = require('../auth/ui.js');
let gameId;

// const ui = require('./ui');
// const getFormFields = require('../../../lib/get-form-fields');


const create = function () {
  return $.ajax({
    url: app.api + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + authApi.app.user.token,
    },
    data: {
      game: {
        zombie: 0,
      },
    },
  }).then(data => gameId = data.game.id);
};



const update = function (data) {
  console.log(data);
  return $.ajax({
    url: app.api + '/games/' + gameId,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + authApi.app.user.token,
    },
    data: {
      game: {
        zombie: data,
      },
    },
  });
};

const getMyGames = function () {
  return $.ajax({
    url: app.api + '/mygames',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + authApi.app.user.token,
    },

  });
};


const getGames = function () {
  return $.ajax({
    url: app.api + '/games',
    method: 'GET',
  });
};

const displayRanking = function(data){
  $('#ranking-list').html('');
  for (let i = 0; i < data.games.length; i++) {
    $('#ranking-list').append(`<p>${data.games[i].user.email}: &nbsp&nbsp&nbsp${data.games[i].zombie}</p>`)
  }
  $('#ranking').modal('show');
};

const cleanHistory = () => $.ajax({
  url: app.api + '/mygames',
  method: 'DELETE',
  headers: {
    Authorization: 'Token token=' + app.user.token,
  },
});

module.exports = {
  create,
  update,
  getGames,
  displayRanking,
  getMyGames,
  cleanHistory,
};
