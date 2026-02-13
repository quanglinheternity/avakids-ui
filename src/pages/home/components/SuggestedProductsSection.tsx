import { useState, useEffect } from 'react';
import api from '../../../services/api';
import ProductCard from './ProductCard';
import convertProduct from './convertProduct';
import type { Product, ProductResponse } from './convertProduct';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';

interface ApiResponse {
    code: number;
    message: string;
    data: ProductResponse[];
}

const SuggestedProductsSection = () => {
    const { isAuthenticated } = useAuth();
    const [activeTab, setActiveTab] = useState<'suggested' | 'rebuy' | 'favorite'>('suggested');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                let endpoint = '/products/recommend?limit=20';

                if (activeTab === 'rebuy' && isAuthenticated) {
                    endpoint = '/products/rebuy?limit=20'; // Assuming this endpoint exists
                } else if (activeTab === 'favorite' && isAuthenticated) {
                    endpoint = '/products/favorites?limit=20'; // Assuming this endpoint exists
                }

                // If tab requires auth and user is NOT authenticated, don't fetch from private endpoints
                if ((activeTab === 'rebuy' || activeTab === 'favorite') && !isAuthenticated) {
                    setProducts([]);
                    setIsLoading(false);
                    return;
                }

                const res = await api.get<ApiResponse>(endpoint);
                if (res.data && res.data.data) {
                    setProducts(res.data.data.map(convertProduct));
                }
            } catch (error) {
                console.error(`Failed to fetch ${activeTab} products`, error);
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [activeTab, isAuthenticated]);

    const renderEmptyState = () => {
        if (!isAuthenticated && (activeTab === 'rebuy' || activeTab === 'favorite')) {
            return (
                <div className="flex flex-col items-center justify-center py-12">
                    <img
                        src="https://cdnv2.tgdd.vn/mwg-static/common/Common/01/7a/017aa5a36cbb0f3def7d3a913965ec10.png"
                        alt="Login Required"
                        className="mb-4 h-24 w-24 opacity-50 gray-scale"
                    />
                    <p className="mb-4 text-center text-gray-500">
                        Vui lòng đăng nhập để xem danh sách {activeTab === 'rebuy' ? 'mua lại' : 'yêu thích'} của bạn
                    </p>
                    <Link
                        to="/login"
                        className="rounded-full bg-pink-600 px-6 py-2 text-white transition hover:bg-pink-700"
                    >
                        Đăng nhập ngay
                    </Link>
                </div>
            );
        }
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <p className="text-gray-500">Không có sản phẩm nào để hiển thị</p>
            </div>
        );
    };

    if (isLoading) {
        return (
            <section className="relative overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800 h-[500px] bg-gray-50 border border-gray-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
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
                        className={`flex items-center gap-2 rounded-lg px-8 py-2 transition cursor-pointer ${activeTab === 'suggested'
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
                        className={`flex items-center gap-2 rounded-lg px-8 py-2 transition cursor-pointer ${activeTab === 'rebuy'
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
                        className={`flex items-center gap-2 rounded-lg px-8 py-2 transition cursor-pointer ${activeTab === 'favorite'
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
                {products.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} showProgress={false} />
                        ))}
                    </div>
                ) : (
                    renderEmptyState()
                )}
            </div>
        </section>
    );
};

export default SuggestedProductsSection;
