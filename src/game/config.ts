export const GAME_WIDTH = 800;
export const GAME_HEIGHT = 600;
export const PLAYER_SIZE = 40;
export const INVADER_SIZE = 30;
export const BULLET_SIZE = 8;
export const PLAYER_SPEED = 5;
export const BULLET_SPEED = 7;

export interface LevelConfig {
    year: number;
    rows: number;
    cols: number;
    invaderSpeed: number;
    shootRate: number; // probability per frame (0-1)
    descendSpeed: number;
}

export const LEVELS: Record<number, LevelConfig> = {
    0: { year: 2023, rows: 3, cols: 6, invaderSpeed: 1, shootRate: 0.005, descendSpeed: 0.2 },
    1: { year: 2024, rows: 4, cols: 7, invaderSpeed: 1.5, shootRate: 0.008, descendSpeed: 0.3 },
    2: { year: 2025, rows: 4, cols: 8, invaderSpeed: 2, shootRate: 0.012, descendSpeed: 0.4 },
    3: { year: 2026, rows: 5, cols: 8, invaderSpeed: 2.5, shootRate: 0.015, descendSpeed: 0.5 },
};

export const TOTAL_LEVELS = 4;
export const FPS = 60;
