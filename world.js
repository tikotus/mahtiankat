world = {
	"player" : {
		sprite : "logo",
		x : function() { return Math.sin(time() * 0.001)*50 +200 },
		y : 300,
		width : 150,
		height : 150
	},
    "conflict": {
        sprite : "conflict",
        x : 300,
        y: 300,
        width: 300,
        height: 100,
        visible: function() { return keyConflict;}
    }
};

