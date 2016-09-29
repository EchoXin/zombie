'use strict';

const api = require('./api');
const ui = require('./ui');

const onCreate = function () {
  api.create()
    .done(ui.success)
    .fail(ui.onError);

};

let mainDiv = document.getElementById('maindiv');
let startdiv = document.getElementById('startdiv');
let scorediv = document.getElementById('scorediv');
let scorelabel = document.getElementById('label');
let suspenddiv = document.getElementById('suspenddiv');
let enddiv = document.getElementById('enddiv');
let characterscore = document.getElementById('characterscore');
let scores = 0;
let set;
let zombieSet;

// character object
const character = function (hp, X, Y, sizeX, sizeY, score, dietime, speed, imagesrc) {
  this.characterX = X;
  this.characterY = Y;
  this.imagenode = null;
  this.characterhp = hp;
  this.characterscore = score;
  this.charactersizeX = sizeX;
  this.charactersizeY = sizeY;
  this.characterisdie = false;
  this.characterdietimes = 0;
  this.characterdietime = dietime;
  this.characterspeed = speed;

  // moving object
  this.characterMove = function () {

    this.imagenode.style.left = this.imagenode.offsetLeft + this.characterspeed + 'px';
  };

  this.init = function () {
    this.imagenode = document.createElement('img');
    this.imagenode.style.top = this.characterX + 'px';
    this.imagenode.style.left = this.characterY + 'px';
    this.imagenode.src = imagesrc;
    mainDiv.appendChild(this.imagenode);
  };

  this.init();
};

// fire object
const fire = function (X, Y, sizeX, sizeY, imagesrc) {
  this.fireX = X;
  this.fireY = Y;
  this.fireimage = null;
  this.fireattach = 1;
  this.firesizeX = sizeX;
  this.firesizeY = sizeY;

  // firemove
  this.firemove = function () {
    this.fireimage.style.left = this.fireimage.offsetLeft - 20 + 'px';
  };

  this.init = function () {
    this.fireimage = document.createElement('img');
    this.fireimage.style.left = this.fireX + 'px';
    this.fireimage.style.top = this.fireY + 'px';
    this.fireimage.src = imagesrc;
    this.fireimage.setAttribute('class', 'fire');
    mainDiv.appendChild(this.fireimage);
  };

  this.init();
};

// create fire
const Oddfire = function (X, Y) {
  fire.call(this, X, Y, 6, 14, 'assets/styles/image/fire.png');
};

// create zombie
const random = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

const Zombie = function (hp, a, b, sizeX, sizeY, score, dietime, speed, imagesrc) {
  character.call(this, hp, random(a, b), 0, sizeX, sizeY, score, dietime, speed, imagesrc);
  this.imagenode.setAttribute('class', 'zombie');
};

// create pokemon
const Pokemon = function (X, Y) {
  let imagesrc = '/assets/styles/image/pokemon.gif';
  character.call(this, 1, X, Y, 60, 70, 0, 660, 0, imagesrc);
  this.imagenode.setAttribute('id', 'pokemon');
};

// create self pokemon
let selfPokemon = new Pokemon(284, 700);

let livePokemon = document.getElementById('pokemon');
let mouseMove = function () {

  let oevent = window.event || arguments[0];
  let selfPokemonX = oevent.clientX;
  let selfPokemonY = oevent.clientY - 30;
  livePokemon.style.left = selfPokemonX - selfPokemon.charactersizeX / 2 + 'px';
  livePokemon.style.top = selfPokemonY - selfPokemon.charactersizeY / 2 + 'px';
};

// test if out of side
let boundary = function () {
  let oevent = window.event || arguments[0];
  let bodyobjX = oevent.clientX;
  let bodyobjY = oevent.clientY;
  if (bodyobjX < 0 || bodyobjX > 1000 || bodyobjY < 50 || bodyobjY > 520) {
    mainDiv.removeEventListener('mousemove', mouseMove, true);

  } else {
    mainDiv.addEventListener('mousemove', mouseMove, true);

  }
};

