export const GameOverScreen = ({ onRetry }: { onRetry: () => void }) => {
    return (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
            <h2 className="text-4xl text-red-500 font-press-start mb-8">GAME OVER</h2>
            <button
                onClick={onRetry}
                className="px-6 py-3 bg-white text-black font-press-start hover:bg-gray-200"
            >
                TRY AGAIN
            </button>
        </div>
    );
};
