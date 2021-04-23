class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/chef.png');
        this.load.image('spaceship', './assets/patty.png');
        this.load.image('starfield', './assets/conveyerbelt3.png');
        this.load.audio('backgroundmusic', './assets/music.wav');
        this.load.audio('splat', './assets/splat.wav');
        this.load.audio('win', './assets/win.wav');
        this.load.image('background', './assets/kitchenbackground1.png');
        this.load.image('shot', './assets/ketchup.png');
        this.load.image('mustardShot', './assets/mustard.png');
        this.load.image('mustardMan', './assets/mustardman.png');
        this.load.image('mustardWin', './assets/mustardend.png');
        this.load.image('ketchupWin', './assets/ketchupend2.png');


        // load spritesheet
        this.load.spritesheet('explosion', './assets/anim3.png', {frameWidth: 60.333, frameHeight: 61, startFrame: 0, endFrame: 8});
        this.load.spritesheet('mustardexplosion', './assets/mustardanim.png', {frameWidth: 60.333, frameHeight: 61, startFrame: 0, endFrame: 8});
    }

    create() {

        this.sound.play('backgroundmusic');
        // place tile sprite
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        this.starfield = this.add.tileSprite(0, 50, 640, 256, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x3a1c00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xaa7f63).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xaa7f63).setOrigin(0 ,0);
        // add Rocket (p1)
        this.p1Rocket = new Player(this, game.config.width/2 - 100, game.config.height - borderUISize - borderPadding - 100, 'rocket').setOrigin(0.5, 0);
        this.p2Rocket = new MustardMan(this, game.config.width/2 + 100, game.config.height - borderUISize - borderPadding - 100, 'mustardMan').setOrigin(0.5, 0);


        // add Spaceships (x3)
        this.ship01 = new Ship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Ship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Ship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 8, first: 0}),
            frameRate:20
        });
        this.anims.create({
            key: 'mustardexplode',
            frames: this.anims.generateFrameNumbers('mustardexplosion', { start: 0, end: 8, first: 0}),
            frameRate:20
        });

        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;

        // display score
        let ketchupscoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#c67575',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        let mustardscoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#bca728',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, ketchupscoreConfig);
        this.scoreRight = this.add.text(game.config.width - (borderUISize + borderPadding) - 100, borderUISize + borderPadding*2, this.p2Score, mustardscoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        let isRocket = false;
        let isMRocket = false;
        this.scrollSpeed = 2;

        this.clock2 = this.time.delayedCall(30000, () => {
            this.scrollSpeed = 3;
            this.ship01.movementspeed = 3;
            this.ship02.movementspeed = 3;
            this.ship03.movementspeed = 3;
            
        }, null, this);

        // 60-second play clock
        this.clock = this.time.delayedCall(60000, () => {
            if (this.p1Score > this.p2Score) {
                this.endScreen = this.add.tileSprite(0, 0, 640, 480, 'ketchupWin').setOrigin(0, 0);
            } else {
                this.endScreen = this.add.tileSprite(0, 0, 640, 480, 'mustardWin').setOrigin(0, 0);
            }
            this.sound.play('win');
            this.gameOver = true;
        }, null, this);
    }

    update() {

        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX += this.scrollSpeed;  // update tile sprite

        if (this.p1Rocket.isFiring == true && !this.isRocket) {
            this.fireRocket = new Rocket(this, this.p1Rocket.x + 2, this.p1Rocket.y - 20, 'shot').setOrigin(0.5, 0);
            this.fireRocket.isFiring = true;
            this.isRocket = true;
            this.p1Rocket.isFiring = false;
        } 

        if (this.fireRocket && this.fireRocket.isFiring) {
            this.fireRocket.update();
        }

        if (this.fireRocket && !this.fireRocket.isFiring) {
            this.fireRocket.destroy();
            this.isRocket = false;
        }

        if (this.p2Rocket.isFiring == true && !this.isMRocket) {
            this.fireMRocket = new Mustard(this, this.p2Rocket.x + 2, this.p2Rocket.y - 20, 'mustardShot').setOrigin(0.5, 0);
            this.fireMRocket.isFiring = true;
            this.isMRocket = true;
            this.p2Rocket.isFiring = false;
        } 

        if (this.fireMRocket && this.fireMRocket.isFiring) {
            this.fireMRocket.update();
        }

        if (this.fireMRocket && !this.fireMRocket.isFiring) {
            this.fireMRocket.destroy();
            this.isMRocket = false;
        }


        if(!this.gameOver) {
            this.p2Rocket.update();
            this.p1Rocket.update();             // update p1
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
        }
        

        // check collisions
        if (this.isMRocket) {
            if(this.checkCollision(this.fireMRocket, this.ship01)) {
                this.fireMRocket.x = 5000;
                this.fireMRocket.destroy();
                this.shipMExplode(this.ship01);
            }
            if (this.checkCollision(this.fireMRocket, this.ship02)) {
                this.fireMRocket.x = 5000;
                this.fireMRocket.destroy();
                this.shipMExplode(this.ship02);
            }
            if (this.checkCollision(this.fireMRocket, this.ship03)) {
                this.fireMRocket.x = 5000;
                this.fireMRocket.destroy();
                this.shipMExplode(this.ship03);
            }
        }

        if (this.isRocket) {
            if(this.checkCollision(this.fireRocket, this.ship01)) {
                this.fireRocket.x = 5000;
                this.fireRocket.destroy();
                this.shipExplode(this.ship01);
            }
            if (this.checkCollision(this.fireRocket, this.ship02)) {
                this.fireRocket.x = 5000;
                this.fireRocket.destroy();
                this.shipExplode(this.ship02);
            }
            if (this.checkCollision(this.fireRocket, this.ship03)) {
                this.fireRocket.x = 5000;
                this.fireRocket.destroy();
                this.shipExplode(this.ship03);
            }
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        ship.reset();
        ship.alpha = 1;             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score; 
        
        this.sound.play('splat');
      }

      shipMExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('mustardexplode');
        ship.reset();
        ship.alpha = 1;             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        this.p2Score += ship.points;
        this.scoreRight.text = this.p2Score; 
        
        this.sound.play('splat');
      }
}