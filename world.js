world = {
	player : {
		sprite : "logo",
		x : function() { return Math.sin(totalTime * 0.001)*50 +200 },
		y : 300,
		width : 150,
		height : 150
	},
	obstacles : {
		y : 300,
		x : 800,
		_children : {}
	},
    conflict : {
        sprite : "conflict",
        x : 300,
        y: 300,
        width: 300,
        height: 100,
        visible: function() { return keyConflict;}
    }
};

