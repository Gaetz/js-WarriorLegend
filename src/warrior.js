/**
 * The warrior the player moves
 */
class Warrior {

    constructor(x, y, graphics) {
        this.x = x;
        this.y = y;
        this.nextX = x;
        this.nextY = y;
        // Load player image
        this.pic = graphics.get('warrior');
        // Keys
        this.keysHeld = 0;
    }

    /**
     * Update player
     * @param {*} input 
     * @param {*} world
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

        // Pick keys on floor
        this.collectKeys();
        // Move if movement is valid
        if (this.isMovementValid(world)) {
            this.move();
        } else {
            this.stop();
        }
    }

    /**
     * Handle key picking
     */
    collectKeys() {
        // Get next position
        let nextTileRow = Math.floor(this.nextY / TILE_HEIGHT);
        let nextTileCol = Math.floor(this.nextX / TILE_WIDTH);
        // Key collection
        let collidedTile = world.getTileFromColAndRow(nextTileRow, nextTileCol);
        if (collidedTile.code == TILE_KEY_CODE) {
            this.keysHeld = this.keysHeld + 1;
            world.collectKey(collidedTile);
        }
    }

    /**
     * Handle player colliding with world
     */
    isMovementValid(world) {
        // Get next position
        let nextTileRow = Math.floor(this.nextY / TILE_HEIGHT);
        let nextTileCol = Math.floor(this.nextX / TILE_WIDTH);
        // Col and row must be in config limit
        if (nextTileCol < 0 || nextTileRow < 0 || nextTileRow >= TILE_ROWS || nextTileCol >= TILE_COLS)
            return false;
        // Wall collision
        let collidedTile = world.getTileFromColAndRow(nextTileRow, nextTileCol);
        if (collidedTile.code == TILE_WALL_CODE) {
            return false;
        }
        // Door collision
        if(collidedTile.code == TILE_DOOR_CODE) {
            if(this.keysHeld <= 0) {
                return false;
            } else {
                this.keysHeld = this.keysHeld - 1;
                world.openDoor(collidedTile);
            }
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
        Graphics.drawBitmapCentered(this.pic, this.x, this.y);
    }

    /**
     * Reset player position and speed
     */
    reset(startX, startY) {
        this.x = startX;
        this.y = startY;
        this.keysHeld = 0;
    }
}