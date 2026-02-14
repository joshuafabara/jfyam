import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
    src: string;
    alt: string;
    index: number;
    onClick: () => void;
}

export const LazyImage = ({ src, alt, index, onClick }: LazyImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const imgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin: '100px', // Start loading 100px before items appear
                threshold: 0.1,
            }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Determine slide direction based on index (even = right, odd = left)
    const translateClass = index % 2 === 0 ? '-translate-x-10' : 'translate-x-10';

    return (
        <div
            ref={imgRef}
            className={`
                relative mb-4 break-inside-avoid cursor-pointer overflow-hidden rounded-lg
                h-52 md:h-auto
                transform transition-all duration-1000 ease-out
                ${isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${translateClass}`}
                border-2 border-pink-500/50 dark:border-neon-pink/50 shadow-lg dark:shadow-[0_0_15px_rgba(255,0,128,0.3)] bg-white dark:bg-black
            `}
            onClick={onClick}
        >
            {/* Blurred low-quality placeholder using the actual image */}
            <div
                className={`absolute inset-0 transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
                style={isVisible ? {
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(20px)',
                    transform: 'scale(1.1)',
                } : undefined}
            >
                {/* Fallback pulse while even the blur hasn't started */}
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
            </div>

            {isVisible && (
                <img
                    src={src}
                    alt={alt}
                    className={`
                        w-full h-full object-cover transition-all duration-700
                        ${isLoaded ? 'blur-0 scale-100' : 'blur-xl scale-110'}
                    `}
                    onLoad={() => setIsLoaded(true)}
                    loading="lazy"
                />
            )}
        </div>
    );
};
