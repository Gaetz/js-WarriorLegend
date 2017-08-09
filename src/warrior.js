/**
 * The warrior the player moves
 */
class Warrior {

    constructor(x, y, graphics, radius = PLAYER_RADIUS) {
        this.x = x;
        this.y = y;
        this.nextX = x;
        this.nextY = y;
        this.radius = radius;
        // Load player image
        this.pic = graphics.get('car');
    }

    /**
     * Update
     * @param {*} canvas 
     * @param {*} input 
     * @param {*} tiles 
     */
    update(canvas, input, tiles) {
        // Input controls
        if (input.isUpInput(this)) {
            this.nextY = this.y - PLAYER_MOVE_SPEED;
        }
        if (input.isDownInput(this)) {
            this.nextY = this.y + PLAYER_MOVE_SPEED;
        }
        if (input.isLeftInput(this)) {
            this.nextX = this.x - PLAYER_MOVE_SPEED;
        }
        if (input.isRightInput(this)) {
            this.nextX = this.x + PLAYER_MOVE_SPEED;
        }
        if(this.isCollidingWall(tiles) || this.isGettingOut()) {
            this.stop();
        } else {
            this.move();
        }
    }

    /**
     * True when warrior is colliding with wall
     */
    isCollidingWall(tiles) {
        // Get player's next position
        let nextTileRow = Math.floor(this.nextY / TILE_HEIGHT);
        let nextTileCol = Math.floor(this.nextX / TILE_WIDTH);
        // Track col and row must be in config limit
        if (nextTileCol < 0 || nextTileRow < 0 || nextTileRow >= TILE_ROWS || nextTileCol >= TILE_COLS)
            return true;
        // Allowed tiles
        let collidedTrack = this.getTileFromColAndRow(nextTileRow, nextTileCol, tiles);
        if (collidedTrack.code == TILE_ROAD_CODE || collidedTrack.code == TILE_GOAL_CODE) {
            return false;
        }
        // Else collision
        return true;
    }

    /**
     * Get track index from row and col
     * @param {int} tileRow 
     * @param {int} tileCol 
     * @param {*} tiles
     */
    update(input, world) {
        this.nextX = this.x;
        this.nextY = this.y;

        if (input.isUpInput(this)) {
            this.nextY = this.nextY - PLAYER_MOVE_SPEED;
        }
        if (input.isDownInput(this)) {
            this.nextY = this.nextY + PLAYER_MOVE_SPEED;
        }
        if (input.isLeftInput(this)) {
            this.nextX = this.nextX - PLAYER_MOVE_SPEED;
        }
        if (input.isRightInput(this)) {
            this.nextX = this.nextX + PLAYER_MOVE_SPEED;
        }

        // Move if movement is valid
        if (this.isMovementValid(world)) {
            this.move();
        } else {
            this.stop();
        }
    }

    /**
     * Handle player colliding with world
     */
    isMovementValid(world) {
        // Get next position
        let nextTileRow = Math.floor(this.nextY / TILE_HEIGHT);
        let nextTileCol = Math.floor(this.nextX / TILE_WIDTH);
        // Track col and row must be in config limit
        if (nextTileCol < 0 || nextTileRow < 0 || nextTileRow >= TILE_ROWS || nextTileCol >= TILE_COLS)
            return false;
        // Collision
        let collidedTrack = world.getTileFromColAndRow(nextTileRow, nextTileCol);
        if (collidedTrack.code == TILE_WALL_CODE) {
            return false;
        }
        return true;
    }

    /**
     * Stop warrior movement
     */
    stop() {
        this.nextX = this.x;
        this.nextY = this.y;   
    }

    /**
     * Move warrior
     */
    move() {
        this.x = this.nextX;
        this.y = this.nextY;   
    }

    /**
     * Draw
     */
    draw() {
        Graphics.drawBitmapWithRotation(this.pic, this.x, this.y, this.angle);
    }

    /**
     * Reset ball position and speed
     */
    reset(startX, startY) {
        this.x = startX;
        this.y = startY;
    }
}