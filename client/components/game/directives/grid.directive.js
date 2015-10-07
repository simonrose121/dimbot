(function() {
	angular
		.module('dimbot.game')
		.directive('dimGridDirective', dimGridDirective)

	dimGridDirective.$Inject = ['movementService', 'logger'];

	function dimGridDirective(movementService, logger) {
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
			vm.render = render;

			// run these when directive is loaded
			vm.init();
			vm.addRobot();
			vm.bind();

			// start render loop
			vm.render();

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
					movementService.run();
				});
				$('.reset').bind('click', function() {
					movementService.reset();
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
