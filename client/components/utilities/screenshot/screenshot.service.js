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
			html2canvas($("#" + id), {
	            onrendered: function(canvas) {
					console.log(canvas);

	                canvas.toBlob(function(blob) {
	                    saveAs(blob, filename + ".png");
	                });
	            }
	        });
		}
	}
})();
