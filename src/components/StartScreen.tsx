export const StartScreen = ({ onStart }: { onStart: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-center z-10 relative">
            <h1 className="text-5xl md:text-7xl text-neon-pink font-press-start mb-4 animate-pulse shadow-neon-pink">
                LOVE INVADERS
            </h1>
            <p className="text-neon-green text-sm md:text-xl font-press-start mb-12">
                Joshua & Amel vs The World
            </p>

            <div className="relative mb-16 animate-bounce-slow">
                <svg width="120" height="120" viewBox="0 0 100 100">
                    <path d="M50 85 C50 85 10 55 10 30 C10 15 25 5 40 5 C50 5 50 15 50 15 C50 15 50 5 60 5 C75 5 90 15 90 30 C90 55 50 85 50 85" fill="#ff0055" />
                    <rect x="46" y="25" width="8" height="24" fill="white" />
                    <rect x="38" y="33" width="24" height="8" fill="white" />
                </svg>
                <div className="absolute inset-0 bg-neon-pink blur-xl opacity-30 -z-10 rounded-full"></div>
            </div>

            <button
                onClick={onStart}
                className="px-8 py-4 bg-transparent border-4 border-neon-cyan text-neon-cyan font-press-start text-xl hover:bg-neon-cyan hover:text-black transition-all duration-300 animate-blink"
            >
                PRESS START
            </button>

            <div className="absolute bottom-8 flex justify-between w-full px-8 text-white/50 text-xs font-press-start">
                <span>2023 - 2026</span>
                <span>4 YEARS</span>
            </div>
        </div>
    );
};
