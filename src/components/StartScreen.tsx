
import { useState, useEffect, useRef, useCallback } from 'react';
import joshuaImg from '../assets/photos/backgrounds/intro/joshua.png';
import amelImg from '../assets/photos/backgrounds/intro/amel.png';

const CRAWL_TEXT = `Love Invaders es una historia casi real, te enfrentarás versus invasores que quieren dañar y manchar el amor, y si no logras combatirlos a tiempo eliminando al menos al 80% de ellos el timer en rojo te dirá que el amor corre peligro de morir pero tranqui siempre hay una nueva oportunidad, persistirás hasta lograr que el amor gane o dejarás que los invasores lo destruyan, el uno se tiene al otro y en el centro a Cristo... Tienes todo lo que necesitas ?... Vamos a jugar 👾❤️💪🏽`;

const StarWarsCrawl = ({ onClose }: { onClose: () => void }) => {
    const scrollRef = useRef(0);
    const autoSpeed = useRef(0.5); // pixels per frame
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number>(0);

    const animate = useCallback(() => {
        scrollRef.current += autoSpeed.current;
        if (textRef.current) {
            textRef.current.style.transform = `translateY(${-scrollRef.current}px)`;
        }
        rafRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [animate]);

    // Keyboard close
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    // Mouse wheel to scroll faster
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            scrollRef.current += e.deltaY * 0.5;
        };
        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => el.removeEventListener('wheel', handleWheel);
    }, []);

    // Touch to scroll faster
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        let lastY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            lastY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const currentY = e.touches[0].clientY;
            const delta = lastY - currentY;
            scrollRef.current += delta * 1.2;
            lastY = currentY;
        };
        el.addEventListener('touchstart', handleTouchStart, { passive: true });
        el.addEventListener('touchmove', handleTouchMove, { passive: false });
        return () => {
            el.removeEventListener('touchstart', handleTouchStart);
            el.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-end overflow-hidden"
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-yellow-400 text-4xl hover:text-white z-[210] font-sans"
            >
                &times;
            </button>

            {/* Star field background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 80 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: `${Math.random() * 2 + 1}px`,
                            height: `${Math.random() * 2 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.7 + 0.3,
                        }}
                    />
                ))}
            </div>

            {/* Perspective container */}
            <div
                className="w-full h-full flex items-end justify-center"
                style={{ perspective: '350px' }}
            >
                <div
                    className="w-full max-w-2xl text-center px-6 pb-0"
                    style={{
                        transformOrigin: '50% 100%',
                        transform: 'rotateX(25deg)',
                    }}
                >
                    {/* Scrolling text */}
                    <div
                        ref={textRef}
                        className="font-serif italic text-yellow-400 text-lg md:text-2xl leading-relaxed"
                        style={{ paddingTop: '100vh' }}
                    >
                        <h2 className="font-press-start text-2xl md:text-4xl not-italic mb-12 text-yellow-300">
                            LOVE INVADERS
                        </h2>
                        <p className="mb-8">{CRAWL_TEXT}</p>
                    </div>
                </div>
            </div>

            {/* Bottom fade gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-[205]" />
            {/* Top fade gradient */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-[205]" />
        </div>
    );
};

export const StartScreen = ({ onStart }: { onStart: () => void }) => {
    const [showCrawl, setShowCrawl] = useState(false);

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
                <div className="relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] animate-float-slow z-10">
                    {/* Border Layer (On Top) */}
                    <div className="absolute inset-0 rounded-full border-4 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] z-20 pointer-events-none"></div>

                    {/* Image Layer (Masked) */}
                    <div className="w-full h-full rounded-full overflow-hidden" style={{ WebkitMaskImage: 'radial-gradient(circle, white 100%, black 100%)', maskImage: 'radial-gradient(circle, white 100%, black 100%)' }}>
                        <img src={joshuaImg} alt="Joshua" className="w-full h-full object-cover filter blur-[0.5px] contrast-125 brightness-110" />
                        <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay"></div>
                        <div className="scanline absolute inset-0 opacity-50 pointer-events-none"></div>
                    </div>
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
                <div className="relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] animate-float-slow-delay z-10">
                    {/* Border Layer (On Top) */}
                    <div className="absolute inset-0 rounded-full border-4 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.5)] z-20 pointer-events-none"></div>

                    {/* Image Layer (Masked) */}
                    <div className="w-full h-full rounded-full overflow-hidden" style={{ WebkitMaskImage: 'radial-gradient(circle, white 100%, black 100%)', maskImage: 'radial-gradient(circle, white 100%, black 100%)' }}>
                        <img src={amelImg} alt="Amel" className="w-full h-full object-cover filter blur-[0.5px] contrast-125 brightness-110" />
                        <div className="absolute inset-0 bg-pink-500/20 mix-blend-overlay"></div>
                        <div className="scanline absolute inset-0 opacity-50 pointer-events-none"></div>
                    </div>
                </div>
            </div>

            <button
                onClick={onStart}
                className="px-8 py-4 bg-transparent border-4 border-blue-600 dark:border-neon-cyan text-blue-600 dark:text-neon-cyan font-press-start text-xl hover:bg-blue-600 hover:text-white dark:hover:bg-neon-cyan dark:hover:text-black transition-all duration-300 animate-blink z-20 relative"
            >
                PRESS START
            </button>

            {/* Info button */}
            <button
                onClick={() => setShowCrawl(true)}
                className="mt-6 w-10 h-10 rounded-full border-2 border-slate-400 dark:border-white/40 text-slate-500 dark:text-white/60 font-serif italic text-lg hover:border-pink-500 dark:hover:border-neon-pink hover:text-pink-500 dark:hover:text-neon-pink transition-colors z-20 relative flex items-center justify-center"
                title="Game Info"
            >
                i
            </button>

            <div className="absolute bottom-8 flex justify-between w-full px-8 text-slate-500 dark:text-white/50 text-xs font-press-start z-20">
                <span>2023 - 2026</span>
                <span>4 YEARS</span>
            </div>

            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20 z-0">
                <div className="scanline crt-effect w-full h-full"></div>
            </div>

            {/* Star Wars crawl modal */}
            {showCrawl && <StarWarsCrawl onClose={() => setShowCrawl(false)} />}
        </div>
    );
};
