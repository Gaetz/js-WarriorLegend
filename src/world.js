/**
 * Game world
 */
class World {

    constructor(graphics) {
        this.tiles = [];
        this.graphics = graphics;
    }

    /**
     * Load world
     */
    load() {
        let tileLeftEdgeX = 0;
        let tileTopEdgeY = 0;
        let tileIndex = 0;
        for (let i = 0; i < TILE_ROWS; i++) { // Rows
            for (let j = 0; j < TILE_COLS; j++) { // Columns
                // Terrain generation
                let tile = new WorldTile(tileLeftEdgeX, tileTopEdgeY, WORLDGRID[tileIndex], graphics);
                this.tiles.push(tile);
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
     * Reset world
     */
    reset() {
        this.tiles = [];
        this.load();
    }

    /**
     * Draw world
     */
    draw(graphics) {
        // World draw
        for (let i = 0; i < this.tiles.length; i++) {
            // Draw floor under tile if necessary
            if(this.isTileTransparent(this.tiles[i])) {
                Graphics.drawBitmap(graphics.get('floor'), this.tiles[i].x, this.tiles[i].y)
            }
            // Draw tile
            this.tiles[i].draw();
        }
    }

    isTileTransparent(tile) {
        return tile.code == TILE_DOOR_CODE || tile.code == TILE_GOAL_CODE || tile.code == TILE_KEY_CODE;
    }

    /**
     * Get tile index from row and col
     * @param {int} tileRow 
     * @param {int} tileCol 
     */
    getTileFromColAndRow(tileRow, tileCol) {
        return this.tiles[tileRow * TILE_COLS + tileCol];
    }

    /**
     * Make the key a floor tile
     * @param {int} tileRow 
     * @param {int} tileCol 
     */
    collectKey(tile) {
        tile.becomeFloor();
    }

    /**
     * Make the door a floor tile
     * @param {int} tileRow 
     * @param {int} tileCol 
     */
    openDoor(tile) {
        tile.becomeFloor();
    }
}