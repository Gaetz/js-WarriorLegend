/**
 * The warrior the player moves
 */
class Warrior {

    constructor(x, y, graphics, radius = PLAYER_RADIUS, speed = START_SPEED, angle = START_ANGLE) {
        this.x = x;
        this.y = y;
        this.nextX = x;
        this.nextY = y;
        this.radius = radius;
        this.speed = speed;
        this.angle = angle;
        // Load player image
        this.pic = graphics.get('car');
    }

    /**
     * Return player's next horizontal position
     */
    getNextX() {
        return this.nextX;
    }

    /**
     * Return player's next vertival position
     */
    getNextY() {
        return this.nextY;
    }

    /**
     * Update
     * @param {*} canvas 
     * @param {*} input 
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
            this.x = this.nextX;
            this.y = this.nextY;
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
     * Draw
     */
    draw() {
        Graphics.drawBitmapWithRotation(this.pic, this.x, this.y, this.angle);
    }

    /**
     * Called when the bounces on a wall
     */
    trackBounce() {
        this.outOfControlTimer = BOUNCE_TIMER;
        this.speed = this.speed * -0.5;
    }

    /**
     * Reset ball position and speed
     */
    reset(startX, startY) {
        this.x = startX;
        this.y = startY;
        this.speed = START_SPEED;
        this.angle = START_ANGLE;
    }
}