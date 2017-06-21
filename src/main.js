let canvas, canvasContext, input, graphics;
let player, playerStartX, playerStartY, tiles, background;

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
    // Track
    tiles = [];
    loadWorld(graphics);
    // Data
    player = new Warrior(playerStartX, playerStartY, graphics);
}

/**
 * Load all world tiles
 */
function loadWorld(graphics) {
    let tileLeftEdgeX = 0;
    let tileTopEdgeY = 0;
    let tileIndex = 0;
    for (let i = 0; i < TILE_ROWS; i++) { // Rows
        for (let j = 0; j < TILE_COLS; j++) { // Columns
            // Terrain generation
            let tile = new WorldTile(tileLeftEdgeX, tileTopEdgeY, WORLDGRID[tileIndex], graphics);
            tiles.push(tile);
            // Player start
            if (WORLDGRID[tileIndex] == TILE_START_P1_CODE) {
                playerStartX = tileLeftEdgeX + START_X_OFFSET;
                playerStartY = tileTopEdgeY;
            }
            // For next iteration
            tileLeftEdgeX = (tileLeftEdgeX + TILE_WIDTH) % (TILE_COLS * TILE_WIDTH);
            tileIndex = tileIndex + 1;
        }
        tileTopEdgeY = (tileTopEdgeY + TILE_HEIGHT) % (TILE_ROWS * TILE_HEIGHT);
    }
}

/**
 * Handle key pressure
 * @param {*} e Event
 */
function keyPressed(e) {
    setKeyHoldState(e.keyCode, true);
}

/**
 * Handle key releasing
 * @param {*} e Event
 */
function keyReleased(e) {
    setKeyHoldState(e.keyCode, false);
}

/**
 * Tell Input if a virtual key is hold
 * @param {*} keyCode Which key is hold
 * @param {*} setTo Input will be set this value
 */
function setKeyHoldState(keyCode, setTo) {
    // Player 1
    if (keyCode == Z_CODE || keyCode == UP_CODE) {
        input.isPressedUp = setTo;
    }
    if (keyCode == Q_CODE || keyCode == LEFT_CODE) {
        input.isPressedLeft = setTo;
    }
    if (keyCode == D_CODE || keyCode == RIGHT_CODE) {
        input.isPressedRight = setTo;
    }
    if (keyCode == S_CODE || keyCode == DOWN_CODE) {
        input.isPressedDown = setTo;
    }
}

/**
 * Update loop
 */
function update() {
    player.update(canvas, input);
    // Player bouncing on walls
    updatePlayerCollision(player);
    // End game reset
    if (isGoalReach(player)) {
        document.getElementById('debugText').innerHTML = "Player one WON !";
        resetGame();
    }
}

/**
 * Handle player colliding with tracks
 */
function updatePlayerCollision(checkedElement) {
    // Get checkedElement's next position
    let nextTileRow = Math.floor(checkedElement.getNextY() / TILE_HEIGHT);
    let nextTileCol = Math.floor(checkedElement.getNextX() / TILE_WIDTH);
    // Track col and row must be in config limit
    if (nextTileCol < 0 || nextTileRow < 0 || nextTileRow >= TILE_ROWS || nextTileCol >= TILE_COLS)
        return;
    // Collision
    let collidedTrack = getTileFromColAndRow(nextTileRow, nextTileCol);
    if (collidedTrack.code == TILE_WALL_CODE) {
        checkedElement.trackBounce();
    }
}

/**
 * Get track index from row and col
 * @param {int} tileRow 
 * @param {int} tileCol 
 */
function getTileFromColAndRow(tileRow, tileCol) {
    return tiles[tileRow * TILE_COLS + tileCol];
}


/**
 * Returns true when player reach track end
 */
function isGoalReach(checkedElement) {
    // Get checkedElement's position
    let tileRow = Math.floor(checkedElement.y / TILE_HEIGHT);
    let trackCol = Math.floor(checkedElement.x / TILE_WIDTH);
    // Check if goal is reach
    let currentTile = getTileFromColAndRow(tileRow, trackCol);
    return currentTile.code == TILE_GOAL_CODE;
}

/**
 * Reset game
 */
function resetGame() {
    player.reset(playerStartX, playerStartY, false, graphics);
    tiles = [];
    loadWorld(graphics);
}


/**
 * Draw loop
 */
function draw() {
    background.draw(canvasContext);
    for (let j = 0; j < tiles.length; j++) {
        tiles[j].draw();
    }
    player.draw();
}
