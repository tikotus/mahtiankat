var game;
window.onload = function() {

	game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update : update });

	function preload () {
		game.load.image('logo', 'phaser.png');
	}

	function create () {
		game.stage.backgroundColor = '#CCCCFF'
		initializeHierarchy(world);

	}

	function update() {
		updateHierarchy(world);
	}

};

