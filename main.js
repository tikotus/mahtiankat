var game;
var playerMove;
var totalTime = 0;
var obstacleGroup;
var maxStamina = 100;
var stamina;
var world;
var nextSpawnTime;
var spawnIndex;
var playerElevation = 0;
var jumpPower;

window.onload = function() {

	game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload });

	// Define start state
	var stateStart = function(game) {};
	stateStart.prototype = {
		preload : preload,
		create : function() { 
			initializeWorld(worldStart(), game.add.group());
		},
		update : function() {
			if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
				game.state.start("ingame");
			}
		}
	};
	game.state.add("start", stateStart);

	// Define end state
	var stateEnd = function(game) {};
	stateEnd.prototype = {
		preload : preload,
		create : function() { initializeWorld(worldEnd(), game.add.group()); },
		update : function() {
			if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
				game.state.start("ingame");
			}
		}
	};
	game.state.add("end", stateEnd);

	// Define ingame state
	var stateIngame = function(game) {};
	stateIngame.prototype = {
		preload : preload,
		create : create,
		update : update
	};
	game.state.add("ingame", stateIngame);

	// Start game from start state
	game.state.start("start");

	function preload () {
		game.load.image('logo', 'phaser.png');
        game.load.spritesheet('player', 'phaser64x64.png', 64, 64, 4);
        game.load.image('obstacle', 'fence.png');
        game.load.image('conflict', 'handsoff.png');
        game.load.image('staminaBar', 'stamina.png');
        game.load.image('shadow', 'shadow.png');
        game.load.image('field', 'field.png');
	}

	function create () {
		game.stage.backgroundColor = '#CCCCFF';  
		world = worldIngame();
		initializeWorld(world, game.add.group());
		
		stamina = 100;
		nextSpawnTime = 0;
		spawnIndex = 0;
		totalTime = 0;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        obstacleGroup = world.obstacles;
        game.physics.enable(world.player._children["shadow"], Phaser.Physics.ARCADE);

        var keyDown = keyhandler(Phaser.Keyboard.DOWN, 0.0003, 0.3);
        var keyUp =  keyhandler(Phaser.Keyboard.UP, 0.0003, 0.3);
        var keySpace = keyhandler(Phaser.Keyboard.SPACEBAR, 0.0003, 0.035);
        var keyEnter = keyhandler(Phaser.Keyboard.ENTER, 0.003, 0.05);
        var keyNumpadEnter = keyhandler(Phaser.Keyboard.NUMPAD_ENTER, 0.003, 0.05);
        playerMove = function(elapsed) {
            return keyDown(elapsed)-keyUp(elapsed);
        };
        staminaIncrease = function(elapsed) {
        	return keySpace(elapsed)-0.3;
        };
        jumpPower = function(elapsed) {
            return keyEnter(elapsed)+keyNumpadEnter(elapsed);
        };
        var playerSprite = world.player._children["player"];
        playerSprite.animations.add('run');
        playerSprite.animations.play('run', 4, true);
	}

	function update() {
		totalTime += game.time.elapsed;
        checkConcurrentKeys();
		updateWorld(world);
		createRandomObstacles();
        handleJumping();
        collideAll();
		world.player.y += playerMove(game.time.elapsed);
		stamina = Math.max(0, Math.min(stamina + staminaIncrease(game.time.elapsed), maxStamina));
		if (stamina <= 0) {
			game.state.start("end");
		}
	}

    function handleJumping() {
        var power = jumpPower(game.time.elapsed)>0;
        if (power > 0 ) {
            playerElevation+=power;
            stamina-=power/2;
        } else {
            playerElevation=Math.max(0, playerElevation-game.time.elapsed/10);
        }
    }

    function collideAll() {
        if (playerElevation==0) {
            game.physics.arcade.collide(world.player._children["shadow"], obstacleGroup, function(player, obstacle) {
                obstacle.body.checkCollision.left = false;
                obstacle.body.checkCollision.right = false;
                obstacle.body.checkCollision.up = false;
                obstacle.body.checkCollision.down = false;
                game.state.start("end");
                return true;
            });
        }
    }

	function createRandomObstacles() {
        if (totalTime > nextSpawnTime) {
            if (spawnIndex > 11) {
                spawnIndex = 0;
            }
			if (world.obstacles._children.hasOwnProperty("obstacle" + spawnIndex)) {
				world.obstacles._children["obstacle" + spawnIndex].destroy();	
			}

			var locations = [-140, 20];
			var createObstacle = function(index) {
				var spawnTime = totalTime;
				var obj = world.obstacles.create(0, 0, "obstacle");
				obj.anchor.setTo(0.5, 0.5);
				obj.y = locations[index];
                obj.x = 0;
                game.physics.enable(obj, Phaser.Physics.ARCADE);
                obj.body.velocity.x = -150;
                obj.body.setSize(obj.width, obj.height-30, 0, 15);

                obstacleGroup.add(obj);
                /*
				obj.originalData.x = function() {
					return -(totalTime - spawnTime) * 0.2;
				};
                 */
				world.obstacles._children["obstacle" + spawnIndex] = obj;
				spawnIndex++;
			};
			createObstacle(spawnIndex % locations.length);
			//createObstacle((randomIndex + 1) % locations.length);

			nextSpawnTime = totalTime + 2000 + Math.random() * 500;
		}
	}
};

