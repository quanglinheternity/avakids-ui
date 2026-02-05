import { useState } from 'react';
import ProductCard from './ProductCard';

const SuggestedProductsSection = () => {
    const [activeTab, setActiveTab] = useState<'suggested' | 'rebuy' | 'favorite'>('suggested');

    const products = [
        {
            id: 1,
            name: 'Bột ném Anpaso rong biển hũ 60g - Giao bao bì ngẫu nhiên',
            salePrice: '75.000đ',
            image: 'https://salt.tikicdn.com/cache/280x280/ts/product/e3/be/87/d74f9e37f08d52bb75e779f3e2a4adb1.jpg',
            soldCount: 342,
            rating: 5,
            tags: [],
        },
        {
            id: 2,
            name: 'Bột ném Anpaso nấm hương hũ 60g - Giao bao bì ngẫu nhiên',
            salePrice: '75.000đ',
            image: 'https://salt.tikicdn.com/cache/280x280/ts/product/57/22/89/2e9b098a61c8df8e8f5e7f8e8f5e8f5e.jpg',
            soldCount: 342,
            rating: 5,
            tags: [],
        },
        {
            id: 3,
            name: 'Nui mix rau củ Anpaso',
            originalPrice: '89.000đ',
            salePrice: '80.100đ',
            discount: '-10%',
            image: 'https://salt.tikicdn.com/cache/280x280/ts/product/9f/8e/57/3e9b098a61c8df8e8f5e7f8e8f5e8f5e.jpg',
            soldCount: 49,
            tags: ['Từ 6 tháng', '150g'],
        },
        {
            id: 4,
            name: 'Nui ăn dặm Bartolini',
            salePrice: '61.000đ',
            image: 'https://salt.tikicdn.com/cache/280x280/ts/product/2f/7e/47/4e9b098a61c8df8e8f5e7f8e8f5e8f5e.jpg',
            soldCount: 98,
            tags: ['Từ 8 tháng', '250g'],
        },
        {
            id: 5,
            name: 'Sữa bột Optimum Gold số 2 - Giao bao bì ngẫu nhiên',
            salePrice: '479.000đ',
            image: 'https://salt.tikicdn.com/cache/280x280/ts/product/5f/9e/67/5e9b098a61c8df8e8f5e7f8e8f5e8f5e.jpg',
            soldCount: 158,
            tags: ['6 - 12 tháng', '800g'],
        },
        {
            id: 6,
            name: 'Mì ăn liền rau củ Mix',
            originalPrice: '38.000đ',
            salePrice: '34.200đ',
            discount: '-10%',
            image: 'https://salt.tikicdn.com/cache/280x280/ts/product/6f/ae/77/6e9b098a61c8df8e8f5e7f8e8f5e8f5e.jpg',
            soldCount: 234,
            tags: [],
        },
        {
            id: 7,
            name: 'Mì ăn liền vị tôm',
            salePrice: '70.000đ',
            image: 'https://salt.tikicdn.com/cache/280x280/ts/product/7f/be/87/7e9b098a61c8df8e8f5e7f8e8f5e8f5e.jpg',
            soldCount: 156,
            tags: [],
        },
        {
            id: 8,
            name: 'Bột ăn dặm rau củ Mix',
            salePrice: '58.000đ',
            image: 'https://salt.tikicdn.com/cache/280x280/ts/product/8f/ce/97/8e9b098a61c8df8e8f5e7f8e8f5e8f5e.jpg',
            soldCount: 89,
            tags: [],
        },
        {
            id: 9,
            name: 'Bột ăn dặm vị cà rốt',
            salePrice: '58.000đ',
            image: 'https://salt.tikicdn.com/cache/280x280/ts/product/9f/de/a7/9e9b098a61c8df8e8f5e7f8e8f5e8f5e.jpg',
            soldCount: 67,
            tags: [],
        },
        {
            id: 10,
            name: 'Nui ăn dặm Bartolini số 1',
            salePrice: '61.000đ',
            image: 'https://salt.tikicdn.com/cache/280x280/ts/product/af/ee/b7/ae9b098a61c8df8e8f5e7f8e8f5e8f5e.jpg',
            soldCount: 123,
            tags: [],
        },
    ];

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