// pause the game
let number = 0;
let pause = function () {
  if (number === 0) {
    suspenddiv.style.display = 'block';

    mainDiv.removeEventListener('mousemove', mouseMove, true);
    bodyobj.removeEventListener('mousemove', boundary, true);

    clearInterval(set);
    number = 1;
  } else {
    suspenddiv.style.display = 'none';
    mainDiv.addEventListener('mousemove', mouseMove, true);
    bodyobj.addEventListener('mousemove', boundary, true);

    set = setInterval(start, 20);
    number = 0;
  }
};

let quit = function () {
  startdiv.style.display = 'block';
  mainDiv.style.display = 'none';
  api.update(scores);

};

let bodyobj = document.getElementsByTagName('body')[0];

const reset = function () {

  mainDiv.addEventListener('mousemove', mouseMove, true);

  selfPokemon.imagenode.addEventListener('click', pause, true);

  bodyobj.addEventListener('mousemove', boundary, true);

  suspenddiv.getElementsByTagName('button')[0].addEventListener('click', pause, true);

  suspenddiv.getElementsByTagName('button')[1].addEventListener('click', quit, true);

};

selfPokemon.imagenode.style.display = 'none';

let zombies = [];
let fires = [];
let mark = 0;
let mark2 = 0;
let backgroundPositionY = 0;

// game start
const start = function () {
  reset();

  mainDiv.style.backgroundPositionY = backgroundPositionY + 'px';
  backgroundPositionY += 0.5;
  if (backgroundPositionY === 1000) {
    backgroundPositionY = 0;
  }

  mark++;

  // create zombies
  if (mark === 30) {
    mark2++;
    let a = mainDiv.clientTop;
    let b = a + mainDiv.clientHeight - 70;
    let c = a + mainDiv.clientHeight - 150;

    zombies.push(new Zombie(5, a, b, 60, 70, 1, 360, random(1, 5), 'assets/styles/image/zombie.gif'));

    if (mark2 % 10 === 0) {
      let zombieBoss = new Zombie(10, a, c, 130, 150, 3, 2000, random(1, 5), 'assets/styles/image/zombie-boss.gif');
      zombieBoss.imagenode.setAttribute('class', 'zombie-boss');
      zombies.push(zombieBoss);
    }

    mark = 0;
  }

  // zombies move
  let zombieslen = zombies.length;
  for (let i = 0; i < zombieslen; i++) {
    if (zombies[i].characterisdie !== true) {
      zombies[i].characterMove();
    }

    // delete zombies if go outside
    if (zombies[i].imagenode.offsetTop > 750) {
      mainDiv.removeChild(zombies[i].imagenode);
      zombies.splice(i, 1);
      zombieslen--;
    }

    // died zombies
    if (zombies[i].characterisdie === true) {
      zombies[i].characterdietimes += 20;
      if (zombies[i].characterdietimes === zombies[i].characterdietime) {
        mainDiv.removeChild(zombies[i].imagenode);
        zombies.splice(i, 1);
        zombieslen--;
      }
    }
  }

  // create fire
  if (mark % 5 === 0) {
    fires.push(new Oddfire(parseInt(selfPokemon.imagenode.style.left) - 10, parseInt(selfPokemon.imagenode.style.top) + 10));
  }

  // move fire
  let fireslen = fires.length;
  for (let i = 0; i < fireslen; i++) {
    fires[i].firemove();
    if (fires[i].fireimage.offsetTop < 0) {
      mainDiv.removeChild(fires[i].fireimage);
      fires.splice(i, 1);
      fireslen--;
    }
  }

  for (let k = 0; k < fireslen; k++) {
    for (let j = 0; j < zombieslen; j++) {
      //collision test
      if (zombies[j].characterisdie === false) {
        if (zombies[j].imagenode.offsetLeft + zombies[j].charactersizeX - 10 >= selfPokemon.imagenode.offsetLeft && zombies[j].imagenode.offsetLeft <= selfPokemon.imagenode.offsetLeft + selfPokemon.charactersizeX) {
          if (zombies[j].imagenode.offsetTop + zombies[j].charactersizeY >= selfPokemon.imagenode.offsetTop  && zombies[j].imagenode.offsetTop <= selfPokemon.imagenode.offsetTop + selfPokemon.charactersizeY) {
            //collision
            enddiv.style.display = 'block';
            enddiv.getElementsByTagName('button')[0].addEventListener('click', quit, true);

            characterscore.innerHTML = scores;
            mainDiv.removeEventListener('mousemove', mouseMove, true);
            bodyobj.removeEventListener('mousemove', boundary, true);

            clearInterval(set);

          }
        }

        if (zombies[j].characterhp === 0) {
          scores = scores + zombies[j].characterscore;
          scorelabel.innerHTML = scores;
          zombies[j].characterisdie = true;
        }

        if ((fires[k].fireimage.offsetLeft + fires[k].firesizeX > zombies[j].imagenode.offsetLeft) && (fires[k].fireimage.offsetLeft < zombies[j].imagenode.offsetLeft + zombies[j].charactersizeX)) {
          if (fires[k].fireimage.offsetTop <= zombies[j].imagenode.offsetTop + zombies[j].charactersizeY && fires[k].fireimage.offsetTop + fires[k].firesizeY >= zombies[j].imagenode.offsetTop) {

            zombies[j].characterhp = zombies[j].characterhp - fires[k].fireattach;

            //zombie died
            if (zombies[j].characterhp === 0) {
              scores = scores + zombies[j].characterscore;
              scorelabel.innerHTML = scores;
              zombies[j].characterisdie = true;
            }

            mainDiv.removeChild(fires[k].fireimage);
            fires.splice(k, 1);
            fireslen--;
            break;
          }
        }

      }
    }
  }

};

