const ServiceInfoSection = () => {
    return (
        <div className="pt-6">
            <section className="overflow-hidden rounded-xl bg-pink-50 shadow-sm dark:bg-gray-800 ">
                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3 w-[1200px] mx-auto">
                    {/* 100% sản phẩm chính hãng */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/20">
                            <svg className="h-6 w-6 text-pink-600 dark:text-pink-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm-2 13l-4-4 1.41-1.41L10 12.17l6.59-6.59L18 7l-8 8z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                100% sản phẩm chính hãng
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                hơn 100 thương hiệu nổi tiếng
                            </p>
                        </div>
                    </div>

                    {/* 1 Đổi 1 trong vòng 1 tháng */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/20">
                            <svg className="h-6 w-6 text-pink-600 dark:text-pink-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                1 Đổi 1 trong vòng 1 tháng{' '}
                                <span className="text-xs font-normal text-gray-500">(Tùy sản phẩm)</span>
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Tại 88 cửa hàng trên toàn quốc{' '}
                                <button className="text-pink-600 hover:underline dark:text-pink-400">
                                    Xem chi tiết
                                </button>
                            </p>
                        </div>
                    </div>

                    {/* Miễn phí giao hàng */}
                    <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/20">
                            <svg className="h-6 w-6 text-pink-600 dark:text-pink-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 18.5a1.5 1.5 0 0 1-1.5-1.5 1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 0 1 1.5 1.5 1.5 1.5 0 0 1-1.5 1.5m1.5-9l1.96 2.54L17 14V9m-11 9.5c-0.83 0-1.5-0.67-1.5-1.5s0.67-1.5 1.5-1.5 1.5 0.67 1.5 1.5-0.67 1.5-1.5 1.5M20 8h-3V4H3c-1.11 0-2 0.89-2 2v11h2a3 3 0 0 0 3 3 3 3 0 0 0 3-3h6a3 3 0 0 0 3 3 3 3 0 0 0 3-3h2v-5l-3-4z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                Miễn phí giao hàng
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Cho đơn từ 500.000đ trong 10km đầu tiên{' '}
                                <button className="text-pink-600 hover:underline dark:text-pink-400">
                                    Xem chi tiết
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceInfoSection;
