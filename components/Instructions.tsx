import React from 'react';

const Instructions: React.FC = () => {
  return (
    <div className="bg-black/20 p-4 rounded-lg w-full text-slate-300">
      <h3 className="text-lg font-bold text-slate-100 mb-3 text-center">How to Play</h3>
      <ul className="space-y-2 text-sm">
        <li>
          <strong>1. Select a block:</strong> Click on a block or press its corresponding letter key.
        </li>
        <li>
          <strong>2. Move the block:</strong> Use the <span className="font-bold text-slate-100">W, A, S, D</span> keys to move the selected block up, left, down, or right into an empty space.
        </li>
        <li>
          <strong>3. Goal:</strong> Move the large <span className="font-bold text-coral">2x2 block</span> to the exit at the bottom center of the board.
        </li>
      </ul>
    </div>
  );
};

export default Instructions;