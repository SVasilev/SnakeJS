var Snake = function(position, ground) {
    this.position = position;
    this.ground = ground;
    this.direction = "right";

    // Since the snake has to have a tail the head shouldn't be 
    // positioned at the left corner because there would not be space for the tail.
    if(this.position.x == 0) this.position.x++;

    this.ground.array[this.position.y][this.position.x] = this.ground.tileTypes.snakeHead;
    this.ground.array[this.position.y][this.position.x - 1] = this.ground.tileTypes.snakeBody;

    this.move = function() {
        this.position.x += 1;
        this.ground.array[this.position.y][this.position.x - 2] = this.ground.tileTypes.empty;
        this.ground.array[this.position.y][this.position.x - 1] = this.ground.tileTypes.snakeBody;
        this.ground.array[this.position.y][this.position.x - 0] = this.ground.tileTypes.snakeHead;
    };
};