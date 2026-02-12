import { useEffect, useRef, useState } from 'react';

const FeaturedBrands = () => {
    const brands = [
        { name: 'Aptamil', logo: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202506/Aptamil-200x120162752095832.png' },
        { name: 'Bobby', logo: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202506/Bobby-200x120134528095719.png' },
        { name: 'Huggies', logo: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202508/logo naturemade211315231402.png' },
        { name: 'PediaSure', logo: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202508/PediaSure-200x120-1140342231711.png' },
        { name: 'Optimum', logo: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202602/logo-optimum-new_0103116103519.webp' },
        { name: 'Dayper', logo: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202601/icon logo094248223220.png' },
        { name: 'Molfix', logo: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202507/logo-molfix-199x120212519145807.png' },
        { name: 'Friso', logo: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202507/Friso-200x120212127145623.png' },
        { name: 'Dutch Lady', logo: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202511/Vector Smart Object 2000027.png' },
    ];

    const groupedBrands = [];
    for (let i = 0; i < brands.length; i += 2) {
        groupedBrands.push(brands.slice(i, i + 2));
    }

    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-scroll logic
    useEffect(() => {
        const interval = setInterval(() => {
            if (scrollRef.current) {
                const container = scrollRef.current;
                const itemWidth = container.offsetWidth / 3; // Seeing 3 items at a time usually

                // If we are at the end, scroll back to start
                if (Math.ceil(container.scrollLeft + container.offsetWidth) >= container.scrollWidth) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                    setActiveIndex(0);
                } else {
                    container.scrollBy({ left: itemWidth, behavior: 'smooth' });
                    setActiveIndex(prev => (prev + 1));
                }
            }
        }, 3000); // 3 seconds per slide

        return () => clearInterval(interval);
    }, []);

    // Calculate number of "pages" roughly for dots
    // total items = groupedBrands.length
    // visible = 3
    // pages = ceil(items / 3) roughly, or just number of scrolls?
    // Let's just use 2 dots as per original UI for simplicity unless logic demands more.
    // The original UI hardcoded 2 dots. With 5 items and 3 visible, there's basically "start" and "end" (scroll 0, scroll max).
    // Or maybe 3 states: 0-2, 1-3, 2-4.

    return (
        <>
            <div className="mt-4 overflow-hidden rounded-[16px] bg-white px-[15px] pb-[22px] shadow-sm ring-1 ring-slate-100 dark:bg-card-dark dark:ring-0">
                <div className="mb-[16px]">
                    <h2 className="rounded-bl-[20px] rounded-br-[20px] bg-gradient-to-t from-[#FD47AB] to-[#F55D8D] px-[4px] py-[12px] text-center text-[16px] font-bold text-white">
                        Top thương hiệu yêu thích
                    </h2>
                </div>

                <div className="relative mx-auto w-full overflow-hidden">
                    <div
                        ref={scrollRef}
                        className="flex w-full overflow-x-auto snap-x hide-scrollbar pb-4 gap-0"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {groupedBrands.map((group, index) => (
                            <div key={index} className="flex-none w-1/3 min-w-[33.33%] snap-start px-1">
                                <div className="flex flex-col gap-2">
                                    {group.map((brand, idx) => (
                                        <a
                                            key={idx}
                                            href="#"
                                            className="block w-full rounded-[8px] border border-slate-100 bg-white p-[4px] transition hover:border-pink-200 hover:shadow-sm"
                                        >
                                            <div className="relative h-[34px] w-full overflow-hidden rounded bg-white flex items-center justify-center">
                                                <img
                                                    src={brand.logo}
                                                    alt={brand.name}
                                                    className="h-full w-full object-contain"
                                                />
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-center space-x-1 mt-2">
                        {/* Simple static dots for now or dynamic if preferred */}
                        <div className={`h-1.5 w-3 rounded-full ${activeIndex === 0 ? 'bg-[#e82e81]' : 'bg-gray-300'}`}></div>
                        <div className={`h-1.5 w-1.5 rounded-full ${activeIndex > 0 ? 'bg-[#e82e81]' : 'bg-gray-300'}`}></div>
                    </div>
                </div>


            </div>
            <div className="mt-4 overflow-hidden rounded-[16px] bg-white px-[15px] pb-[22px] shadow-sm ring-1 ring-slate-100 dark:bg-card-dark dark:ring-0">
                <div className="mt-2 border-t border-dashed border-gray-100 pt-3 text-center">

                    <div className="mb-2 flex items-center justify-center">
                        <i className="icon-store"></i>
                        <span className="ml-[8px] text-[16px] font-[700] leading-[22px] text-primary-500">
                            8:00 - 21:30
                        </span>
                    </div>

                    <a href="tel:1900866874" className="flex items-center justify-center">
                        <i className="icon-hometel"></i>
                        <span className="ml-[8px] text-[16px] font-[700] leading-[22px] text-primary-500">
                            1900.866.874
                        </span>
                    </a>

                </div>
            </div>

        </>

    );
};

export default FeaturedBrands;
