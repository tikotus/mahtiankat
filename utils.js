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

function initializeHierarchy(hierarchy) {
	if (hierarchy.hasOwnProperty("sprite")) {
		console.log("Sprite found");
		var addedSprite = hierarchy.entity = addSprite(hierarchy.sprite);
		for (var key in hierarchy) {
			addedSprite[key] = hierarchy[key];
		}
	}
	if (hierarchy.hasOwnProperty("children")) {
		for (var key in hierarchy.children) {
			initializeHierarchy(hierarchy.children[key]);
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

function updateHierarchy(hierarchy) {
	if (hierarchy.hasOwnProperty("entity")) {
		for (var key in hierarchy) {
			hierarchy.entity[key] = get(hierarchy[key]);
		}
	}
	if (hierarchy.hasOwnProperty("children")) {
		for (var key in hierarchy.children) {
			updateHierarchy(hierarchy.children[key]);
		}
	}
}