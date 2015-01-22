var	Ground = require("../lib/game/Ground.js"),
	Snake  = require("../lib/game/Snake.js");

module.exports = {
	invalidCommand: function(request, response) {
		response.end("Invalid Command");
	},

	// startGame: function(request, response) {
	// 	this.score = 0;
	// 	this.ground = new Ground(32, 18);
	// 	this.snake  = new Snake({x: 5, y: 3}, 2);
	// 	if(this.ground && this.snake) response.end("OK");
	// },

	startGame: function(request, response) {
		this.score = 0;
		this.ground = new Ground(32, 18);
		if(!this.firstPlayer) {
			this.firstPlayer = request.ip;
			this.firstScore  = 0;
			this.firstSnake  = new Snake({x: 5, y: 3}, 2);
		}
		else {
			if(!this.secondPlayer && request.ip != this.firstPlayer /*USE IT WHEN YOU TEST WITH TWO DIFFERENT IPS*/) {
				this.secondPlayer = request.ip;
				this.secondScore  = 0;
				this.secondSnake  = new Snake({x: 5, y: 13}, 2);
			}
		}
		console.log(this.firstPlayer);
		console.log(this.secondPlayer);
		if(this.secondPlayer) response.end("StartGame");
		else response.end("Waiting");
	},

	updateGroundState: function(request, response) {
		if(request.ip == this.firstPlayer) {
			if(this.firstSnake.move(this) && this.ground.refresh(this)) response.end(JSON.stringify(this.ground.array));
			else this.firstPlayer = undefined;
			response.end("Game ended with score: " + this.score);
		}
		response.end("");
	},

	setDirection: function(request, response, direction) {
		if(request.ip == this.firstPlayer) this.firstSnake.setDirection(direction);
		response.end("");
	},

	getPlayersCount: function(request, response) {
		if(this.firstPlayer) response.end("1");
		else response.end("0");
	},

	executeCommand: function(request, response) {
		switch (request.query.cmd) {
		case "startGame":
			this.startGame(request, response);
			break;
		case "updateGroundState":
			this.updateGroundState(request, response);
			break;
		case "getPlayersCount":
			this.getPlayersCount(request, response);
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