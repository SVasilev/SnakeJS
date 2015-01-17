var Ground = function(width, height) {
    this.tileTypes = {
        "empty": 0,
        "snakeHead": 1,
        "snakeBody": 2,
        "fruit": 3
    };

    this.array = new Array(height);
    for(var i = 0; i < height; i++) {
        this.array[i] = new Array(width);
        for(var j = 0; j < width; j++) {
            if(i == 0 || i == height - 1 || j == 0 || j == width - 1) this.array[i][j] = this.tileTypes.snakeBody;
            else this.array[i][j] = this.tileTypes.empty;
        }
    }

    this.addFood = function(randomizer) {

    };

    this.refresh = function() {

    };
};