
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';
import convertProduct, { type Product } from '../../home/components/convertProduct';
import ProductCard from '../../home/components/ProductCard';

const RelatedProducts = () => {
    const { id } = useParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            if (!id) return;
            setIsLoading(true);
            try {
                const response = await api.get(`/products/recommend?currentVariantId=${id}&limit=10`);
                const productsData = response.data.data;
                setProducts(productsData.map((p: any) => convertProduct(p)));
            } catch (err) {
                console.error("Failed to fetch related products", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRelatedProducts();
    }, [id]);

    const scrollCarousel = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = carouselRef.current.clientWidth * 0.8;
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[200px] items-center justify-center rounded-[16px] bg-white border border-gray-200">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-pink-600"></div>
            </div>
        );
    }

    if (products.length === 0) return null;

    return (
        <div className="z-1 flex flex-col gap-[16px] rounded-[16px] bg-white p-[20px] border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-[8px]">
                <div className="h-6 w-1 bg-primary-400 rounded-full"></div>
                <p className="text-[18px] font-700 leading-[22px] text-primary-400">Sản phẩm</p>
            </div>

            <div className="flex items-center">
                <div className="relative">
                    <p className="text-[16px] font-bold leading-5 text-primary-400">Thường mua cùng</p>
                    <div className="absolute bottom-[-5px] left-0 h-[2px] w-full bg-gradient-to-r from-[#FF0062] to-[#FF33A3]"></div>
                </div>
            </div>

            <div className="relative group mx-auto w-full">
                {/* Left Button */}
                <button
                    type="button"
                    onClick={() => scrollCarousel('left')}
                    className="absolute -left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#e82e81] shadow-lg transition opacity-0 group-hover:opacity-100 hover:bg-white"
                >
                    <span className="material-icons border-0 outline-none ring-0 focus:outline-none focus:ring-0 shadow-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </span>
                </button>

                <div className="overflow-hidden">
                    <div
                        ref={carouselRef}
                        className="flex w-full gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
                    >
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>

                {/* Right Button */}
                <button
                    type="button"
                    onClick={() => scrollCarousel('right')}
                    className="absolute -right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#e82e81] shadow-lg transition opacity-0 group-hover:opacity-100 hover:bg-white"
                >
                    <span className="material-icons border-0 outline-none ring-0 focus:outline-none focus:ring-0 shadow-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default RelatedProducts;
