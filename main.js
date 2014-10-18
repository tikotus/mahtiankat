var game;
var playerMove;
var totalTime = 0;
var obstacleGroup;

window.onload = function() {

	game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update : update });

	function preload () {
		game.load.image('logo', 'phaser.png');
        game.load.image('conflict', 'handsoff.png');
	}

	function create () {
		game.stage.backgroundColor = '#CCCCFF';
		initializeWorld(world, game.add.group());

        game.physics.startSystem(Phaser.Physics.ARCADE);
        obstacleGroup = game.add.group();
        game.physics.enable(world.player, Phaser.Physics.ARCADE);

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
        collideAll();
		world.player.y += playerMove(game.time.elapsed);
	}

    function collideAll() {
        // if not jumping
        game.physics.arcade.collide(world.player, obstacleGroup, function(player, obstacle) {
            obstacle.body.checkCollision.left = false;
            obstacle.body.checkCollision.right = false;
            obstacle.body.checkCollision.up = false;
            obstacle.body.checkCollision.down = false;
            console.log("FAIL!"); // call fail method
            return true;
        });
    }

	var lastSpawn = 0;
	var spawnIndex = 0;
	function createRandomObstacles() {
		if (totalTime > lastSpawn + 1000) {
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
			obj.originalData = {};
            /*
			obj.originalData.x = function() { 
				return startX - (totalTime - spawnTime) * 0.1;
			};
			*/
            game.physics.enable(obj, Phaser.Physics.ARCADE);
            obj.body.velocity.x = -150;
            obstacleGroup.add(obj);
			world.obstacles._children["obstacle" + spawnIndex] = obj;
			spawnIndex++;
			lastSpawn = totalTime;
		}
	}
};

