import { useParams, Link } from 'react-router-dom';
import ProductGallery from './components/ProductGallery';
import ProductInfo from './components/ProductInfo';
import ProductSpecs from './components/ProductSpecs';
import ProductReviews from './components/ProductReviews';
import RelatedProducts from './components/RelatedProducts';

const ProductDetailPage = () => {
    const { id } = useParams();

    // Mock Data based on screenshot
    const product = {
        id: Number(id) || 123785,
        name: "Tã dán Huggies Skin Perfect size NB 70 miếng (Dưới 5 kg) - Giao bao bì +0/+4/+6 ngẫu nhiên",
        price: 166500,
        originalPrice: 185000,
        discount_percentage: 10,
        rating: 5,
        rating_count: 7,
        sold_count: 51700,
        images: [
            "https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202512/ta-quan-huggies-nature-made-overnite-size-xl-38-mieng-12-18-kg093630.jpg",
            "https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/mwg-static/avakids/Products/Images/2427/335737/ta-quan-huggies-nature-made-overnite-size-xl-38-mieng-12-18-2-638792860689835972.jpg",
            "https://cdn.tgdd.vn/Products/Images/2653/226590/ta-dan-huggies-dry-size-nb-70-mieng-duoi-5kg-3.jpg",
            "https://cdn.tgdd.vn/Products/Images/2653/226590/ta-dan-huggies-dry-size-nb-70-mieng-duoi-5kg-1.jpg",
            "https://cdn.tgdd.vn/Products/Images/2653/226590/ta-dan-huggies-dry-size-nb-70-mieng-duoi-5kg-1.jpg",
        ],
        options: [
            { name: "Kích thước", values: ["Dưới 5 kg", "5-7 kg", "7-10 kg"] },
            { name: "Số miếng", values: ["70 miếng", "100 miếng"] }
        ]
    };

    return (
        <div className="bg-gray-50 pb-10">
            <div className="mx-auto max-w-[1200px] px-4 pt-4">
                {/* Breadcrumb */}
                <div className="mb-4 flex gap-2 text-sm text-gray-500">
                    <Link to="/" className="hover:text-pink-600">Trang chủ</Link>
                    <span>/</span>
                    <Link to="/" className="hover:text-pink-600">Bỉm, Tã</Link>
                    <span>/</span>
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
                        <ProductInfo product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
