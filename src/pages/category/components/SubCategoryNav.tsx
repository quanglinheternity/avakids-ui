import { Link } from 'react-router-dom';

interface SubCategory {
    id: number;
    name: string;
    imageUrl: string;
    slug: string;
}

interface SubCategoryNavProps {
    subCategories: SubCategory[];
    activeSlug?: string;
}

const SubCategoryNav = ({ subCategories, activeSlug }: SubCategoryNavProps) => {

    return (
        <div className="border-b border-slate-100">
            <div className="hide-scrollbar flex gap-4 overflow-x-auto">
                {subCategories.map((sub) => {
                    const isActive = sub.slug === activeSlug;
                    return (
                        <Link
                            key={sub.id}
                            to={`/category/${sub.slug}`}
                            className="group relative flex h-[96px] w-[85px] flex-shrink-0 flex-col items-center justify-center gap-2 pb-4 transition-all"
                        >
                            <div className="relative h-10 w-10 overflow-hidden">
                                <img
                                    src={sub.imageUrl}
                                    alt={sub.name}
                                    className="h-full w-full object-contain"
                                />
                            </div>
                            <span className={`block w-20 line-clamp-2 px-1 text-center text-[13px] font-medium leading-tight transition-colors ${isActive ? 'text-[#e82e81]' : 'text-slate-700 group-hover:text-[#e82e81]'
                                }`}>
                                {sub.name}
                            </span>
                            {isActive && (
                                <hr className="absolute bottom-0 left-1/2 z-1 w-6 -translate-x-1/2 rounded-full border-b-[3px] border-solid border-[#e82e81]" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default SubCategoryNav;
