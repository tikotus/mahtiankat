world = {
	"children" : {
		"logo" : {
			sprite : "logo",
			x : (function() { return time() * 0.2 }),
			y : (function() { return Math.sin(time() * 0.001) * 100  + 100}),
			width : 150,
			height : 150
		}
	}
}

