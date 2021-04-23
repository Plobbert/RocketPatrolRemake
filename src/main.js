let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyR;
let keyLEFT;
let keyRIGHT;
let keyUP;
let keyA;
let keyD;
let keyW;
let keyENTER;





