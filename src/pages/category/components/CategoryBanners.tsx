import { useState, useEffect } from 'react';

const CategoryBanners = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const banners = [
        { id: 1, image: 'https://cdnv2.tgdd.vn/pim/cdn/images/202512/BANNER NH DES 592x210231307.png', alt: 'Enfa' },
        { id: 2, image: 'https://cdnv2.tgdd.vn/pim/cdn/images/202602/BANNER NH DES 592x210141923.png', alt: 'Pediasure' },
        { id: 3, image: 'https://cdnv2.tgdd.vn/pim/cdn/images/202512/BANNER NH DES 592x210231406.png', alt: 'Friso' },
        { id: 4, image: 'https://cdnv2.tgdd.vn/pim/cdn/images/202512/BANNER NH DES 592x210231743.png', alt: 'A2' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % (banners.length / 2));
        }, 5000);
        return () => clearInterval(timer);
    }, [banners.length]);

    return (
        <section className="overflow-hidden py-6">
            <div className="relative mx-auto w-full max-w-[1200px]">
                <div className="overflow-hidden">
                    <div
                        className="flex transition-transform duration-700 ease-in-out gap-4"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {banners.map((banner) => (
                            <div
                                key={banner.id}
                                className="flex-none w-[calc(50%-8px)] sm:w-[calc(50%-8px)]"
                            >
                                <a href="#" className="block overflow-hidden rounded-[20px]">
                                    <img
                                        src={banner.image}
                                        alt={banner.alt}
                                        className="h-auto w-full object-contain transition-opacity duration-300 hover:opacity-90"
                                        style={{ aspectRatio: '592/210' }}
                                    />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows (Simplified) */}
                <button
                    onClick={() => setCurrentSlide((prev) => (prev - 1 + (banners.length / 2)) % (banners.length / 2))}
                    className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 shadow-md transition-all hover:bg-white z-10"
                >
                    <i className="border-r-2 border-t-2 border-pink-500 h-2.5 w-2.5 rotate-[225deg] ml-1"></i>
                </button>
                <button
                    onClick={() => setCurrentSlide((prev) => (prev + 1) % (banners.length / 2))}
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 shadow-md transition-all hover:bg-white z-10"
                >
                    <i className="border-r-2 border-t-2 border-pink-500 h-2.5 w-2.5 rotate-[45deg] mr-1"></i>
                </button>
            </div>
        </section>
    );
};

export default CategoryBanners;
