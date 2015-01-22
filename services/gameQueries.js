var	Ground = require("../lib/game/Ground.js"),
	Snake  = require("../lib/game/Snake.js");

module.exports = {
	invalidCommand: function(request, response) {
		response.end("Invalid Command");
	},

	startGame: function(request, response) {
		this.score = 0;
		this.ground = new Ground(32, 18);
		this.snake  = new Snake({x: 5, y: 3}, 2);
		if(this.ground && this.snake) response.end("OK");
	},

	updateGroundState: function(request, response) {
		if(this.snake && this.ground) {
			if(this.snake.move(this) && this.ground.refresh(this)) response.end(JSON.stringify(this.ground.array));
			response.end("Game ended with score: " + this.score);
		}
		response.end("");
	},

	setDirection: function(request, response, direction) {
		if(this.snake) this.snake.setDirection(direction);
		response.end("");
	},

	executeCommand: function(request, response) {
		switch (request.query.cmd) {
		case "startGame":
			this.startGame(request, response);
			break;
		case "getGroundState":
			this.getGroundState(request, response);
			break;
		case "getSnakeState":
			this.getSnakeState(request, response);
			break;
		case "updateGroundState":
			this.updateGroundState(request, response);
			break;
		case "getFruitCoordinates":
			this.getFruitCoordinates(request, response);
			break;
		case "up":
		case "down":
		case "left":
		case "right":
			this.setDirection(request, response, request.query.cmd);
			break;
		default:
			this.invalidCommand(request, response);
			break;
		}
	}
};