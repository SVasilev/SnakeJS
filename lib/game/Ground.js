var Ground = function(width, height) {
    this.tileTypes = {
        "empty": 0,
        "wall": 1,
        "fruit": 2
    };

    //Draw the walls.
    this.array = new Array(height);
    for(var i = 0; i < height; i++) {
        this.array[i] = new Array(width);
        for(var j = 0; j < width; j++) {
            this.array[i][j] = this.tileTypes.empty;
        }
    }

    this.addFood = function(randomizer) {

    };

    this.drawSnake = function(snake) {
        //Will add the snake to the ground coordinates
        for(var i = 0; i < snake.coordinates.length; i++) {
            this.array[snake.coordinates[i][0]][snake.coordinates[i][1]] = this.tileTypes.wall;
        }
    };

    this.refresh = function(snake) {
        for(var i = 0; i < height; i++) {
            this.array[i] = new Array(width);
            for(var j = 0; j < width; j++) {
                if(i == 0 || i == height - 1 || j == 0 || j == width - 1) this.array[i][j] = this.tileTypes.wall;
            }
        }
        this.drawSnake(snake);
    };
};