var Snake = function(position, ground) {
    this.position = position;
    this.coordinates = [];
    this.direction = "right";

    // Since the snake has to have a tail the head shouldn't be 
    // positioned at the left corner because there would not be space for the tail.
    if(this.position.x == 0) ++this.position.x;

    this.coordinates.push([this.position.y, this.position.x]);
    this.coordinates.push([this.position.y, this.position.x - 1]);
    this.coordinates.push([this.position.y, this.position.x - 2]);

    this.move = function() {
        // var currentCoordinate = this.coordinates[0].slice();
        // this.coordinates[0][1/*depends on direction*/] += 1;
        // for (var i = 0; i < this.coordinates.length - 1; i++) {
        //     this.coordinates[i + 1] = currentCoordinate;
        //     currentCoordinate = this.coordinates[i + 1].slice();
        // };
        var weDidntPickUpFruit = true;
        if(weDidntPickUpFruit) this.coordinates.pop();
        var newHeadCoordinates = [this.coordinates[0][0], this.coordinates[0][1/*depends on direction*/] + 1];
        this.coordinates.unshift(newHeadCoordinates);
        
    };
};