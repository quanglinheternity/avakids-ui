const Footer = () => {
    return (
        <footer className="bg-[#ed1164] text-white">
            {/* Main Footer Content */}
            <div className="mx-auto max-w-[1200px] px-4 py-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Tổng đài */}
                    <div>
                        <h3 className="mb-3 text-sm font-bold uppercase text-white">TỔNG ĐÀI</h3>
                        <ul className="space-y-2 text-sm text-white/90">
                            <li>
                                Gọi mua:{' '}
                                <a href="tel:1900866874" className="font-semibold hover:underline">
                                    1900.866.874
                                </a>{' '}
                                <span className="text-xs">(8:00 - 21:30)</span>
                            </li>
                            <li>
                                Khiếu nại:{' '}
                                <a href="tel:1900866894" className="font-semibold hover:underline">
                                    1900.866.894
                                </a>{' '}
                                <span className="text-xs">(7:30 - 22:00)</span>
                            </li>
                            <li className="pt-2">
                                <a href="#" className="hover:underline">
                                    Kết nối với chúng tôi
                                </a>
                            </li>
                        </ul>
                        {/* Social Icons */}
                        <div className="mt-3 flex gap-2">
                            <a
                                href="#"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/30"
                            >
                                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/30"
                            >
                                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/30"
                            >
                                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>
                        {/* Trust Badges */}
                        <div className="mt-4 flex items-center gap-2">
                            <a href="#" className="iconlogo-bocongthuong"></a>
                            <img
                                src="https://tinnhiemmang.vn/handle_cert?id=avakids.com"
                                alt="DMCA Protected"
                                className="h-10"
                            />
                            <a href="#" className="iconlogo-dmca"></a>
                        </div>
                    </div>

                    {/* Hệ thống cửa hàng */}
                    <div>
                        <h3 className="mb-3 text-sm font-bold uppercase text-white">HỆ THỐNG CỬA HÀNG</h3>
                        <ul className="space-y-2 text-sm text-white/90">
                            <li>
                                <a href="#" className="hover:underline">
                                    Tại 88 cửa hàng trên toàn quốc
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Nội quy cửa hàng
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Chất lượng phục vụ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Chính sách đổi trả, bảo hành
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Tích điểm Quà tặng VIP
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Hỗ trợ khách hàng */}
                    <div>
                        <h3 className="mb-3 text-sm font-bold uppercase text-white">HỖ TRỢ KHÁCH HÀNG</h3>
                        <ul className="space-y-2 text-sm text-white/90">
                            <li>
                                <a href="#" className="hover:underline">
                                    Lịch sử đơn hàng
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Điều kiện giao dịch chung
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Hướng dẫn mua hàng online
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Chính sách giao hàng
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Chính sách thanh toán
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Chính sách xử lý lỗi đơn
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Về thương hiệu AVAKids */}
                    <div>
                        <h3 className="mb-3 text-sm font-bold uppercase text-white">VỀ THƯƠNG HIỆU AVAKIDS</h3>
                        <ul className="space-y-2 text-sm text-white/90">
                            <li>
                                <a href="#" className="hover:underline">
                                    Giới thiệu công ty
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Quy định đăng bình luận
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Chính sách xử lý dữ liệu cá nhân
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Quy mô của AVAKids
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 border-t border-white/20 pt-4 text-xs text-white/80">
                    <p>
                        © 2025. CÔNG TY THIẾT THỰC MẸ VÀ BÉ AVAKIDS. MSDN: 0318797000 Đăng ký lần đầu ngày: 14 tháng 11 năm 2025 do Sở Kế Hoạch thành phố Hồ Chí Minh cấp.
                    </p>
                    <p className="mt-1">
                        Địa chỉ: 128 Trần Quang Khải, P. Tân Định, TP.Hồ Chí Minh. Điện thoại: 028.38125656. Email: cskh@avakids.com. Chịu trách nhiệm nội dung: Huỳnh Văn Toč.
                    </p>
                </div>
            </div>

            {/* Partner Logos */}
            <div className="border-t border-pink-700 bg-white py-4">
                <div className="mx-auto max-w-[1200px] px-4 pb-4">
                    <p className="mb-3 text-center text-xs text-gray-600">
                        Ghé thăm các website khác cùng tập đoàn MWG
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <a href="#" className="iconlogo-topzoneDT"></a>
                        <a href="#" className="iconlogo-bhxDT"></a>
                        <a href="#" className="iconlogo-tgddDT"></a>
                        <a href="#" className="iconlogo-dmxDT"></a>
                        <a href="#" className="iconlogo-ankhangDT"></a>
                        <a href="#" className="iconlogo-vieclamDT"></a>
                        <a href="#" className="iconlogo-erablueDT"></a>
                        <a href="#" className="iconlogo-thodmxDT"></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;