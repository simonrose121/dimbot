(function() {
	angular
		.module('dimbot.game')
		.service('movementService', movementService);

	movementService.$Inject = ['programService', 'logger'];

	function movementService(programService, logger) {
		var vm = this;

		var service = {
			animate: animate,
			moveUp: moveUp,
			moveDown: moveDown,
			moveLeft: moveLeft,
			moveRight: moveRight,
			run: run
		};

		return service;

		function animate(x, y, z, callback) {
			var position = {
				x: mesh.position.x,
				y: mesh.position.y,
				z: mesh.position.z
			};
			var target = {
				x: mesh.position.x + x,
				y: mesh.position.y + y,
				z: mesh.position.z + z
			};

			logger.info('moving mesh from', position);
			logger.info('moving mesh to', target);

			var tween = new TWEEN.Tween(position).to(target);
			tween.onUpdate(function() {
				mesh.position.x = position.x;
				mesh.position.y = position.y;
			});
			tween.onComplete(function() {
				callback();
			});

			tween.start();
		}

		function moveUp(callback) {
			animate(0, 100, 0, callback);
		}

		function moveDown(callback) {
			animate(0, -100, 0, callback);
		}

		function moveLeft(callback) {
			animate(-100, 0, 0, callback);
		}

		function moveRight(callback) {
			animate(100, 0, 0, callback);
		}

		function run() {
			var that = this;

			that.loop = loop;
			that.perform = perform;
			that.x = 0;

			var program = programService.getProgram();
			that.loop(program);

			// control loop execution to wait for callback from tween when complete
			function loop(arr) {
				perform(arr[that.x], function() {
					that.x++;

					if(that.x < arr.length) {
						loop(arr);
					};
				});
			}

			function perform(ins, callback) {
				switch(ins.name) {
					case 'up':
						moveUp(callback);
						break;
					case 'down':
						moveDown(callback);
						break;
					case 'left':
						moveLeft(callback);
						break;
					case 'right':
						moveRight(callback);
						break;
				}
			}
		}
	};
})();
