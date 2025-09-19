import React from 'react';
import { BlockType } from '../types';
import Block from './Block';
import { BOARD_WIDTH, BOARD_HEIGHT, GRID_CELL_SIZE } from '../constants';

interface BoardProps {
  blocks: BlockType[];
  selectedBlockId: number | null;
  onBlockSelect: (id: number) => void;
  onCellClick?: (x: number, y: number) => void;
  justMovedBlockId: number | null;
}

const Board: React.FC<BoardProps> = ({ blocks, selectedBlockId, onBlockSelect, onCellClick, justMovedBlockId }) => {
  return (
    // Outer container for border, background, and positioning context for the exit gap.
    <div 
      className="relative bg-black/20 rounded-lg shadow-lg border-4 border-theme-neutral"
    >
      {/* Inner container handles the grid, padding, and clips overflow to prevent layout shifts from block selection rings. */}
      <div
        className="relative rounded-md overflow-hidden p-2"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${GRID_CELL_SIZE})`,
          gridTemplateRows: `repeat(${BOARD_HEIGHT}, ${GRID_CELL_SIZE})`,
          gap: '0.5rem',
        }}
      >
        {/* Background Grid Cells */}
        {Array.from({ length: BOARD_WIDTH * BOARD_HEIGHT }).map((_, i) => {
          const x = i % BOARD_WIDTH;
          const y = Math.floor(i / BOARD_WIDTH);
          
          const isClickable = !!selectedBlockId;

          return (
            <div 
              key={i} 
              className={`bg-black/20 rounded-md transition-colors ${isClickable ? 'cursor-pointer hover:bg-black/40' : ''}`}
              onClick={() => {
                if (isClickable && onCellClick) {
                  onCellClick(x, y);
                }
              }}
            />
          );
        })}
        
        {/* Blocks are now positioned relative to this inner, clipping container. */}
        {blocks.map(block => (
          <Block
            key={block.id}
            block={block}
            isSelected={block.id === selectedBlockId}
            isJustMoved={block.id === justMovedBlockId}
            onSelect={onBlockSelect}
          />
        ))}
      </div>
      
      {/* Border Opening Element remains outside the inner container to avoid being clipped. */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-theme-bg"
        style={{
          width: `calc(2 * ${GRID_CELL_SIZE} + 0.5rem)`,
          height: '6px',
          bottom: '-5px',
        }}
      ></div>
    </div>
  );
};

export default Board;