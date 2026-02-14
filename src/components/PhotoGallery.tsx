import { useState, useEffect } from 'react';
import { getRandomVerseIndex, getVerseByIndex } from '../data/bibleVerses';
import { useLanguage } from '../context/LanguageContext';

const photos2023 = import.meta.glob('/src/assets/photos/2023/*.{png,jpg,jpeg,svg,webp,PNG,JPG,JPEG,SVG,WEBP}', { eager: true, import: 'default' });
const photos2024 = import.meta.glob('/src/assets/photos/2024/*.{png,jpg,jpeg,svg,webp,PNG,JPG,JPEG,SVG,WEBP}', { eager: true, import: 'default' });
const photos2025 = import.meta.glob('/src/assets/photos/2025/*.{png,jpg,jpeg,svg,webp,PNG,JPG,JPEG,SVG,WEBP}', { eager: true, import: 'default' });
const photos2026 = import.meta.glob('/src/assets/photos/2026/*.{png,jpg,jpeg,svg,webp,PNG,JPG,JPEG,SVG,WEBP}', { eager: true, import: 'default' });

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
    const [verseIndex, setVerseIndex] = useState<number | null>(null);
    const { language } = useLanguage();

    const photos = photoCollections[year as keyof typeof photoCollections] || [];

    const handlePhotoClick = (photo: string) => {
        setSelectedPhoto(photo);
        setVerseIndex(getRandomVerseIndex());
    };

    const closeLightbox = () => {
        setSelectedPhoto(null);
        setVerseIndex(null);
    };

    // Handle ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        };
        if (selectedPhoto) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedPhoto]);

    const verse = verseIndex !== null ? getVerseByIndex(verseIndex, language) : null;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-slate-100/95 dark:bg-black/90 text-center animate-fade-in z-50 overflow-y-auto transition-colors duration-300">
            <h2 className="text-3xl md:text-5xl text-green-700 dark:text-neon-green mb-8 font-press-start glitch-text">
                LEVEL {year} COMPLETE!
            </h2>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 w-full max-w-5xl">
                {photos.map((photo, index) => (
                    <div
                        key={index}
                        className="mb-4 break-inside-avoid cursor-pointer hover:scale-105 transition-transform duration-300 border-2 border-pink-500/50 dark:border-neon-pink/50 rounded-lg overflow-hidden shadow-lg dark:shadow-[0_0_15px_rgba(255,0,128,0.3)] bg-white dark:bg-black"
                        onClick={() => handlePhotoClick(photo as string)}
                    >
                        <img src={photo as string} alt={`Memory from ${year}`} className="w-full h-auto object-cover" />
                    </div>
                ))}
                {photos.length === 0 && (
                    <div className="text-slate-900 dark:text-white">No photos found for {year}. Add images to src/assets/photos/{year}/</div>
                )}
            </div>

            <button
                onClick={onNext}
                className="mt-12 px-8 py-4 bg-pink-600 dark:bg-neon-pink text-white font-press-start text-xl hover:bg-pink-700 hover:text-white dark:hover:bg-white dark:hover:text-neon-pink transition-colors border-2 border-transparent hover:border-pink-600 dark:hover:border-neon-pink animate-pulse"
            >
                NEXT LEVEL →
            </button>

            {/* Lightbox */}
            {selectedPhoto && (
                <div
                    className="fixed inset-0 bg-slate-50/95 dark:bg-black/95 z-[100] flex flex-col items-center justify-center p-4 animate-fade-in"
                    onClick={closeLightbox}
                >
                    <img
                        src={selectedPhoto}
                        alt="Expanded memory"
                        className="max-h-[60vh] max-w-full rounded-lg border-4 border-slate-900 dark:border-white shadow-2xl dark:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {verse && (
                        <div className="mt-8 max-w-2xl text-center bg-white/80 dark:bg-black/50 p-6 rounded-xl border border-slate-200 dark:border-white/20 backdrop-blur-sm shadow-xl" onClick={(e) => e.stopPropagation()}>
                            <p className="text-xl md:text-2xl text-slate-800 dark:text-white italic font-serif mb-4 leading-relaxed">"{verse.text}"</p>
                            <p className="text-blue-600 dark:text-neon-cyan font-press-start text-sm">— {verse.reference}</p>
                        </div>
                    )}

                    <button
                        className="absolute top-4 right-4 text-slate-900 dark:text-white text-4xl hover:text-pink-600 dark:hover:text-neon-pink"
                        onClick={closeLightbox}
                    >
                        &times;
                    </button>

                    <div className="absolute bottom-4 text-slate-500 dark:text-white/50 font-press-start text-xs">
                        PRESS ESC TO CLOSE
                    </div>
                </div>
            )}
        </div>
    );
};
