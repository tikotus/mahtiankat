var game;
var playerMove;
var totalTime = 0;
var maxStamina = 100;
var stamina = 100;

window.onload = function() {

	game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload });

	// Define start state
	var stateStart = function(game) {}
	stateStart.prototype = {
		preload : preload,
		create : function() { 
			initializeWorld(start, game.add.group());
		},
		update : function() {
			if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
				game.state.start("ingame");
			}
		}
	}
	game.state.add("start", stateStart);

	// Define end state
	var stateEnd = function(game) {}
	stateEnd.prototype = {
		preload : preload,
		create : function() { initializeWorld(end, game.add.group()); },
		update : function() {
			if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
				game.state.start("ingame");
			}
		}
	}
	game.state.add("end", stateEnd);

	// Define ingame state
	var stateIngame = function(game) {}
	stateIngame.prototype = {
		preload : preload,
		create : create,
		update : update
	}
	game.state.add("ingame", stateIngame);

	// Start game from start state
	game.state.start("ingame");

	function preload () {
		game.load.image('logo', 'phaser.png');
        game.load.image('obstacle', 'obstacle.png');
        game.load.image('conflict', 'handsoff.png');
        game.load.image('staminaBar', 'stamina.png');
	}

	function create () {
		game.stage.backgroundColor = '#CCCCFF';
		initializeWorld(world, game.add.group());		

        var keyDown = keyhandler(Phaser.Keyboard.DOWN, 0.0003, 0.3);
        var keyUp =  keyhandler(Phaser.Keyboard.UP, 0.0003, 0.3);
        var keySpace = keyhandler(Phaser.Keyboard.SPACEBAR, 0.0003, 0.035);
        playerMove = function(elapsed) {
            return keyDown(elapsed)-keyUp(elapsed);
        };
        staminaIncrease = function(elapsed) {
        	return keySpace(elapsed)-0.3;
        }
	}

	function update() {
		totalTime += game.time.elapsed;
        checkConcurrentKeys();
		updateWorld(world);
		createRandomObstacles();
		world.player.y += playerMove(game.time.elapsed);
		stamina = Math.max(0, Math.min(stamina + staminaIncrease(game.time.elapsed), maxStamina));
	}

	var nextSpawnTime = 2000;
	var spawnIndex = 0;
	function createRandomObstacles() {
		if (totalTime > nextSpawnTime) {
			if (spawnIndex > 11) {
				spawnIndex = 0;
			}
			if (world.obstacles._children.hasOwnProperty("obstacle" + spawnIndex)) {
				world.obstacles._children["obstacle" + spawnIndex].destroy();	
			}

			var locations = [0, 150];
			var createObstacle = function(index) {
				var spawnTime = totalTime;
				var obj = world.obstacles.create(0, 0, "obstacle");
				obj.anchor.setTo(0.5, 0.5);
				obj.width = 30;
				obj.height = 150;
				obj.y = locations[index];
				console.log(obj.y);
				obj.originalData = {}
				obj.originalData.x = function() { 
					return -(totalTime - spawnTime) * 0.2;
				}
				world.obstacles._children["obstacle" + spawnIndex] = obj
				spawnIndex++;
			}
			var randomIndex = Math.floor(spawnIndex % locations.length)
			createObstacle(randomIndex);
			//createObstacle((randomIndex + 1) % locations.length);

			nextSpawnTime = totalTime + 2000 + Math.random() * 500;
		}
	}
};