// start handler

const begin = function (event) {
  event.preventDefault();
  $('.fire').remove();
  $('.zombie').remove();
  $('.zombie-boss').remove();

  enddiv.style.display = 'none';
  suspenddiv.style.display = 'none';
  number = 0;
  zombies = [];
  scores = 0;
  fires = [];
  mark = 0;
  backgroundPositionY = 0;
  scorelabel.innerHTML = scores;
  startdiv.style.display = 'none';
  mainDiv.style.display = 'block';
  selfPokemon.imagenode.style.display = 'block';
  scorediv.style.display = 'block';
  $('.before-start').css('display', 'none');

  // run start
  set = setInterval(start, 20);
  onCreate();
};

//game over
const onGetRanking = function () {
  console.log('show');
  api.getGames()
    .done(api.displayRanking)
    .fail(ui.onError);
};

const showGameHistory = function (data) {
  let total = 0;
  let highest = 0;
  let lowest = 0;
  if (data.games[0]) {
    total = data.games.length;
    highest = data.games[total - 1].zombie;
    lowest = data.games[0].zombie;
  }

  $('#total-games').html(`${total}`);
  $('#highest-score').html(`${highest}`);
  $('#lowest-score').html(`${lowest}`);
  $('#game-history').modal('show');
};

const GameHistory = function () {
  api.getMyGames()
    .done(data => showGameHistory(data))
    .fail(ui.onError);

};

const OnCleanHistory = function (event) {
  event.preventDefault();
  api.cleanHistory()
      .done(ui.success)
      .fail(ui.failure);
  $('#total-games').html('0');
  $('#highest-score').html('0');
  $('#lowest-score').html('0');
};

const addHandlers = () => {
  $('#startbutton').on('click', begin);
  $('#show-ranking').on('click', onGetRanking);
  $('#game-history-button').on('click', GameHistory);
  $('#clean-history').on('click', OnCleanHistory);

};

module.exports = {
  addHandlers,
};
