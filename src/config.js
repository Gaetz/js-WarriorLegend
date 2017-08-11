/**
 * Contains all game numbers and balancing
 */

// General game config
const FRAME_PER_SECOND = 30;

// Warrior
const START_X_OFFSET = 18;
const START_SPEED = 0;
const PLAYER_MOVE_SPEED = 5.0;
const PLAYER_GRAPHICS = 'images/warrior.png';

// Tiles
const TILE_WIDTH = 50;
const TILE_HEIGHT = 50;
const TILE_COLS = 16;
const TILE_ROWS = 12;


// Background
const BACKGROUND_STYLE = 'black';

// Text
const TEXT_STYLE = 'white';

// Key codes
const Z_CODE = 90;
const S_CODE = 83;
const Q_CODE = 81;
const D_CODE = 68;
const UP_CODE = 38;
const DOWN_CODE = 40;
const LEFT_CODE = 37;
const RIGHT_CODE = 39;

// Grid
const TILE_FLOOR_CODE = 0;
const TILE_WALL_CODE = 1;
const TILE_START_P1_CODE = 2;
const TILE_GOAL_CODE = 3;
const TILE_KEY_CODE = 4;
const TILE_DOOR_CODE = 5;
const TILE_FLOOR_IMG = 'images/floor.png';
const TILE_WALL_IMG = 'images/block.png';
const TILE_START_P1_IMG = 'images/floor.png';
const TILE_GOAL_IMG = 'images/goal.png';
const TILE_KEY_IMG = 'images/key.png';
const TILE_DOOR_IMG = 'images/door.png';

const WORLDGRID =
       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 1, 1, 1, 1,
        1, 0, 4, 0, 4, 0, 1, 0, 2, 0, 1, 0, 1, 4, 4, 1,
        1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 5, 1, 5, 1, 1,
        1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 1, 0, 0, 0, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 1, 1,
        1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
        1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 4, 0, 1, 1,
        1, 0, 5, 0, 5, 0, 5, 0, 3, 0, 1, 0, 0, 0, 1, 1,
        1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        