import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError('');
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError('');
    };

    const isFormValid = email.length > 0 && password.length > 0 && agreed;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/avakids/api/v1/auth/login', {
                email,
                password
            });

            if (response.status === 200) {
                // Assuming successful login returns a token or user data
                console.log('Login successful:', response.data);
                // Redirect to home or handle token storage here
                // localStorage.setItem('token', response.data.token); 
                alert('Đăng nhập thành công!');
                navigate('/');
            }
        } catch (err: any) {
            console.error('Login failed:', err);
            setError(err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto min-h-screen relative !min-h-[700px]" style={{ paddingTop: '20px' }}>
            <div className="md:m-auto md:w-full">
                <div className="mx-auto px-[8px] !mt-[16px] !px-0">
                    <div className="flex gap-0 !gap-[24px]">
                        <div className="h-auto w-[58%]">
                            <div className="relative overflow-hidden shrink-0">
                                <img
                                    alt=""
                                    loading="lazy"
                                    width="615"
                                    height="377"
                                    decoding="async"
                                    className="object-cover opacity-100"
                                    src="https://cdnv2.tgdd.vn/mwg-static/common/Banner/a4/68/a468b274c474fddcca31e2602a69bcde.png"
                                    style={{ color: 'transparent', width: '615px', height: '377px' }}
                                />
                            </div>
                        </div>
                        <div className="rounded-[12px] bg-white pt-[24px] w-[42%] p-[40px] mb-[8px]">
                            <section className="mx-[3px] mb-[2px] mt-[8px] rounded-md bg-white text-[13px] font-normal text-[#222b45] xs:text-[14px]">
                                <div className="px-[8px] py-[8px] text-center text-[26px] font-bold">
                                    Đăng ký/ Đăng nhập
                                </div>
                                <div className="mx-auto p-[8px]">
                                    <form onSubmit={handleSubmit} data-gtm-form-interact-id="0">
                                        <div className="mt-[32px] w-full">
                                            <div className="w-full" aria-live="polite">
                                                {/* Email Input */}
                                                <div className="relative mb-[16px]">
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        value={email}
                                                        onChange={handleEmailChange}
                                                        placeholder=" "
                                                        className="
    peer w-full rounded-[16px] border border-gray-300
    bg-white px-[16px] py-[12px] text-[16px]
    focus:border-primary-400 focus:outline-none
    hover:border-primary-400
  "
                                                    />
                                                    <label
                                                        htmlFor="email"
                                                        className="
    absolute left-[16px] top-[12px] z-10
    origin-[0] transform text-gray-500 duration-300
    pointer-events-none
    peer-placeholder-shown:translate-y-0
    peer-placeholder-shown:scale-100
    peer-focus:-translate-y-4
    peer-focus:scale-75
    peer-not-placeholder-shown:-translate-y-4
    peer-not-placeholder-shown:scale-75
    peer-focus:text-primary-400
  "
                                                    >
                                                        Nhập email...
                                                    </label>
                                                </div>

                                                {/* Password Input */}
                                                <div className="relative mb-[8px]">
                                                    <input
                                                        id="password"
                                                        className="
                                                            peer w-full rounded-[16px] border border-gray-300
                                                            bg-white px-[16px] py-[12px] text-[16px]
                                                            focus:border-primary-400 focus:outline-none
                                                            hover:border-primary-400
  "
                                                        aria-required="true"
                                                        placeholder=" "
                                                        type="password"
                                                        value={password}
                                                        onChange={handlePasswordChange}
                                                        name="password"
                                                    />
                                                    <label
                                                        htmlFor="password"
                                                        className="
                                                            absolute left-[16px] top-[12px] z-10
                                                            origin-[0] transform text-gray-500 duration-300
                                                            pointer-events-none
                                                            peer-placeholder-shown:translate-y-0
                                                            peer-placeholder-shown:scale-100
                                                            peer-focus:-translate-y-4
                                                            peer-focus:scale-75
                                                            peer-not-placeholder-shown:-translate-y-4
                                                            peer-not-placeholder-shown:scale-75
                                                            peer-focus:text-primary-400
  "
                                                    >
                                                        Nhập mật khẩu...
                                                    </label>
                                                </div>

                                                {error && (
                                                    <div className="mb-2 text-red-600 text-sm">{error}</div>
                                                )}

                                            </div>
                                        </div>
                                        <div className="mb-[24px] mt-[24px] flex items-center gap-[6px]">
                                            <div className="inline-flex w-full items-center">
                                                <label className="relative flex w-full cursor-pointer items-center gap-[10px]">
                                                    <input
                                                        id="agreeToTerms"
                                                        className="peer h-[20px] w-[20px] cursor-pointer appearance-none rounded border border-slate-300 shadow transition-all checked:border-primary-600 checked:bg-primary-600 hover:shadow-md"
                                                        type="checkbox"
                                                        value=""
                                                        name="agreeToTerms"
                                                        checked={agreed}
                                                        onChange={(e) => setAgreed(e.target.checked)}
                                                    />
                                                    <span className="absolute left-[10px] top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
                                                        <svg
                                                            className="h-3.5 w-3.5"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                            stroke="currentColor"
                                                            strokeWidth="1"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                    </span>
                                                    <p className="w-[calc(100%_-_30px)] text-[12px] font-400 leading-[18px] text-black-100">
                                                        Tôi đồng ý với{' '}
                                                        <Link className="cursor-pointer font-500 text-[#2186EB] underline" to="#">
                                                            Quy định tích điểm, sử dụng điểm của Quà Tặng Vip,
                                                        </Link>{' '}
                                                        và{' '}
                                                        <Link className="cursor-pointer font-500 text-[#2186EB] underline" to="#">
                                                            Chính sách Bảo vệ thông tin cá nhân
                                                        </Link>{' '}
                                                        và nhận thông tin quảng cáo, chăm sóc khách hàng từ Quà Tặng Vip
                                                    </p>
                                                </label>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={!isFormValid || loading}
                                            className="h-[48px] w-full rounded-[24px] !bg-primary-600 py-[12px] text-center text-[18px] text-white disabled:!bg-[#F9F5F5] disabled:text-[#9AA5B1] transition-all"
                                        >
                                            {loading ? 'Đang xử lý...' : 'Tiếp tục'}
                                        </button>
                                    </form>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
