


const ProductReviews = () => {
    return (
        <div id="commentRating" className="flex flex-col gap-[14px] rounded-[16px] bg-white p-[20px] border border-gray-200 dark:border-gray-700">
            <div className="flex gap-[8px]">
                <div className="flex gap-[12px] items-center">
                    <span className="h-[22px] w-[4px] rounded-br-[4px] rounded-tr-[4px] bg-gradient-to-r from-[#ED1164] to-[#FF438A]"></span>
                    <p className="text-[18px] font-700 leading-[22px] text-primary-400">Đánh giá</p>
                </div>
            </div>

            <div className="flex w-full justify-between gap-[12px]">
                {/* Rating Score */}
                <div className="w-[40%] text-center">
                    <div className="m-[20px]">
                        <span className="text-[50px] font-700 text-primary-400">4.6</span>
                        <span className="text-[25px] font-700 text-primary-400">/5</span>
                    </div>
                    <span className="block text-[12px] font-500 leading-[16px] text-gray-700">7 Đánh giá</span>
                </div>

                {/* Progress Bars */}
                <div className="mx-[10px] flex w-full flex-col gap-[10px]">
                    {[5, 4, 3, 2, 1].map((star, index) => (
                        <div key={star} className="flex items-center gap-[10px]">
                            <div className="flex w-[40px] gap-[10px] items-center">
                                <span className="text-[11px] font-700 text-black-100">{star}</span>
                                <span className="text-yellow-400 text-xs">★</span>
                            </div>
                            <div className="h-[8px] w-full overflow-hidden rounded-full bg-pink-100">
                                <div
                                    className="h-full rounded-full bg-[linear-gradient(90deg,#ED1164_30.6%,#FF438A_83.54%)]"
                                    style={{ width: index === 0 ? '57%' : index === 1 ? '43%' : '0%' }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Review List */}
            <div className="rounded-[24px] bg-pink-50 p-[10px]">
                <div id="comment-0" className="mb-[8px]">
                    <div className="mb-[8px] flex items-start justify-between">
                        <div className="mb-[8px] text-[16px] font-700 text-black-700">Phương</div>
                        <div className="flex items-center gap-[6px]">
                            <div className="text-[10px] font-400 text-gray-400">28/04/2024</div>
                            <div className="flex items-center gap-[6px]">
                                <div className="text-[12px] font-700 text-primary-400">5</div>
                                <span className="text-pink-500 text-xs">★</span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-[8px] text-left text-[14px] text-gray-600 line-clamp-3">
                        Tốt lắm ạ
                    </div>
                </div>
            </div>

            <button className="m-auto block rounded-full border border-primary-500 px-[20px] py-[8px] text-primary-500 hover:bg-pink-50">
                Xem tất cả
            </button>
        </div>
    );
};

export default ProductReviews;
