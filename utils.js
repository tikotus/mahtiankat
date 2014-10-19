function clone(obj) {
	var copy = {}
	for (var key in obj) {
		copy[key] = obj[key];
	}
	return copy;
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

function initializeWorld(world, parent) {
	for (var name in world) {
		var data = world[name];
		// Initialize sprite or group as child of parent
		if (data.hasOwnProperty("sprite")) {
			var sprite = parent.create(0, 0, data.sprite);
			sprite.anchor.setTo(0.5, 0.5);
			world[name] = sprite;
		}
		else {
			world[name] = game.add.group();
		}
		world[name].originalData = data;
		for (var key in data) {
			world[name][key] = get(data[key]);
		}			

		if (data.hasOwnProperty("_children")) {
			// Initialize children
			console.log(get(data._children));
			initializeWorld(get(data._children), world[name]);
		}
	}
}

function updateWorld(world) {
	for (var name in world) {
		var object = world[name];
		for (var key in object.originalData) {
			if (key != "_children") {
				if (typeof object.originalData[key] == "function") {
					object[key] = get(object.originalData[key]);		
				}
			}
		}
		if (object.hasOwnProperty("_children")) {
			//console.log("Update children");
			updateWorld(object.children);	
		}
	}
}