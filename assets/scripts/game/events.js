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
    if (scores <= 50000) {
      this.imagenode.style.left = this.imagenode.offsetLeft + this.characterspeed + 'px';
    } else
    if (scores > 50000 && scores <= 100000) {
      this.imagenode.style.left = this.imagenode.offsetLeft + this.characterspeed + 1 + 'px';
    } else
    if (scores > 100000 && scores <= 150000) {
      this.imagenode.style.left = this.imagenode.offsetLeft + this.characterspeed + 2 + 'px';
    } else
    if (scores > 150000 && scores <= 200000) {
      this.imagenode.style.left = this.imagenode.offsetLeft + this.characterspeed + 3 + 'px';
    } else
    if (scores > 200000 && scores <= 300000) {
      this.imagenode.style.left = this.imagenode.offsetLeft + this.characterspeed + 4 + 'px';
    } else {
      this.imagenode.style.left = this.imagenode.offsetLeft + this.characterspeed + 5 + 'px';
    }
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
    this.fireimage.setAttribute('id', 'fire');
    mainDiv.appendChild(this.fireimage);
  };

  this.init();
};

// create fire
const Oddfire = function (X, Y) {
  fire.call(this, X, Y, 6, 14, 'assets/scripts/image/fire.png');
};

// create zombie
const random = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

const Zombie = function (hp, a, b, sizeX, sizeY, score, dietime, speed, imagesrc) {
  character.call(this, hp, random(a, b), 0, sizeX, sizeY, score, dietime, speed, imagesrc);
  this.imagenode.setAttribute('id', 'zombie');
};

// create pokemon
const Pokemon = function (X, Y) {
  let imagesrc = '/assets/scripts/image/pokemon.gif';
  character.call(this, 1, X, Y, 66, 80, 0, 660, 0, imagesrc);
  this.imagenode.setAttribute('id', 'pokemon');
};

// create self pokemon
let selfPokemon = new Pokemon(284, 700);

let livePokemon = document.getElementById('pokemon');
let yidong = function () {

  let oevent = window.event || arguments[0];
  // let chufa = oevent.srcElement||oevent.target;
  let selfPokemonX = oevent.clientX;
  let selfPokemonY = oevent.clientY;
  livePokemon.style.left = selfPokemonX - selfPokemon.charactersizeX / 2 + 'px';
  livePokemon.style.top = selfPokemonY - selfPokemon.charactersizeY / 2 + 'px';
};

// pause the game
let number = 0;
let pause = function () {
  if (number === 0) {
    suspenddiv.style.display = 'block';
    if (document.removeEventListener) {
      mainDiv.removeEventListener('mousemove', yidong, true);
      bodyobj.removeEventListener('mousemove', bianjie, true);
    } else
    if (document.detachEvent) {
      mainDiv.detachEvent('onmousemove', yidong);
      bodyobj.detachEvent('onmousemove', bianjie);
    }

    clearInterval(set);
    number = 1;
  } else {
    suspenddiv.style.display = 'none';
    if (document.addEventListener) {
      mainDiv.addEventListener('mousemove', yidong, true);
      bodyobj.addEventListener('mousemove', bianjie, true);
    } else
    if (document.attachEvent) {
      mainDiv.attachEvent('onmousemove', yidong);
      bodyobj.attachEvent('onmousemove', bianjie);
    }

    set = setInterval(start, 20);
    number = 0;
  }
};

// test if out of side
let bianjie = function () {
  let oevent = window.event || arguments[0];
  let bodyobjX = oevent.clientX;
  let bodyobjY = oevent.clientY;
  if (bodyobjX < 505 || bodyobjX > 815 || bodyobjY < 0 || bodyobjY > 568) {
    if (document.removeEventListener) {
      mainDiv.removeEventListener('mousemove', yidong, true);
    } else if (document.detachEvent) {
      mainDiv.detachEvent('onmousemove', yidong);
    }
  } else {
    if (document.addEventListener) {
      mainDiv.addEventListener('mousemove', yidong, true);
    } else if (document.attachEvent) {
      mainDiv.attachEvent('nomousemove', yidong);
    }
  }
};

