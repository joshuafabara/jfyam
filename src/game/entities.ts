import { GAME_WIDTH, GAME_HEIGHT, PLAYER_SIZE, INVADER_SIZE, BULLET_SIZE, PLAYER_SPEED } from './config';

export class Entity {
    x: number;
    y: number;
    width: number;
    height: number;
    markedForDeletion: boolean = false;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    collidesWith(other: Entity): boolean {
        return (
            this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y
        );
    }
}

export class Player extends Entity {
    constructor() {
        super(GAME_WIDTH / 2 - PLAYER_SIZE / 2, GAME_HEIGHT - PLAYER_SIZE - 20, PLAYER_SIZE, PLAYER_SIZE);
    }

    moveLeft() {
        this.x = Math.max(0, this.x - PLAYER_SPEED);
    }

    moveRight() {
        this.x = Math.min(GAME_WIDTH - this.width, this.x + PLAYER_SPEED);
    }
}

export class Invader extends Entity {
    originalX: number;
    originalY: number;

    constructor(x: number, y: number) {
        super(x, y, INVADER_SIZE, INVADER_SIZE);
        this.originalX = x;
        this.originalY = y; // For future complex movements
    }
}

export class Bullet extends Entity {
    dy: number;
    isEnemy: boolean;

    constructor(x: number, y: number, dy: number, isEnemy: boolean) {
        super(x, y, BULLET_SIZE, BULLET_SIZE);
        this.dy = dy;
        this.isEnemy = isEnemy;
    }

    update() {
        this.y += this.dy;
        if (this.y < 0 || this.y > GAME_HEIGHT) {
            this.markedForDeletion = true;
        }
    }
}

export class Particle extends Entity {
    vx: number;
    vy: number;
    life: number;
    color: string;

    constructor(x: number, y: number, color: string) {
        super(x, y, 2, 2);
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.life = 1.0;
        this.color = color;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.02;
        if (this.life <= 0) this.markedForDeletion = true;
    }
}
