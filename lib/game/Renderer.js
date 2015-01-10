var Renderer = function(type) {
    this.TILE_WIDTH  = 60;
    this.TILE_HEIGHT = 60;

    this.type = type;
    this.cachedSprites = []; // This is kind of bad becouse I use it only if the render type is "Phaser" which is somewhat a dependency...

    this.clearGround = function() {
        switch(this.type) {
            case "Phaser":
                for(var i = 0; i < this.cachedSprites.length; i++) {
                    this.cachedSprites[i].destroy();
                }
                this.cachedSprites = [];
                break;
            case "Canvas":
                // Make all canvases white for example.
                break;
        }
    };

    this.renderAsPhaser = function(game, x, y) {
        var sprite;
        switch(game.ground.array[x][y]) {
            case 1:
                sprite = game.add.sprite(y * this.TILE_WIDTH, x * this.TILE_HEIGHT, "snakeHead");
                break;
            case 2:
                sprite = game.add.sprite(y * this.TILE_WIDTH, x * this.TILE_HEIGHT, "snakeBody");
                break;
        }
        if(sprite) this.cachedSprites.push(sprite);
    };

    this.renderAsCanvas = function() {
        // similar logic
    };

    this.render = function(game) {
        this.clearGround();
        for(var i = 0; i < game.ground.array.length; i++) {
            for(var j = 0; j < game.ground.array[i].length; j++) {
                switch(this.type) {
                    case "Phaser":
                        this.renderAsPhaser(game, i, j);
                    case "Canvas":
                        this.renderAsCanvas();
                }
            }
        }
    };
};