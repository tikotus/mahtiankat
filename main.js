var game;
var playerMove;
var totalTime = 0;

window.onload = function() {

	game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update : update });

	function preload () {
		game.load.image('logo', 'phaser.png');
        game.load.image('conflict', 'handsoff.png');
	}

	function create () {
		game.stage.backgroundColor = '#CCCCFF';
		initializeWorld(world, game.add.group());		

        var keyDown = keyhandler(Phaser.Keyboard.DOWN, 0.0003, 0.3);
        var keyUp =  keyhandler(Phaser.Keyboard.UP, 0.0003, 0.3);
        playerMove = function(elapsed) {
            return keyDown(elapsed)-keyUp(elapsed);
        };
	}

	function update() {
		totalTime += game.time.elapsed;
        checkConcurrentKeys();
		updateWorld(world);
		createRandomObstacles();
		world.player.y += playerMove(game.time.elapsed);
	}

	var lastSpawn = 0;
	var spawnIndex = 0;
	function createRandomObstacles() {
		if (totalTime > lastSpawn + 4000) {
			if (spawnIndex > 10) {
				spawnIndex = 0;
			}
			if (world.obstacles._children.hasOwnProperty("obstacle" + spawnIndex)) {
				world.obstacles._children["obstacle" + spawnIndex].destroy();	
			}

			var startX = 400;
			var spawnTime = totalTime;
			var obj = world.obstacles.create(startX, 0, "logo");
			obj.width = 100;
			obj.height = 100;
			obj.y = Math.random() * 400 - 200;
			obj.originalData = {}
			obj.originalData.x = function() { 
				return startX - (totalTime - spawnTime) * 0.1;
			}
			world.obstacles._children["obstacle" + spawnIndex] = obj
			spawnIndex++;
			lastSpawn = totalTime;
		}
	}
};