let bodyobj = document.getElementsByTagName('body')[0];
if (document.addEventListener) {

  mainDiv.addEventListener('mousemove', yidong, true);

  mainDiv.addEventListener('click', pause, true);

  bodyobj.addEventListener('mousemove', bianjie, true);

  suspenddiv.getElementsByTagName('button')[0].addEventListener('click', pause, true);

  suspenddiv.getElementsByTagName('button')[2].addEventListener('click', jixu, true);
} else if (document.attachEvent) {

  mainDiv.attachEvent('onmousemove', yidong);

  selfPokemon.imagenode.attachEvent('onclick', pause);

  bodyobj.attachEvent('onmousemove', bianjie);

  suspenddiv.getElementsByTagName('button')[0].attachEvent('onclick', pause);

  suspenddiv.getElementsByTagName('button')[2].attachEvent('click', jixu, true);
}

selfPokemon.imagenode.style.display = 'none';

let zombies = [];

let fires = [];
let mark = 0;
let backgroundPositionY = 0;

// game start
const start = function () {
  mainDiv.style.backgroundPositionY = backgroundPositionY + 'px';
  backgroundPositionY += 0.5;
  if (backgroundPositionY === 1000) {
    backgroundPositionY = 0;
  }

  mark++;

  // create zombies
  if (mark === 20) {
    let a = mainDiv.clientTop;
    let b = a + mainDiv.clientHeight - 70;
    zombies.push(new Zombie(6, a, b, 80, 100, 1, 360, random(1, 3), 'assets/scripts/image/zombie.gif'));
    mark = 0;
  }

  // zombies move
  let zombieslen = zombies.length;
  for (let i = 0; i < zombieslen; i++) {
    if (zombies[i].characterisdie !== true) {
      zombies[i].characterMove();
    }

    // delete zombies if go outside
    if (zombies[i].imagenode.offsetTop > 800) {
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
    // delete fire if out side
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
        if (zombies[j].imagenode.offsetLeft + zombies[j].charactersizeX >= selfPokemon.imagenode.offsetLeft && zombies[j].imagenode.offsetLeft <= selfPokemon.imagenode.offsetLeft + selfPokemon.charactersizeX) {
          if (zombies[j].imagenode.offsetTop + zombies[j].charactersizeY >= selfPokemon.imagenode.offsetTop + 40 && zombies[j].imagenode.offsetTop <= selfPokemon.imagenode.offsetTop - 20 + selfPokemon.charactersizeY) {
            //collision
            selfPokemon.imagenode.src = 'assets/scripts/image/pokemon.gif';
            enddiv.style.display = 'block';
            characterscore.innerHTML = scores;

            if (document.removeEventListener) {
              mainDiv.removeEventListener('mousemove', yidong, true);
              bodyobj.removeEventListener('mousemove', bianjie, true);
            } else if (document.detachEvent) {
              mainDiv.detachEvent('onmousemove', yidong);
              bodyobj.removeEventListener('mousemove', bianjie, true);
            }

            clearInterval(set);

          }
        }

        if (zombies[j].characterhp === 0) {
          scores = scores + zombies[j].characterscore;
          scorelabel.innerHTML = scores;
          zombies[j].imagenode.src = zombies[j].characterboomimage;
          zombies[j].characterisdie = true;
        }

        if ((fires[k].fireimage.offsetLeft + fires[k].firesizeX > zombies[j].imagenode.offsetLeft) && (fires[k].fireimage.offsetLeft < zombies[j].imagenode.offsetLeft + zombies[j].charactersizeX)) {
          if (fires[k].fireimage.offsetTop <= zombies[j].imagenode.offsetTop + zombies[j].charactersizeY && fires[k].fireimage.offsetTop + fires[k].firesizeY >= zombies[j].imagenode.offsetTop) {
            //敌机血量减子弹攻击力
            zombies[j].characterhp = zombies[j].characterhp - fires[k].fireattach;
            //zombie died
            if (zombies[j].characterhp === 0) {
              scores = scores + zombies[j].characterscore;
              scorelabel.innerHTML = scores;
              // zombies[j].imagenode.src=zombies[j].characterboomimage;
              zombies[j].characterisdie = true;
            }
            // delete fire
            mainDiv.removeChild(fires[k].fireimage);
            fires.splice(k, 1);
            fireslen--;
            break;
          }
        }

      }
    }
  }
  api.update();
};

// start handler

const begin = function (event) {
  event.preventDefault();

  startdiv.style.display = 'none';
  mainDiv.style.display = 'block';
  selfPokemon.imagenode.style.display = 'block';
  scorediv.style.display = 'block';

  // run start
  set = setInterval(start, 20);
  onCreate();
};

//game over
const jixu = function () {
  location.reload(true);
};

const addHandlers = () => {
  $('#startbutton').on('click', begin);
  // $('#jixu').on('click', jixu);
  // $('.new-game').on('click', onCreate);
};

module.exports = {
  addHandlers,
};
