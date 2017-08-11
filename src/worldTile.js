/**
 * Dungeon world tile
 */
class WorldTile {

    constructor(x, y, code, graphics, width = TILE_WIDTH, height = TILE_HEIGHT) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.code = code;
        this.pic = this.loadPic(code, graphics);
    }

    loadPic(code, graphics) {
        switch (code) {
            case TILE_FLOOR_CODE:
                return graphics.get('floor');
            case TILE_WALL_CODE:
                return graphics.get('wall');
            case TILE_START_P1_CODE:
                return graphics.get('floor');
            case TILE_GOAL_CODE:
                return graphics.get('goal');
            case TILE_KEY_CODE:
                return graphics.get('key');
            case TILE_DOOR_CODE:
                return graphics.get('door');
        }
    }

    draw() {
        Graphics.drawBitmap(this.pic, this.x, this.y);
    }

    becomeFloor() {
        this.pic = graphics.get('floor');
        this.code = TILE_FLOOR_CODE;
    }
}