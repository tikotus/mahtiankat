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
			    	width : function() { return Math.max(0, 316 * (stamina / maxStamina)); },
			    	height : 60,
			    	y : -1,
			    	x : 94
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
	    	style : { font: "65px Arial", fill: scoreColor, align: "center" },
	    	x : 300,
	    	y : 10,
	    	visible: function() { return !keyConflict;}
	    },
	    conflict : {
	    	_children : {
				image : {	       
	 				sprite : "conflict",
		    		x : 400,
		    		y: 245,
		    		visible: function() { return keyConflict;}
		    	}	    	
		   	}
	    },
	};
}

