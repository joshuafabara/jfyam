
import joshuaImg from '../assets/photos/backgrounds/intro/joshua.png';
import amelImg from '../assets/photos/backgrounds/intro/amel.png';

export const StartScreen = ({ onStart }: { onStart: () => void }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-black text-center z-10 relative transition-colors duration-300 overflow-hidden">
            <h1 className="text-4xl md:text-7xl text-pink-600 dark:text-neon-pink font-press-start mb-4 animate-pulse dark:shadow-neon-pink z-20 relative">
                LOVE INVADERS
            </h1>
            <p className="text-green-700 dark:text-neon-green text-xs md:text-xl font-press-start mb-12 z-20 relative">
                Joshua & Amel vs The World
            </p>

            <div className="relative mb-16 flex items-center justify-center gap-4 md:gap-12 w-full max-w-4xl z-20">
                {/* Joshua Image (Left) */}
                <div className="relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full overflow-hidden border-4 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-float-slow">
                    <img src={joshuaImg} alt="Joshua" className="w-full h-full object-cover filter blur-[0.5px] contrast-125 brightness-110" />
                    <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay"></div>
                    <div className="scanline absolute inset-0 opacity-50 pointer-events-none"></div>
                </div>

                {/* Central Heart Icon */}
                <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] shrink-0 animate-bounce-slow">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                        <path d="M50 85 C50 85 10 55 10 30 C10 15 25 5 40 5 C50 5 50 15 50 15 C50 15 50 5 60 5 C75 5 90 15 90 30 C90 55 50 85 50 85" fill="#ff0055" />
                        <rect x="46" y="25" width="8" height="24" fill="white" />
                        <rect x="38" y="33" width="24" height="8" fill="white" />
                    </svg>
                    <div className="absolute inset-0 bg-pink-500 dark:bg-neon-pink blur-xl opacity-30 -z-10 rounded-full"></div>
                </div>

                {/* Amel Image (Right) */}
                <div className="relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full overflow-hidden border-4 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.5)] animate-float-slow-delay">
                    <img src={amelImg} alt="Amel" className="w-full h-full object-cover filter blur-[0.5px] contrast-125 brightness-110" />
                    <div className="absolute inset-0 bg-pink-500/20 mix-blend-overlay"></div>
                    <div className="scanline absolute inset-0 opacity-50 pointer-events-none"></div>
                </div>
            </div>

            <button
                onClick={onStart}
                className="px-8 py-4 bg-transparent border-4 border-blue-600 dark:border-neon-cyan text-blue-600 dark:text-neon-cyan font-press-start text-xl hover:bg-blue-600 hover:text-white dark:hover:bg-neon-cyan dark:hover:text-black transition-all duration-300 animate-blink z-20 relative"
            >
                PRESS START
            </button>

            <div className="absolute bottom-8 flex justify-between w-full px-8 text-slate-500 dark:text-white/50 text-xs font-press-start z-20">
                <span>2023 - 2026</span>
                <span>4 YEARS</span>
            </div>

            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20 z-0">
                <div className="scanline crt-effect w-full h-full"></div>
            </div>
        </div>
    );
};
