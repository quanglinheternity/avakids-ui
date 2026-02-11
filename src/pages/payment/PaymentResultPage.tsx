import { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import api from '../../services/api';

interface PaymentData {
    transactionId: string;
    amount: number;
    bankCode: string;
    paymentDate: string;
    message: string;
}

const PaymentResultPage = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<'success' | 'error' | 'pending'>('pending');
    const [orderData, setOrderData] = useState<PaymentData | null>(null);
    const [message, setMessage] = useState('');
    const hasCalledVerify = useRef(false);

    useEffect(() => {
        const verifyPayment = async () => {
            if (hasCalledVerify.current) return;
            hasCalledVerify.current = true;

            try {
                // Get all query params from current URL
                const queryParams = location.search;

                // Call backend verification API
                const response = await api.get(`/payment/vnpay/return${queryParams}`);
                const data = response.data;

                if (data.success) {
                    setStatus('success');
                    setOrderData(data);
                    setMessage(data.message || 'Giao dịch thành công.');
                } else {
                    setStatus('error');
                    setMessage(data.message || 'Giao dịch thất bại.');
                }
            } catch (error: any) {
                console.error("Payment verification failed:", error);
                setStatus('error');
                setMessage(error.response?.data?.message || 'Có lỗi xảy ra trong quá trình xác thực thanh toán.');
            } finally {
                setLoading(false);
            }
        };

        if (location.search) {
            verifyPayment();
        } else {
            setLoading(false);
            setStatus('error');
            setMessage('Không tìm thấy thông tin thanh toán.');
        }
    }, [location]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-[#F5F7FA]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                    <p className="text-18 font-medium text-ink-dark">Đang xác thực giao dịch...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[60vh] bg-[#F5F7FA] py-10">
            <div className="max-w-[600px] mx-auto px-4 text-center">
                <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                    {status === 'success' ? (
                        <>
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className="text-28 font-bold text-ink-dark mb-4">Thanh toán thành công!</h1>
                            <p className="text-16 text-ink-light mb-8">{message}</p>

                            {orderData && (
                                <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left space-y-3 border border-slate-100">
                                    <div className="flex justify-between">
                                        <span className="text-ink-light">Mã giao dịch:</span>
                                        <span className="font-bold text-ink-dark">{orderData.transactionId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-ink-light">Ngân hàng:</span>
                                        <span className="font-bold text-ink-dark">{orderData.bankCode}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-ink-light">Thời gian:</span>
                                        <span className="font-medium text-ink-dark">
                                            {orderData.paymentDate.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$3/$2/$1 $4:$5:$6')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t border-dashed">
                                        <span className="text-ink-light">Số tiền:</span>
                                        <span className="text-20 font-bold text-primary-500">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(orderData.amount)}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h1 className="text-28 font-bold text-ink-dark mb-4">Thanh toán thất bại</h1>
                            <p className="text-16 text-ink-light mb-8">{message}</p>
                        </>
                    )}

                    <div className="flex flex-col gap-3">
                        <Link
                            to="/"
                            className="w-full h-14 bg-primary-500 hover:bg-primary-600 text-white font-bold text-18 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-100 transition-all"
                        >
                            VỀ TRANG CHỦ
                        </Link>
                        <Link
                            to="/orders"
                            className="w-full h-14 bg-white border-2 border-primary-500 text-primary-500 font-bold text-18 rounded-2xl flex items-center justify-center hover:bg-primary-50 transition-all"
                        >
                            XEM LỊCH SỬ ĐƠN HÀNG
                        </Link>
                    </div>
                </div>

                <p className="mt-8 text-14 text-ink-light leading-relaxed">
                    Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ tổng đài <br />
                    <span className="text-primary-500 font-bold">1900 8668</span> (Miễn phí) để được hỗ trợ.
                </p>
            </div>
        </div>
    );
};

export default PaymentResultPage;
