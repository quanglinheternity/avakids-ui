interface ProductCardProps {
    product: {
        id: number;
        name: string;
        originalPrice?: string;
        salePrice?: string;
        discount?: string;
        image: string;
        remaining?: number;
        total?: number;
        tags?: string[];
        soldCount?: number;
        rating?: number;
        hasVariants?: boolean | null;
        minPrice?: string;
        maxPrice?: string;
    };
    showProgress?: boolean;
}

import { Link } from 'react-router-dom';

const ProductCard = ({ product, showProgress = false }: ProductCardProps) => {
    return (
        <Link to={`/product/${product.id}`} className="group h-[320px] w-[165px] flex-shrink-0 flex flex-col rounded-lg bg-white p-2.5 shadow-md transition hover:shadow-xl dark:bg-gray-700">
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

            <div className="mb-1.5">
                {showProgress && product.remaining !== undefined && product.total !== undefined ? (
                    <>
                        {/* Progress Bar */}
                        <div className="mb-0.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                            <div
                                className="h-1.5 rounded-full bg-gradient-to-r from-pink-500 to-pink-600"
                                style={{ width: `${(product.remaining / product.total) * 100}%` }}
                            />
                        </div>
                        <p className="text-[9px] text-gray-500">
                            Còn {product.remaining}/{product.total} Suất
                        </p>
                    </>
                ) : (
                    /* Sold Count & Rating */
                    <div className="flex items-center justify-between">
                        {product.soldCount !== undefined && (
                            <p className="text-[9px] text-gray-500">
                                Đã bán {product.soldCount >= 1000 ? (product.soldCount / 1000).toFixed(1) + 'k' : product.soldCount}
                            </p>
                        )}

                        {product.rating !== undefined && product.rating > 0 && (
                            <div className="flex items-center gap-0.5">
                                <span className="text-[10px] text-yellow-400">★</span>
                                <span className="text-[9px] text-gray-500 dark:text-gray-400">
                                    {product.rating}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Price section */}
            <div className="mb-1.5 mt-auto">
                {product.hasVariants ? (
                    <div className="text-sm font-bold text-red-600">
                        {product.minPrice} - {product.maxPrice}
                    </div>
                ) : (
                    <>
                        {product.originalPrice && product.discount && (
                            <div className="flex items-baseline gap-1">
                                <span className="text-[9px] text-gray-400 line-through">{product.originalPrice}</span>
                                <span className="rounded bg-red-500 px-1 py-0.5 text-[9px] font-bold text-white">
                                    {product.discount}
                                </span>
                            </div>
                        )}
                        <div className="text-base font-bold text-red-600">{product.salePrice}</div>
                    </>
                )}
            </div>


            {/* Buy Button */}
            <button
                type="button"
                className="w-full rounded-xl border-2 border-pink-500 bg-white py-1.5 text-[11px] font-semibold text-pink-500 transition hover:bg-[#e82e81] hover:text-white"
            >
                Chọn mua
            </button>
        </Link>
    );
};

export default ProductCard;
