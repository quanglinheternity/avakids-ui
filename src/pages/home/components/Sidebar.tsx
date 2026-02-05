const Sidebar = () => {
    return (
        <>
            <div className="overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-slate-100 dark:bg-card-dark dark:ring-0">
                <div className="border-b border-gray-100 p-4 dark:border-gray-700">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">Danh mục</h2>
                </div>
                <nav className="hide-scrollbar flex max-h-[calc(200vh-250px)] flex-col overflow-y-auto py-2">
                    <a
                        className="group flex items-center px-4 py-3 text-sm text-slate-700 transition hover:bg-pink-50 hover:text-[#e82e81] dark:text-gray-200 dark:hover:bg-gray-700"
                        href="#"
                    >
                        <img
                            alt="Milk"
                            className="mr-3 h-8 w-8 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkDV3rWksNp8wH7pBexEs5yDpd5iynuI5XnY0vygAY-WFKO0mU96LTAM3YxdT0DqtSqemJUz_lr-113aw6RuzYXu30WRum452oXLgVEVUrxYjPMQhoOjpziFpHkUFsDz0QuhrSmLIT2NcMZxz41pcNBtwZ35XABQ-IdPoyX5YbnhPgxANyWKd4fl00G2fcNW5_g1Shh1h9aSnOW4J8JOw6zNDme-0wRux_2q47zsJUl6wtIY5sUhjsXRmf9PHkm8eVcQVXFOBnW-Fk"
                        />
                        <span className="flex-grow font-medium transition group-hover:text-[#e82e81]">Thế giới sữa</span>
                        <span className="material-icons text-sm text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#e82e81]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </span>
                    </a>
                    <a
                        className="group flex items-center px-4 py-3 text-sm text-slate-700 transition hover:bg-pink-50 hover:text-[#e82e81] dark:text-gray-200 dark:hover:bg-gray-700"
                        href="#"
                    >
                        <img
                            alt="Diapers"
                            className="mr-3 h-8 w-8 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7LAzCOhiiI9GAK87i2qIuQ8pfdUXWAXLks_d7tOGiefP4SkbXXL4Bt64ckEAjEco_5LLfAr0a2Ex28pxA94f4diVeGkpPRro4pIY7gsIfxNKbwMgN9XVA7UPwTGZMGYLEhEpSob1A6O0nVTPEtEz0l4uMKoCKm4y8jNin0nu6D9CKGgnhBk27RHyLl0emkkDfa5dkOQy4KkdUywB8eYUxgbWKIBpOfu51U5Lcr3HyaNK__36Immd5JR0i-R50g2mXA26Fj7jET9cT"
                        />
                        <span className="flex-grow font-medium transition group-hover:text-[#e82e81]">Bỉm, tã</span>
                        <span className="material-icons text-sm text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#e82e81]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </span>
                    </a>
                    <a
                        className="group flex items-center px-4 py-3 text-sm text-slate-700 transition hover:bg-pink-50 hover:text-[#e82e81] dark:text-gray-200 dark:hover:bg-gray-700"
                        href="#"
                    >
                        <img
                            alt="Food"
                            className="mr-3 h-8 w-8 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN3J28YbON_Bf3bk6pldOJc55UtRiw7YuT7f9BRxO3F52IAb7irzlGFe6JwsLrQKj51A8Gumbho-4jVH75HM5rRwuZBkJhKEWmMI7MUwcb6fnApIGnC26UheTr2OaKVTjztuJNq_2G79Atny2s8OXN_bo6nr2nkgifB3ZopSRAPSmlWR4hi0oYAUmk405ykDCh1_jy_xznRZ0BTv9o5zbIDyPoDpodT0JqULDn9OXRTzcw7dFS4HRt31U_vUbip5BMySZJGYOQtz6b"
                        />
                        <span className="flex-grow font-medium transition group-hover:text-[#e82e81]">
                            Thực phẩm - Đồ uống
                        </span>
                        <span className="material-icons text-sm text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#e82e81]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </span>
                    </a>
                    <a
                        className="group flex items-center px-4 py-3 text-sm text-slate-700 transition hover:bg-pink-50 hover:text-[#e82e81] dark:text-gray-200 dark:hover:bg-gray-700"
                        href="#"
                    >
                        <img
                            alt="Vitamins"
                            className="mr-3 h-8 w-8 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSj0Nx4vEu4PfkeZLIvATytT50yHolSf5A_S0DpsuCbx2KGna1WvMBuI2e5a2GNrOAFoWqwp9lGx7eJFdYL7C9_ix8Ofx8Hsb1mAkHEmbvj6t4hMDFOPfAyDTo-VGFJsv8ncoDU_kePVMjtUEKTTO-_cuxK1Rtyd8MKYI_X6-jpdq_GC6foml2IdREI_OfDapbv4QQNuA1kuIqHmCvDXFh8XrCZJ7Z4tOaR5u9bn6OLieW9wDhBPN9l9xcUG6qwOx5SsLkU4TdYS62"
                        />
                        <span className="flex-grow font-medium transition group-hover:text-[#e82e81]">
                            Sức khoẻ &amp; Vitamin
                        </span>
                        <span className="material-icons text-sm text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#e82e81]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </span>
                    </a>
                    <a
                        className="group flex items-center px-4 py-3 text-sm text-slate-700 transition hover:bg-pink-50 hover:text-[#e82e81] dark:text-gray-200 dark:hover:bg-gray-700"
                        href="#"
                    >
                        <img
                            alt="Mom Care"
                            className="mr-3 h-8 w-8 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAK6Kc-7xLIJ4j_3Ufi-CuVzDFR4c0hCXUei3CHlqdb6dNKk3nl3e7LxM21mCCleRMV2nrBtYzKjQjm_CWw8SfgkhH7G5HlEq9iLdjBd7bMQk0s_uZOjSAic3w3Wb990PjQDifxjsQrW28zj-fReII0bNcSt-FnWeuSsIgBTbBZ-BDUFIw6DUHMWNWW_dzZ2ozOMqPbbTpk9dw06XPXUDSl59osxInRrYRRDf9z6Xyh16EkecSomT1Pgv4sMow8nH-H_bKlUBD6-2bP"
                        />
                        <span className="flex-grow font-medium transition group-hover:text-[#e82e81]">
                            Chăm sóc mẹ &amp; bé
                        </span>
                        <span className="material-icons text-sm text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#e82e81]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </span>
                    </a>
                    <a
                        className="group flex items-center px-4 py-3 text-sm text-slate-700 transition hover:bg-pink-50 hover:text-[#e82e81] dark:text-gray-200 dark:hover:bg-gray-700"
                        href="#"
                    >
                        <img
                            alt="Car Seat"
                            className="mr-3 h-8 w-8 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBefrZvJdr5AiMZDBEshpGHLa2KltZ9UVppJt1yxEe0tYrWx0fxrS2ZsHRNTkNIxQfICCOK4BT2i2g8q1R-hojrIQ9QUe8k7x52t_GfWtZp0k2A0kpCRyBLQMsrp_ScrwUxotF29Hdy8vQcJnq687FXsJrb_zDo0tFbrEyJdrMTlY1ZJ-IqCb0tQSa5sxkw185eSbzG979ZA18wzoASiwGcrlyMfbbsR6V8HGijtzXu-g-rNGsF57bNHDK6z0kih230VUOsj9WAc7QW"
                        />
                        <span className="flex-grow font-medium transition group-hover:text-[#e82e81]">Ghế ngồi ô tô</span>
                        <span className="material-icons text-sm text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#e82e81]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </span>
                    </a>
                    <a
                        className="group flex items-center px-4 py-3 text-sm text-slate-700 transition hover:bg-pink-50 hover:text-[#e82e81] dark:text-gray-200 dark:hover:bg-gray-700"
                        href="#"
                    >
                        <img
                            alt="Toys"
                            className="mr-3 h-8 w-8 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6DtYnAWlodzc5XHH5SZsgeE98S3CAIECFg3UJGzpn64P5l1n45pW9axUjQ9SryH4FPcF2oqaT9DDM34WSqaoXSuGX-cH3NwdC16t18TxA9kEakLI8gc1UMPtg98GrilS1vwfCJ6ZkyA2ObMWTxThBzWgJf9XvDoR2oIttg3fMzuW3fI66dZW8QE1EnjqjwXdmRCFrRRjLCiUBUezCGsiFc2OQ47K9suqVf1eu24yxMGK1vI7nYh3RIQLyug9hvp1h37lnRyJ_x7cu"
                        />
                        <span className="flex-grow font-medium transition group-hover:text-[#e82e81]">
                            Đồ chơi, học tập
                        </span>
                        <span className="material-icons text-sm text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#e82e81]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </span>
                    </a>
                    <a
                        className="group flex items-center px-4 py-3 text-sm text-slate-700 transition hover:bg-pink-50 hover:text-[#e82e81] dark:text-gray-200 dark:hover:bg-gray-700"
                        href="#"
                    >
                        <img
                            alt="Toys"
                            className="mr-3 h-8 w-8 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6DtYnAWlodzc5XHH5SZsgeE98S3CAIECFg3UJGzpn64P5l1n45pW9axUjQ9SryH4FPcF2oqaT9DDM34WSqaoXSuGX-cH3NwdC16t18TxA9kEakLI8gc1UMPtg98GrilS1vwfCJ6ZkyA2ObMWTxThBzWgJf9XvDoR2oIttg3fMzuW3fI66dZW8QE1EnjqjwXdmRCFrRRjLCiUBUezCGsiFc2OQ47K9suqVf1eu24yxMGK1vI7nYh3RIQLyug9hvp1h37lnRyJ_x7cu"
                        />
                        <span className="flex-grow font-medium transition group-hover:text-[#e82e81]">
                            Đồ chơi, học tập
                        </span>
                        <span className="material-icons text-sm text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#e82e81]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </span>
                    </a>
                    <a
                        className="group flex items-center px-4 py-3 text-sm text-slate-700 transition hover:bg-pink-50 hover:text-[#e82e81] dark:text-gray-200 dark:hover:bg-gray-700"
                        href="#"
                    >
                        <img
                            alt="Toys"
                            className="mr-3 h-8 w-8 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6DtYnAWlodzc5XHH5SZsgeE98S3CAIECFg3UJGzpn64P5l1n45pW9axUjQ9SryH4FPcF2oqaT9DDM34WSqaoXSuGX-cH3NwdC16t18TxA9kEakLI8gc1UMPtg98GrilS1vwfCJ6ZkyA2ObMWTxThBzWgJf9XvDoR2oIttg3fMzuW3fI66dZW8QE1EnjqjwXdmRCFrRRjLCiUBUezCGsiFc2OQ47K9suqVf1eu24yxMGK1vI7nYh3RIQLyug9hvp1h37lnRyJ_x7cu"
                        />
                        <span className="flex-grow font-medium transition group-hover:text-[#e82e81]">
                            Đồ chơi, học tập
                        </span>
                        <span className="material-icons text-sm text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#e82e81]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </span>
                    </a>
                    <a
                        className="group flex items-center px-4 py-3 text-sm text-slate-700 transition hover:bg-pink-50 hover:text-[#e82e81] dark:text-gray-200 dark:hover:bg-gray-700"
                        href="#"
                    >
                        <img
                            alt="Toys"
                            className="mr-3 h-8 w-8 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6DtYnAWlodzc5XHH5SZsgeE98S3CAIECFg3UJGzpn64P5l1n45pW9axUjQ9SryH4FPcF2oqaT9DDM34WSqaoXSuGX-cH3NwdC16t18TxA9kEakLI8gc1UMPtg98GrilS1vwfCJ6ZkyA2ObMWTxThBzWgJf9XvDoR2oIttg3fMzuW3fI66dZW8QE1EnjqjwXdmRCFrRRjLCiUBUezCGsiFc2OQ47K9suqVf1eu24yxMGK1vI7nYh3RIQLyug9hvp1h37lnRyJ_x7cu"
                        />
                        <span className="flex-grow font-medium transition group-hover:text-[#e82e81]">
                            Đồ chơi, học tập
                        </span>
                        <span className="material-icons text-sm text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#e82e81]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </span>
                    </a>
                    <a
                        className="group flex items-center px-4 py-3 text-sm text-slate-700 transition hover:bg-pink-50 hover:text-[#e82e81] dark:text-gray-200 dark:hover:bg-gray-700"
                        href="#"
                    >
                        <img
                            alt="Toys"
                            className="mr-3 h-8 w-8 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6DtYnAWlodzc5XHH5SZsgeE98S3CAIECFg3UJGzpn64P5l1n45pW9axUjQ9SryH4FPcF2oqaT9DDM34WSqaoXSuGX-cH3NwdC16t18TxA9kEakLI8gc1UMPtg98GrilS1vwfCJ6ZkyA2ObMWTxThBzWgJf9XvDoR2oIttg3fMzuW3fI66dZW8QE1EnjqjwXdmRCFrRRjLCiUBUezCGsiFc2OQ47K9suqVf1eu24yxMGK1vI7nYh3RIQLyug9hvp1h37lnRyJ_x7cu"
                        />
                        <span className="flex-grow font-medium transition group-hover:text-[#e82e81]">
                            Đồ chơi, học tập
                        </span>
                        <span className="material-icons text-sm text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#e82e81]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </span>
                    </a>
                    <a
                        className="group flex items-center px-4 py-3 text-sm text-slate-700 transition hover:bg-pink-50 hover:text-[#e82e81] dark:text-gray-200 dark:hover:bg-gray-700"
                        href="#"
                    >
                        <img
                            alt="Toys"
                            className="mr-3 h-8 w-8 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6DtYnAWlodzc5XHH5SZsgeE98S3CAIECFg3UJGzpn64P5l1n45pW9axUjQ9SryH4FPcF2oqaT9DDM34WSqaoXSuGX-cH3NwdC16t18TxA9kEakLI8gc1UMPtg98GrilS1vwfCJ6ZkyA2ObMWTxThBzWgJf9XvDoR2oIttg3fMzuW3fI66dZW8QE1EnjqjwXdmRCFrRRjLCiUBUezCGsiFc2OQ47K9suqVf1eu24yxMGK1vI7nYh3RIQLyug9hvp1h37lnRyJ_x7cu"
                        />
                        <span className="flex-grow font-medium transition group-hover:text-[#e82e81]">
                            Đồ chơi, học tập
                        </span>
                        <span className="material-icons text-sm text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-[#e82e81]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </span>
                    </a>
                </nav>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl bg-gradient-to-b from-pink-50 via-white to-white p-4 shadow-md ring-1 ring-slate-100 dark:bg-card-dark dark:ring-0">
                <div className="mb-3 flex items-center justify-between gap-2">
                    <div>
                        <div className="text-xs font-semibold uppercase tracking-wide text-[#e82e81]">
                            Thương hiệu nổi bật
                        </div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Top thương hiệu yêu thích</div>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-100">
                        Cập nhật mỗi ngày
                    </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div className="flex items-center justify-center rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
                        <img
                            alt="Brand 1"
                            className="h-5 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW_L8kaTbVB2ke06_rtJP7lvvzKE2_3c1_B-w4aMGhge2Q7YzAVbH6s0o-s-TTux8tYjkfI6pKX7CVok4PKwH11zC-KflSYaIpZRcSncDpVHUyU-qlAZScwPnThJVWff0LHi_SXTdFHZju9IU_D06O8esqGpT9TSGRrCDJ6CoR9eiGly_91XzWjSV_8BrxnGo2FxbR4dJuedFZoZy3k3OigkbZJ0cCPuezEIIhtVvAzmSWMSlh_2HHjIYkAh5-yeEK65TSewqDLRMO"
                        />
                    </div>
                    <div className="flex items-center justify-center rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
                        <img
                            alt="Brand 2"
                            className="h-5 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSRwtLB8WAvg8Il_7kGCBbqjbTKsKZ7PL4i0HjZfoBAyix96tB9VSjXrB_y-79SmjMwjEoIcDFP6ubdIbjPH9_pLcvfvuizctZ7JHiBIo3nRjG2cA1fg9j4a1WB_epcGakOUfL2We7OuqiRZFqJRXKyQg-9-drRxR_yIb8n9qez4L10nJQF45QgXx0KbwEkuyXiL249bGHZHAuVSvCp-hPAeAixhwMN6DjIhCJAOjLD3Zjk0bT9pytlFTHoZQyJ7dYURmyhZN9jAl6"
                        />
                    </div>
                    <div className="flex items-center justify-center rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
                        <img
                            alt="Brand 3"
                            className="h-5 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKbVL0TGHI_ISqWatX2x_6g9gzXSEBgHtGJY1P1DfUEyXvDO87cuUpAS5UWRbS2DzqQ4uNAQx2YjO9ABUouggbl4Fp16Xvhw0Qa3t7sJqXhdrGcoK7-oH_zMV-0QyxFx0gfD1cYIIlEXas2LlI8xd6Uu5L91KS19hrs2Gj2XVoux0YSZ_YoAUPN0mP5H9yWMP8uT71Y3OJP3W_P5tk3h0rlKnugud462m_hLPzLS2gaa4Qf6B3UAkKPHsAZJD2r6XJDLu425_tL6GI"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;

