var Renderer = function(type) {
    this.TILE_WIDTH  = 40;
    this.TILE_HEIGHT = 40;

    this.type = type;
    
    this.refreshGround = function(game) {
        game.ground.refresh(game);
        switch(this.type) {
            case "Phaser":
                if(!game.cachedSprites) game.cachedSprites = [];
                for(var i = 0; i < game.cachedSprites.length; i++) {
                    game.cachedSprites[i].destroy();
                }
                game.cachedSprites = [];
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
                sprite = game.add.sprite(y * this.TILE_WIDTH, x * this.TILE_HEIGHT, "snakeBody");
                break;
            case 2:
                sprite = game.add.sprite(y * this.TILE_WIDTH, x * this.TILE_HEIGHT, "snakeFruit");
                break;
        }
        if(sprite) game.cachedSprites.push(sprite);
    };

    this.renderAsCanvas = function() {
        // similar logic
    };

    this.render = function(game) {
        this.refreshGround(game);
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