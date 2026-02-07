import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import convertProduct from './convertProduct';
import type { Product, ProductResponse } from './convertProduct';

interface ApiResponse {
    code: number;
    message: string;
    data: ProductResponse[];
}

const SuggestedProductsSection = () => {
    const [activeTab, setActiveTab] = useState<'suggested' | 'rebuy' | 'favorite'>('suggested');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get<ApiResponse>('http://localhost:8080/avakids/api/v1/products/recommend?limit=20');
                if (res.data && res.data.data) {
                    setProducts(res.data.data.map(convertProduct));
                }
            } catch (error) {
                console.error("Failed to fetch suggested products", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (isLoading) {
        return (
            <section className="relative overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800 h-[500px] animate-pulse bg-gray-200 dark:bg-gray-700">
            </section>
        );
    }

    return (
        <section className="relative overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
            {/* Header with Tabs */}
            <div className="relative border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                {/* Decorative elements */}
                {/* <div className="absolute left-0 top-0 h-full w-12">
                    <img
                        src="https://salt.tikicdn.com/ts/upload/33/0f/67/bc6b96427f3a1e32bfbe45a5c02dcfc8.png"
                        alt="decoration"
                        className="h-full w-full object-contain"
                    />
                </div>
                <div className="absolute right-0 top-0 h-full w-12">
                    <img
                        src="https://salt.tikicdn.com/ts/upload/85/92/19/73af4a801edfa8010icy8f40e157609.png"
                        alt="decoration"
                        className="h-full w-full object-contain"
                    />
                </div> */}

                {/* Tabs */}
                <div className="flex items-center justify-center gap-4 px-16 py-4">
                    <button
                        type="button"
                        onClick={() => setActiveTab('suggested')}
                        className={`flex items-center gap-2 rounded-lg px-8 py-2 transition ${activeTab === 'suggested'
                            ? 'text-pink-600 dark:bg-pink-900/20 border border-pink-600 dark:border-pink-600'
                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                            }`}
                    >
                        <img src="https://cdnv2.tgdd.vn/mwg-static/common/Common/01/7a/017aa5a36cbb0f3def7d3a913965ec10.png" alt="" width={60} height={60} />
                        <span className="font-medium">Gợi ý cho bạn</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('rebuy')}
                        className={`flex items-center gap-2 rounded-lg px-8 py-2 transition ${activeTab === 'rebuy'
                            ? 'border border-pink-600 dark:border-pink-600 text-pink-600 dark:bg-pink-900/20'
                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                            }`}
                    >
                        <img src="https://cdnv2.tgdd.vn/mwg-static/common/Common/fb/bd/fbbdfc05e02da24c330e25f33c44bad6.png" alt="" width={60} height={60} />

                        <span className="font-medium">Mua lại sản phẩm</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('favorite')}
                        className={`flex items-center gap-2 rounded-lg px-8 py-2 transition ${activeTab === 'favorite'
                            ? 'border border-pink-600 dark:border-pink-600 text-pink-600 dark:bg-pink-900/20'
                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                            }`}
                    >
                        <img src="https://cdnv2.tgdd.vn/mwg-static/common/Common/5a/81/5a81e39e55b65dbf16ef30be85a06df7.png" alt="" width={60} height={60} />

                        <span className="font-medium">Sản phẩm đã thích</span>
                    </button>
                </div>
            </div>

            {/* Products Grid */}
            <div className="bg-gray-50 px-4 py-6 dark:bg-gray-900">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} showProgress={false} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuggestedProductsSection;
