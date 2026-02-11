import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAddress } from '../../contexts/AddressContext';
import { toast } from 'react-toastify';
import api from '../../services/api';
import AddressModal from '../cart/components/AddressModal';

const CheckoutPage = () => {
    const { cartItems, totalPrice, finalPrice, clearCart } = useCart();
    const { selectedAddress } = useAddress();
    const navigate = useNavigate();

    const [otherRequest, setOtherRequest] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('1011'); // COD by default
    const [agreedPolicy, setAgreedPolicy] = useState(true);
    const [couponCode, setCouponCode] = useState('');
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const shippingFee = 15000;
    const totalAmount = finalPrice + shippingFee;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const handlePlaceOrder = async () => {
        if (!agreedPolicy) {
            toast.error('Vui lòng đồng ý với chính sách xử lý dữ liệu cá nhân');
            return;
        }
        if (!selectedAddress) {
            toast.error('Vui lòng chọn địa chỉ nhận hàng');
            return;
        }

        if (cartItems.length === 0) {
            toast.error('Giỏ hàng của bạn đang trống');
            return;
        }

        setIsPlacingOrder(true);

        // Map payment method values to API expected strings
        const paymentMap: Record<string, string> = {
            '1011': 'COD',
            '1012': 'BANKING',
            '17': 'MOMO'
        };

        const payload = {
            orderItems: cartItems.map(item => ({
                variantId: item.variantId,
                quantity: item.quantity
            })),
            shippingAddress: {
                recipientName: selectedAddress.recipientName,
                phone: selectedAddress.phone,
                address: `${selectedAddress.address}, ${selectedAddress.district}, ${selectedAddress.city}`
            },
            customerNote: otherRequest,
            couponCode: couponCode || null,
            paymentMethod: paymentMap[selectedPayment] || 'COD'
        };

        try {
            const response = await api.post('/orders/create', payload);
            if (response.status === 200 || response.status === 201) {
                const responseData = response.data.data;

                // If it's a banking payment, redirect to VNPAY
                if (paymentMap[selectedPayment] === 'BANKING' && responseData.paymentURL) {
                    window.location.href = responseData.paymentURL;
                    return;
                }

                toast.success('Đặt hàng thành công!');
                await clearCart();
                navigate('/');
            }
        } catch (error: any) {
            console.error("Failed to place order:", error);
            const errorMsg = error.response?.data?.message || 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.';
            toast.error(errorMsg);
        } finally {
            setIsPlacingOrder(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F7FA] pb-10">
            {/* Main Container */}
            <div className="max-w-[1200px] mx-auto px-4 lg:px-0 py-6" >

                {/* Header / Breadcrumb */}
                <Link to="/cart" className="inline-block mb-4">
                    <h3 className="flex items-center text-20 lg:text-24 font-bold text-ink-dark hover:text-primary-500 transition-colors">
                        <span className="mr-2 rotate-[45deg] border-b-2 border-l-2 border-current p-1.5 translate-y-[1px]"></span>
                        Thanh toán
                    </h3>
                </Link>


                {/* Two Column Layout */}
                <div className="flex flex-col lg:flex-row items-start gap-6">

                    {/* LEFT COLUMN */}
                    <div className="w-full lg:flex-1 space-y-4">

                        {/* 1. Shipping Method */}
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-18 font-bold text-black-100 mb-4">Phương thức giao hàng</h2>

                                <div className="space-y-4">
                                    <div className="relative p-4 rounded-xl border border-[#ffd6e7] bg-[#FFF8FC]">
                                        <p className="font-bold text-16 text-ink-dark mb-1">Giao tiêu chuẩn</p>

                                        <div className="flex items-center gap-2 mb-2">
                                            <p className="text-15 text-ink-dark">Nhận 08h00 - 12h00, Thứ Bảy (28/02)</p>
                                            <button className="text-[#2F80ED] text-15 font-medium hover:underline flex items-center">
                                                Đổi <svg className="w-4 h-4 ml-0.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                                            </button>
                                        </div>

                                        <div className="pt-3 mt-3 border-t border-[#f0f0f0] flex items-center flex-wrap gap-1 text-15 text-ink-dark">
                                            <span>Giao bởi</span>
                                            <div className="flex items-center gap-1 mx-0.5">
                                                <img
                                                    src="https://cdnv2.tgdd.vn/mwg-static/common/Campaign/6e/9c/6e9ca88832c040a47708353f5c4f03f2.png"
                                                    alt="GHTK"
                                                    className="h-4 object-contain"
                                                />
                                            </div>
                                            <span>, được đồng kiểm.</span>
                                        </div>
                                    </div>

                                    {/* Product List */}
                                    <div className="pt-2 space-y-4">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex gap-4 p-2 hover:bg-slate-50 rounded-xl transition-colors">
                                                <div className="w-20 h-20 flex-shrink-0 bg-white border border-gray-100 rounded-lg overflow-hidden p-1">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="flex-1 min-w-0 py-1">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <p className="text-15 font-medium text-ink-dark line-clamp-2 leading-tight">{item.name}</p>
                                                        <span className="text-14 text-ink-light whitespace-nowrap">x{item.quantity}</span>
                                                    </div>
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <span className="text-12 px-2 py-0.5 bg-slate-100 rounded text-ink-normal">Mặc định</span>
                                                        <span className="text-15 font-bold text-primary-500">{formatPrice(item.price * item.quantity)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-4 w-full overflow-hidden">
                            <div className="absolute top-1/2 w-full border-b-2 border-dashed border-slate-200"></div>
                            <div className="absolute -left-3 top-0 h-4 w-4 rounded-full bg-[#F5F7FA]"></div>
                            <div className="absolute -right-3 top-0 h-4 w-4 rounded-full bg-[#F5F7FA]"></div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
                            <div className="space-y-3">
                                <label htmlFor="otherRequest" className="block text-16 font-bold text-ink-dark">Yêu cầu khác (nếu có)</label>
                                <input
                                    id="otherRequest"
                                    className="
                                            w-full h-12 px-4 rounded-xl
                                            border border-gray-300
                                            outline-none
                                            focus:outline-none
                                            focus:border-primary-500
                                            transition-colors duration-200
                                        "
                                    placeholder="Giao giờ hành chính, gọi trước khi đến..."
                                    type="text"
                                    value={otherRequest}
                                    onChange={(e) => setOtherRequest(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                <span className="text-16 font-bold text-ink-dark">Xuất hóa đơn công ty</span>
                                <button className="text-primary-500 font-bold hover:underline">Yêu cầu ›</button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="w-full lg:w-[416px] space-y-4 lg:sticky lg:top-[20px]">

                        {/* Address Section */}
                        <div className="bg-white rounded-2xl shadow-sm p-5">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-18 font-bold text-black-100">Thông tin nhận hàng</h3>
                                <button
                                    onClick={() => setIsAddressModalOpen(true)}
                                    className="text-primary-500 text-14 font-medium hover:underline"
                                >
                                    Thay đổi
                                </button>
                            </div>
                            <div
                                className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                {selectedAddress ? (
                                    <div className="space-y-1 cursor-pointer" onClick={() => setIsAddressModalOpen(true)}>
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-ink-dark uppercase">{selectedAddress.recipientName}</span>
                                            <span className="text-ink-dark font-medium ml-1">· {selectedAddress.phone}</span>
                                        </div>
                                        <p className="text-14 text-ink-light line-clamp-1">
                                            {selectedAddress.address}, {selectedAddress.district}, {selectedAddress.city}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center py-2">
                                        <p className="text-red-500 font-bold text-14">Vui lòng chọn hoặc thêm địa chỉ</p>
                                        <button
                                            onClick={() => setIsAddressModalOpen(true)}
                                            className="mt-2 text-primary-500 font-bold hover:underline"
                                        >
                                            Thêm địa chỉ
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Promo Code Input */}
                        <div className="bg-white rounded-2xl shadow-sm p-4">
                            <p className="font-bold text-ink-dark mb-3 px-1">Mã giảm giá</p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="flex-1 h-11 px-4 bg-slate-50 border border-gray-100 rounded-xl focus:border-primary-400 outline-none uppercase text-14 font-medium"
                                    placeholder="NHẬP MÃ TẠI ĐÂY"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <button className="px-6 h-11 bg-primary-500 text-white font-bold rounded-xl hover:bg-primary-600 transition-colors">ÁP DỤNG</button>
                            </div>
                        </div>

                        {/* Payment Selection */}
                        <div className="bg-white rounded-2xl shadow-sm p-5">
                            <h3 className="text-18 font-bold text-ink-dark mb-4">Phương thức thanh toán</h3>
                            <div className="space-y-2">
                                {[
                                    { id: '1012', label: 'Chuyển khoản ngân hàng', icon: '🏦' },
                                    { id: '1011', label: 'Thanh toán khi nhận hàng', icon: '💵' },
                                ].map((method) => (
                                    <label key={method.id} className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${selectedPayment === method.id ? 'border-primary-400 bg-primary-50' : 'border-gray-100 hover:bg-slate-50'}`}>
                                        <input type="radio" value={method.id} name="payment" className="hidden" checked={selectedPayment === method.id} onChange={() => setSelectedPayment(method.id)} />
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${selectedPayment === method.id ? 'border-primary-500 bg-white' : 'border-gray-300'}`}>
                                            <div className={`w-2.5 h-2.5 rounded-full bg-primary-500 transition-transform ${selectedPayment === method.id ? 'scale-100' : 'scale-0'}`}></div>
                                        </div>
                                        <span className="text-18 mr-3">{method.icon}</span>
                                        <span className={`text-15 font-medium ${selectedPayment === method.id ? 'text-primary-700' : 'text-ink-dark'}`}>{method.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Summary & Checkout */}
                        <div className="bg-white rounded-2xl shadow-lg p-5 space-y-4">
                            <h3 className="text-18 font-bold text-ink-dark pb-2 border-b">Chi tiết thanh toán</h3>
                            <div className="space-y-3 text-15">
                                <div className="flex justify-between text-ink-normal">
                                    <span>Tổng tiền hàng</span><span>{formatPrice(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-ink-normal border-t border-dashed pt-2">
                                    <span>Phí giao hàng</span><span>{formatPrice(shippingFee)}</span>
                                </div>
                                <div className="pt-2 border-t border-slate-200 flex justify-between items-end">
                                    <span className="text-ink-dark font-bold">Cần thanh toán</span>
                                    <span className="text-24 font-bold text-primary-500">{formatPrice(totalAmount)}</span>
                                </div>
                            </div>

                            <div className="pt-2 space-y-4">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={agreedPolicy}
                                            onChange={(e) => setAgreedPolicy(e.target.checked)}
                                            className="peer mt-1 w-5 h-5 appearance-none rounded-md border-2 border-gray-300 transition-all checked:bg-primary-500 checked:border-primary-500"
                                        />

                                        {/* Icon check */}
                                        <svg
                                            className="absolute top-1.25 left-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>

                                    <span className="text-12 text-ink-light leading-snug">
                                        Tôi đồng ý với các chính sách xử lý dữ liệu cá nhân của AVAKids.
                                    </span>
                                </label>

                                <button
                                    disabled={!agreedPolicy || isPlacingOrder}
                                    onClick={handlePlaceOrder}
                                    className="w-full h-14 bg-primary-500 text-white font-bold text-18 rounded-2xl shadow-xl transition-all hover:bg-primary-600 disabled:opacity-50"
                                >
                                    {isPlacingOrder ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN ĐẶT HÀNG'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Address Selection Modal */}
            <AddressModal
                isOpen={isAddressModalOpen}
                onClose={() => setIsAddressModalOpen(false)}
            />
        </div>
    );
};

export default CheckoutPage;
