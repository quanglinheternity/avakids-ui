interface FilterProps {
    activeSort: string;
    onSortChange: (sortId: string) => void;
    activeAge: string | null;
    onAgeChange: (ageId: string | null) => void;
    minPrice: string;
    setMinPrice: (price: string) => void;
    maxPrice: string;
    setMaxPrice: (price: string) => void;
    activeRating: number | null;
    onRatingChange: (rating: number | null) => void;
    onApplyPrice: () => void;
}

const ProductFilterSort = ({
    activeSort,
    onSortChange,
    activeAge,
    onAgeChange,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    activeRating,
    onRatingChange,
    onApplyPrice
}: FilterProps) => {
    const sortOptions = [
        { id: 'popular', label: 'Nổi bật' },
        { id: 'best-seller', label: 'Bán chạy' },
        { id: 'discount', label: '% Giảm' },
        { id: 'newest', label: 'Mới nhất' },
        { id: 'price-asc', label: 'Giá thấp - cao' },
        { id: 'price-desc', label: 'Giá cao - thấp' },
    ];

    // const ageFilters = [
    //     { id: 'under-6m', label: 'Dưới 6 tháng', icon: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202506/be-0-6-thang-tuoi151913.png' },
    //     { id: '6-12m', label: '6 - 12 tháng', icon: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202506/be-6-12-thang-tuoi151931.png' },
    //     { id: '1-2y', label: '1 - 2 tuổi', icon: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202506/be-1-2-tuoi151942.png' },
    //     { id: '2-6y', label: '2 - 6 tuổi', icon: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202506/be-2-6-tuoi151957.png' },
    //     { id: 'over-6y', label: 'Từ 6 tuổi', icon: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202506/be-tren-6-tuoi152009.png' },
    // ];

    const ratings = [5, 4, 3];

    return (
        <div className="flex flex-col gap-4 mt-4">
            {/* Age Filters */}
            {/* <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-700">Độ tuổi:</span>
                    {ageFilters.map((age) => (
                        <button
                            key={age.id}
                            onClick={() => onAgeChange(activeAge === age.id ? null : age.id)}
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
            </div> */}

            {/* Price Filter */}
            <div className="flex items-center gap-4 flex-wrap bg-white p-3 rounded-xl border border-gray-100">
                <span className="text-sm font-semibold text-gray-700">Mức giá:</span>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        placeholder="Thấp nhất"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-28 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#e82e81] focus:ring-1 focus:ring-[#e82e81]"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                        type="number"
                        placeholder="Cao nhất"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-28 px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#e82e81] focus:ring-1 focus:ring-[#e82e81]"
                    />
                    <button
                        onClick={onApplyPrice}
                        className="px-4 py-1.5 text-sm bg-[#e82e81] text-white rounded-md hover:bg-pink-600 transition-colors"
                    >
                        Áp dụng
                    </button>
                </div>

                <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>

                {/* Rating Filter */}
                <span className="text-sm font-semibold text-gray-700">Đánh giá:</span>
                <div className="flex items-center gap-2">
                    {ratings.map((star) => (
                        <button
                            key={star}
                            onClick={() => onRatingChange(activeRating === star ? null : star)}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-sm transition-all ${activeRating === star
                                ? 'border-[#e82e81] bg-pink-50 text-[#e82e81]'
                                : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                }`}
                        >
                            <span>{star}</span>
                            <svg className={`w-4 h-4 ${activeRating === star ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </button>
                    ))}
                </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center text-sm text-slate-500 py-2">
                <span className="mr-4 font-semibold text-gray-700">Sắp xếp theo:</span>
                <div className="flex items-center gap-4 flex-wrap">
                    {sortOptions.map((option, idx) => (
                        <div key={option.id} className="flex items-center">
                            <button
                                onClick={() => onSortChange(option.id)}
                                className={`font-medium transition-colors ${activeSort === option.id ? 'text-[#e82e81]' : 'text-slate-600 hover:text-slate-900'
                                    }`}
                            >
                                {option.label}
                                {(option.id === 'price-asc' || option.id === 'price-desc' || option.id === 'discount') && <i className="inline-block ml-1 border-t-4 border-l-4 border-r-4 border-t-current border-l-transparent border-r-transparent mb-0.5"></i>}
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
