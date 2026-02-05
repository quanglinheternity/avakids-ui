import ArticleCard from './ArticleCard';

const BlogSection = () => {
    const articles = [
        {
            id: 1,
            title: 'Thông báo thu hồi sản phẩm thực phẩm bảo vệ sức khỏe MENACAL được sản xuất bởi HC CLOVER PS',
            date: '03/02/2026',
            image: 'https://cdnv2.tgdd.vn/mwg-static/common/News/1589356/thong-bao-thu-hoi-san-pham-thuc-pham-bao-ve-suc-thumbbbb.jpg',
        },
        {
            id: 2,
            title: 'LiveSpo NAVAX - Bảo tử lợi khuẩn cho đường hô hấp - Giảm nguy cơ viêm đường hô hấp',
            date: '26/01/2026',
            image: 'https://cdn.tgdd.vn/bachhoaxanh/banners/5692/cam-nang-mua-sam-livespo-navax-720x300.jpg',
        },
        {
            id: 3,
            title: '(01/01 - 15/02) Khởi đầu năm mới, chọn điều tốt nhất cho Mẹ và bé - Đồ dùng giảm đến 50%',
            date: '01/01/2026',
            image: 'https://cdn.tgdd.vn/bachhoaxanh/banners/5658/cam-nang-mua-sam-khai-mac-tet-me-be-720x300.jpg',
        },
        {
            id: 4,
            title: '(01/01 - 15/02) Tháng 1 mặc xinh – Bé đón năm mới thật vui - Thời trang, Phụ kiện giá chỉ từ 19.000đ',
            date: '01/01/2026',
            image: 'https://cdn.tgdd.vn/bachhoaxanh/banners/5660/cam-nang-mua-sam-thang-1-mac-xinh-720x300.jpg',
        },
        {
            id: 5,
            title: '(01/01 - 15/02) BẢO SALE TẾT ĐỒ BỘ: Giảm đến 50% lại còn MUA 1 TẶNG 1 - Nhiều mẫu đẹp',
            date: '01/01/2026',
            image: 'https://cdn.tgdd.vn/bachhoaxanh/banners/5659/cam-nang-mua-sam-bao-sale-tet-do-bo-720x300.jpg',
        },
        {
            id: 6,
            title: '(04/02 - 28/02) Tích luỹ hoá đơn sữa Pediasure, Abottt Grow, Similac nhân quà liền tay',
            date: '27/05/2025',
            image: 'https://cdn.tgdd.vn/bachhoaxanh/banners/5704/cam-nang-mua-sam-tich-luy-hoa-don-sua-720x300.png',
        },
    ];

    return (
        <section className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="text-xl font-bold text-pink-600 dark:text-pink-400">
                    Cẩm Nang Mua Sắm
                </h2>
            </div>

            {/* Articles Grid */}
            <div className="bg-gray-50 px-4 py-6 dark:bg-gray-900">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
