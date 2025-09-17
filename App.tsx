import React, { useState, useEffect, useCallback } from 'react';
import { BlockType } from './types';
import { INITIAL_LAYOUT, BOARD_WIDTH, BOARD_HEIGHT, WIN_POSITION } from './constants';
import Board from './components/Board';
import Instructions from './components/Instructions';
import WinModal from './components/WinModal';

function App() {
  const [blocks, setBlocks] = useState<BlockType[]>(INITIAL_LAYOUT);
  const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [isWin, setIsWin] = useState<boolean>(false);

  const handleReset = () => {
    setBlocks(INITIAL_LAYOUT);
    setSelectedBlockId(null);
    setMoveCount(0);
    setIsWin(false);
  };

  const checkWinCondition = (currentBlocks: BlockType[]) => {
    const mainBlock = currentBlocks.find(b => b.isMain);
    if (mainBlock && mainBlock.x === WIN_POSITION.x && mainBlock.y === WIN_POSITION.y) {
      setIsWin(true);
    }
  };

  const isValidMove = (blockToMove: BlockType, dx: number, dy: number): boolean => {
    const newX = blockToMove.x + dx;
    const newY = blockToMove.y + dy;

    // Check board boundaries
    if (newX < 0 || newY < 0 || newX + blockToMove.width > BOARD_WIDTH || newY + blockToMove.height > BOARD_HEIGHT) {
      return false;
    }

    // Check for collisions with other blocks
    for (const otherBlock of blocks) {
      if (otherBlock.id === blockToMove.id) continue;

      const isColliding = 
        newX < otherBlock.x + otherBlock.width &&
        newX + blockToMove.width > otherBlock.x &&
        newY < otherBlock.y + otherBlock.height &&
        newY + blockToMove.height > otherBlock.y;
      
      if (isColliding) {
        return false;
      }
    }

    return true;
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (isWin) return;

    const key = event.key.toLowerCase();
    const movementKeys = ['w', 'a', 's', 'd'];

    // Handle block movement if a block is selected and a movement key is pressed
    if (selectedBlockId && movementKeys.includes(key)) {
      event.preventDefault();
      
      let dx = 0;
      let dy = 0;

      switch (key) {
        case 'w': dy = -1; break;
        case 'a': dx = -1; break;
        case 's': dy = 1; break;
        case 'd': dx = 1; break;
      }
      
      const blockToMove = blocks.find(b => b.id === selectedBlockId);
      if (blockToMove && isValidMove(blockToMove, dx, dy)) {
        const newBlocks = blocks.map(b => 
          b.id === selectedBlockId ? { ...b, x: b.x + dx, y: b.y + dy } : b
        );
        setBlocks(newBlocks);
        setMoveCount(prev => prev + 1);
        checkWinCondition(newBlocks);
      }
      return; // Stop further execution
    }

    // Handle block selection if a letter key is pressed
    const blockToSelect = blocks.find(b => b.letter === key);
    if (blockToSelect) {
      event.preventDefault();
      setSelectedBlockId(blockToSelect.id);
    }

  }, [selectedBlockId, blocks, isWin]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-4 md:p-8">
      <div className="flex flex-col items-center">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-gold tracking-wider">KEYKLOT</h1>
          <p className="text-slate-300 mt-2">Move the main block to the exit at the bottom.</p>
        </div>

        <div>
          <Board 
            blocks={blocks}
            selectedBlockId={selectedBlockId}
            onBlockSelect={setSelectedBlockId}
          />
          <div className="flex justify-between items-center mt-4">
            <div className="bg-black/20 px-4 py-2 rounded-lg flex items-baseline gap-3">
              <p className="text-lg text-slate-300">MOVES</p>
              <p className="text-3xl font-bold text-slate-100">{moveCount}</p>
            </div>
            <button
              onClick={handleReset}
              className="bg-teal hover:bg-teal/90 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-opacity-75"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      
      <Instructions />

      {isWin && <WinModal moves={moveCount} onPlayAgain={handleReset} />}
    </div>
  );
}

export default App;