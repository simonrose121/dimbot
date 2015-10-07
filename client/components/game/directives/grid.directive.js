(function() {
	angular
		.module('dimbot.game')
		.directive('dimGridDirective', dimGridDirective)

	function dimGridDirective() {
		var directive = {
			restrict: 'E',
			link: link,
			template: "<div id='scene'></div>"
		};

		return directive;

		function link(element) {
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

			var scene = new THREE.Scene();

			var radius = 50,
			    segments = 16,
			    rings = 16;

			// create a new mesh with
			// sphere geometry - we will cover
			// the sphereMaterial next!
			var sphereMaterial =
			  new THREE.MeshLambertMaterial(
			    {
			      color: 0xCC0000
			    });

			var sphere = new THREE.Mesh(

			  new THREE.SphereGeometry(
			    radius,
			    segments,
			    rings),

			  sphereMaterial);

			// add the sphere to the scene
			scene.add(sphere);

			// create a point light
			var pointLight =
			  new THREE.PointLight(0xFFFFFF);

			// set its position
			pointLight.position.x = 10;
			pointLight.position.y = 50;
			pointLight.position.z = 130;

			// add to the scene
			scene.add(pointLight);

			// add the camera to the scene
			scene.add(camera);

			// the camera starts at 0,0,0
			// so pull it back
			camera.position.z = 300;

			// start the renderer
			renderer.setSize(WIDTH, HEIGHT);

			renderer.render(scene, camera);

			// attach the render-supplied DOM element
			$('#scene').append(renderer.domElement);
		}
	};
})();
