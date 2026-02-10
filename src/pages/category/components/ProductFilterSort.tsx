import { useState } from 'react';

const ProductFilterSort = () => {
    const [activeSort, setActiveSort] = useState('popular');
    const [activeAge, setActiveAge] = useState<string | null>(null);

    const sortOptions = [
        { id: 'popular', label: 'Nổi bật' },
        { id: 'best-seller', label: 'Bán chạy' },
        { id: 'discount', label: '% Giảm' },
        { id: 'newest', label: 'Mới nhất' },
        { id: 'price', label: 'Giá' },
    ];

    const ageFilters = [
        { id: 'under-6m', label: 'Dưới 6 tháng', icon: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202506/be-0-6-thang-tuoi151913.png' },
        { id: '6-12m', label: '6 - 12 tháng', icon: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202506/be-6-12-thang-tuoi151931.png' },
        { id: '1-2y', label: '1 - 2 tuổi', icon: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202506/be-1-2-tuoi151942.png' },
        { id: '2-6y', label: '2 - 6 tuổi', icon: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202506/be-2-6-tuoi151957.png' },
        { id: 'over-6y', label: 'Từ 6 tuổi', icon: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202506/be-tren-6-tuoi152009.png' },
    ];

    return (
        <div className="flex flex-col gap-4 mt-4">
            {/* Age Filters */}
            <div className="flex flex-wrap gap-2">
                <button className="flex h-[42px] w-[90px] flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-bold text-slate-700 hover:border-pink-300 hover:text-[#e82e81]">
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="2" y1="14" x2="6" y2="14" /><line x1="10" y1="8" x2="14" y2="8" /><line x1="18" y1="16" x2="22" y2="16" /></svg>
                        Lọc
                    </span>
                </button>
                {ageFilters.map((age) => (
                    <button
                        key={age.id}
                        onClick={() => setActiveAge(activeAge === age.id ? null : age.id)}
                        className={`flex h-10 items-center rounded-lg border px-3 transition-all ${activeAge === age.id
                                ? 'border-[#e82e81] bg-pink-50 text-[#e82e81]'
                                : 'border-slate-100 bg-white text-slate-700 hover:border-slate-300'
                            }`}
                    >
                        <img src={age.icon} alt={age.label} className="mr-2 h-7 w-7 object-contain" />
                        <span className="text-sm whitespace-nowrap">{age.label}</span>
                    </button>
                ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center text-sm text-slate-500 py-2">
                <span className="mr-4">Sắp xếp theo:</span>
                <div className="flex items-center gap-4 flex-wrap">
                    {sortOptions.map((option, idx) => (
                        <div key={option.id} className="flex items-center">
                            <button
                                onClick={() => setActiveSort(option.id)}
                                className={`font-medium transition-colors ${activeSort === option.id ? 'text-[#e82e81]' : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                {option.label}
                                {option.id === 'price' || option.id === 'discount' ? <i className="inline-block ml-1 border-t-4 border-l-4 border-r-4 border-t-current border-l-transparent border-r-transparent mb-0.5"></i> : ''}
                            </button>
                            {idx < sortOptions.length - 1 && (
                                <span className="mx-4 h-1.5 w-1.5 rounded-full bg-slate-300"></span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductFilterSort;
