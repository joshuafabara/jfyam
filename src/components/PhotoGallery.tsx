import { useState } from 'react';
import { getRandomVerse } from '../data/bibleVerses';
import type { BibleVerse } from '../data/bibleVerses';

const photos2023 = import.meta.glob('/src/assets/photos/2023/*.{png,jpg,svg}', { eager: true, import: 'default' });
const photos2024 = import.meta.glob('/src/assets/photos/2024/*.{png,jpg,svg}', { eager: true, import: 'default' });
const photos2025 = import.meta.glob('/src/assets/photos/2025/*.{png,jpg,svg}', { eager: true, import: 'default' });
const photos2026 = import.meta.glob('/src/assets/photos/2026/*.{png,jpg,svg}', { eager: true, import: 'default' });

const photoCollections = {
    2023: Object.values(photos2023),
    2024: Object.values(photos2024),
    2025: Object.values(photos2025),
    2026: Object.values(photos2026),
};

interface PhotoGalleryProps {
    year: number;
    onNext: () => void;
}

export const PhotoGallery = ({ year, onNext }: PhotoGalleryProps) => {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
    const [verse, setVerse] = useState<BibleVerse | null>(null);

    const photos = photoCollections[year as keyof typeof photoCollections] || [];

    const handlePhotoClick = (photo: string) => {
        setSelectedPhoto(photo);
        setVerse(getRandomVerse());
    };

    const closeLightbox = () => {
        setSelectedPhoto(null);
        setVerse(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black/90 text-center animate-fade-in z-50 overflow-y-auto">
            <h2 className="text-3xl md:text-5xl text-neon-green mb-8 font-press-start glitch-text">
                LEVEL {year} COMPLETE!
            </h2>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 w-full max-w-5xl">
                {photos.map((photo, index) => (
                    <div
                        key={index}
                        className="mb-4 break-inside-avoid cursor-pointer hover:scale-105 transition-transform duration-300 border-2 border-neon-pink/50 rounded-lg overflow-hidden shadow-[0_0_15px_rgba(255,0,128,0.3)]"
                        onClick={() => handlePhotoClick(photo as string)}
                    >
                        <img src={photo as string} alt={`Memory from ${year}`} className="w-full h-auto object-cover" />
                    </div>
                ))}
                {photos.length === 0 && (
                    <div className="text-white">No photos found for {year}. Add images to src/assets/photos/{year}/</div>
                )}
            </div>

            <button
                onClick={onNext}
                className="mt-12 px-8 py-4 bg-neon-pink text-white font-press-start text-xl hover:bg-white hover:text-neon-pink transition-colors border-2 border-transparent hover:border-neon-pink animate-pulse"
            >
                NEXT LEVEL →
            </button>

            {/* Lightbox */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center p-4 animate-fade-in"
                    onClick={closeLightbox}
                >
                    <img
                        src={selectedPhoto}
                        alt="Expanded memory"
                        className="max-h-[60vh] max-w-full rounded-lg border-4 border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {verse && (
                        <div className="mt-8 max-w-2xl text-center bg-black/50 p-6 rounded-xl border border-white/20 backdrop-blur-sm" onClick={(e) => e.stopPropagation()}>
                            <p className="text-xl md:text-2xl text-white italic font-serif mb-4 leading-relaxed">"{verse.text}"</p>
                            <p className="text-neon-cyan font-press-start text-sm">— {verse.reference}</p>
                        </div>
                    )}

                    <button
                        className="absolute top-4 right-4 text-white text-4xl hover:text-neon-pink"
                        onClick={closeLightbox}
                    >
                        &times;
                    </button>
                </div>
            )}
        </div>
    );
};
