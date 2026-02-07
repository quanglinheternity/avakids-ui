import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import axios from 'axios';

interface Category {
    id: number;
    name: string;
    slug: string;
    imageUrl: string;
    displayOrder: number;
    isActive: boolean;
    parentId: number | null;
    children: Category[];
}

interface ApiResponse {
    code: number;
    message: string;
    data: Category[];
}

const Sidebar = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const brands = [
        { name: 'Huggies', logo: 'https://cdn.tgdd.vn/Products/Images/8661/84869/bhx/huggies-avt-1-org.jpg' },
        { name: 'Huggies Nature made', logo: 'https://cdn.tgdd.vn/Products/Images/2539/308566/bhx/cac-san-pham-huggies-nature-made-hop-nhua-192-org.jpg' },
        { name: 'Bobby', logo: 'https://cdn.tgdd.vn/Products/Images/8661/272135/bhx/bobby-avt-1-org.jpg' },
        { name: 'Moony', logo: 'https://cdn.tgdd.vn/Products/Images/8661/84868/bhx/moony-avt-org.jpg' },
        { name: 'Molfix', logo: 'https://cdn.tgdd.vn/Products/Images/8661/235753/bhx/molfix-avatar-org.jpg' },

    ];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get<ApiResponse>('http://localhost:8080/avakids/api/v1/category/list');
                setCategories(res.data.data);
            } catch (error) {
                console.error("Failed to fetch categories", error);
                // Fallback to empty or handled error state
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const renderSubcategoryMenu = (subcategories: Category[], categoryName: string) => {
        if (!subcategories || subcategories.length === 0) return null;

        return (
            <div
                className="animate-fadeIn rounded-2xl border border-pink-100 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800"
                style={{ zIndex: 9999 }}
            >
                {/* Header */}
                <div className="border-b border-pink-100 bg-gradient-to-r from-pink-50 to-white px-5 py-3 dark:from-gray-800 dark:to-gray-700">
                    <h3 className="text-sm font-bold text-[#e82e81] dark:text-pink-400">{categoryName}</h3>
                </div>

                {/* Subcategories Grid */}
                <div className="grid grid-cols-5 gap-1 p-2" style={{ minWidth: '400px', maxWidth: '680px' }}>
                    {subcategories.map((sub) => (
                        <a
                            key={sub.id}
                            href="#"
                            className="group flex flex-col items-center gap-3"
                        >
                            <div className="relative flex h-12 w-12  items-center justify-center overflow-hidden rounded-2xl bg-white  ring-2 ring-pink-50 transition-all duration-300 group-hover:scale-105 group-hover:ring-pink-300">
                                <img
                                    src={sub.imageUrl}
                                    alt={sub.name}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <span className="block max-w-[80px] text-center text-xs font-bold leading-tight
                                text-slate-700 transition-colors duration-200
                                group-hover:text-[#e82e81] dark:text-gray-200
                                break-words whitespace-normal">
                                {sub.name}
                            </span>

                        </a>
                    ))}
                </div>

                {/* Footer */}
                <div className="border-t border-pink-100 px-4 py-3 text-center">
                    <a href="#" className="text-sm font-bold text-[#e82e81] transition hover:underline">
                        Xem tất cả {categoryName} →
                    </a>
                </div>
            </div>
        );
    };

    if (isLoading) {
        return <div className="h-96 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />;
    }

    return (
        <>
            <div className="overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-slate-100 dark:bg-card-dark dark:ring-0">
                <div className="border-b border-gray-100 p-4 dark:border-gray-700">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Danh mục</h2>
                </div>
                <nav className="hide-scrollbar flex max-h-[calc(200vh-250px)] flex-col overflow-y-auto py-2">
                    {categories.map((category) => (
                        <Tippy
                            key={category.id}
                            render={() => renderSubcategoryMenu(category.children, category.name)}
                            placement="right-start"
                            offset={[0, 8]}
                            interactive={true}
                            delay={[150, 100]}
                            disabled={!category.children || category.children.length === 0}
                            appendTo={() => document.body}
                        >
                            <a
                                className="group flex items-center px-4 py-3 text-sm text-slate-700 transition hover:bg-pink-50 hover:text-[#e82e81] dark:text-gray-200 dark:hover:bg-gray-700"
                                href="#"
                            >
                                <img
                                    alt={category.name}
                                    className="mr-3 h-8 w-8 object-contain"
                                    src={category.imageUrl}
                                />
                                <span className="flex-grow font-medium transition group-hover:text-[#e82e81]">
                                    {category.name}
                                </span>
                                <span className="material-icons text-sm text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#e82e81]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                </span>
                            </a>
                        </Tippy>
                    ))}
                </nav>
            </div>

            {/* Brand Showcase Section */}
            <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-slate-100 dark:bg-card-dark dark:ring-0">
                <div className="border-b border-gray-100 p-4 dark:border-gray-700">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Thương hiệu nổi bật</h2>
                </div>
                <div className="grid grid-cols-2 gap-3 p-4">
                    {brands.map((brand, index) => (
                        <a
                            key={index}
                            href="#"
                            className="group flex flex-col items-center justify-center rounded-lg border border-slate-100 bg-white p-3 transition hover:border-pink-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                        >
                            <div className="mb-2 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white p-1">
                                <img
                                    alt={brand.name}
                                    className="h-full w-full object-contain"
                                    src={brand.logo}
                                />
                            </div>
                            <span className="text-center text-xs font-medium text-slate-700 transition group-hover:text-[#e82e81] dark:text-gray-200">
                                {brand.name}
                            </span>
                        </a>
                    ))}
                    <a
                        href="#"
                        className="group flex flex-col items-center justify-center rounded-lg border border-slate-100 bg-gradient-to-br from-pink-50 to-white p-3 transition hover:border-pink-200 hover:shadow-md dark:border-gray-700 dark:from-gray-800 dark:to-gray-700"
                    >
                        <div className="mb-2 flex h-12 w-12 items-center justify-center">
                            <svg className="h-6 w-6 text-[#e82e81]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </div>
                        <span className="text-center text-xs font-medium text-[#e82e81] transition">
                            Xem tất cả
                        </span>
                    </a>
                </div>
            </div>
        </>
    );
};

export default Sidebar;

