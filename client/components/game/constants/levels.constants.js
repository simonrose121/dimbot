(function() {
	angular
		.module('dimbot.game')
		.constant('levels', {
			"1": {
				"map": [
					3, 3, 3, 3,
					3, 2, 1, 3,
					3, 0, 0, 3,
					3, 3, 3, 3
				],
				"ins": [
					"fw",
					"rr",
					"rl",
					"lt"
				],
				"dir": "w",
				"width": 2,
				"height": 2,
				"mwidth": 4,
				"mheight": 4
			},
			"2": {
				"map": [
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
			"3": {
				"map": [
					3, 3, 3, 3,
					3, 0, 2, 3,
					3, 1, 0, 3,
					3, 3, 3, 3
				],
				"ins": [
					"fw",
					"rr",
					"rl",
					"lt"
				],
				"dir": "e",
				"width": 2,
				"height": 2,
				"mwidth": 4,
				"mheight": 4
			},
			"4": {
				"map": [
					3, 3, 3, 3, 3,
					3, 0, 0, 0, 3,
					3, 1, 0, 0, 3,
					3, 0, 0, 2, 3,
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
			"5": {
				"map": [
					3, 3, 3, 3, 3,
					3, 1, 0, 0, 3,
					3, 0, 3, 2, 3,
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
			"6": {
				"map": [
					3, 3, 3, 3, 3,
					3, 0, 0, 0, 3,
					3, 0, 0, 0, 3,
					3, 1, 3, 2, 3,
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
			"7": {
				"map": [
					3, 3, 3, 3, 3,
					3, 1, 3, 2, 3,
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
			"8": {
				"map": [
					3, 3, 3, 3, 3,
					3, 0, 0, 0, 3,
					3, 0, 3, 0, 3,
					3, 1, 3, 2, 3,
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
			"9": {
				"map": [
					3, 3, 3, 3, 3,
					3, 0, 3, 0, 3,
					3, 0, 0, 0, 3,
					3, 2, 3, 1, 3,
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
			"10": {
				"map": [
					3, 3, 3, 3, 3,
					3, 0, 3, 2, 3,
					3, 0, 0, 0, 3,
					3, 1, 3, 0, 3,
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
			"11": {
				"map": [
					3, 3, 3, 3, 3,
					3, 1, 3, 0, 3,
					3, 0, 0, 0, 3,
					3, 0, 3, 2, 3,
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
			"12": {
				"map": [
					3, 3, 3, 3, 3,
					3, 1, 2, 2, 3,
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
				"height": 1,
				"mwidth": 5,
				"mheight": 3
			},
			"13": {
				"map": [
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
			"14": {
				"map": [
					3, 3, 3, 3, 3,
					3, 0, 2, 0, 3,
					3, 1, 3, 2, 3,
					3, 0, 0, 0, 3,
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
			"15": {
				"map": [
					3, 3, 3, 3,
					3, 3, 1, 3,
					3, 2, 0, 3,
					3, 0, 2, 3,
					3, 3, 3, 3
				],
				"ins": [
					"fw",
					"rl",
					"rr",
					"lt"
				],
				"dir": "s",
				"width": 2,
				"height": 3,
				"mwidth": 4,
				"mheight": 5
			},
			"16": {
				"map": [
					3, 3, 3, 3, 3,
					3, 2, 0, 1, 3,
					3, 0, 3, 0, 3,
					3, 2, 0, 2, 3,
					3, 3, 3, 3, 3
				],
				"ins": [
					"fw",
					"rl",
					"rr",
					"lt"
				],
				"dir": "w",
				"width": 3,
				"height": 3,
				"mwidth": 5,
				"mheight": 5
			}
		});
})();
