import { useState } from 'react';

interface ProductInfoProps {
    product: {
        id: number;
        name: string;
        price: number;
        originalPrice: number;
        discount_percentage: number;
        rating: number;
        rating_count: number;
        sold_count: number;
        options: {
            name: string;
            values: string[];
        }[];
    };
}

const ProductInfo = ({ product }: ProductInfoProps) => {
    // Initialize selected options with the first value of each option
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
        const defaults: Record<string, string> = {};
        product.options?.forEach((opt) => {
            if (opt.values.length > 0) {
                defaults[opt.name] = opt.values[0];
            }
        });
        return defaults;
    });

    const handleOptionSelect = (optionName: string, value: string) => {
        setSelectedOptions((prev) => ({
            ...prev,
            [optionName]: value,
        }));
    };

    return (
        <div id="123785" className="rounded-[16px] overflow-hidden bg-white border border-gray-200 dark:border-gray-700">
            <div className="mb-[8px] flex justify-between px-4 pt-4">
                <div className="flex flex-col gap-[8px]">
                    <div className="flex items-center gap-[8px]">
                        <span className="text-[18px] font-600 leading-[18px] text-gray-700 line-through">
                            {product.originalPrice.toLocaleString('vi-VN')}₫
                        </span>
                        <span className="rounded-full bg-primary-800 px-[5px] text-center text-[16px] leading-[24px] text-white">
                            -{product.discount_percentage}%
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[28px] font-700 leading-[24px] text-black-100">
                            {product.price.toLocaleString('vi-VN')}₫
                        </span>
                    </div>
                </div>
                <div className="text-[12px] font-400 text-gray-700">#{product.id}</div>
            </div>

            <div className="flex cursor-default flex-col gap-[12px] p-4">
                <div className="flex w-full flex-col gap-[8px]">
                    <h1 className="text-[18px] font-700 leading-[22px] text-black-200">
                        {product.name}
                    </h1>
                    <div className="flex items-center justify-between">
                        <button className="flex cursor-pointer items-center gap-[8px]">
                            <div className="flex items-center gap-[4px] text-yellow-500 text-sm">
                                {'★'.repeat(5)}
                            </div>
                            <span className="text-[12px] font-700 leading-[14px] text-gray-700 underline">
                                ({product.rating_count} đánh giá)
                            </span>
                        </button>
                        <div className="flex items-center gap-[6px]">
                            <span className="text-[12px] font-700 leading-[14px] text-gray-700">
                                Đã bán {product.sold_count >= 1000 ? (product.sold_count / 1000).toFixed(1) + 'k' : product.sold_count}
                            </span>
                        </div>
                    </div>

                    <div className="flex w-full gap-2">
                        <span className="flex shrink-0 items-center whitespace-nowrap rounded-[4px] bg-blue-10 px-[6px] py-[4px] text-[13px] font-600 leading-[13px] text-blue-100">
                            Dưới 5 kg
                        </span>
                        <span className="flex shrink-0 items-center whitespace-nowrap rounded-[4px] bg-blue-10 px-[6px] py-[4px] text-[13px] font-600 leading-[13px] text-blue-100">
                            70 miếng
                        </span>
                    </div>
                    {/* Interactive Options Display */}
                    <div className="flex flex-col gap-[14px] mt-[8px]">
                        {product.options?.map((option) => (
                            <div key={option.name} className="flex flex-col gap-[8px]">

                                {/* Option title */}
                                <span className="text-[14px] font-600 text-gray-800">
                                    {option.name}
                                </span>

                                {/* Option values */}
                                <div className="flex flex-wrap gap-[10px]">
                                    {option.values.map((val) => {
                                        const isSelected = selectedOptions[option.name] === val;

                                        return (
                                            <button
                                                key={val}
                                                onClick={() => handleOptionSelect(option.name, val)}
                                                className={`
                                                    relative flex items-center justify-center
                                                    rounded-[8px] px-[14px] py-[8px]
                                                    text-[13px] font-600
                                                    border transition-all duration-200
                                                    ${isSelected
                                                        ? 'border-pink-500 bg-pink-50 text-pink-500 shadow-[0_0_0_2px_rgba(236,72,153,0.15)]'
                                                        : 'border-gray-200 bg-white text-gray-700 hover:border-pink-400 hover:bg-pink-50'
                                                    }
                                                `}
                                            >
                                                {val}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="m-auto w-full max-w-sm bg-white px-2 py-4">
                    <button className="relative overflow-hidden rounded-[8px] border-[1.5px] border-primary-400 bg-primary-600 px-3 py-2 text-white transition-all duration-300 flex h-12 w-full items-center justify-center p-[6px] text-[16px] hover:bg-primary-700">
                        Chọn mua ({product.price.toLocaleString('vi-VN')}₫)
                    </button>
                </div>
            </div>

            {/* Promotions / Buy Together Section - Commented out as per previous state */}
            {/* <div className="px-4 pb-4">
                <div className="my-[4px] mb-[8px] bg-white">
                    <div className="flex flex-col gap-2">
                        {[
                            "Mua Balo, giày dép, nón giảm 20% (Không áp dụng khuyến mãi khác)",
                            "Mua Núm ty, Tinh dầu các loại giảm 20% (Không áp dụng khuyến mãi khác)",
                            "Mua Nước giặt Docilee Xanh lá giá 149,000đ, Dầu tắm em bé Cung Đình 100ml giảm 30,000đ"
                        ].map((promo, idx) => (
                            <button key={idx} className="flex w-full items-center gap-2 rounded-[16px] border border-primary-600 bg-primary-600 px-[8px] py-[6px] text-left text-[13px] text-white">
                                <span className="line-clamp-2">{promo}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default ProductInfo;
