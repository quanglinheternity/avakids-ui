
export interface ProductDetail {
    id: number;
    sku: string;
    name: string;
    originalPrice?: string;
    salePrice?: string;
    discount_percentage?: string;
    stockQuantity: number;
    rating: number;
    ratingCount: number;
    soldCount: number;
    selectedOptions: OptionValue[];
}
export interface OptionValue {
    id: number;
    value: string;
    displayOrder: number;
}

export interface ProductDetailResponse {
    id: number;
    sku: string;
    variantName: string;
    price: number | null;
    salePrice: number | null;
    stockQuantity: number;
    soldCount: number;
    barcode: string;
    isDefault: boolean;
    avgRating: number;
    reviewCount: number;
    optionValues?: OptionValue[];
}

export interface ProductOption {
    id: number;
    name: string;
    values: OptionValue[];
}

export interface ProductDetail {
    id: number;
    sku: string;
    name: string;
    originalPrice?: string;
    salePrice?: string;
    discount_percentage?: string;
    stockQuantity: number;
    rating: number;
    ratingCount: number;
    soldCount: number;
    selectedOptions: OptionValue[];
}

const convertProduct = (p: ProductDetailResponse): ProductDetail => {
    const basePrice = p.salePrice ?? p.price ?? 0;

    return {
        id: p.id,
        name: p.variantName,
        sku: p.sku,
        stockQuantity: p.stockQuantity || 0,
        originalPrice:
            p.salePrice && p.price
                ? p.price.toLocaleString("vi-VN") + "₫"
                : undefined,
        salePrice: basePrice.toLocaleString("vi-VN") + "₫",

        discount_percentage: p.salePrice && p.price
            ? ((p.price - p.salePrice) / p.price * 100).toFixed(2) + "%"
            : undefined,

        ratingCount: p.reviewCount || 0,
        rating: p.avgRating || 0,
        soldCount: p.soldCount || 0,
        selectedOptions: p.optionValues || [],
    };
};

export default convertProduct;

