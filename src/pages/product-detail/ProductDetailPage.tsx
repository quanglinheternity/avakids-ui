import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ProductSpecs from './components/ProductSpecs';
import ProductReviews from './components/ProductReviews';
import RelatedProducts from './components/RelatedProducts';
import convertProduct, { type ProductDetail as ProductDetailBase, type ProductOption } from './components/convertProductDetail';

interface ProductImage {
    id: number;
    imageUrl: string;
    isMain: boolean;
    displayOrder: number;
}

interface ProductDetail extends ProductDetailBase {
    images: string[];
}

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [allOptions, setAllOptions] = useState<ProductOption[]>([]);
    const [selectedOptionMap, setSelectedOptionMap] = useState<Record<number, number>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductData = async () => {
            if (!id) return;
            setIsLoading(true);
            setError(null);

            try {
                // Parallel fetching for better performance
                const [productRes, imagesRes, optionsRes] = await Promise.all([
                    api.get(`/products/${id}/select-variant-value`),
                    api.get(`/product-images/product/${id}`),
                    api.get(`/products/${id}/options/list`),
                ]);

                const productBaseData = productRes.data.data;
                const imagesData: ProductImage[] = imagesRes.data.data;
                const optionsData: ProductOption[] = optionsRes.data.data;

                const convertedProduct = convertProduct(productBaseData);

                setProduct({
                    ...convertedProduct,
                    images: imagesData.map(img => img.imageUrl)
                });
                setAllOptions(optionsData);

                // Initialize selection map from the current variant
                const initialMap: Record<number, number> = {};
                // We need to match selected values back to their parent options
                optionsData.forEach(opt => {
                    const selectedValue = convertedProduct.selectedOptions.find(so =>
                        opt.values.some(v => v.id === so.id)
                    );
                    if (selectedValue) {
                        initialMap[opt.id] = selectedValue.id;
                    }
                });
                setSelectedOptionMap(initialMap);

            } catch (err: any) {
                console.error("Failed to fetch product details", err);
                setError("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductData();
    }, [id]);

    const handleOptionChange = async (optionId: number, valueId: number) => {
        if (!id || !product) return;

        const newMap = { ...selectedOptionMap, [optionId]: valueId };
        setSelectedOptionMap(newMap);

        try {
            // Using URLSearchParams to handle multiple parameters with the same name if needed,
            // but standard axios params with an array also works for most backends.
            // Based on user request format: optionValueIds=3&optionValueIds=2
            const params = new URLSearchParams();
            Object.values(newMap).forEach(vId => {
                params.append('optionValueIds', vId.toString());
            });

            const res = await api.get(`/products/${id}/select-variant-value`, {
                params: params
            });

            const newVariantData = res.data.data;
            const convertedVariant = convertProduct(newVariantData);

            setProduct(prev => prev ? {
                ...convertedVariant,
                images: prev.images // Keep the existing images if the API doesn't return them
            } : null);

        } catch (err) {
            console.error("Failed to fetch variant", err);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-pink-600"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
                <p className="mb-4 text-gray-600">{error || "Sản phẩm không tồn tại"}</p>
                <Link to="/" className="text-pink-600 hover:underline">Quay lại trang chủ</Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 pb-10">
            <div className="mx-auto max-w-[1200px] px-4 pt-4">
                {/* Breadcrumb */}
                <div className="mb-4 flex gap-2 text-sm text-gray-500">
                    <Link to="/" className="hover:text-pink-600">Trang chủ</Link>
                    <span>/</span>
                    {/* <Link to="/" className="hover:text-pink-600">Bỉm, Tã</Link>
                    <span>/</span> */}
                    <span className="text-gray-900 line-clamp-1">{product.name}</span>
                </div>

                <div className="flex gap-2">
                    {/* Left Column: Gallery, Specs, Reviews, Related */}
                    <div className="flex w-[640px] flex-col gap-[20px]">
                        <ProductGallery images={product.images} />
                        <ProductSpecs />
                        <ProductReviews />
                        <RelatedProducts />
                    </div>

                    {/* Right Column: Info */}
                    <div className="ml-4 flex h-auto w-[540px] flex-col gap-[20px]">
                        <ProductInfo
                            product={product}
                            allOptions={allOptions}
                            onOptionChange={handleOptionChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
