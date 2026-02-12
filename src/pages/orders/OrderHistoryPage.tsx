import { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

interface OrderItem {
    id: number;
    productName: string;
    sku: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    productImage?: string;
}

interface ShippingAddress {
    recipientName: string;
    phone: string;
    address: string;
}

interface OrderSummary {
    id: number;
    orderNumber: string;
    statusName: string;
    totalAmount: number;
    createdAt: string;
}

interface OrderDetail extends OrderSummary {
    orderItems: OrderItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    paymentStatus: string;
    note?: string;
}

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState<OrderSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders/my-orders');
                if (response.data?.code === 1000) {
                    setOrders(response.data.data.content);
                }
            } catch (error) {
                console.error('Failed to fetch orders:', error);
                toast.error('Không thể tải lịch sử đơn hàng.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const fetchOrderDetail = async (orderId: number) => {
        setDetailLoading(true);
        setShowModal(true);
        try {
            const response = await api.get(`/orders/${orderId}/detail`);
            if (response.data?.code === 1000) {
                setSelectedOrder(response.data.data);
            } else {
                toast.error('Không thể lấy chi tiết đơn hàng.');
                setShowModal(false);
            }
        } catch (error) {
            console.error('Failed to fetch order detail:', error);
            toast.error('Không thể tải chi tiết đơn hàng.');
            setShowModal(false);
        } finally {
            setDetailLoading(false);
        }
    };

    const handleCancelOrder = async (orderId: number) => {
        if (!window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
            return;
        }

        try {
            const response = await api.put(
                `/orders/${orderId}/status`,
                null,
                {
                    params: {
                        status: 'CANCELLED'
                    }
                }
            );


            if (response.data?.code === 1000) {
                toast.success('Hủy đơn hàng thành công.');
                // Refresh the list
                const updatedOrders = await api.get('/orders/my-orders');
                if (updatedOrders.data?.code === 1000) {
                    setOrders(updatedOrders.data.data.content);
                }
                setShowModal(false);
                setSelectedOrder(null);
            } else {
                toast.error(response.data?.message || 'Không thể hủy đơn hàng.');
            }
        } catch (error: any) {
            console.error('Failed to cancel order:', error);
            toast.error(error.response?.data?.message || 'Không thể hủy đơn hàng. Vui lòng thử lại.');
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Chờ xác nhận':
                return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Đã xác nhận':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Đang giao':
                return 'bg-indigo-100 text-indigo-700 border-indigo-200';
            case 'Hoàn thành':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'Đã hủy':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Lịch sử đơn hàng</h1>
                    <p className="text-gray-500 mt-1">Quản lý và theo dõi các đơn hàng của bạn</p>
                </div>
                <Link to="/" className="text-sm font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Tiếp tục mua sắm
                </Link>
            </div>

            {orders.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Chưa có đơn hàng nào</h3>
                    <p className="text-gray-500 mt-2 mb-6">Bạn chưa thực hiện đơn hàng nào trên Avakids.</p>
                    <Link to="/" className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-bold rounded-full hover:bg-primary-700 transition-colors">
                        Mua sắm ngay
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Đơn hàng</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Ngày đặt</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Trạng thái</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Tổng tiền</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-gray-900">#{order.orderNumber}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-600">{formatDate(order.createdAt)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${getStatusColor(order.statusName)}`}>
                                                {order.statusName}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-primary-600">{formatCurrency(order.totalAmount)}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {order.statusName === 'Chờ xác nhận' && (
                                                    <button
                                                        onClick={() => handleCancelOrder(order.id)}
                                                        className="text-xs font-bold text-red-600 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition-all active:scale-95 border border-red-100"
                                                    >
                                                        Hủy đơn
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => fetchOrderDetail(order.id)}
                                                    className="text-xs font-bold text-white bg-primary-600 px-4 py-2 rounded-lg hover:bg-primary-700 transition-all active:scale-95 shadow-sm"
                                                >
                                                    Chi tiết
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Order Detail Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Chi tiết đơn hàng {selectedOrder && `#${selectedOrder.orderNumber}`}
                                </h2>
                                {selectedOrder && (
                                    <p className="text-xs text-gray-500 mt-0.5">Đặt lúc: {formatDate(selectedOrder.createdAt)}</p>
                                )}
                            </div>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setSelectedOrder(null);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                            {detailLoading ? (
                                <div className="flex flex-col justify-center items-center py-20 gap-4">
                                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
                                    <span className="text-sm font-bold text-gray-500">Đang tải chi tiết...</span>
                                </div>
                            ) : selectedOrder ? (
                                <div className="space-y-8">
                                    {/* Status Section */}
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Trạng thái</span>
                                            <span className={`text-sm font-bold mt-0.5 ${selectedOrder.statusName === 'Đã hủy' ? 'text-red-600' : 'text-primary-600'}`}>
                                                {selectedOrder.statusName}
                                            </span>
                                        </div>
                                        <div className="flex flex-col text-right">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Thanh toán</span>
                                            <span className="text-sm font-bold text-gray-800 mt-0.5">{selectedOrder.paymentMethod}</span>
                                        </div>
                                    </div>

                                    {/* Products Table */}
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900 border-l-4 border-primary-500 pl-3 mb-4 uppercase tracking-wide">Sản phẩm đã mua</h3>
                                        <div className="space-y-4">
                                            {selectedOrder.orderItems.map((item) => (
                                                <div key={item.id} className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-gray-200">
                                                        <img
                                                            src={item.productImage || "/placeholder-product.png"}
                                                            alt={item.productName}
                                                            className="w-12 h-12 object-contain"
                                                            onError={(e) => (e.currentTarget.src = "/placeholder-product.png")}
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-bold text-gray-900 truncate">{item.productName}</h4>
                                                        <p className="text-[10px] text-gray-400 mt-0.5 font-medium uppercase tracking-tighter">SKU: {item.sku}</p>
                                                        <div className="flex items-center justify-between mt-1">
                                                            <span className="text-xs font-medium text-gray-500">Số lượng: <span className="font-bold text-gray-900">{item.quantity}</span></span>
                                                            <span className="text-sm font-bold text-primary-600">{formatCurrency(item.unitPrice)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Shipping Address */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
                                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Thông tin giao hàng</h3>
                                            <p className="text-sm font-bold text-gray-800">{selectedOrder.shippingAddress.recipientName}</p>
                                            <p className="text-sm text-gray-600 mt-1">{selectedOrder.shippingAddress.phone}</p>
                                            <p className="text-xs text-gray-500 mt-2 leading-relaxed italic">{selectedOrder.shippingAddress.address}</p>
                                        </div>
                                        <div className="bg-gray-50/50 p-5 rounded-2xl border border-gray-100 flex flex-col justify-center">
                                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Tóm tắt thanh toán</h3>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-gray-500">Tạm tính</span>
                                                <span className="text-xs font-bold text-gray-700">{formatCurrency(selectedOrder.totalAmount)}</span>
                                            </div>
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs text-gray-500">Phí vận chuyển</span>
                                                <span className="text-xs font-bold text-gray-700">{formatCurrency(0)}</span>
                                            </div>
                                            <div className="h-px bg-gray-200 my-2"></div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-bold text-gray-900 uppercase">Tổng tiền</span>
                                                <span className="text-xl font-black text-primary-600">{formatCurrency(selectedOrder.totalAmount)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {selectedOrder.note && (
                                        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                                            <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">Ghi chú</h3>
                                            <p className="text-xs text-blue-700 italic">"{selectedOrder.note}"</p>
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-50 bg-gray-50/50 flex gap-3">
                            {selectedOrder && selectedOrder.statusName === 'Chờ xác nhận' && (
                                <button
                                    onClick={() => handleCancelOrder(selectedOrder.id)}
                                    className="flex-1 py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold hover:bg-red-100 transition-all"
                                >
                                    Hủy đơn hàng
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setSelectedOrder(null);
                                }}
                                className="flex-1 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-100 transition-all hover:shadow-sm"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderHistoryPage;
