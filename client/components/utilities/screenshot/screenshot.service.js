(function() {
	angular
		.module('utils.screenshot')
		.factory('screenshot', screenshot);

	function screenshot() {
		var service = {
			capture: capture,
			captureSvg: captureSvg
		};

		return service;

		function capture(id, filename, callback) {
			html2canvas($(id), {
	            onrendered: function(canvas) {
					var img = canvas.toDataURL("image/png");
					callback(img);
	            }
	        });
		}

		function captureSvg(id, filename) {
			//get svg element.
			var svg = document.getElementById('blockly-inner');

			//get svg source.
			var serializer = new XMLSerializer();
			var source = serializer.serializeToString(svg);

			//add name spaces.
			if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
			    source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
			}
			if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
			    source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
			}

			//add xml declaration
			source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

			//convert svg source to URI data scheme.
			var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

			//set url value to a element's href attribute.
			return url;
		}
	}
})();
