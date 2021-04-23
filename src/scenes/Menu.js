class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('menu', './assets/menu.png');
    }
    
    create() {
        this.background = this.add.tileSprite(0, 0, 640, 480, 'menu').setOrigin(0, 0);
        // define keys
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
          this.scene.start("playScene");    
        }
    }
}