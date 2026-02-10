
export interface Product {
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
}
export interface ProductResponse {
    id: number;
    sku: string;
    name: string;
    imageUlr: string | null;
    price: number | null;
    salePrice: number | null;
    totalQuantity: number;
    avgRating: number;
    soldCount: number;
    hasVariants: boolean | null;
    minPrice: number | null;
    maxPrice: number | null;
}
const convertProduct = (p: ProductResponse): Product => {
    const basePrice = p.salePrice ?? p.price ?? 0;

    return {
        id: p.id,
        name: p.name,
        image: p.imageUlr || "/images/no-image.png",

        originalPrice:
            p.salePrice && p.price
                ? p.price.toLocaleString("vi-VN") + "₫"
                : undefined,
        discount: p.salePrice && p.price
            ? ((p.price - p.salePrice) / p.price * 100).toFixed(2) + "%"
            : undefined,
        salePrice: basePrice.toLocaleString("vi-VN") + "₫",
        tags: ["180 ml", "Từ 2 tuổi"],

        remaining: p.totalQuantity,
        total: p.totalQuantity,
        soldCount: p.soldCount,
        rating: p.avgRating,
        hasVariants: p.hasVariants,
        minPrice: p.minPrice ? p.minPrice.toLocaleString("vi-VN") + "₫" : undefined,
        maxPrice: p.maxPrice ? p.maxPrice.toLocaleString("vi-VN") + "₫" : undefined,
    };
};

export default convertProduct;

