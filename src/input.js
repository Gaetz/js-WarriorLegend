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
     * Tell Input if a virtual key is hold
     * @param {*} keyCode Which key is hold
     * @param {*} setTo Input will be set this value
     */
    setKeyHoldState(keyCode, setTo) {
        // Player 1
        if (keyCode == Z_CODE || keyCode == UP_CODE) {
            this.isPressedUp = setTo;
        }
        if (keyCode == Q_CODE || keyCode == LEFT_CODE) {
            this.isPressedLeft = setTo;
        }
        if (keyCode == D_CODE || keyCode == RIGHT_CODE) {
            this.isPressedRight = setTo;
        }
        if (keyCode == S_CODE || keyCode == DOWN_CODE) {
            this.isPressedDown = setTo;
        }
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
