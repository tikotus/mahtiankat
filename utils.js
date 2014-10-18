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

function get(val) {
	if (typeof val == "function") {
		return get(val());
	}
	else {
		return val;
	}
}

function initializeWorld(world) {
	for (var name in world) {
		var data = world[name];
		if (data.hasOwnProperty("sprite")) {
			world[name] = addSprite(data.sprite);
			world[name].originalData = data;
			for (var key in data) {
				world[name][key] = get(data[key]);
			}
		}
	}
}

function updateWorld(world) {
	for (var name in world) {
		var sprite = world[name];
		for (var key in sprite.originalData) {
			if (typeof sprite.originalData[key] == "function") {
				sprite[key] = get(sprite.originalData[key]);		
			}
		}
	}
}