import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import convertProduct from './convertProduct';
import type { Product, ProductResponse } from './convertProduct';


interface ApiResponse {
    code: number;
    message: string;
    data: ProductResponse[];
}

const FlashSaleSection = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get<ApiResponse>('http://localhost:8080/avakids/api/v1/products/featured');
                if (res.data && res.data.data) {
                    // Ensure the data matches expected types, handle potential number/string mismatches if needed
                    // For now assuming API returns compatible structure or we pass it through
                    setProducts(res.data.data.map(convertProduct));
                }
            } catch (error) {
                console.error("Failed to fetch flash sale products", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

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

    if (isLoading) {
        return (
            <section className="relative overflow-hidden rounded-xl bg-gradient-to-r shadow-lg dark:from-blue-900 dark:to-blue-800 h-[500px] animate-pulse bg-gray-200 dark:bg-gray-700">
                {/* Placeholder for loading state */}
            </section>
        );
    }

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

