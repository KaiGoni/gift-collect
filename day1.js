// Set up configuration for Phaser
var config = {
    type: Phaser.AUTO,          // recommended type is Phaser.AUTO
    width: 800,                 // width and height of game
    height: 600,
    scene: {                    // naming functions: preload funtion will be preload(), create is create(), etc.
        preload: preload,
        create: create,
        update: update
    }
};
// Define phaser game with configurations
var game = new Phaser.Game(config)

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
}

function update() {
    // Anything in update will run 60 times per second. This is the main loop.
}