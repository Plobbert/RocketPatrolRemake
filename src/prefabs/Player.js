class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 3;
        this.isFiring = false;
    }

    update() {
            if(keyA.isDown) {
                this.x -= this.movementSpeed;
            }
            if(keyD.isDown) {
                this.x += this.movementSpeed;
            }

            if(Phaser.Input.Keyboard.JustDown(keyW)) {
                this.isFiring = true;
            }
    
            this.x = Phaser.Math.Clamp(
                this.x,
                borderUISize + borderPadding,
                game.config.width - borderUISize - borderPadding);
    }

    reset() {
        this.y = game.config.height-borderUISize-borderPadding;
        this.isFiring = false;
    }
}