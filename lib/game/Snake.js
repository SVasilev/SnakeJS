var Snake = function(position, size) {
    this.position = position;
    this.size = size;
    this.direction = "right";
    this.coordinates = [];
    // This is Direction to value mapping
    this.mapping = {
        "right": [0, 1],
        "left": [0, -1],
        "up": [-1, 0],
        "down": [1, 0]
    };

    // Since the snake has to have a tail the head shouldn't be 
    // positioned at the left corner because there would not be space for the tail.
    if(this.position.x == 0) this.position.x += size + 1;

    //Create the snake
    for(var i = 0; i < size; i++) {
        this.coordinates.push([this.position.y, this.position.x - i]);
    }

    this.setDirection = function(direction) {
        //Do not allow reverse direction.
        if( (this.direction == "right" && direction == "left") ||
            (this.direction == "left" && direction == "right") ||
            (this.direction == "up" && direction == "down") ||
            (this.direction == "down" && direction == "up") ) return;
        this.direction = direction;
    };

    this.calculateNewHeadCoordinates = function() {
        return [this.coordinates[0][0] + this.mapping[this.direction][0], 
                this.coordinates[0][1] + this.mapping[this.direction][1]];
    };

    this.snakeCollidesWithSelf = function(newHeadCoordinates) {
        for(var i = 0; i < this.coordinates.length; i++) {
            if(this.coordinates[i].toString() === newHeadCoordinates.toString()) return true;
        }
        return false;
    };

    this.move = function(game) {
        var newHeadCoordinates = this.calculateNewHeadCoordinates();
        //Return false if we collide with our own body to exit the game.
        if(this.snakeCollidesWithSelf(newHeadCoordinates)) return false;
        this.coordinates.unshift(newHeadCoordinates);
        if(game.ground.foodCoordinates.toString() === newHeadCoordinates.toString()) {
            //If we pick a fruit...
            game.ground.addFruit();
            game.score += 100;
        }
        else this.coordinates.pop();
        return true;
    };
};

module.exports = Snake;