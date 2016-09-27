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
//
// const onUpdate = function (event) {
//   let data = getFormFields(this);
//   event.preventDefault();
//   update(data)
//     .done(ui.success)
//     .fail(ui.onError);
//   $('.my-game').html(`<div class='game-body'>
//   <h1
//   class="game-title">${data.title}</h1>
//   <p class="game-content">${data.content}</p>
//   </div>`);
//   $('.edit-game').empty();
// };
//
// const destroy = function () {
//   return $.ajax({
//     url: app.api + '/games/' + gameId,
//     method: 'DELETE',
//     headers: {
//       Authorization: 'Token token=' + authApi.app.user.token,
//     },
//   });
// };
//
// // show all game
// let displayDiaries = function (data) {
//   $('.my-game').removeClass('hide');
//   $('.my-game').empty();
//   for (let i = 0; i < data.length; i++) {
//     let weather = data[i].weather;
//     let date = data[i].created_at.substr(0, 10);
//     let time = data[i].created_at.substr(11, 5);
//
//     $('.my-game').append(`<a href='#' data-id='${data[i].id}' class='single-game list-group-item'>
//     <img src='https://openweathermap.org/img/w/${weather}.png'>
//     ${data[i].title}
//     <span class="game-date"> ${date} ${time}</span>
//     </a>`);
//   }
// };
//
// // show single game
// let displayDiary = function () {
//
//   $('.single-game').on('click', function () {
//     $('.after-show-game').removeClass('hide');
//     gameId = $(this).data('id');
//     for (let i = 0; i < gameArray.length; i++) {
//       if (gameArray[i].id === gameId) {
//         console.log(gameArray[i].id);
//         console.log(gameArray[i].title);
//         $('.my-game').html(`<div class='game-body'>
//         <h1
//         class="game-title">${gameArray[i].title}</h1>
//         <p class="game-content">${gameArray[i].content}</p>
//         </div>`);
//         gameEdit = gameArray[i];
//       }
//     }
//   });
// };
//
// // get all dairy data
// let getAllDiary = function () {
//   $('.after-show-game, .before-show-game').addClass('hide');
//   $('.new-game').empty();
//   $('.edit-game').empty();
//   return $.ajax({
//     url: app.api + '/users/' + authApi.app.user.id,
//     method: 'GET',
//     headers: {
//       Authorization: 'Token token=' + authApi.app.user.token,
//     },
//   }).done(function (games) {
//     gameArray = games.user.games;
//     displayDiaries(gameArray);
//     displayDiary(gameArray);
//   });
// };
//
// const editDiary = function () {
//
//   $('.edit-game').html(`<form class='form edit-game-form'>
//   <p class='title'>
//       <input type='text' name='title' id='edit-title' value=${gameEdit.title}>
//   </p>
//   <p class='text'>
//       <textarea type='text' class='textarea' name='content' id='edit-content'>${gameEdit.content}
//       </textarea>
//   </p>
//   <p class='submit'>
//       <input type='submit' value='Submit'/>
//   </p>
//   </form>`);
//   $('.my-game').empty();
//   $('.edit-game-form').on('submit', onUpdate);
// };

//
module.exports = {
  create,
  update,
  // getAllDiary,

  // destroy,
  // editDiary,
  // onUpdate,
};
