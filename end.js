function worldEnd() {
	return {
		bg : {
			sprite : "logo",
			x : 0,
			y : 0,
			anchor : {x : 0, y : 0}
		},
	    scoreLabel : {
	    	text : (Math.floor(totalTime / 1000) + " metres"),
	    	style : { font: "65px Arial", fill: scoreColor, align: "center" },
	    	x : 300,
	    	y : 10
	    }		
	};
}