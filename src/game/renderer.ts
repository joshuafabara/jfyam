import { Player, Invader, Bullet, Particle } from './entities';
import { GAME_WIDTH, GAME_HEIGHT, BULLET_SIZE } from './config';

export class GameRenderer {
    ctx: CanvasRenderingContext2D;
    theme: 'light' | 'dark';

    constructor(ctx: CanvasRenderingContext2D, theme: 'light' | 'dark') {
        this.ctx = ctx;
        this.theme = theme;
    }

    clear() {
        this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }

    drawPlayer(player: Player) {
        const { x, y, width, height } = player;
        this.ctx.fillStyle = '#ff0055'; // Red heart color

        // Draw heart shape
        this.ctx.beginPath();
        const topCurveHeight = height * 0.3;
        this.ctx.moveTo(x + width / 2, y + height / 5);
        this.ctx.bezierCurveTo(x + width / 2, y, x, y, x, y + topCurveHeight);
        this.ctx.bezierCurveTo(x, y + (height + topCurveHeight) / 2, x + width / 2, y + height, x + width / 2, y + height);
        this.ctx.bezierCurveTo(x + width / 2, y + height, x + width, y + (height + topCurveHeight) / 2, x + width, y + topCurveHeight);
        this.ctx.bezierCurveTo(x + width, y, x + width / 2, y, x + width / 2, y + height / 5);
        this.ctx.fill();

        // Draw Cross
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(x + width / 2 - 2, y + height / 2 - 8, 4, 16); // Vertical
        this.ctx.fillRect(x + width / 2 - 6, y + height / 2 - 4, 12, 4);  // Horizontal
    }

    drawInvader(invader: Invader) {
        const { x, y, width } = invader;
        // Retro alien sprite (simplified 8x8 grid style)
        this.ctx.fillStyle = this.theme === 'dark' ? '#00ffaa' : '#00aa55'; // Neon green or dark green

        // Simple pixel art shape (like space invader)
        const p = width / 8;
        // Eyes
        this.ctx.fillRect(x + 2 * p, y + 2 * p, p, p);
        this.ctx.fillRect(x + 5 * p, y + 2 * p, p, p);
        // Body
        this.ctx.fillRect(x + 2 * p, y + 3 * p, 4 * p, p);
        this.ctx.fillRect(x + p, y + 4 * p, 6 * p, p);
        this.ctx.fillRect(x, y + 5 * p, 8 * p, p);
        // Legs
        this.ctx.fillRect(x, y + 6 * p, p, 2 * p);
        this.ctx.fillRect(x + 7 * p, y + 6 * p, p, 2 * p);
    }

    drawBullet(bullet: Bullet) {
        this.ctx.fillStyle = bullet.isEnemy ? '#aa00ff' : '#ffcc00'; // Purple for enemy, Gold for player
        this.ctx.beginPath();
        this.ctx.arc(bullet.x + BULLET_SIZE / 2, bullet.y + BULLET_SIZE / 2, BULLET_SIZE / 2, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawParticle(particle: Particle) {
        this.ctx.fillStyle = particle.color;
        this.ctx.globalAlpha = particle.life;
        this.ctx.fillRect(particle.x, particle.y, particle.width, particle.height);
        this.ctx.globalAlpha = 1.0;
    }

    drawStars() {
        if (this.theme === 'light') return; // No stars in light mode
        this.ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 3; i++) {
            const x = Math.random() * GAME_WIDTH;
            const y = Math.random() * GAME_HEIGHT;
            this.ctx.globalAlpha = Math.random();
            this.ctx.fillRect(x, y, 2, 2);
        }
        this.ctx.globalAlpha = 1.0;
    }
}
