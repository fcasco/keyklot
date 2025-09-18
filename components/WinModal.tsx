import React from 'react';

interface WinModalProps {
  moves: number;
  onPlayAgain: () => void;
}

const WinModal: React.FC<WinModalProps> = ({ moves, onPlayAgain }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-theme-neutral rounded-xl p-8 text-center shadow-2xl border border-theme-bg animate-fade-in-up">
        <h2 className="text-4xl font-bold text-theme-primary mb-2">Congratulations!</h2>
        <p className="text-slate-200 text-lg mb-4">You solved the puzzle!</p>
        <div className="bg-theme-bg rounded-lg p-4 mb-6">
          <p className="text-theme-text-muted">Total Moves</p>
          <p className="text-5xl font-bold text-theme-text">{moves}</p>
        </div>
        <button
          onClick={onPlayAgain}
          className="w-full bg-theme-primary hover:brightness-95 text-theme-text-dark font-bold py-3 px-6 rounded-lg transition-colors duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-opacity-75"
        >
          Play Again
        </button>
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default WinModal;