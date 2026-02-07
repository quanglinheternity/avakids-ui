
const ProductSpecs = () => {
    return (
        <div id="contentRef" className="relative max-h-[500px] overflow-hidden rounded-[16px] bg-white p-[20px] transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="mb-[12px] flex items-center gap-[8px]">
                {/* Icon Title placeholder */}
                <div className="h-6 w-1 bg-primary-400 rounded-full"></div>
                <p className="text-[18px] font-700 leading-[22px] text-primary-400">Thông tin chi tiết</p>
            </div>

            <div className="mx-auto my-[12px] mb-[12px] flex w-fit items-center justify-center gap-[6px] rounded-[24px] bg-gray-100 p-[5px]">
                <button className="w-[213px] rounded-[24px] bg-primary-400 p-[8px] text-white transition-colors duration-300" disabled>
                    Thông số kỹ thuật
                </button>
                <button className="w-[213px] rounded-[24px] p-[8px] text-gray-700 transition-colors duration-300 hover:bg-primary-400 hover:text-white">
                    Bài viết chi tiết
                </button>
            </div>

            <div className="mb-[12px] flex h-[65px] items-center justify-between gap-[12px] rounded-[12px] bg-blue-50 p-[12px]">
                <div className="flex items-center gap-[12px]">
                    <div className="relative h-auto w-[65px] overflow-hidden rounded-full bg-white">
                        <img
                            src="https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202505/Huggies-200x120-1-200x120174519.png"
                            alt="HUGGIES"
                            className="h-[65px] w-[65px] object-contain"
                        />
                    </div>
                    <span className="text-[15px] font-700 leading-[18px]">HUGGIES</span>
                </div>
                <a className="h-[32px] w-[105px] rounded-full bg-[linear-gradient(90deg,#FF0062_0%,#FF33A3_83.54%)] text-center leading-[30px] text-white" href="/huggies">
                    Xem hãng
                </a>
            </div>

            {/* Spec Items */}
            <div className="mb-[8px] grid grid-cols-2 gap-[8px]">
                <div className="flex min-h-[34px] pt-[4px] text-[13px] font-500 leading-[18px] text-gray-700">Ngành hàng</div>
                <div className="flex min-h-[34px] flex-col text-[13px] font-500 leading-[18px] text-black-100">
                    <li className="relative my-[2px] list-none first:mt-[4px] last:mb-[4px]">Bỉm, tã</li>
                </div>
            </div>
            <div className="mb-[8px] grid grid-cols-2 gap-[8px]">
                <div className="flex min-h-[34px] pt-[4px] text-[13px] font-500 leading-[18px] text-gray-700">Lưu ý khi sử dụng</div>
                <div className="flex min-h-[34px] flex-col text-[13px] font-500 leading-[18px] text-black-100">
                    <li className="relative my-[2px] first:mt-[4px] last:mb-[4px]">Thay tã sau khoảng thời gian đều đặn</li>
                    <li className="relative my-[2px] first:mt-[4px] last:mb-[4px]">Thay ngay sau khi bé tiểu bẩn</li>
                    <li className="relative my-[2px] first:mt-[4px] last:mb-[4px]">Ngưng sử dụng...</li>
                </div>
            </div>

            <div className="mb-[8px] grid grid-cols-2 gap-[8px]">
                <div className="flex min-h-[34px] pt-[4px] text-[13px] font-500 leading-[18px] text-gray-700">Nơi sản xuất</div>
                <div className="flex min-h-[34px] flex-col text-[13px] font-500 leading-[18px] text-black-100">
                    <li className="relative my-[2px] list-none first:mt-[4px] last:mb-[4px]">Việt Nam</li>
                </div>
            </div>

            <div className="mb-[8px] grid grid-cols-2 gap-[8px]">
                <div className="flex min-h-[34px] pt-[4px] text-[13px] font-500 leading-[18px] text-gray-700">Chất liệu</div>
                <div className="flex min-h-[34px] flex-col text-[13px] font-500 leading-[18px] text-black-100">
                    <li className="relative my-[2px] first:mt-[4px] last:mb-[4px]">Thun đàn hồi</li>
                    <li className="relative my-[2px] first:mt-[4px] last:mb-[4px]">Hạt thấm hút Polymer</li>
                    <li className="relative my-[2px] first:mt-[4px] last:mb-[4px]">Bột giấy</li>
                </div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-[120px] w-full bg-[linear-gradient(180deg,hsla(0,0%,100%,0),#fff_101.03%)]"></div>
            <button className="absolute bottom-0 left-0 right-0 m-auto block w-fit px-[6px] pb-2 text-[14px] font-400 leading-[20px] text-blue-100 hover:underline">
                Xem thêm
            </button>
        </div>
    );
};

export default ProductSpecs;
