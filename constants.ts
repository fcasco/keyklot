import { BlockType } from './types';

export const BOARD_WIDTH = 4;
export const BOARD_HEIGHT = 5;

export const GRID_CELL_SIZE = 'min(18vmin, 100px)';

export const INITIAL_LAYOUT: BlockType[] = [
  // Main block
  { id: 1, x: 1, y: 0, width: 2, height: 2, isMain: true, letter: 'w' },
  // Vertical blocks
  { id: 2, x: 0, y: 0, width: 1, height: 2, letter: 'q' },
  { id: 3, x: 3, y: 0, width: 1, height: 2, letter: 'e' },
  { id: 4, x: 0, y: 2, width: 1, height: 2, letter: 'r' },
  { id: 5, x: 3, y: 2, width: 1, height: 2, letter: 'a' },
  // Horizontal block
  { id: 6, x: 1, y: 2, width: 2, height: 1, letter: 't' },
  // 1x1 blocks
  { id: 7, x: 1, y: 3, width: 1, height: 1, letter: 's' },
  { id: 8, x: 2, y: 3, width: 1, height: 1, letter: 'd' },
  { id: 9, x: 0, y: 4, width: 1, height: 1, letter: 'f' },
  { id: 10, x: 3, y: 4, width: 1, height: 1, letter: 'g' },
];

export const WIN_POSITION = { x: 1, y: 3 };

// A louder, clearer "click" sound for when a piece moves.
// Encoded as Base64 to avoid needing a separate file.
export const MOVE_SOUND_B64 = 'data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSQAAAAA/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/';