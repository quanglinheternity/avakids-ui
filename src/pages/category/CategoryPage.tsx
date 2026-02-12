import { useEffect, useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
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

interface PageData<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

const CategoryPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');

    const [category, setCategory] = useState<Category | null>(null);
    const [parentCategory, setParentCategory] = useState<Category | null>(null);
    const [relatedCategories, setRelatedCategories] = useState<Category[]>([]);

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    // Filter & Pagination State
    const [activeSort, setActiveSort] = useState('popular');
    const [activeAge, setActiveAge] = useState<string | null>(null);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [appliedMinPrice, setAppliedMinPrice] = useState<string>('');
    const [appliedMaxPrice, setAppliedMaxPrice] = useState<string>('');
    const [activeRating, setActiveRating] = useState<number | null>(null);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    // Fetch Category Info only if slug is present
    useEffect(() => {
        if (!slug) {
            setCategory(null);
            setParentCategory(null);
            setRelatedCategories([]);
            return;
        }

        const fetchCategoryData = async () => {
            try {
                const catRes = await api.get<ApiResponse<Category[]>>('/category/list');
                const allCats = catRes.data.data;

                let foundParent: Category | null = null;
                let foundRelated: Category[] = [];

                const findCategoryCtx = (cats: Category[], parent: Category | null = null): Category | null => {
                    for (const cat of cats) {
                        if (cat.slug === slug) {
                            foundParent = parent;
                            foundRelated = parent?.children ?? allCats;
                            return cat;
                        }
                        if (cat.children) {
                            const found = findCategoryCtx(cat.children, cat);
                            if (found) return found;
                        }
                    }
                    return null;
                };

                const currentCat = findCategoryCtx(allCats);
                setCategory(currentCat);
                setParentCategory(foundParent);
                setRelatedCategories(foundRelated);
            } catch (error) {
                console.error("Failed to fetch category data", error);
            }
        };

        fetchCategoryData();
    }, [slug]);

    // Reset filters when category or keyword changes
    useEffect(() => {
        setPage(0);
        setProducts([]);
        // Optional: Reset other filters if needed, but keeping them might be better UX
    }, [slug, keyword]);

    const getSortParams = (sortId: string) => {
        switch (sortId) {
            case 'newest':
                return { sortBy: 'createdAt', sortDirection: 'DESC' };
            case 'price-asc':
                return { sortBy: 'minPrice', sortDirection: 'ASC' };
            case 'price-desc':
                return { sortBy: 'minPrice', sortDirection: 'DESC' };
            case 'discount':
                return { sortBy: 'discountPercent', sortDirection: 'DESC' };
            case 'best-seller':
                return { sortBy: 'totalSold', sortDirection: 'DESC' };
            case 'popular':
            default:
                return { sortBy: 'avgRating', sortDirection: 'DESC' };
        }
    };

    const handleApplyPrice = () => {
        setAppliedMinPrice(minPrice);
        setAppliedMaxPrice(maxPrice);
        setPage(0);
    };

    const fetchProducts = useCallback(async (isLoadMore = false) => {
        // Must have either a category or a keyword to search
        if (!category && !keyword) return;

        if (isLoadMore) setIsFetchingMore(true);
        else setIsLoading(true);

        try {
            const { sortBy, sortDirection } = getSortParams(activeSort);
            const currentPage = isLoadMore ? page + 1 : 0;

            const params: any = {
                sortBy,
                sortDirection,
                page: currentPage,
                size: 12,
            };

            if (category) {
                params.categoryId = category.id;
            }
            if (keyword) {
                params.keyword = keyword;
            }
            if (appliedMinPrice) {
                params.minPrice = appliedMinPrice;
            }
            if (appliedMaxPrice) {
                params.maxPrice = appliedMaxPrice;
            }
            if (activeRating) {
                params.minRating = activeRating;
            }
            // activeAge mapping if backend supports it, for now we skip or need backend field

            const response = await api.get<ApiResponse<PageData<ProductResponse>>>('/products/search', { params });

            if (response.data && response.data.data) {
                const newProducts = response.data.data.content.map(convertProduct);
                if (isLoadMore) {
                    setProducts(prev => [...prev, ...newProducts]);
                } else {
                    setProducts(newProducts);
                }
                setTotalPages(response.data.data.totalPages);
                setTotalProducts(response.data.data.totalElements);
                setPage(currentPage);
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        } finally {
            setIsLoading(false);
            setIsFetchingMore(false);
        }
    }, [category, keyword, activeSort, page, appliedMinPrice, appliedMaxPrice, activeRating]);

    // Initial fetch or fetch on filter/category change
    useEffect(() => {
        fetchProducts();
    }, [category, keyword, activeSort, appliedMinPrice, appliedMaxPrice, activeRating]);

    const handleLoadMore = () => {
        if (page < totalPages - 1) {
            fetchProducts(true);
        }
    };

    // Loading state for initial page load vs filter updates via products check or specific state
    const isInitialLoad = (slug && !category) || (isLoading && products.length === 0 && page === 0 && !category && !keyword);

    if (isInitialLoad) {
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
                <div className="mt-4 overflow-hidden rounded-[24px] bg-white px-4 py-8 shadow-sm min-h-[600px]">
                    {/* Category Title & Info Button */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-baseline gap-4">
                            <h1 className="text-xl font-black text-[#e82e81] uppercase tracking-tight">
                                {category?.name || (keyword ? `Kết quả tìm kiếm: "${keyword}"` : 'Danh mục')}
                            </h1>
                            {category && (
                                <button className="flex items-center gap-1 group">
                                    <span className="text-[12px] font-medium text-[#2186EB] group-hover:underline">
                                        Tìm hiểu về {category.name}
                                    </span>
                                    <svg className="w-3 h-3 text-[#2186EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Sub-category Icons Navigation */}
                    <SubCategoryNav subCategories={category?.children || []} activeSlug={slug} />

                    {/* Filter & Brand Area */}
                    <div className="mt-8 space-y-6">
                        <BrandLogos
                            parentCategory={parentCategory}
                            relatedCategories={relatedCategories}
                            currentSlug={slug}
                        />
                        <ProductFilterSort
                            activeSort={activeSort}
                            onSortChange={setActiveSort}
                            activeAge={activeAge}
                            onAgeChange={setActiveAge}
                            minPrice={minPrice}
                            setMinPrice={setMinPrice}
                            maxPrice={maxPrice}
                            setMaxPrice={setMaxPrice}
                            activeRating={activeRating}
                            onRatingChange={setActiveRating}
                            onApplyPrice={handleApplyPrice}
                        />
                    </div>

                    {/* Search Results Count */}
                    <div className="mt-8">
                        <h2 className="text-sm font-bold text-slate-800">
                            Tìm thấy {totalProducts} sản phẩm {category?.name}
                        </h2>
                    </div>

                    {/* Product Grid */}
                    <div className="mt-6 relative min-h-[400px]">
                        {/* Loading Overlay for Filters */}
                        {isLoading && page === 0 && (
                            <div className="absolute inset-0 z-10 flex items-start justify-center bg-white/60 pt-20 backdrop-blur-[1px]">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#e82e81]"></div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {products.map((product) => (
                                <ProductCard key={`${product.id}-${slug}`} product={product} />
                            ))}
                        </div>

                        {!isLoading && products.length === 0 && (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <p>Không tìm thấy sản phẩm nào phù hợp.</p>
                            </div>
                        )}
                    </div>

                    {/* Load More */}
                    {page < totalPages - 1 && (
                        <div className="mt-12 flex justify-center">
                            <button
                                onClick={handleLoadMore}
                                disabled={isFetchingMore}
                                className="rounded-full border-[1.5px] border-[#e82e81] bg-white px-12 py-2.5 text-sm font-bold text-[#e82e81] shadow-sm transition-all hover:bg-[#e82e81] hover:text-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isFetchingMore ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                                        Đang tải...
                                    </>
                                ) : (
                                    'Xem thêm sản phẩm'
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
