function worldIngame() {
	return {
		player : {
			sprite : "logo",
			x : function() { return Math.sin(totalTime * 0.001)*50 +200 },
			y : 300,
			width : 50,
			height : 50
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
	    },
	    staminaBar : {
	    	sprite : "staminaBar",
	    	x : 200, 
	    	y : 500,
	    	anchor : { x : 0, y : 0 },
	    	width : function() { return Math.max(0, 400 * (stamina / maxStamina)); },
	    	height : 50
	    },
	    scoreLabel : {
	    	text : function() { return Math.floor(totalTime / 1000) + " meters"; },
	    	style : { font: "65px Arial", fill: "#ff0044", align: "center" },
	    	x : 300
	    }
	};
}

