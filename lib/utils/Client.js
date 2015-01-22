var Client = function() {
	this.executeQuery = function(parameter, handleResponse, game) {
		$.ajax({
	        url: './services/gameQueries.js?' + "cmd=" + parameter,
	        success: function(response) {
	        	if(handleResponse) handleResponse(response.toString(), game);
	        },
			error: function(response) {
				location.reload();
				//alert(JSON.stringify(response));
			},
			async: false
	    });
	}
};