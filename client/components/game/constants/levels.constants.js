(function() {
	angular
		.module('dimbot.game')
		.constant('levels', {
			"1": {
				"lvl": [
					3, 3, 3, 3, 3,
					3, 0, 0, 0, 3,
					3, 1, 0, 2, 3,
					3, 0, 0, 0, 3,
					3, 3, 3, 3, 3
				],
				"ins": [
					"fw",
					"rr",
					"rl",
					"lt"
				],
				"dir": "e",
				"width": 3,
				"height": 3,
				"mwidth": 5,
				"mheight": 5
			},
			"2": {
				"lvl": [
					3, 3, 3, 3, 3,
					3, 0, 0, 2, 3,
					3, 1, 0, 0, 3,
					3, 0, 0, 0, 3,
					3, 3, 3, 3, 3
				],
				"ins": [
					"fw",
					"rr",
					"rl",
					"lt"
				],
				"dir": "e",
				"width": 3,
				"height": 3,
				"mwidth": 5,
				"mheight": 5
			},
			"3": {
				"lvl": [
					3, 3, 3, 3, 3,
					3, 1, 0, 0, 3,
					3, 0, 4, 2, 3,
					3, 0, 0, 0, 3,
					3, 3, 3, 3, 3
				],
				"ins": [
					"fw",
					"rr",
					"rl",
					"lt"
				],
				"dir": "e",
				"width": 3,
				"height": 3,
				"mwidth": 5,
				"mheight": 5
			},
			"4": {
				"lvl": [
					3, 3, 3, 3, 3,
					3, 0, 0, 0, 3,
					3, 0, 0, 0, 3,
					3, 1, 4, 2, 3,
					3, 3, 3, 3, 3
				],
				"ins": [
					"fw",
					"rr",
					"rl",
					"lt"
				],
				"dir": "n",
				"width": 3,
				"height": 3,
				"mwidth": 5,
				"mheight": 5
			},
			"5": {
				"lvl": [
					3, 3, 3, 3, 3,
					3, 1, 4, 2, 3,
					3, 0, 0, 0, 3,
					3, 0, 0, 0, 3,
					3, 3, 3, 3, 3
				],
				"ins": [
					"fw",
					"rl",
					"rr",
					"lt"
				],
				"dir": "s",
				"width": 3,
				"height": 3,
				"mwidth": 5,
				"mheight": 5
			},
			"6": {
				"lvl": [
					3, 3, 3, 3, 3,
					3, 0, 0, 0, 3,
					3, 0, 4, 0, 3,
					3, 1, 4, 2, 3,
					3, 3, 3, 3, 3
				],
				"ins": [
					"fw",
					"rl",
					"rr",
					"lt"
				],
				"dir": "n",
				"width": 3,
				"height": 3,
				"mwidth": 5,
				"mheight": 5
			},
			"7": {
				"lvl": [
					3, 3, 3, 3, 3,
					3, 2, 0, 2, 3,
					3, 0, 0, 0, 3,
					3, 1, 0, 0, 3,
					3, 3, 3, 3, 3
				],
				"ins": [
					"fw",
					"rl",
					"rr",
					"lt"
				],
				"dir": "n",
				"width": 3,
				"height": 3,
				"mwidth": 5,
				"mheight": 5
			},
			"8": {
				"lvl": [
					3, 3, 3, 3, 3,
					3, 0, 2, 0, 3,
					3, 1, 4, 2, 3,
					3, 0, 0, 0, 3,
					3, 3, 3, 3, 3
				],
				"ins": [
					"fw",
					"rl",
					"rr",
					"lt"
				],
				"dir": "e",
				"width": 3,
				"height": 3,
				"mwidth": 5,
				"mheight": 5
			}
		});
})();
