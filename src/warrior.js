/**
 * The warrior the player moves
 */
class Warrior {

    constructor(x, y, graphics, radius = PLAYER_RADIUS, speed = START_SPEED, angle = START_ANGLE) {
        this.x = x;
        this.y = y;
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
        return this.x + Math.cos(this.angle) * this.speed;
    }

    /**
     * Return player's next vertival position
     */
    getNextY() {
        return this.y + Math.sin(this.angle) * this.speed;
    }

    /**
     * Update
     * @param {*} canvas 
     * @param {*} input 
     */
    update(canvas, input) {
        // Input controls
        if (this.outOfControlTimer > 0) {
            this.outOfControlTimer = this.outOfControlTimer - 1;
        } else {
            if (input.isUpInput(this)) {
                this.speed = this.speed + PLAYER_ACCELERATION;
            }
            if (input.isDownInput(this)) {
                this.speed = this.speed - PLAYER_BRAKE;
            }
            if (input.isLeftInput(this) && Math.abs(this.speed) > MIN_TURN_SPEED) {
                this.angle = this.angle - PLAYER_ROTATION_SPEED;
            }
            if (input.isRightInput(this) && Math.abs(this.speed) > MIN_TURN_SPEED) {
                this.angle = this.angle + PLAYER_ROTATION_SPEED;
            }
        }
        // Move
        this.x = this.x + Math.cos(this.angle) * this.speed;
        this.y = this.y + Math.sin(this.angle) * this.speed;
        // Automatic deceleration
        if (Math.abs(this.speed) > MIN_SPEED)
            this.speed = this.speed * GROUNDSPEED_DECAY_MULT;
        else
            this.speed = 0;
        // Wall bounce
        if (this.y <= 0 || this.y >= canvas.height)
            this.speed *= -1;
        if (this.x >= canvas.width || this.x <= 0)
            this.speed *= -1;
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