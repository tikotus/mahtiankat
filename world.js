function worldIngame() {
	return {
		background : {
			tileSprite : "field",
			anchor : {x : 0, y : 0 },
			tilePosition : function() { return { x : -totalTime * 0.15, y : 0}; }
		},
		obstacles : {
			y : 300,
			x : 800,
			_children : {}
		},
		player : {
            _children: {
                player: {
                    sprite : "player",
                    width : 50,
                    height : 50,
                    y: function() { return -playerElevation; }
                },
                shadow: {
                    sprite: "shadow",
                    y: 30
                }
            },
			x : function() { return Math.sin(totalTime * 0.001)*50 +200 },
			y : 300
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
	    	x : 200, 
	    	y : 500,
	    	_children : {
	    		bg : {
	    			sprite : "drinkBG",
	    			anchor : { x : 0, y : 0.5 }
	    		},
				fill : {
			    	sprite : "staminaBar",
			    	anchor : { x : 0, y : 0.5 },
			    	width : function() { return Math.max(0, 310 * (stamina / maxStamina)); },
			    	height : 50,
			    	x : 97					
				},
				icon : {
					sprite : "drinkIcon",
					anchor : { x : 0.5, y: 0.5 },
					x : 58
				}
	    	}
	    },
	    scoreLabel : {
	    	text : function() { return Math.floor(totalTime / 1000) + " metres"; },
	    	style : { font: "65px Arial", fill: "#ff0044", align: "center" },
	    	x : 300
	    }
	};
}

