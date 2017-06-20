/**
 * Manage player's input
 */
class Input {
    constructor() {
        this.isPressedUp = false;
        this.isPressedDown = false;
        this.isPressedLeft = false;
        this.isPressedRight = false;
    }

    /**
     * Get up input in function of asking car
     * @param {Car} car 
     */
    isUpInput(car) {
        return this.isPressedUp;
    }


    /**
     * Get up input in function of asking car
     * @param {Car} car 
     */
    isDownInput(car) {
        return this.isPressedDown;
    }

    /**
     * Get left input in function of asking car
     * @param {Car} car 
     */
    isLeftInput(car) {
        return this.isPressedLeft;
    }

    /**
     * Get right input in function of asking car
     * @param {Car} car 
     */
    isRightInput(car) {
        return this.isPressedRight;
    }
}
