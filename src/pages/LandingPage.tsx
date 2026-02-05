type Category = {
    name: string;
    description: string;
};

type Product = {
    name: string;
    price: string;
    badge?: string;
};

const categories: Category[] = [
    { name: 'Sữa & Dinh dưỡng', description: 'Tăng đề kháng, phát triển chiều cao' },
    { name: 'Bỉm tã', description: 'Mềm mịn, thấm hút tốt, chống tràn' },
    { name: 'Đồ ăn dặm', description: 'Đa dạng vị, an toàn cho bé' },
    { name: 'Chăm sóc mẹ & bé', description: 'Dịu nhẹ, không kích ứng' },
    { name: 'Đồ chơi giáo dục', description: 'Học mà chơi, phát triển tư duy' },
    { name: 'Thời trang bé', description: 'Thoáng mát, dễ vận động' },
];

const bestSellers: Product[] = [
    { name: 'Sữa công thức Premium 900g', price: '589.000đ', badge: 'Bán chạy' },
    { name: 'Tã quần siêu thấm size M (56 miếng)', price: '349.000đ' },
    { name: 'Bánh ăn dặm hữu cơ (10 gói)', price: '129.000đ', badge: 'Mới' },
    { name: 'Nước giặt em bé 2L', price: '189.000đ' },
];

const perks = [
    { title: 'Giao nhanh 2H', desc: 'Nội thành, theo khung giờ bạn chọn' },
    { title: 'Đổi trả dễ', desc: 'Trong 7 ngày với sản phẩm đủ điều kiện' },
    { title: 'Hàng chính hãng', desc: 'Cam kết nguồn gốc rõ ràng' },
    { title: 'Tích điểm', desc: 'Ưu đãi cho đơn hàng tiếp theo' },
];

