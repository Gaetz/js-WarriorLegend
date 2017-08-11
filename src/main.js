let canvas, canvasContext, input, graphics;
let player, playerStartX, playerStartY, world, background;

/**
 * Game start
 */
window.onload = () => {
    let isGameStarted = false;
    // Initialize game elements
    loadTools();
    // Manage inputs
    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);
    // Start game after loading
    startGame();
}

/**
 * Start game given it is loaded
 */
function startGame() {
    let setup = false;
    // Loop
    setInterval(() => {
        if (graphics.isLoadingDone()) {
            if (!setup) {
                loadGame();
                setup = true;
            }
            update();
            draw();
        }
    }, 1000 / FRAME_PER_SECOND);
}

/**
 * Startup game elements 
 * */
function loadTools() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.textAlign = 'center';
    background = new Background(canvas.width, canvas.height);
    // Input
    input = new Input();
    // Graphics loader
    graphics = new Graphics();
}


/**
 * Loading game elements 
 * */
function loadGame() {
    // World
    world = new World(graphics);
    world.load();
    // Data
    player = new Warrior(playerStartX, playerStartY, graphics);
}

/**
 * Handle key pressure
 * @param {*} e Event
 */
function keyPressed(e) {
    input.setKeyHoldState(e.keyCode, true);
}

/**
 * Handle key releasing
 * @param {*} e Event
 */
function keyReleased(e) {
    input.setKeyHoldState(e.keyCode, false);
}

/**
 * Update loop
 */
function update() {
    player.update(input, world);
    // End game reset
    if (isGoalReach(player)) {
        document.getElementById('debugText').innerHTML = "Player WON !";
        resetGame();
    }
    // Number of keys
    document.getElementById('debugText').innerHTML = "Number of keys: " + player.keysHeld;
}

/**
 * Returns true when player reach world end
 */
function isGoalReach(checkedElement) {
    // Get checkedElement's position
    let row = Math.floor(checkedElement.y / TILE_HEIGHT);
    let col = Math.floor(checkedElement.x / TILE_WIDTH);
    // Check if goal is reach
    let currentTile = world.getTileFromColAndRow(row, col);
    return currentTile.code == TILE_GOAL_CODE;
}

/**
 * Reset game
 */
function resetGame() {
    player.reset(playerStartX, playerStartY, false, graphics);
    world.reset();
}


/**
 * Draw loop
 */
function draw() {
    background.draw(canvasContext);
    world.draw(graphics);
    player.draw();
}
