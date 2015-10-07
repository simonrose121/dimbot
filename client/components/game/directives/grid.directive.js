(function() {
	angular
		.module('dimbot.game')
		.directive('dimGridDirective', dimGridDirective)

	function dimGridDirective() {
		var directive = {
			restrict: 'E',
			link: link,
			template: "<div id='scene'></div>",
		};

		return directive;

		function link(element) {
			var vm = this;

			vm.moveUp = moveUp;
			vm.update = update;
			vm.bind = bind;

			var camera, scene, renderer;

			container = $('#level');

			// set the scene size
			var WIDTH = container.width() - 10,
			  HEIGHT = container.height() - 10;

			// set some camera attributes
			var VIEW_ANGLE = 45,
			  ASPECT = WIDTH / HEIGHT,
			  NEAR = 0.1,
			  FAR = 10000;

			var renderer = new THREE.WebGLRenderer();
			var camera =
			  new THREE.PerspectiveCamera(
			    VIEW_ANGLE,
			    ASPECT,
			    NEAR,
			    FAR);

			// create scene
			var scene = new THREE.Scene();

			// add test object
			var geometry = new THREE.BoxGeometry(20, 20, 20);
			var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
			var mesh = new THREE.Mesh( geometry, material );
			scene.add( mesh );

			// add the camera to the scene
			scene.add(camera);

			// the camera starts at 0,0,0
			// so pull it back
			camera.position.z = 200;

			// start the renderer
			renderer.setSize(WIDTH, HEIGHT);

			vm.update();
			vm.bind();

			// attach the render-supplied DOM element
			$('#scene').append(renderer.domElement);

			//vm.moveUp();

			function moveUp() {
				mesh.translateY(30);
				vm.update();
			}

			function update() {
				renderer.render(scene, camera);
			}

			function bind() {
				$('.play').bind('click', function() {
					vm.moveUp();
				})
			}
		}
	};
})();