const LandingPage = () => {
    return (
        <div className="w-full bg-white">
            {/* Hero */}
            <section className="bg-gradient-to-b from-pink-50 via-white to-white">
                <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-4 py-10 lg:grid-cols-2 lg:items-center lg:py-16">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-pink-700 ring-1 ring-pink-200">
                            <span className="inline-block size-2 rounded-full bg-pink-500" />
                            Ưu đãi hôm nay: freeship đơn từ 299k
                        </div>

                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            Mua sắm cho bé nhanh, dễ và an tâm mỗi ngày
                        </h1>
                        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                            Tập trung vào sản phẩm thiết yếu cho mẹ & bé, gợi ý theo độ tuổi, giao hàng nhanh và hỗ trợ
                            đổi trả rõ ràng.
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <a
                                href="#best-sellers"
                                className="inline-flex h-11 items-center justify-center rounded-full bg-[#e82e81] px-6 text-sm font-semibold text-white shadow-sm hover:brightness-95 active:brightness-90"
                            >
                                Mua ngay sản phẩm bán chạy
                            </a>
                            <a
                                href="#categories"
                                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-50"
                            >
                                Xem danh mục
                            </a>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {perks.map((p) => (
                                <div key={p.title} className="rounded-2xl bg-white p-4 ring-1 ring-slate-100">
                                    <div className="text-sm font-semibold text-slate-900">{p.title}</div>
                                    <div className="mt-1 text-xs leading-5 text-slate-600">{p.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -top-6 -left-6 hidden size-24 rounded-3xl bg-pink-100 lg:block" />
                        <div className="absolute -bottom-6 -right-6 hidden size-28 rounded-3xl bg-indigo-100 lg:block" />

                        <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-semibold text-slate-900">Gợi ý theo độ tuổi</div>
                                <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                                    0–36 tháng
                                </div>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-4">
                                {[
                                    { t: 'Sữa', s: '0–12 tháng' },
                                    { t: 'Bỉm tã', s: '0–36 tháng' },
                                    { t: 'Ăn dặm', s: '6–24 tháng' },
                                    { t: 'Chăm sóc', s: 'mọi độ tuổi' },
                                ].map((x) => (
                                    <div
                                        key={x.t}
                                        className="rounded-2xl bg-gradient-to-b from-slate-50 to-white p-4 ring-1 ring-slate-100"
                                    >
                                        <div className="text-sm font-semibold text-slate-900">{x.t}</div>
                                        <div className="mt-1 text-xs text-slate-600">{x.s}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 rounded-2xl bg-[#e82e81] p-5 text-white">
                                <div className="text-sm font-semibold">Voucher lần đầu</div>
                                <div className="mt-1 text-2xl font-bold">-50.000đ</div>
                                <div className="mt-2 text-xs text-white/90">
                                    Áp dụng cho đơn từ 399k. Không áp dụng sản phẩm giảm sâu.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section id="categories" className="border-t border-slate-100 bg-white">
                <div className="mx-auto max-w-[1200px] px-4 py-10">
                    <div className="flex items-end justify-between gap-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Danh mục nổi bật</h2>
                            <p className="mt-1 text-sm text-slate-600">Chọn nhanh thứ bạn cần — tối ưu cho mẹ bận rộn.</p>
                        </div>
                        <a href="#" className="hidden text-sm font-semibold text-[#e82e81] hover:underline sm:inline">
                            Xem tất cả
                        </a>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {categories.map((c) => (
                            <a
                                key={c.name}
                                href="#"
                                className="group rounded-3xl bg-slate-50 p-5 ring-1 ring-slate-100 transition hover:bg-white hover:shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="text-base font-semibold text-slate-900">{c.name}</div>
                                        <div className="mt-1 text-sm text-slate-600">{c.description}</div>
                                    </div>
                                    <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-white text-slate-700 ring-1 ring-slate-200 group-hover:bg-slate-50">
                                        →
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Best sellers */}
            <section id="best-sellers" className="border-t border-slate-100 bg-white">
                <div className="mx-auto max-w-[1200px] px-4 py-10">
                    <div className="flex items-end justify-between gap-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Sản phẩm bán chạy</h2>
                            <p className="mt-1 text-sm text-slate-600">
                                Top lựa chọn được ba mẹ mua nhiều nhất tuần này.
                            </p>
                        </div>
                        <a href="#" className="hidden text-sm font-semibold text-[#e82e81] hover:underline sm:inline">
                            Xem thêm
                        </a>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {bestSellers.map((p) => (
                            <div
                                key={p.name}
                                className="overflow-hidden rounded-3xl bg-white ring-1 ring-slate-100 hover:shadow-sm"
                            >
                                <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-50 to-white">
                                    {p.badge && (
                                        <div className="absolute top-3 left-3 rounded-full bg-[#e82e81] px-3 py-1 text-xs font-semibold text-white">
                                            {p.badge}
                                        </div>
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-400">
                                        Ảnh sản phẩm
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <div className="text-base font-bold text-slate-900">{p.price}</div>
                                        <button className="inline-flex h-10 items-center justify-center rounded-full bg-slate-900 px-4 text-xs font-semibold text-white hover:bg-slate-800">
                                            Thêm
                                        </button>
                                    </div>
                                    <div className="mt-3 text-xs text-slate-600">Tặng điểm & hỗ trợ đổi trả.</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Promo */}
            <section className="border-t border-slate-100 bg-gradient-to-b from-white to-slate-50">
                <div className="mx-auto max-w-[1200px] px-4 py-10">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                        <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-100">
                            <div className="text-sm font-semibold text-slate-900">Combo tiết kiệm</div>
                            <div className="mt-1 text-2xl font-bold text-slate-900">Mua 2 giảm 10%</div>
                            <p className="mt-2 text-sm text-slate-600">Áp dụng cho bỉm tã & đồ chăm sóc.</p>
                            <a
                                href="#"
                                className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-slate-900 px-6 text-sm font-semibold text-white hover:bg-slate-800"
                            >
                                Xem combo
                            </a>
                        </div>

                        <div className="rounded-3xl bg-[#e82e81] p-6 text-white lg:col-span-2">
                            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                                <div>
                                    <div className="text-sm font-semibold text-white/90">Flash deal</div>
                                    <div className="mt-1 text-2xl font-bold">Giảm đến 30% mỗi ngày</div>
                                    <p className="mt-2 text-sm text-white/90">
                                        Khung giờ vàng cho sản phẩm thiết yếu — số lượng có hạn.
                                    </p>
                                </div>
                                <a
                                    href="#"
                                    className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-900 hover:bg-pink-50"
                                >
                                    Săn deal ngay
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="border-t border-slate-100 bg-white">
                <div className="mx-auto max-w-[1200px] px-4 py-10">
                    <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Ba mẹ nói gì?</h2>
                    <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
                        {[
                            {
                                name: 'Chị H.',
                                quote: 'Đặt bỉm buổi sáng, trưa đã nhận. Hàng đúng mô tả, đóng gói kỹ.',
                            },
                            {
                                name: 'Anh T.',
                                quote: 'Gợi ý theo độ tuổi rất hữu ích, mua nhanh không mất thời gian tìm.',
                            },
                            {
                                name: 'Chị M.',
                                quote: 'Chính sách đổi trả rõ ràng, hỗ trợ nhiệt tình. Sẽ ủng hộ lâu dài.',
                            },
                        ].map((t) => (
                            <div key={t.name} className="rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-100">
                                <div className="text-sm leading-6 text-slate-700">“{t.quote}”</div>
                                <div className="mt-4 text-sm font-semibold text-slate-900">{t.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="border-t border-slate-100 bg-white">
                <div className="mx-auto max-w-[1200px] px-4 py-10">
                    <div className="rounded-3xl bg-slate-900 p-6 text-white sm:p-10">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <div className="text-xl font-bold">Nhận ưu đãi & deal sớm</div>
                                <div className="mt-2 text-sm text-white/80">
                                    Đăng ký email để nhận mã giảm giá và thông tin sản phẩm mới.
                                </div>
                            </div>

                            <form
                                className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-[520px]"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <input
                                    type="email"
                                    placeholder="Email của bạn"
                                    aria-label="Email của bạn"
                                    className="h-11 w-full rounded-full bg-white px-4 text-sm text-slate-900 outline-none ring-1 ring-white/20 placeholder:text-slate-400 focus:ring-2 focus:ring-white"
                                />
                                <button
                                    type="submit"
                                    className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[#e82e81] px-6 text-sm font-semibold text-white hover:brightness-95"
                                >
                                    Đăng ký
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
