const BrandLogos = () => {
    const brands = [
        { id: 1, name: 'a2-milk', logo: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202511/logo-a2-milk113149.png', link: '#' },
        { id: 2, name: 'friso', logo: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdn.tgdd.vn/2021/11/Sports/Images/119003/Friso-200x120.png', link: '#' },
        { id: 3, name: 'meiji', logo: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdn.tgdd.vn/2021/12/Sports/Images/0/Meiji-200x120.png', link: '#' },
        { id: 4, name: 'aptamil-uc', logo: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdn.tgdd.vn/2024/01/Sports/Images/590404/aptamil-uc-200x120.png', link: '#' },
        { id: 5, name: 'similac', logo: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdn.tgdd.vn/2021/12/Sports/Images/118606/Thietkekhongten(74)-200x120.png', link: '#' },
        { id: 6, name: 'aptamil', logo: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdn.tgdd.vn/2021/11/Sports/Images/118607/Aptamil-200x120.png', link: '#' },
        { id: 7, name: 'optimum', logo: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202505/logo-optimum-new_0103116.png', link: '#' },
        { id: 8, name: 'pediasure', logo: 'https://img.tgdd.vn/imgt/ecom/f_webp,fit_outside,quality_95/https://cdn.tgdd.vn/2021/11/Sports/Images/118605/PediaSure-200x120-1.png', link: '#' },
    ];

    return (
        <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
                <a
                    key={brand.id}
                    href={brand.link}
                    className="flex h-11 w-20 flex-shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white p-1.5 transition-all hover:border-pink-300 hover:shadow-sm"
                >
                    <img
                        src={brand.logo}
                        alt={brand.name}
                        className="h-full w-full object-contain"
                    />
                </a>
            ))}
        </div>
    );
};

export default BrandLogos;
