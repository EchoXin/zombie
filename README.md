# Zombie VS Pokemon

![Alt text](http://i.imgur.com/Z1YJvHk.png)

## Introduction

This is a single page game app based on Javascript and HTML. Pokemon can earn scores by shooting zombies and if the Pokemon is caught by zombie, the game will be over.

The game complexity can be easily changed by change the pokemon and zombie setting, like the speed or size.
```
const character = function (hp, X, Y, sizeX, sizeY, score, dietime, speed, imagesrc) {}
```
```
const Zombie = function (hp, a, b, sizeX, sizeY, score, dietime, speed, imagesrc) {
  character.call(this, hp, random(a, b), 0, sizeX, sizeY, score, dietime, speed, imagesrc);
};
```
```
const Pokemon = function (X, Y) {
  character.call(this, 1, X, Y, sizeX, sizeY, score, dietime, speed, imagesrc);
};
```


## User stories

As a user, I want to sign-in, sign-up, sign-out and change password.

As a user, I want to play the game.

As a user, I want to see the game ranking and my own game history.

## Technology skills

-  JavaScript
-  jQuery
-  AJAX
-  HTML
-  CSS
-  Bootstrap

## Links

- [Live App](https://echoxin.github.io/zombie)
- [Back-end Repo](https://github.com/EchoXin/zombie-api)
