(function() {
	angular
		.module('dimbot.game')
		.directive('dimGridDirective', dimGridDirective)

	dimGridDirective.$Inject = ['programService'];

	function dimGridDirective(programService) {
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
			vm.bind = bind;
			vm.init = init;
			vm.moveUp = moveUp;
			vm.moveDown = moveDown;
			vm.moveLeft = moveLeft;
			vm.moveRight = moveRight;
			// vm.rotateLeft = rotateLeft;
			// vm.rotateRight = rotateRight;
			vm.run = run;
			vm.update = update;

			// run these when directive is loaded
			vm.init();
			vm.addRobot();
			vm.update();
			vm.bind();

			function addRobot() {
				// add test object
				var geometry = new THREE.BoxGeometry(20, 20, 20);
				var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
				vm.mesh = new THREE.Mesh( geometry, material );
				vm.scene.add(vm.mesh);
			}

			function bind() {
				// used to bind play and reset buttons
				$('.play').bind('click', function() {
					vm.run();
				})
			}

			function init() {
				container = $('#level');

				// set the scene size
				var WIDTH = container.width() - 10,
				  HEIGHT = container.height() - 10;

				// set some camera attributes
				var VIEW_ANGLE = 45,
				  ASPECT = WIDTH / HEIGHT,
				  NEAR = 0.1,
				  FAR = 10000;

				vm.renderer = new THREE.WebGLRenderer();
				vm.camera =
				  new THREE.PerspectiveCamera(
					VIEW_ANGLE,
					ASPECT,
					NEAR,
					FAR);

				// create scene
				vm.scene = new THREE.Scene();

				// add the camera to the scene
				vm.scene.add(camera);

				// the camera starts at 0,0,0
				// so pull it back
				vm.camera.position.z = 200;

				// start the renderer
				vm.renderer.setSize(WIDTH, HEIGHT);

				// attach the render-supplied DOM element
				$('#scene').append(renderer.domElement);
			}

			//TODO: figure out if movement methods should be here
			function moveUp() {
				mesh.translateY(30);
				vm.update();
			}

			function moveDown() {
				mesh.translateY(-30);
				vm.update();
			}

			function moveLeft() {
				mesh.translateX(-30);
				vm.update();
			}

			function moveRight() {
				mesh.translateX(30);
				vm.update();
			}

			function run() {
				var program = programService.getProgram();

				for(var i = 0; i < program.length; i++) {
					var ins = program[i];
					switch(ins.name) {
						case 'up':
							vm.moveUp();
							break;
						case 'right':
							vm.moveRight();
							break;
					}
				}
			}

			function update() {
				vm.renderer.render(scene, camera);
			}
		}
	};
})();
