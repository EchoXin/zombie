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

const getMyGames = function (data) {
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
  console.log(data);
  let rankingTemplate = require('./ranking.handlebars');
  $('#ranking').html(rankingTemplate({
      games: data.games,
    }));
};


module.exports = {
  create,
  update,
  getGames,
  displayRanking,
  getMyGames,

};
