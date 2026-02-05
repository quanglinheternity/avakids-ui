import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

interface Banner {
    id: number;
    imageUrl: string;
}

const SWIPE_DISTANCE = 50;
const AUTO_SLIDE_INTERVAL = 3000;

const TopBanner: React.FC = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isDragging, setIsDragging] = useState(false);

    const startXRef = useRef<number | null>(null);
    const currentXRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    /* ================= FETCH DATA ================= */
    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await axios.get<Banner[]>('https://api.example.com/banners');
                setBanners(res.data);
            } catch {
                setBanners([
                    {
                        id: 1,
                        imageUrl:
                            'https://img.tgdd.vn/imgt/ecom/f_webp,quality_95/https://cdnv2.tgdd.vn/mwg-static/common/Banner/4d/da/4ddabce1eec7519f628d278c01a65af4.png',
                    },
                    {
                        id: 2,
                        imageUrl:
                            'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/mwg-static/common/Banner/5e/91/5e91f34164b6f747c389883f4932f892.png',
                    },
                    {
                        id: 3,
                        imageUrl:
                            'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/mwg-static/common/Banner/40/fe/40fea0190af00139cbb30628bbd0532c.png',
                    },
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBanners();
    }, []);

    /* ================= SLIDE CONTROL ================= */
    const goToNext = useCallback(() => {
        setCurrentIndex((i) => (i + 1) % banners.length);
    }, [banners.length]);

    const goToPrev = useCallback(() => {
        setCurrentIndex((i) => (i === 0 ? banners.length - 1 : i - 1));
    }, [banners.length]);

    /* ================= AUTO SLIDE ================= */
    useEffect(() => {
        if (banners.length <= 1 || isDragging) return;

        const timer = setInterval(goToNext, AUTO_SLIDE_INTERVAL);
        return () => clearInterval(timer);
    }, [banners.length, isDragging, goToNext]);

    /* ================= SWIPE HANDLERS ================= */
    const startDrag = (x: number) => {
        startXRef.current = x;
        currentXRef.current = x;
        setIsDragging(true);
    };

    const moveDrag = (x: number) => {
        if (!isDragging) return;
        currentXRef.current = x;
    };

    const endDrag = () => {
        if (!startXRef.current || !currentXRef.current) return;

        const distance = startXRef.current - currentXRef.current;

        if (distance > SWIPE_DISTANCE) goToNext();
        else if (distance < -SWIPE_DISTANCE) goToPrev();

        startXRef.current = null;
        currentXRef.current = null;
        setIsDragging(false);
    };

    /* ================= TRANSFORM ================= */
    const getTransform = () => {
        const base = -currentIndex * 100;
        if (!isDragging || !startXRef.current || !currentXRef.current) {
            return `translateX(${base}%)`;
        }

        const deltaPx = currentXRef.current - startXRef.current;
        return `translateX(calc(${base}% + ${deltaPx}px))`;
    };

    /* ================= RENDER ================= */
    if (isLoading) {
        return <div className="h-11 animate-pulse bg-gray-300" />;
    }

    if (!banners.length) return null;

    return (
        <div className="relative h-11 overflow-hidden bg-[#ebfafd] select-none">
            <div
                ref={containerRef}
                className="flex h-full"
                style={{
                    transform: getTransform(),
                    transition: isDragging ? 'none' : 'transform 0.3s ease',
                }}
                onTouchStart={(e) => startDrag(e.touches[0].clientX)}
                onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
                onTouchEnd={endDrag}
                onMouseDown={(e) => startDrag(e.clientX)}
                onMouseMove={(e) => moveDrag(e.clientX)}
                onMouseUp={endDrag}
                onMouseLeave={endDrag}
            >
                {banners.map((b) => (
                    <img
                        key={b.id}
                        src={b.imageUrl}
                        className="h-full w-full shrink-0 object-cover"
                        draggable={false}
                    />
                ))}
            </div>

            {banners.length > 1 && (
                <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-1">
                    {banners.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`size-1.5 rounded-full ${
                                i === currentIndex ? 'scale-110 bg-blue-600' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TopBanner;
