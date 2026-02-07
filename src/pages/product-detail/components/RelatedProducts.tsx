
import { Link } from 'react-router-dom';

const RelatedProducts = () => {
    // Mock data for related products based on HTML
    const products = [
        {
            id: 1,
            name: "Áo tay dài unisex IQ Baby visco trắng",
            price: 19000,
            originalPrice: 39000,
            discount: 51,
            sold: "4.1k",
            image: "https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdn.tgdd.vn/Products/Images/10318/327471/ao-tay-dai-in-thuyen-iq-baby-mau-trang-thumb-600x600.jpg"
        },
        {
            id: 2,
            name: "Quần lót vải cotton mặc 1 lần KACHOOBABY",
            price: 20000,
            originalPrice: 34000,
            discount: 41,
            sold: "28.2k",
            image: "https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdn.tgdd.vn/Products/Images/11580/279950/quan-lot-cotton-mac-1-lan-kachoo-baby-size-xxl-bich-5-cai-010722-072836-600x600.jpg"
        },
        {
            id: 3,
            name: "Chai nước rửa bình sữa D-nee",
            price: 78200,
            originalPrice: 92000,
            discount: 15,
            sold: "67.3k",
            image: "https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdn.tgdd.vn/Products/Images/10410/263861/nuoc-rua-binh-sua-d-nee-chai-500-ml-070623-041933-600x600.jpg"
        }
    ];

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

            <div className="relative mx-auto w-full">
                <div className="overflow-hidden">
                    <div className="flex w-full gap-2 overflow-x-auto pb-4 no-scrollbar">
                        {products.map(product => (
                            <div key={product.id} className="min-w-[140px] flex-1 max-w-[calc(33.33%-8px)]">
                                <div className="flex flex-col h-full overflow-hidden rounded-[16px] border border-[#f1f1f1] bg-white text-start">
                                    <div className="relative">
                                        <div className="flex items-center justify-center p-2">
                                            <img src={product.image} alt={product.name} className="h-[120px] w-auto object-contain" />
                                        </div>
                                    </div>

                                    <div className="flex flex-1 flex-col px-2 pt-2 text-[12px] gap-1 pb-2">
                                        <del className="text-[12px] text-gray-400">{product.price + 10000}đ</del>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[16px] font-700 text-black-100">{product.price.toLocaleString()}đ</span>
                                            <span className="rounded bg-primary-400 px-1 text-xs text-white">-{product.discount}%</span>
                                        </div>
                                        <Link to="#" className="line-clamp-2 text-[14px] text-black-100 hover:text-primary-400">
                                            {product.name}
                                        </Link>
                                        <div className="text-[10px] text-gray-500">Đã bán {product.sold}</div>
                                    </div>

                                    <div className="p-2 pt-0">
                                        <button className="w-full rounded-[24px] border border-primary-400 bg-white py-1 text-[12px] text-primary-400 hover:bg-primary-600 hover:text-white transition-colors">
                                            Chọn mua
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RelatedProducts;
