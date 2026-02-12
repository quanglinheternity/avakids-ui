import { Link } from 'react-router-dom';

interface Category {
    id: number;
    name: string;
    slug: string;
    imageUrl: string;
    children?: Category[];
}

interface BrandLogosProps {
    parentCategory: Category | null;
    relatedCategories: Category[];
    currentSlug?: string;
}

const BrandLogos = ({ parentCategory, relatedCategories, currentSlug }: BrandLogosProps) => {
    if (!parentCategory && relatedCategories.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 items-center">
            {parentCategory && (
                <>
                    <span
                        className="flex h-9 items-center rounded-full border border-[#e82e81] bg-white px-4 text-sm font-medium text-[#e82e81]"
                    >
                        <span className="mr-1">All</span> {parentCategory.name}
                    </span>
                    <div className="h-6 w-[1px] bg-slate-300 mx-1"></div>
                </>
            )}

            {relatedCategories.map((cat) => (
                <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className={`flex h-9 items-center rounded-full border px-4 text-sm font-medium transition-all ${currentSlug === cat.slug
                        ? 'border-[#e82e81] bg-[#e82e81] text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-pink-300 hover:text-[#e82e81]'
                        }`}
                >
                    {cat.name}
                </Link>
            ))}
        </div>
    );
};

export default BrandLogos;
