import React, { useState, useEffect, useCallback } from 'react';
import { BlockType } from './types';
import { INITIAL_LAYOUT, BOARD_WIDTH, BOARD_HEIGHT, WIN_POSITION, MOVE_SOUND_B64 } from './constants';
import Board from './components/Board';
import Instructions from './components/Instructions';
import WinModal from './components/WinModal';
import { useSound } from './hooks/useSound';

const SAVEGAME_KEY = 'keyklot-savegame';

function App() {
  const [blocks, setBlocks] = useState<BlockType[]>(INITIAL_LAYOUT);
  const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [isWin, setIsWin] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSaveSlotFull, setIsSaveSlotFull] = useState<boolean>(false);

  const playMoveSound = useSound(MOVE_SOUND_B64);

  useEffect(() => {
    const savedGame = localStorage.getItem(SAVEGAME_KEY);
    if (savedGame) {
      setIsSaveSlotFull(true);
    }
  }, []);

  const handleReset = () => {
    setBlocks(INITIAL_LAYOUT);
    setSelectedBlockId(null);
    setMoveCount(0);
    setIsWin(false);
    localStorage.removeItem(SAVEGAME_KEY);
    setIsSaveSlotFull(false);
  };

  const handleSaveRestore = () => {
    if (isSaveSlotFull) { // Restore logic
      const savedGameJSON = localStorage.getItem(SAVEGAME_KEY);
      if (savedGameJSON) {
        try {
          const savedGame = JSON.parse(savedGameJSON);
          setBlocks(savedGame.blocks);
          setMoveCount(savedGame.moveCount);
          setSelectedBlockId(null);
          setIsWin(false);
          setIsSaveSlotFull(false); // Change button back to "Save"
        } catch (e) {
          console.error("Failed to parse saved game data", e);
          localStorage.removeItem(SAVEGAME_KEY); // Clear corrupted data
          setIsSaveSlotFull(false);
        }
      }
    } else { // Save logic
      const gameState = {
        blocks: blocks,
        moveCount: moveCount
      };
      localStorage.setItem(SAVEGAME_KEY, JSON.stringify(gameState));
      setIsSaveSlotFull(true); // Change button to "Restore"
    }
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

    if (newX < 0 || newY < 0 || newX + blockToMove.width > BOARD_WIDTH || newY + blockToMove.height > BOARD_HEIGHT) {
      return false;
    }

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

  const attemptMove = useCallback((dx: number, dy: number) => {
    if (!selectedBlockId) return;
    const blockToMove = blocks.find(b => b.id === selectedBlockId);
    
    if (blockToMove && isValidMove(blockToMove, dx, dy)) {
      const newBlocks = blocks.map(b => 
        b.id === selectedBlockId ? { ...b, x: b.x + dx, y: b.y + dy } : b
      );
      setBlocks(newBlocks);
      setMoveCount(prev => prev + 1);
      if (!isMuted) {
        playMoveSound();
      }
      checkWinCondition(newBlocks);
    }
  }, [blocks, selectedBlockId, isMuted, playMoveSound]);

  const handleCellClick = (targetX: number, targetY: number) => {
    if (!selectedBlockId) return;
    const block = blocks.find(b => b.id === selectedBlockId);
    if (!block) return;

    let dx = 0;
    let dy = 0;

    // Check for horizontal move intent. User clicked on the same row(s) as the block.
    if (targetY >= block.y && targetY < block.y + block.height) {
      if (targetX >= block.x + block.width) { // Move right
        dx = 1;
      } else if (targetX < block.x) { // Move left
        dx = -1;
      }
    }
    // Check for vertical move intent. User clicked on the same col(s) as the block.
    else if (targetX >= block.x && targetX < block.x + block.width) {
      if (targetY >= block.y + block.height) { // Move down
        dy = 1;
      } else if (targetY < block.y) { // Move up
        dy = -1;
      }
    }

    if (dx !== 0 || dy !== 0) {
      attemptMove(dx, dy);
    }
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (isWin) return;

    if (selectedBlockId !== null && (event.key === 'Enter' || event.key === 'Escape')) {
      event.preventDefault();
      setSelectedBlockId(null);
      return;
    }

    const key = event.key.toLowerCase();
    const movementKeys = ['w', 'a', 's', 'd'];

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
      
      attemptMove(dx, dy);
      return;
    }

    const blockToSelect = blocks.find(b => b.letter === key);
    if (blockToSelect) {
      event.preventDefault();
      setSelectedBlockId(blockToSelect.id);
    }

  }, [selectedBlockId, blocks, isWin, attemptMove]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const SoundIcon = isMuted 
    ? () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
    )
    : () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
    );

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
            onCellClick={handleCellClick}
          />
          <div className="flex justify-between items-center mt-4">
            <div className="bg-black/20 px-4 py-2 rounded-lg flex items-baseline gap-3">
              <p className="text-lg text-slate-300">MOVES</p>
              <p className="text-3xl font-bold text-slate-100">{moveCount}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="bg-black/20 p-3 rounded-lg transition-colors duration-200 hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-opacity-75"
                aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
              >
                <SoundIcon />
              </button>
              <button
                onClick={handleSaveRestore}
                className="bg-mid-blue hover:bg-mid-blue/90 text-white font-bold py-3 px-5 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mid-blue focus:ring-opacity-75"
              >
                {isSaveSlotFull ? 'Restore' : 'Save'}
              </button>
              <button
                onClick={handleReset}
                className="bg-teal hover:bg-teal/90 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-opacity-75"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <Instructions />

      {isWin && <WinModal moves={moveCount} onPlayAgain={handleReset} />}
    </div>
  );
}

export default App;