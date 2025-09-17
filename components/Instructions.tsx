import React from 'react';

const Instructions: React.FC = () => {
  return (
    <div className="bg-black/20 px-6 py-3 rounded-lg w-full max-w-4xl text-slate-300 mt-8">
      <ul className="flex flex-col md:flex-row justify-center items-center gap-x-6 gap-y-2 text-sm text-center">
        <li>
          <strong>Select:</strong> Click or press letter key.
        </li>
        <li className="hidden md:block text-slate-500">|</li>
        <li>
          <strong>Move:</strong> Use <span className="font-bold text-slate-100">W, A, S, D</span> keys.
        </li>
        <li className="hidden md:block text-slate-500">|</li>
        <li>
          <strong>Goal:</strong> Move the large <span className="font-bold text-coral">2x2 block</span> to the exit.
        </li>
      </ul>
    </div>
  );
};

export default Instructions;