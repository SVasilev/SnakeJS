var Ground = function(width, height) {
    this.tileTypes = {
        "empty": 0,
        "wall": 1,
        "fruit": 2
    };

    this.array = [];

    this.initializeGround = function() {
        for(var i = 0; i < height; i++) {
            var row = [];
            for(var j = 0; j < width; j++) {
                row[j] = this.tileTypes.empty;
            }
            this.array.push(row);
        }
        this.addFruit();
    };

    this.fruitIsUnderSnake = function(snake, fruitCoordinate) {
        if(!snake) return false;
        for(var i = 0; i < snake.coordinates.length; i++) {
            if(snake.coordinates[i].toString() == fruitCoordinate.toString()) return true;
        }
        return false
    };

    this.randomFruitCoordinates = function() {
        return [Math.floor((Math.random() * (height - 2)) + 1), Math.floor((Math.random() * (width - 2)) + 1)];
    };

    this.addFruit = function(snake) {
        var newFoodCoordinates = this.randomFruitCoordinates()
        // Generate new coordinates for the food while it rands under the snake.
        while(this.fruitIsUnderSnake(snake, newFoodCoordinates)) {
            newFoodCoordinates = this.randomFruitCoordinates()
        }
        this.foodCoordinates = newFoodCoordinates;
    };

    //Initialize the ground with fruit.
    this.initializeGround();

    this.clearGround = function() {
        for(var i = 0; i < height; i++) {
            this.array[i] = new Array(width);
            for(var j = 0; j < width; j++) {
                this.array[i][j] = this.tileTypes.empty;
            }
        }
    };

    this.attachWalls = function() {
        for(var i = 0; i < height; i++) {
            for(var j = 0; j < width; j++) {
                if(i == 0 || i == height - 1 || j == 0 || j == width - 1) this.array[i][j] = this.tileTypes.wall;
            }
        }
    };

    this.attachFruit = function() {
        this.array[this.foodCoordinates[0]][this.foodCoordinates[1]] = this.tileTypes.fruit;
    };

    this.attachSnake = function(snake) {
        for(var i = 0; i < snake.coordinates.length; i++) {
            this.array[snake.coordinates[i][0]][snake.coordinates[i][1]] = this.tileTypes.wall;
        }
    };

    this.checkOutOfBounds = function(game) {
        var headY = game.snake.coordinates[0][0],
            headX = game.snake.coordinates[0][1];
        if(headX < 1 || headX > this.array[0].length - 2 || headY < 1 || headY > this.array.length - 2) return false;
        return true;
    };

    this.refresh = function(game) {
        this.clearGround();
        this.attachWalls();
        this.attachFruit();
        this.attachSnake(game.snake);
        // Return false to exit the game if you are out of bounds.
        return this.checkOutOfBounds(game);
    };
};

module.exports = Ground;