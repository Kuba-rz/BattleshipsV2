"use strict";
const game = require('./gameClass');
let game1 = new game();
game1.createShip('battleship');
game1.createShip('destroyer');
game1.createShip('destroyer');
game1.play();
