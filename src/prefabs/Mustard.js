class Mustard extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.movementSpeed = 3;
        this.isFiring = true;
    }

    update() {
        if(this.isFiring) {
            this.y -= this.movementSpeed;
            if(this.y < borderUISize*3) {
                this.isFiring = false;
            }
        } 
    }
}