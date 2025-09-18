import React from 'react';
import { BlockType } from '../types';
import { GRID_CELL_SIZE } from '../constants';

interface BlockProps {
  block: BlockType;
  isSelected: boolean;
  isJustMoved: boolean;
  onSelect: (id: number) => void;
}

const Block: React.FC<BlockProps> = ({ block, isSelected, isJustMoved, onSelect }) => {
  const { x, y, width, height, isMain, letter } = block;

  const baseClasses = "absolute rounded-md cursor-pointer transition-all duration-200 ease-in-out flex items-end justify-end p-2 shadow-md hover:brightness-95";
  const colorClasses = isMain
    ? 'bg-theme-accent'
    : width === 1 && height === 1
    ? 'bg-theme-secondary'
    : width > height
    ? 'bg-theme-primary'
    : 'bg-theme-neutral';

  const selectedClasses = isSelected ? 'ring-4 ring-slate-100 ring-offset-2 ring-offset-theme-bg z-10' : 'shadow-lg';
  const animationClass = isJustMoved ? 'animate-move-success' : '';
  
  const gap = '0.5rem';
  const padding = '0.5rem';

  const style = {
    top: `calc(${padding} + ${y} * ${GRID_CELL_SIZE} + ${y} * ${gap})`,
    left: `calc(${padding} + ${x} * ${GRID_CELL_SIZE} + ${x} * ${gap})`,
    width: `calc(${width} * ${GRID_CELL_SIZE} + (${width} - 1) * ${gap})`,
    height: `calc(${height} * ${GRID_CELL_SIZE} + (${height} - 1) * ${gap})`,
    transitionProperty: 'top, left',
  };

  return (
    <div
      style={style}
      className={`${baseClasses} ${colorClasses} ${selectedClasses} ${animationClass}`}
      onClick={(e) => {
        e.stopPropagation(); // Prevent click from bubbling to the board
        onSelect(block.id);
      }}
    >
      {letter && (
        <span className="text-5xl lg:text-7xl font-bold text-black/20 select-none pointer-events-none leading-none">
          {letter.toUpperCase()}
        </span>
      )}
    </div>
  );
};

export default Block;