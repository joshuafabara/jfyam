export const GameOverScreen = ({ onRetry }: { onRetry: () => void }) => {
    return (
        <div className="absolute inset-0 bg-white/90 dark:bg-black/80 flex flex-col items-center justify-center z-50 transition-colors duration-300">
            <h2 className="text-4xl text-red-600 dark:text-red-500 font-press-start mb-8">GAME OVER</h2>
            <button
                onClick={onRetry}
                className="px-6 py-3 bg-slate-800 text-white hover:bg-slate-700 dark:bg-white dark:text-black font-press-start dark:hover:bg-gray-200 transition-colors shadow-lg"
            >
                TRY AGAIN
            </button>
        </div>
    );
};
