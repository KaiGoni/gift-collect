//------------------------------------------------------------------------------------------------------------------------------//
//                                                                                                                              //
//  Phaser - Gift Collect Game                                                                                                  //
//  Day 2                                                                                                                       //
//                                                                                                                              //
//  Description: Created background, ground, player, and input detection, added physics to configuration                        //
//                                                                                                                              //
//------------------------------------------------------------------------------------------------------------------------------//

// Set up configuration for Phaser
var config = {
    type: Phaser.AUTO,          // recommended type is Phaser.AUTO
    width: 800,                 // width and height of game
    height: 600,
    scene: {                    // naming functions: preload funtion will be preload(), create is create(), etc.
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};
// Define phaser game with configurations
var game = new Phaser.Game(config)

// Predefine ground and player variables
var ground
var player

function preload() {
    // In preload, you load everything into the game

    // Load all images and sounds into the game
    this.load.image("background", "assets/sky.png")
    this.load.image("ground", "assets/ground.png")
    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image("heart", "assets/heart.png")

    this.load.image("gift1", "assets/gift1.png")
    this.load.image("gift2", "assets/gift2.png")
    this.load.image("gift3", "assets/gift3.png")
    this.load.image("gift4", "assets/gift4.png")
    this.load.image("gift5", "assets/gift5.png")
    this.load.image("gift6", "assets/gift6.png")
    this.load.image("gift7", "assets/gift7.png")
    this.load.image("giftBig", "assets/giftBig.png")
    this.load.image("bomb", "assets/bomb.png")

    this.load.audio("music", "assets/carefree.mp3")
    this.load.audio("collect", "assets/collect.mp3")
}

function create() {
    // In create, you create the objects when the game runs. This will only run once when you start the game

    // Place background and ground, store ground object to ground variable
    this.add.image(400, 300, "background")
    ground = this.physics.add.staticImage(400, 575, "ground")

    // Create player sprite with physics, set it to collide with world border
    player = this.physics.add.sprite(100, 500, "player")
    player.setCollideWorldBounds(true);

    // Animate player
    this.anims.create({
        key: 'left',        // key is defines the name of a certain animation
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
                            // generateFrameNumbers take certain frames from the spritesheet
        frameRate: 10,
        repeat: -1          // when repeat = -1, the animation will repeat forever
    });

    this.anims.create({
        key: 'idle',
        frames: [{ key: 'player', frame: 4 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Set up keyboard input sensor
    cursors = this.input.keyboard.createCursorKeys();

    // Add physics collision of player with the ground
    this.physics.add.collider(player, ground)
}

function update() {
    // Anything in update will run 60 times per second. This is the main loop.

    if (cursors.left.isDown) {              // When left button is pressed
        player.setVelocityX(-400);          // Move in the negative x direction (left)
        player.anims.play('left', true);    // Use the left animation key for the player
    } else if (cursors.right.isDown) {
        player.setVelocityX(400);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('idle');
    }
}