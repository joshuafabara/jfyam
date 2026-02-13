import { useEffect, useRef, useState, useCallback } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import { GameRenderer } from '../game/renderer';
import { Player, Invader, Bullet, Particle } from '../game/entities';
import { LEVELS, GAME_WIDTH, GAME_HEIGHT, BULLET_SPEED } from '../game/config';
import { useTheme } from '../context/ThemeContext';
import { GameOverScreen } from './GameOverScreen';
import arrowLeft from '../assets/arrow-left.svg';
import arrowRight from '../assets/arrow-right.svg';

interface GameCanvasProps {
    levelIndex: number;
    initialScore: number;
    onWin: (finalScore: number) => void;
}

export const GameCanvas = ({ levelIndex, initialScore, onWin }: GameCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    // Game State Refs (mutable for game loop)
    const playerRef = useRef<Player>(new Player());
    const invadersRef = useRef<Invader[]>([]);
    const bulletsRef = useRef<Bullet[]>([]);
    const particlesRef = useRef<Particle[]>([]);
    const scoreRef = useRef(initialScore);
    const livesRef = useRef(3);
    const levelRef = useRef(LEVELS[levelIndex]);
    const gameOverRef = useRef(false);
    const winRef = useRef(false);
    const lastShotTimeRef = useRef(0);
    const invaderDirectionRef = useRef(1); // 1 = right, -1 = left

    // UI State
    const [lives, setLives] = useState(3);
    const [score, setScore] = useState(initialScore);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isGameOver, setIsGameOver] = useState(false);
    const [showLevelIntro, setShowLevelIntro] = useState(true);

    // Input State
    const keysPressed = useRef<Record<string, boolean>>({});

    // Initialize Level
    const initLevel = useCallback(() => {
        const config = LEVELS[levelIndex];
        levelRef.current = config;
        playerRef.current = new Player();
        bulletsRef.current = [];
        particlesRef.current = [];
        gameOverRef.current = false;
        winRef.current = false;
        setIsGameOver(false);
        livesRef.current = 3;
        setLives(3);
        scoreRef.current = initialScore;
        setScore(initialScore);
        setTimeLeft(30);
        lastShotTimeRef.current = 0;

        // Create Invaders
        const newInvaders: Invader[] = [];
        const startX = (GAME_WIDTH - (config.cols * 40)) / 2;
        for (let r = 0; r < config.rows; r++) {
            for (let c = 0; c < config.cols; c++) {
                newInvaders.push(new Invader(startX + c * 50, 50 + r * 40));
            }
        }
        invadersRef.current = newInvaders;
    }, [levelIndex, initialScore]);

    // Handle Input
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { keysPressed.current[e.code] = true; };
        const handleKeyUp = (e: KeyboardEvent) => { keysPressed.current[e.code] = false; };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Game Loop Update
    const update = (_deltaTime: number) => {
        if (gameOverRef.current || winRef.current || showLevelIntro) return;

        // Player Movement
        if (keysPressed.current['ArrowLeft']) playerRef.current.moveLeft();
        if (keysPressed.current['ArrowRight']) playerRef.current.moveRight();
        if (keysPressed.current['Space']) fireBullet();

        // Invader Movement
        let hitEdge = false;
        const speed = levelRef.current.invaderSpeed * invaderDirectionRef.current;

        invadersRef.current.forEach(inv => {
            inv.x += speed;
            if (inv.x <= 0 || inv.x + inv.width >= GAME_WIDTH) hitEdge = true;
        });

        if (hitEdge) {
            invaderDirectionRef.current *= -1;
            invadersRef.current.forEach(inv => {
                inv.y += levelRef.current.descendSpeed * 20; // Type of "drop"
            });
        }

        // Invader Shooting
        if (Math.random() < levelRef.current.shootRate) {
            const shooter = invadersRef.current[Math.floor(Math.random() * invadersRef.current.length)];
            if (shooter) {
                bulletsRef.current.push(new Bullet(shooter.x + shooter.width / 2, shooter.y + shooter.height, BULLET_SPEED / 2, true));
            }
        }

        // Bullets Update
        bulletsRef.current.forEach(b => b.update());
        bulletsRef.current = bulletsRef.current.filter(b => !b.markedForDeletion);

        // Collision Detection
        bulletsRef.current.forEach(bullet => {
            if (bullet.isEnemy) {
                if (bullet.collidesWith(playerRef.current)) {
                    bullet.markedForDeletion = true;
                    handlePlayerHit();
                }
            } else {
                invadersRef.current.forEach(invader => {
                    if (!invader.markedForDeletion && bullet.collidesWith(invader)) {
                        bullet.markedForDeletion = true;
                        invader.markedForDeletion = true;
                        createExplosion(invader.x, invader.y, '#00ff00');
                        scoreRef.current += 100;
                        setScore(scoreRef.current);
                        // onScoreUpdate call removed to prevent re-render
                    }
                });
            }
        });

        // Cleanup Invaders
        invadersRef.current = invadersRef.current.filter(i => !i.markedForDeletion);

        // Win Condition
        if (invadersRef.current.length === 0) {
            handleWin();
        }

        // Invaders reach bottom
        if (invadersRef.current.some(inv => inv.y + inv.height >= playerRef.current.y)) {
            handleGameOver();
        }

        // Check lives
        if (livesRef.current <= 0) {
            handleGameOver();
        }
    };

    const handlePlayerHit = () => {
        livesRef.current -= 1;
        setLives(livesRef.current);
        createExplosion(playerRef.current.x, playerRef.current.y, '#ff0055');
    };

    const createExplosion = (x: number, y: number, color: string) => {
        for (let i = 0; i < 10; i++) particlesRef.current.push(new Particle(x, y, color));
    };

    const fireBullet = () => {
        const now = Date.now();
        if (now - lastShotTimeRef.current > 400) { // 400ms cooldown
            bulletsRef.current.push(new Bullet(playerRef.current.x + playerRef.current.width / 2 - 4, playerRef.current.y, -BULLET_SPEED, false));
            lastShotTimeRef.current = now;
        }
    };

    const handleGameOver = () => {
        if (gameOverRef.current) return;
        gameOverRef.current = true;
        setIsGameOver(true);
    };

    const handleWin = () => {
        if (winRef.current) return;
        winRef.current = true;
        setTimeout(() => {
            onWin(scoreRef.current);
        }, 1000);
    };

    // Rendering Loop
    const render = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Scale for Retina/HighDPI
        const dpr = window.devicePixelRatio || 1;
        if (canvas.width !== GAME_WIDTH * dpr) {
            canvas.width = GAME_WIDTH * dpr;
            canvas.height = GAME_HEIGHT * dpr;
            ctx.scale(dpr, dpr);
        }

        const renderer = new GameRenderer(ctx, theme);
        renderer.clear();
        renderer.drawStars();

        renderer.drawPlayer(playerRef.current);
        invadersRef.current.forEach(inv => renderer.drawInvader(inv));
        bulletsRef.current.forEach(b => renderer.drawBullet(b));
        particlesRef.current.forEach(p => {
            p.update();
            renderer.drawParticle(p);
        });
        particlesRef.current = particlesRef.current.filter(p => !p.markedForDeletion);
    };

    useGameLoop((dt) => {
        update(dt);
        render();
    }, !isGameOver && !winRef.current);

    // Timer Effect
    useEffect(() => {
        if (showLevelIntro || isGameOver || winRef.current) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleWin();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [showLevelIntro, isGameOver, winRef.current]);

    // Initial Setup
    useEffect(() => {
        initLevel();
        const timeout = setTimeout(() => setShowLevelIntro(false), 2000);
        return () => clearTimeout(timeout);
    }, [initLevel]);

    // Touch Controls
    const handleTouchLeft = () => { playerRef.current.moveLeft(); };
    const handleTouchRight = () => { playerRef.current.moveRight(); };
    const handleTouchFire = () => { fireBullet(); };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden touch-none">
            {/* HUD */}
            <div className="absolute top-0 w-full max-w-[800px] flex justify-between p-4 font-press-start text-neon-green z-20 pointer-events-none">
                <div>SCORE: {score.toString().padStart(4, '0')}</div>
                <div>LEVEL: {levelRef.current.year}</div>
                <div>LIVES: {'♥'.repeat(lives)}</div>
            </div>

            {/* Timer */}
            <div className="absolute top-12 text-white font-press-start z-20 pointer-events-none">
                TIME: {timeLeft}
            </div>

            <div className="relative border-4 border-neon-cyan/30 rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.2)]">
                <canvas
                    ref={canvasRef}
                    style={{ width: GAME_WIDTH, height: GAME_HEIGHT, maxWidth: '100vw', maxHeight: '80vh' }}
                    className="block"
                />
                <div className="scanline crt-effect absolute inset-0 pointer-events-none"></div>

                {showLevelIntro && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-30">
                        <h2 className="text-4xl text-neon-green font-press-start animate-pulse">
                            LEVEL {levelRef.current.year}
                        </h2>
                    </div>
                )}

                {isGameOver && (
                    <GameOverScreen onRetry={initLevel} />
                )}
            </div>

            {/* Mobile Controls */}
            <div className="flex w-full justify-between items-center px-8 py-4 md:hidden mt-4 gap-4 z-40">
                <button
                    className="w-16 h-16 bg-gray-800 rounded-full active:bg-neon-cyan flex items-center justify-center select-none touch-manipulation border-2 border-white/20"
                    onTouchStart={handleTouchLeft}
                    onMouseDown={handleTouchLeft}
                >
                    <img src={arrowLeft} alt="Left" className="w-8 h-8" />
                </button>
                <button
                    className="w-20 h-20 bg-red-600 rounded-full active:bg-red-400 flex items-center justify-center text-white font-bold select-none touch-manipulation border-4 border-red-800 shadow-lg"
                    onTouchStart={handleTouchFire}
                    onClick={handleTouchFire}
                >
                    FIRE
                </button>
                <button
                    className="w-16 h-16 bg-gray-800 rounded-full active:bg-neon-cyan flex items-center justify-center select-none touch-manipulation border-2 border-white/20"
                    onTouchStart={handleTouchRight}
                    onMouseDown={handleTouchRight}
                >
                    <img src={arrowRight} alt="Right" className="w-8 h-8" />
                </button>
            </div>
            <div className="hidden md:block mt-2 text-gray-500 font-press-start text-xs">
                ARROWS TO MOVE • SPACE TO SHOOT
            </div>
        </div>
    );
};
