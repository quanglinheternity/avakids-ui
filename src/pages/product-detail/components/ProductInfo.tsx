import { useState } from 'react';
import axios from 'axios';
import api from '../../../services/api';
import { type ProductDetail, type ProductOption } from './convertProductDetail';

interface ProductInfoProps {
    product: ProductDetail;
    allOptions: ProductOption[];
    onOptionChange: (optionId: number, valueId: number) => void;
}

const ProductInfo = ({ product, allOptions, onOptionChange }: ProductInfoProps) => {
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    const handleOptionSelect = (optionId: number, valueId: number) => {
        onOptionChange(optionId, valueId);
    };

    const handleAddToCart = async () => {
        if (!product) return;

        setIsAdding(true);
        try {
            await api.post('/cart-items/addItems', {
                variantId: product.id,
                quantity: quantity
            });
            alert('Đã thêm sản phẩm vào giỏ hàng!');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const data = error.response?.data;
                if (data?.message) {
                    alert(data.message);
                } else {
                    alert("Có lỗi xảy ra khi thêm vào giỏ hàng.");
                }
                console.error("Add to cart error:", data);
            } else {
                alert("Có lỗi không xác định.");
                console.error(error);
            }
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div id={product.id.toString()} className="rounded-[16px] overflow-hidden bg-white border border-gray-200 dark:border-gray-700">
            <div className="mb-[8px] flex justify-between px-4 pt-4">
                <div className="flex flex-col gap-[8px]">
                    <div className="flex items-center gap-[8px]">
                        {product.originalPrice && (
                            <span className="text-[18px] font-800 leading-[18px] text-gray-700 line-through">
                                {product.originalPrice}
                            </span>
                        )}
                        {product.discount_percentage && (
                            <span className="rounded-full bg-primary-800 px-[5px] text-center text-[16px] leading-[24px] text-white">
                                -{product.discount_percentage}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-[28px] font-900 leading-[24px] text-black-100">
                            {product.salePrice}
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
                                {'★'.repeat(Math.round(product.rating))}
                            </div>
                            <span className="text-[12px] font-700 leading-[14px] text-gray-700 underline">
                                ({product.ratingCount >= 1000 ? (product.ratingCount / 1000).toFixed(1) + 'k' : product.ratingCount} đánh giá)
                            </span>
                        </button>
                        <div className="flex items-center gap-[6px]">
                            <span className="text-[12px] font-700 leading-[14px] text-gray-700">
                                Đã bán {product.soldCount >= 1000 ? (product.soldCount / 1000).toFixed(1) + 'k' : product.soldCount}
                            </span>
                        </div>
                    </div>

                    <div className="flex w-full gap-2">
                        {product.selectedOptions.map((opt) => (
                            <span
                                key={opt.id}
                                className="flex shrink-0 items-center whitespace-nowrap rounded-[4px] bg-blue-10 px-[6px] py-[4px] text-[13px] font-600 leading-[13px] text-blue-100"
                            >
                                {opt.value}
                            </span>
                        ))}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[16px] mt-[16px]">
                            <span className="text-[15px] font-700 text-black-200">Số lượng:</span>
                            <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 p-[2px] shadow-sm">
                                <button
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-600 hover:bg-gray-100 hover:text-pink-600 transition-all border border-gray-100 shadow-sm disabled:opacity-50"
                                    disabled={quantity <= 1}
                                >
                                    <span className="text-xl leading-none">−</span>
                                </button>
                                <input
                                    type="text"
                                    readOnly
                                    value={quantity}
                                    className="w-10 bg-transparent text-center text-[15px] font-800 text-gray-800
                                                border-0 outline-none ring-0
                                                focus:outline-none focus:ring-0
                                                shadow-none"
                                />
                                <button
                                    onClick={() =>
                                        setQuantity(prev =>
                                            Math.min(product.stockQuantity, prev + 1)
                                        )
                                    }
                                    disabled={quantity >= product.stockQuantity}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white 
                                                text-gray-600 hover:bg-gray-100 hover:text-pink-600 transition-all 
                                                border border-gray-100 shadow-sm disabled:opacity-50"
                                >
                                    <span className="text-xl leading-none" >+</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center gap-[6px]">
                            {product.stockQuantity === 0 ? (
                                <span className="text-[12px] font-700 text-red-500">
                                    Hết hàng
                                </span>
                            ) : (
                                <span className="text-[12px] font-700 leading-[14px] text-gray-700">
                                    Còn hàng{" "}
                                    {product.stockQuantity >= 1000
                                        ? (product.stockQuantity / 1000).toFixed(1) + "k"
                                        : product.stockQuantity}
                                </span>
                            )}
                        </div>
                    </div>


                    {/* Interactive Options Display */}
                    <div className="flex flex-col gap-[14px] mt-[8px]">
                        {allOptions.map((option) => (
                            <div key={option.id} className="flex flex-col gap-[8px]">

                                {/* Option title */}
                                <span className="text-[14px] font-600 text-gray-800">
                                    {option.name}
                                </span>

                                {/* Option values */}
                                <div className="flex flex-wrap gap-[10px]">
                                    {option.values.map((val) => {
                                        const isSelected = product.selectedOptions.some(opt => opt.id === val.id);

                                        return (
                                            <button
                                                key={val.id}
                                                onClick={() => handleOptionSelect(option.id, val.id)}
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
                                                {val.value}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="m-auto w-full max-w-sm bg-white px-2 py-4">
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding || product.stockQuantity === 0}
                        className="relative overflow-hidden rounded-[8px] border-[1.5px] border-primary-400 bg-primary-600 px-3 py-2 text-white transition-all duration-300 flex h-12 w-full items-center justify-center p-[6px] text-[16px] hover:bg-primary-700 disabled:opacity-75"
                    >
                        {isAdding ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                        ) : (
                            `Chọn mua (${product.salePrice})`
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;
