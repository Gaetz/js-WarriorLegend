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
     * Get up input
     */
    isUpInput() {
        return this.isPressedUp;
    }


    /**
     * Get up input
     */
    isDownInput() {
        return this.isPressedDown;
    }

    /**
     * Get left input
     */
    isLeftInput() {
        return this.isPressedLeft;
    }

    /**
     * Get right input
     */
    isRightInput() {
        return this.isPressedRight;
    }
}
