(function() {
	angular
		.module('dimbot.game')
		.directive('dimGridDirective', dimGridDirective)

	dimGridDirective.$Inject = ['programService', 'logger'];

	function dimGridDirective(programService, logger) {
		var directive = {
			restrict: 'E',
			link: link,
			template: "<div id='scene'></div>",
		};

		return directive;

		function link(element) {
			var vm = this;

			// variables
			vm.camera;
			vm.scene;
			vm.renderer;
			vm.mesh;

			// methods
			vm.addRobot = addRobot;
			vm.animate = animate;
			vm.bind = bind;
			vm.init = init;
			vm.moveUp = moveUp;
			vm.moveDown = moveDown;
			vm.moveLeft = moveLeft;
			vm.moveRight = moveRight;
			vm.reset = reset;
			// vm.rotateLeft = rotateLeft;
			// vm.rotateRight = rotateRight;
			vm.run = run;
			vm.render = render;

			// run these when directive is loaded
			vm.init();
			vm.addRobot();
			vm.bind();

			// start render loop
			vm.render();

			function animate(x, y, z) {
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

				tween.start();
			}

			function addRobot() {
				// add test object
				var geometry = new THREE.BoxGeometry(100, 100, 100);
				var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
				vm.mesh = new THREE.Mesh( geometry, material );
				vm.scene.add(vm.mesh);
			}

			function bind() {
				// used to bind play and reset buttons
				$('.play').bind('click', function() {
					vm.run();
				});
				$('.reset').bind('click', function() {
					vm.reset();
				});
			}

			function init() {
				container = $('#level');

				// set the scene size
				var WIDTH = container.width() - 10,
				  HEIGHT = container.height() - 10;

				// set some camera attributes
				var NEAR = -1000, FAR = 1000;

				vm.renderer = new THREE.WebGLRenderer();
				vm.camera =
				  new THREE.OrthographicCamera(
					WIDTH/-2,
					WIDTH/2,
					HEIGHT/2,
					HEIGHT/-2,
					NEAR,
					FAR
				);

				// create scene
				vm.scene = new THREE.Scene();

				// add the camera to the scene
				vm.scene.add(camera);

				// start the renderer
				vm.renderer.setSize(WIDTH, HEIGHT);

				// attach the render-supplied DOM element
				$('#scene').append(renderer.domElement);
			}

			//TODO: figure out if movement methods should be here
			function moveUp() {
				vm.animate(0, 100, 0);
			}

			function moveDown() {
				vm.animate(0, -100, 0);
			}

			function moveLeft() {
				vm.animate(-100, 0, 0);
			}

			function moveRight() {
				vm.animate(100, 0, 0);
			}

			function reset() {
				vm.mesh.position.x = 0;
				vm.mesh.position.y = 0;
				vm.mesh.position.z = 0;
				logger.info('level reset', vm.mesh);
			}

			function run() {
				var program = programService.getProgram();

				for (var i = 0; i < program.length; i++) {
					var ins = program[i];
					switch(ins.name) {
						case 'up':
							vm.moveUp();
							break;
						case 'down':
							vm.moveDown();
							break;
						case 'left':
							vm.moveLeft();
							break;
						case 'right':
							vm.moveRight();
							break;
					}
				}
			}

			function render() {
				function renderloop() {
					requestAnimationFrame(render);
					TWEEN.update();
					vm.renderer.render(scene, camera);
				}
				renderloop();
			}
		}
	};
})();
