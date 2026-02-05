interface ProductCardProps {
    product: {
        id: number;
        name: string;
        originalPrice?: string;
        salePrice: string;
        discount?: string;
        image: string;
        remaining?: number;
        total?: number;
        tags?: string[];
        soldCount?: number;
        rating?: number;
    };
    showProgress?: boolean;
}

const ProductCard = ({ product, showProgress = false }: ProductCardProps) => {
    return (
        <div className="group h-[320px] w-[165px] flex-shrink-0 rounded-lg bg-white p-2.5 shadow-md transition hover:shadow-xl dark:bg-gray-700 flex flex-col">
            {/* Product Image */}
            <div className="mb-1.5 flex h-[120px] w-full items-center justify-center overflow-hidden rounded-lg bg-white p-1">
                <img
                    alt={product.name}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    src={product.image}
                />
            </div>

            {/* Product Name */}
            <h4 className="mb-1.5 min-h-[2.2em] text-[11px] leading-tight text-gray-700 line-clamp-2 dark:text-gray-200">
                {product.name}
            </h4>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
                <div className="mb-1.5 flex flex-wrap gap-0.5">
                    {product.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="rounded bg-gray-100 px-1.5 py-0.5 text-[9px] text-gray-600 dark:bg-gray-600 dark:text-gray-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Progress Bar - Only for Flash Sale */}
            {showProgress && product.remaining !== undefined && product.total !== undefined && (
                <div className="mb-1.5">
                    <div className="mb-0.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                            className="h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-pink-600"
                            style={{ width: `${(product.remaining / product.total) * 100}%` }}
                        />
                    </div>
                    <p className="text-[9px] text-gray-500">
                        Còn {product.remaining}/{product.total} Suất
                    </p>
                </div>
            )}

            {/* Sold Count - For regular products */}
            {!showProgress && product.soldCount !== undefined && (
                <div className="mb-1.5">
                    <p className="text-[9px] text-gray-500">
                        Đã bán {product.soldCount}
                    </p>
                </div>
            )}

            {/* Price Section - Moved to bottom */}
            <div className="mb-1.5 mt-auto">
                {product.originalPrice && product.discount && (
                    <div className="flex items-baseline gap-1">
                        <span className="text-[9px] text-gray-400 line-through">{product.originalPrice}</span>
                        <span className="rounded bg-red-500 px-1 py-0.5 text-[9px] font-bold text-white">
                            {product.discount}
                        </span>
                    </div>
                )}
                <div className="text-base font-bold text-red-600">{product.salePrice}</div>
            </div>

            {/* Buy Button */}
            <button
                type="button"
                className="w-full rounded-xl border-2 border-pink-500 bg-white py-1.5 text-[11px] font-semibold text-pink-500 transition hover:bg-[#e82e81] hover:text-white"
            >
                Chọn mua
            </button>
        </div>
    );
};

export default ProductCard;
