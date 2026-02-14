const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const SPEED_MULTIPLIER = isMobile ? 1.5 : 1;
const INVADER_SPEED_MULTIPLIER = isMobile ? 3 : 1;
const SHOOT_RATE_MULTIPLIER = isMobile ? 5 : 1;

export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;
export const PLAYER_SIZE = 40;
export const INVADER_SIZE = 30;
export const BULLET_SIZE = 8;
export const PLAYER_SPEED = 5 * SPEED_MULTIPLIER;
export const BULLET_SPEED = 7 * SPEED_MULTIPLIER;

export interface LevelConfig {
    year: number;
    rows: number;
    cols: number;
    invaderSpeed: number;
    shootRate: number; // probability per frame (0-1)
    descendSpeed: number;
}

export const LEVELS: Record<number, LevelConfig> = {
    0: { year: 2023, rows: 3, cols: 6, invaderSpeed: 1 * INVADER_SPEED_MULTIPLIER, shootRate: 0.005 * SHOOT_RATE_MULTIPLIER, descendSpeed: 0.2 * SPEED_MULTIPLIER },
    1: { year: 2024, rows: 4, cols: 7, invaderSpeed: 1.5 * INVADER_SPEED_MULTIPLIER, shootRate: 0.008 * SHOOT_RATE_MULTIPLIER, descendSpeed: 0.3 * SPEED_MULTIPLIER },
    2: { year: 2025, rows: 4, cols: 8, invaderSpeed: 2 * INVADER_SPEED_MULTIPLIER, shootRate: 0.012 * SHOOT_RATE_MULTIPLIER, descendSpeed: 0.4 * SPEED_MULTIPLIER },
    3: { year: 2026, rows: 5, cols: 8, invaderSpeed: 2.5 * INVADER_SPEED_MULTIPLIER, shootRate: 0.015 * SHOOT_RATE_MULTIPLIER, descendSpeed: 0.5 * SPEED_MULTIPLIER },
};

export const TOTAL_LEVELS = 4;
export const FPS = 60;
