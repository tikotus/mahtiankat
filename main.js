var game;
var playerMove;

window.onload = function() {

	game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update : update });

	function preload () {
		game.load.image('logo', 'phaser.png');
        game.load.image('conflict', 'handsoff.png');
	}

	function create () {
		game.stage.backgroundColor = '#CCCCFF';
		initializeWorld(world);

        var keyDown = keyhandler(Phaser.Keyboard.DOWN, 0.0003, 0.3);
        var keyUp =  keyhandler(Phaser.Keyboard.UP, 0.0003, 0.3);
        playerMove = function(elapsed) {
            return keyDown(elapsed)-keyUp(elapsed);
        };
	}

	function update() {
        checkConcurrentKeys();
		updateWorld(world);
		world.player.y += playerMove(game.time.elapsed);
	}

};

