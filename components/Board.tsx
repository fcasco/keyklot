import React from 'react';
import { BlockType } from '../types';
import Block from './Block';
import { BOARD_WIDTH, BOARD_HEIGHT, GRID_CELL_SIZE } from '../constants';

interface BoardProps {
  blocks: BlockType[];
  selectedBlockId: number | null;
  onBlockSelect: (id: number) => void;
  onCellClick?: (x: number, y: number) => void;
}

const Board: React.FC<BoardProps> = ({ blocks, selectedBlockId, onBlockSelect, onCellClick }) => {
  return (
    <div 
      className="relative bg-black/20 rounded-lg p-2 shadow-lg border-2 border-mid-blue"
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
        
        // Clicks are enabled on any empty cell when a block is selected
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
      
      {/* Exit Area visualization */}
      <div 
        className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-teal/10 rounded-md border-2 border-dashed border-teal/30 pointer-events-none"
        style={{
          width: `calc(2 * ${GRID_CELL_SIZE} + 0.5rem)`,
          height: GRID_CELL_SIZE,
        }}
      ></div>

      {/* Border Opening Element */}
      {/* This div is positioned over the bottom border to create a visual gap for the exit */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bg-dark-blue"
        style={{
          width: `calc(2 * ${GRID_CELL_SIZE} + 0.5rem)`,
          height: '4px', // A bit extra height to ensure full coverage of the border
          bottom: '-3px', // Positioned to cover the border
        }}
      ></div>

      {/* Blocks */}
      {blocks.map(block => (
        <Block
          key={block.id}
          block={block}
          isSelected={block.id === selectedBlockId}
          onSelect={onBlockSelect}
        />
      ))}
    </div>
  );
};

export default Board;
