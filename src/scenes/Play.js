

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    create() {
        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding,
             game.config.width,
              borderUISize * 2,
               0x00FF00).setOrigin(0,0);

        this.p1Rocket = new Rocket(this, game.config.width/2,
            game.config.height - borderUISize - borderPadding,
            'rocket');
    }

    preload() {

    }

    update() {

    }
}