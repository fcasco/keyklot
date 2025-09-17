import React from 'react';
import { BlockType } from '../types';
import { GRID_CELL_SIZE } from '../constants';

interface BlockProps {
  block: BlockType;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const Block: React.FC<BlockProps> = ({ block, isSelected, onSelect }) => {
  const { x, y, width, height, isMain, letter } = block;

  const baseClasses = "absolute rounded-md cursor-pointer transition-all duration-200 ease-in-out flex items-center justify-center shadow-md";
  const colorClasses = isMain
    ? 'bg-coral hover:bg-coral/90'
    : width === 1 && height === 1
    ? 'bg-teal hover:bg-teal/90'
    : width > height
    ? 'bg-gold hover:bg-gold/90'
    : 'bg-mid-blue hover:bg-mid-blue/90';

  const selectedClasses = isSelected ? 'ring-4 ring-slate-100 ring-offset-2 ring-offset-dark-blue z-10' : 'shadow-lg';
  
  const gap = '0.5rem';
  const padding = '0.5rem';

  const style = {
    top: `calc(${padding} + ${y} * (${GRID_CELL_SIZE} + ${gap}))`,
    left: `calc(${padding} + ${x} * (${GRID_CELL_SIZE} + ${gap}))`,
    width: `calc(${width} * ${GRID_CELL_SIZE} + (${width - 1}) * ${gap})`,
    height: `calc(${height} * ${GRID_CELL_SIZE} + (${height - 1}) * ${gap})`,
    transitionProperty: 'top, left',
  };

  return (
    <div
      style={style}
      className={`${baseClasses} ${colorClasses} ${selectedClasses}`}
      onClick={() => onSelect(block.id)}
    >
      {letter && (
        <span className="text-5xl lg:text-7xl font-bold text-black/20 select-none pointer-events-none">
          {letter.toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default Block;