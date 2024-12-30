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

// Define all gift key variations
const gifts = ["gift1", "gift2", "gift3", "gift4", "gift5", "gift6", "gift7"]

// Predefine variables
var ground
var player
var cursors
var score = 0
var scoreText
var lives = 3
var hearts = []
var gameEnd
var music
var collectSound

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

    // Add and play music in a loop
    music = this.sound.add("music")
    music.play({
        loop: true
    })

    // Create collecting sound effect
    collectSound = this.sound.add("collect")

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

    // Create objects physics group. This is where the gifts/bombs will be stored
    objects = this.physics.add.group({});
    createObject.call(this)                 // Another way to call functions. This will allow you to call the function with additional context.

    // Set up keyboard input sensor
    cursors = this.input.keyboard.createCursorKeys();

    // Add scoreboard to the screen
    scoreText = this.add.text(16, 16, `Score: ${score}`, { fontSize: "32px", fill: "#000" })

    // Add hearts to the screen
    hearts[0] = this.add.image(40, 80, "heart").setScale(0.1)
    hearts[1] = this.add.image(100, 80, "heart").setScale(0.1)
    hearts[2] = this.add.image(160, 80, "heart").setScale(0.1)



    // Add physics collision of player with the ground
    this.physics.add.collider(player, ground)

    // Run objectHitGround() when an object in objects[] touches the ground
    this.physics.add.collider(objects, ground, objectHitGround, null, this)
    
    // Run playerHitObject() when the player touches an object
    this.physics.add.overlap(player, objects, playerHitObject, null, this)
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

function createObject() {
    // Loop to continuously create gifts/bombs

    this.time.delayedCall(Phaser.Math.FloatBetween(0, 2000), () => {        // delay: random between 0 to 2000 milliseconds
        let newObject
        switch (Phaser.Math.Between(1, 4)) { // Random between 1 to 4
            case 1:
            case 2:
                newObject = objects.create(Phaser.Math.Between(50, 750), 50, gifts[Phaser.Math.Between(0, 6)]) // spawns a gift with a random sprite from the gifts[] dictionary
                newObject.setScale(0.1)
                newObject.key = "gift"
                break;

            case 3:
                newObject = objects.create(Phaser.Math.Between(50, 750), 50, "giftBig") // Spawn giftBig at a random location where x is betwwen 50 and 750 pixels, and y = 50
                newObject.setScale(0.3)                                                 // Rescales the object size
                newObject.key = "giftBig"                                               // Sets given object's key to "giftBig"
                break;

            case 4:
                newObject = objects.create(Phaser.Math.Between(50, 750), 50, "bomb")
                newObject.setScale(0.3)
                newObject.key = "bomb"
        }

        if(!gameEnd) {              // Don't spawn a new gift if the game is over
            createObject.call(this) // Call itself to spawn another object after spawning an object
        }
    })
}

function objectHitGround(ground, object) {
    // Runs when an object touches the ground

    object.destroy()
}

function playerHitObject(player, object) {
    // Runs when the player touches an object

    switch (object.key) { // Checks what object the player touched
        case "gift":
            score += 20
            collectSound.play()
            break;

        case "giftBig":
            score += 50
            collectSound.play()
            break;

        case "bomb":
            loseLife.call(this)
            break;
    }
    object.destroy()

    updateScoreboard()
}

function updateScoreboard() {
    scoreText.setText(`Score: ${score}`)
}

function loseLife() {
    // deletes a heart when you lose a life

    if(gameEnd)return               // If game is over, try to delete a heart (It will crash)
    lives--
    hearts[lives].destroy()         // Delete the most recent heart object added
    if(lives <= 0) {                // If no more hearts left
        gameEnd = true
        player.setVelocityX(0)
        this.add.text(100, 200, "YOU LOST", { fontSize: "128px", fill: "#000" })
    }
}