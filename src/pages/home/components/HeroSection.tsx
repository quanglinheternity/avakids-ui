import { useEffect, useState } from 'react';
import CarouselNavigation from '../../../components/CarouselNavigation';

type HeroCard = {
    image: string;
    badge: string;
    badgeClassName: string;
    title: string;
    description: string;
    align: 'left' | 'right';
};

type HeroSlide = {
    id: number;
    left: HeroCard;
    right: HeroCard;
};

const heroSlides: HeroSlide[] = [
    {
        id: 1,
        left: {
            image:
                'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/mwg-static/common/Banner/b2/26/b226de85f9c0aa370a920315061e55e0.png',
            badge: 'Mua 3 Tặng 1',
            badgeClassName: 'bg-yellow-400 text-black',
            title: 'Tã Quần Siêu Thấm Hút',
            description: 'Mẹ Chill Tết - Bé Lo Hết',
            align: 'left',
        },
        right: {
            image:
                'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/mwg-static/common/Banner/c3/ec/c3ec79cb9e9fca4e474b3d0c19acbe40.png',
            badge: 'Giá chỉ từ 1.007.000đ',
            badgeClassName: 'bg-primary text-white',
            title: 'Ghế Ngồi Ô Tô An Toàn',
            description: 'Chuẩn Châu Âu - Bảo vệ bé yêu',
            align: 'right',
        },
    },
    {
        id: 2,
        left: {
            image:
                'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/mwg-static/common/Banner/90/74/907488a568082595542919cf3b7460c6.png',
            badge: 'Giảm 20%',
            badgeClassName: 'bg-red-500 text-white',
            title: 'Combo Tã Siêu Tiết Kiệm',
            description: 'Tiện lợi cho cả tháng đầu năm',
            align: 'left',
        },
        right: {
            image:
                'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/mwg-static/common/Banner/70/f1/70f147a43394480f2d828ec434e21206.png',
            badge: 'Ưu đãi cuối tuần',
            badgeClassName: 'bg-amber-400 text-black',
            title: 'Ghế Ô Tô Kèm Phụ Kiện',
            description: 'Combo giá tốt, an toàn cho bé',
            align: 'right',
        },
    },
];

const HeroSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % heroSlides.length);
        }, 5000);

        return () => clearInterval(id);
    }, []);

    const current = heroSlides[activeIndex];

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    };

    return (
        <div className="relative">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Left card */}
                <div className="group relative h-48 cursor-pointer overflow-hidden rounded-2xl shadow-md transition-transform duration-500 md:h-57 lg:h-57">
                    <img
                        key={current.left.title}
                        alt={current.left.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        src={current.left.image}
                    />

                </div>

                {/* Right card */}
                <div className="group relative hidden h-48 cursor-pointer overflow-hidden rounded-2xl shadow-md transition-transform duration-500 md:block md:h-64 lg:h-57">
                    <img
                        key={current.right.title}
                        alt={current.right.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        src={current.right.image}
                    />

                </div>
            </div>

            {/* Controls */}
            <CarouselNavigation onPrev={handlePrev} onNext={handleNext} />

        </div>
    );
};

export default HeroSection;

