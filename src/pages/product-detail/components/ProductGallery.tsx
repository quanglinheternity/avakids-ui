import { useState } from 'react';

interface ProductGalleryProps {
    images: string[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextImage = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="flex gap-2 ">
            <div className="flex w-full flex-col gap-[20px]">
                <div className="relative rounded-[16px] bg-white p-4 border border-gray-200 dark:border-gray-700">
                    <div className="m-auto flex h-auto w-full flex-col gap-[16px]">
                        <div className="relative">
                            <div className="relative flex-1 overflow-hidden">
                                <div className="flex transition-transform duration-300 ease-out" style={{ transform: `translate3d(-${activeIndex * 100}%, 0px, 0px)` }}>
                                    {images.map((img, index) => (
                                        <button key={index} className="min-w-0 flex-[0_0_100%]">
                                            <div className="relative h-auto w-full cursor-pointer overflow-hidden flex justify-center">
                                                <img
                                                    alt={`Product ${index + 1}`}
                                                    className="object-contain opacity-100 w-full max-h-[500px] h-auto"
                                                    src={img}
                                                />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <button className="absolute bottom-[2px] left-0 cursor-pointer p-2">
                                    {/* Zoom Icon Placeholder - Replace with actual icon if available or SVG */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                                </button>
                                <div className="absolute bottom-[2px] right-0 flex w-[96px] items-center justify-center text-center text-sm font-bold text-white">
                                    <button onClick={prevImage} className="relative h-[32px] w-[30px] cursor-pointer rounded-l-[24px] bg-gray-50 hover:bg-black/10 before:absolute before:left-[13px] before:top-[11px] before:h-[10px] before:w-[10px] before:rotate-[-45deg] before:border-l before:border-t before:border-gray-600 before:content-['']"></button>
                                    <span className="h-[32px] w-[60px] bg-gray-50 leading-[32px] text-gray-600">{activeIndex + 1} | {images.length}</span>
                                    <button onClick={nextImage} className="relative h-[32px] w-[30px] cursor-pointer rounded-r-[24px] bg-gray-50 hover:bg-black/10 before:absolute before:left-[4px] before:top-[10px] before:h-[10px] before:w-[10px] before:rotate-[-225deg] before:border-l before:border-t before:border-gray-600 before:content-['']"></button>
                                </div>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="relative flex items-end p-4">
                            <div className="m-auto flex gap-[8px] overflow-auto scroll-smooth no-scrollbar p-1">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className={`snap-start flex-[0_0_66px] overflow-hidden rounded-[8px] border ${activeIndex === index ? 'border-pink-500 shadow-[0px_0px_4px_0px_#F39AC0]' : 'border-gray-200'}`}
                                    >
                                        <div className="relative h-[66px] w-[66px] overflow-hidden rounded-[8px]">
                                            <img
                                                alt={`Thumbnail ${index + 1}`}
                                                className="object-cover opacity-100 w-[66px] h-auto"
                                                src={img}
                                            />
                                        </div>
                                    </button>
                                ))}
                            </div>
                            {/* Navigation Arrow for Thumbnails (Visual only as per snippet structure) */}
                            <button className="absolute right-0 top-[20%] z-10 h-[40px] w-[40px]">
                                <div className="group flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white opacity-80 transition-colors duration-200 hover:bg-pink-400 active:bg-pink-400">
                                    <div className="mr-[4px] h-[10px] w-[10px] rotate-45 border-r border-t border-pink-400 transition-colors duration-200 group-hover:border-white group-active:border-white"></div>
                                </div>
                            </button>
                        </div>

                        {/* Service Info Section */}
                        <div className="mt-[10px] grid grid-cols-2 gap-[12px]">
                            <div className="flex gap-6">
                                <div>
                                    <div className="relative h-auto overflow-hidden" style={{ height: '18px', width: '18px' }}>
                                        <img src="https://cdnv2.tgdd.vn/pim/cdn/images/202505/chinh-sach-tong-dai154408.png" alt="" className="!h-[18px] !w-[18px] object-contain opacity-100" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[14px] leading-[20px] text-gray-900">
                                        <p><span>Tổng đài: </span><a href="tel:1900866874"><strong>1900.866.874</strong></a><br /><span>(8:00 - 21:30)</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div>
                                    <div className="relative h-auto overflow-hidden" style={{ height: '18px', width: '18px' }}>
                                        <img src="https://cdnv2.tgdd.vn/pim/cdn/images/202505/chinh-sach-thanh-toan145046.png" alt="" className="!h-[18px] !w-[18px] object-contain opacity-100" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[14px] leading-[20px] text-gray-900">
                                        <p><span>Giao hàng thu tiền, thanh toán online nhiều phương thức</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div>
                                    <div className="relative h-auto overflow-hidden" style={{ height: '18px', width: '18px' }}>
                                        <img src="https://cdnv2.tgdd.vn/pim/cdn/images/202505/chinh-sach-giao-hang154043.png" alt="" className="!h-[18px] !w-[18px] object-contain opacity-100" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[14px] leading-[20px] text-gray-900">
                                        <p><span>Miễn phí giao hàng đơn từ 500.000đ trong 10km đầu tiên</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div>
                                    <div className="relative h-auto overflow-hidden" style={{ height: '18px', width: '18px' }}>
                                        <img src="https://cdnv2.tgdd.vn/pim/cdn/images/202505/chinh-sach-bao-hanh145354.png" alt="" className="!h-[18px] !w-[18px] object-contain opacity-100" />
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[14px] leading-[20px] text-gray-900">
                                        <p><span>Hoàn tiền, đổi trả trong </span><strong>7 ngày</strong><span>.&nbsp;</span></p>
                                    </div>
                                    <button className="text-[13px] font-medium text-blue-600">Xem ngay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductGallery;
