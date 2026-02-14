import { useState, useEffect } from 'react';

// Import photos for backgrounds (we can reuse the logic from PhotoGallery or just import.meta.glob here)
const photos2023 = import.meta.glob('/src/assets/photos/2023/*.{png,jpg,jpeg,svg,webp,PNG,JPG,JPEG,SVG,WEBP}', { eager: true, import: 'default' });
const photos2024 = import.meta.glob('/src/assets/photos/2024/*.{png,jpg,jpeg,svg,webp,PNG,JPG,JPEG,SVG,WEBP}', { eager: true, import: 'default' });
const photos2025 = import.meta.glob('/src/assets/photos/2025/*.{png,jpg,jpeg,svg,webp,PNG,JPG,JPEG,SVG,WEBP}', { eager: true, import: 'default' });
const photos2026 = import.meta.glob('/src/assets/photos/2026/*.{png,jpg,jpeg,svg,webp,PNG,JPG,JPEG,SVG,WEBP}', { eager: true, import: 'default' });

const photoCollections = {
    2023: Object.values(photos2023) as string[],
    2024: Object.values(photos2024) as string[],
    2025: Object.values(photos2025) as string[],
    2026: Object.values(photos2026) as string[],
};

const TRANSITION_TEXTS: Record<number, string> = {
    2023: "¿Por qué el primer nivel es el 2023? Porque fue ese el nivel donde fue nuestro primer valentín ya viviendo bajo el mismo techo y siendo mas UNO que antes...",
    2024: "2024, las cosas van en ascenso tanto lo bueno como los \"invaders\" u obstáculos, pero creo que a pesar de todo podemos ver más bendiciones que cosas malas, la lucha continúa...",
    2025: "2025... seguimos luchando y soñando juntos, hemos visto grandes frutos de la perseverancia de ambos en esta relación y tu compañía cada vez me hace más y más fuerte, te amo cada día un poquito más...",
    2026: "2026 llegó, no tenemos demasiado recorrido de este año pero si logramos pegarnos a Dios y ver con sus ojos creo que podemos estar enormemente agradecidos por esto que Dios unió y que no ha parado de dar frutos, gracias por seguir aquí a mi lado mi Peisa te amo, feliz 14 feliz 14 😘..."
};

interface TransitionScreenProps {
    year: number;
    onNext: () => void;
}

export const TransitionScreen = ({ year, onNext }: TransitionScreenProps) => {
    const [bgImage, setBgImage] = useState<string | null>(null);

    useEffect(() => {
        const photos = photoCollections[year as keyof typeof photoCollections] || [];
        if (photos.length > 0) {
            const randomPhoto = photos[Math.floor(Math.random() * photos.length)];
            setBgImage(randomPhoto);
        }
    }, [year]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50 animate-fade-in overflow-hidden">
            {/* Background Image */}
            {bgImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-linear transform scale-100 animate-slow-zoom"
                    style={{ backgroundImage: `url(${bgImage})` }}
                />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div className="scanline crt-effect absolute inset-0 opacity-30 pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl p-8 text-center">
                <h2 className="text-4xl md:text-6xl text-neon-pink font-press-start mb-8 animate-pulse shadow-neon-pink glitch-text">
                    LEVEL {year} CLEARED
                </h2>

                <div className="bg-black/40 p-6 md:p-10 rounded-xl border border-white/10 backdrop-blur-md shadow-2xl transform">
                    <p className="text-white text-lg md:text-2xl font-serif italic leading-relaxed animate-fade-in-slow">
                        "{TRANSITION_TEXTS[year]}"
                    </p>
                </div>

                <button
                    onClick={onNext}
                    className="mt-12 px-8 py-4 bg-neon-cyan text-black font-press-start text-xl hover:bg-white hover:text-neon-cyan transition-all border-4 border-transparent hover:border-white animate-bounce-slow"
                >
                    CONTINUE →
                </button>
            </div>
        </div>
    );
};
