(function() {
	angular
		.module('utils.screenshot')
		.factory('screenshot', screenshot);

	function screenshot() {
		var service = {
			capture: capture
		};

		return service;

		function capture(id, filename) {
			html2canvas($(id), {
	            onrendered: function(canvas) {
	                canvas.toBlob(function(blob) {
	                    saveAs(blob, filename + ".png");
	                });
	            }
	        });
		}
	}
})();
