import { useRef, useState } from 'react';
import ProductCard from './ProductCard';

const FlashSaleSection = () => {
    const [activeTab, setActiveTab] = useState<'ongoing' | 'upcoming'>('ongoing');
    const carouselRef = useRef<HTMLDivElement>(null);

    const products = [
        {
            id: 1,
            name: 'Thùng 48 hộp sữa non pha sẵn ColosBaby Gold',
            originalPrice: '555.000đ',
            salePrice: '471.700đ',
            discount: '-15%',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzwY1pZtfsXLffHpZHqO2eH9t8zfu-Tqppse6-ojd-es6PHGbdENQRXav8CrCwbopxDjOCRNYWWhK4GUre4OYNoTlhN3T2RWsQkkmQogJsJuE69v-Dsm4O8mKj4rx7KjdKe85htLMDaHPLDRFA5e_rgQUEeVgzms0wI1KmaNm9AFQbIUk6_oTST_g9DMkEBGq158WyPhCilXCACDUCdkxpvdBvx8cpCBhvS25Wut94Wu4DeBxgrlCOWw6uj5a2YN5T2Qm7ySSV6E5x',
            remaining: 30,
            total: 30,
            tags: ['110 ml', 'Từ 1 tuổi'],
        },
        {
            id: 2,
            name: 'Thùng 48 hộp sữa non pha sẵn ColosBaby IQ',
            originalPrice: '850.000đ',
            salePrice: '722.500đ',
            discount: '-15%',
            image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtSYveN_WdXzDrw9IxaTXv0HiljX1Cy-y_RTIayQsZrWD7kKf1pDza5oMAscDHDfmSSUElNkniGhFDP22PP6jsWCJpht-y7rS944FngLM8d19hxrmrDbAkqxiXLUGrWNi7Xat9jaw5NjnrRsIThf4nHfTNPa02cXkP9ngZ7-GS2mBwUU993FZALex7avQIdqxupvAha5WE2A17lAjLUgv2v30aGFZ-1tEC_KuW8Qclip0YSEVLMnPp_0KXzv7H-xPcHfPA_AQ0KsR-',
            remaining: 30,
            total: 30,
            tags: ['180ml', 'Từ 1 tuổi'],
        },
        {
            id: 3,
            name: 'Áo dài bé gái Lullaby cotton đỏ - trắng',
            originalPrice: '349.000đ',
            salePrice: '150.000đ',
            discount: '-57%',
            image: 'https://salt.tikicdn.com/cache/750x750/ts/product/51/7e/99/8d3e3a3e3b3b3c3c3c3c3c3c3c3c3c3c.jpg',
            remaining: 3,
            total: 5,
            tags: ['18 - 24 tháng'],
        },
        {
            id: 4,
            name: 'Thùng 24 túi sữa chua uống tiệt trùng LiF Kun',
            originalPrice: '127.000đ',
            salePrice: '107.900đ',
            discount: '-15%',
            image: 'https://salt.tikicdn.com/cache/750x750/ts/product/2d/8e/99/8d3e3a3e3b3b3c3c3c3c3c3c3c3c3c3c.jpg',
            remaining: 30,
            total: 30,
            tags: ['Vị kem dâu', '110 ml'],
        },
        {
            id: 5,
            name: 'Thùng 24 túi sữa chua uống tiệt trùng LiF Kun',
            originalPrice: '127.000đ',
            salePrice: '107.900đ',
            discount: '-15%',
            image: 'https://salt.tikicdn.com/cache/750x750/ts/product/3d/9e/99/8d3e3a3e3b3b3c3c3c3c3c3c3c3c3c3c.jpg',
            remaining: 30,
            total: 30,
            tags: ['Vị cam', '110 ml'],
        },
        {
            id: 6,
            name: 'Thùng 24 túi sữa chua uống tiệt trùng LiF Kun',
            originalPrice: '127.000đ',
            salePrice: '107.900đ',
            discount: '-15%',
            image: 'https://salt.tikicdn.com/cache/750x750/ts/product/3d/9e/99/8d3e3a3e3b3b3c3c3c3c3c3c3c3c3c3c.jpg',
            remaining: 30,
            total: 30,
            tags: ['Vị cam', '110 ml'],
        },
    ];

    const scrollCarousel = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = 165 * 5 + 12 * 4; // 5 products width + 4 gaps
            const newScrollLeft = direction === 'left'
                ? carouselRef.current.scrollLeft - scrollAmount
                : carouselRef.current.scrollLeft + scrollAmount;

            carouselRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="relative overflow-hidden rounded-xl bg-gradient-to-r shadow-lg dark:from-blue-900 dark:to-blue-800">
            {/* Decorative Header */}
            <div className="relative overflow-hidden bg-gradient-to-r py-10">
                {/* Animated Banner GIF */}
                <div className="absolute inset-0 opacity-100">
                    <img
                        src="https://cdnv2.tgdd.vn/mwg-static/common/Campaign/d7/aa/d7aa5ccd5ced80a938104457e5c17206.gif"
                        alt="Flash Sale Banner"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Decorative Elements */}
                <div className="absolute left-4 top-0 flex items-center gap-2">
                    <div className="rounded-lg bg-yellow-400 px-2 py-1 text-xs font-bold text-red-600 shadow-md rotate-[-15deg]">
                        30%
                    </div>
                    <div className="rounded-lg bg-pink-500 px-2 py-1 text-xs font-bold text-white shadow-md rotate-[15deg]">
                        HOT
                    </div>
                </div>
                <div className="absolute right-4 top-0 flex items-center gap-2">
                    <div className="rounded-lg bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-md rotate-[15deg]">
                        HOT
                    </div>
                </div>
            </div>

            {/* Products Carousel */}
            <div className="relative bg-blue-500 px-4 py-6">
                <button
                    type="button"
                    onClick={() => scrollCarousel('left')}
                    className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#e82e81] shadow-lg transition hover:bg-white"
                >
                    <span className="material-icons"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                    </svg></span>
                </button>

                <div
                    ref={carouselRef}
                    className="overflow-x-hidden"
                >
                    <div className="flex gap-2">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} showProgress={true} />
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => scrollCarousel('right')}
                    className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#e82e81] shadow-lg transition hover:bg-white"
                >
                    <span className="material-icons"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                    </svg></span>
                </button>
            </div>

            {/* View All Button */}
            <div className="flex justify-center border-t border-blue-700 bg-blue-600 py-4">
                <button
                    type="button"
                    className="flex items-center gap-1 text-sm font-semibold text-white transition hover:underline"
                >
                    Xem tất cả sản phẩm
                    <span className="material-icons text-lg"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                    </svg></span>
                </button>
            </div>
        </section>
    );
};

export default FlashSaleSection;

