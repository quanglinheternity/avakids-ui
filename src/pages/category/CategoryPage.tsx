import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import CategoryBanners from './components/CategoryBanners';
import SubCategoryNav from './components/SubCategoryNav';
import BrandLogos from './components/BrandLogos';
import ProductFilterSort from './components/ProductFilterSort';
import ProductCard from '../home/components/ProductCard';
import convertProduct from '../home/components/convertProduct';
import type { Product, ProductResponse } from '../home/components/convertProduct';

interface Category {
    id: number;
    name: string;
    slug: string;
    imageUrl: string;
    children?: Category[];
}

interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

const CategoryPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [category, setCategory] = useState<Category | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryData = async () => {
            setIsLoading(true);
            try {
                const catRes = await api.get<ApiResponse<Category[]>>('/category/list');
                const allCats = catRes.data.data;

                const findCategory = (cats: Category[]): Category | null => {
                    for (const cat of cats) {
                        if (cat.slug === slug) return cat;
                        if (cat.children) {
                            const found = findCategory(cat.children);
                            if (found) return found;
                        }
                    }
                    return null;
                };

                const currentCat = findCategory(allCats);
                setCategory(currentCat);

                const productRes = await api.get<ApiResponse<ProductResponse[]>>('/products/featured');
                if (productRes.data && productRes.data.data) {
                    setProducts(productRes.data.data.map(convertProduct));
                }
            } catch (error) {
                console.error("Failed to fetch category data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategoryData();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="mx-auto max-w-[1200px] px-4 py-8">
                <div className="h-8 w-48 animate-pulse rounded bg-gray-200 mb-8" />
                <div className="grid grid-cols-6 gap-4">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="h-64 animate-pulse rounded-xl bg-gray-100" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f7fa] pb-12">
            <div className="mx-auto max-w-[1200px] px-4">
                {/* Banners Section */}
                <CategoryBanners />

                {/* Main Content White Card */}
                <div className="mt-4 overflow-hidden rounded-[24px] bg-white px-4 py-8 shadow-sm">
                    {/* Category Title & Info Button */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-baseline gap-4">
                            <h1 className="text-xl font-black text-[#e82e81] uppercase tracking-tight">
                                {category?.name || 'Danh mục'}
                            </h1>
                            <button className="flex items-center gap-1 group">
                                <span className="text-[12px] font-medium text-[#2186EB] group-hover:underline">
                                    Tìm hiểu về {category?.name}
                                </span>
                                <svg className="w-3 h-3 text-[#2186EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Sub-category Icons Navigation */}
                    <SubCategoryNav subCategories={category?.children || []} activeSlug={slug} />

                    {/* Filter & Brand Area */}
                    <div className="mt-8 space-y-6">
                        <BrandLogos />
                        <ProductFilterSort />
                    </div>

                    {/* Search Results Count */}
                    <div className="mt-8">
                        <h2 className="text-sm font-bold text-slate-800">
                            Tìm thấy {products.length} sản phẩm {category?.name}
                        </h2>
                    </div>

                    {/* Product Grid */}
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="mt-12 flex justify-center">
                        <button className="rounded-full border-[1.5px] border-[#e82e81] bg-white px-12 py-2.5 text-sm font-bold text-[#e82e81] shadow-sm transition-all hover:bg-[#e82e81] hover:text-white active:scale-95">
                            Xem thêm sản phẩm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
