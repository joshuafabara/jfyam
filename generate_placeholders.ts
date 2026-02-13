import fs from 'fs';
import path from 'path';

const years = ['2023', '2024', '2025', '2026'];
const baseDir = 'src/assets/photos';

const colors = ['#ff0055', '#00ff99', '#00ccff', '#ffcc00', '#9900ff'];

years.forEach(year => {
    const yearDir = path.join(baseDir, year);
    if (!fs.existsSync(yearDir)) fs.mkdirSync(yearDir, { recursive: true });

    for (let i = 1; i <= 10; i++) {
        // Random dimensions (width fixed for masonry usually, but height varies)
        // In masonry, width is column width. Height is variable.
        // We'll make them 400px wide and 200-600px tall.
        const width = 400;
        const height = Math.floor(Math.random() * 400) + 200;
        const color = colors[Math.floor(Math.random() * colors.length)];

        const svgContent = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${color}" fill-opacity="0.2"/>
  <rect x="2" y="2" width="${width - 4}" height="${height - 4}" fill="none" stroke="${color}" stroke-width="4"/>
  <text x="50%" y="50%" font-family="monospace" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">
    ${year} - #${i}
    (${width}x${height})
  </text>
</svg>`;

        fs.writeFileSync(path.join(yearDir, `${i}.svg`), svgContent.trim());
    }
});

console.log('Generated 40 random placeholder SVGs.');
