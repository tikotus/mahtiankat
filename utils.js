var totalTime = 0;

function time() {
	totalTime += game.time.elapsed;
	return totalTime;
}

function addSprite(name) {
	var sprite = game.add.sprite(game.world.centerX, game.world.centerY, name);
	sprite.anchor.setTo(0.5, 0.5);
	return sprite;
}

function initializeWorld(world) {
	for (var name in world) {
		var obj = world[name];
		if (obj.hasOwnProperty("sprite")) {
			var addedSprite = addSprite(obj.sprite);
			obj.entity = addedSprite;
		}
	}
}

function get(val) {
	if (typeof val == "function") {
		return get(val());
	}
	else {
		return val;
	}
}

function updateWorld(world) {
	for (var name in world) {
		var obj = world[name];
		for (var key in obj) {
			console.log("Update " + key);
			obj.entity[key] = get(obj[key]);	
		}
	}
}