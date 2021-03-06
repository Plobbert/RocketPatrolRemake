class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, points) {
        super(scene, x, y, texture, frame, points);
        scene.add.existing(this);
        this.points = points;
    }

    update() {
        this.x -= 2;

        if(this.x < -this.width) {
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width + 50;
        this.alpha = 1;
    }
}