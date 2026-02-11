import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAddress } from "../../contexts/AddressContext";
import ConfirmationModal from "./components/ConfirmationModal";
import AddressModal from "./components/AddressModal";

const CartPage = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        totalPrice,
        totalDiscount,
        finalPrice,
        clearCart,
        totalItems
    } = useCart();

    const { selectedAddress } = useAddress();

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState<(() => void) | null>(null);
    const [modalMessage, setModalMessage] = useState("");

    // Address modal state
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const openDeleteModal = (itemId: number, itemName: string) => {
        setModalMessage(`Bạn có chắc muốn bỏ sản phẩm "${itemName}"?`);
        setModalAction(() => () => removeFromCart(Number(itemId)));
        setIsModalOpen(true);
    };

    const openClearAllModal = () => {
        setModalMessage("Bạn có chắc muốn xóa tất cả sản phẩm khỏi giỏ hàng?");
        setModalAction(() => () => clearCart());
        setIsModalOpen(true);
    };

    const handleConfirmAction = () => {
        if (modalAction) {
            modalAction();
        }
        setIsModalOpen(false);
    };

    if (cartItems.length === 0) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-10 text-center">
                <p className="text-24 font-semibold text-ink-dark mb-4">Giỏ hàng của bạn đang trống</p>
                <Link to="/" className="text-primary-600 hover:underline">Tiếp tục mua sắm</Link>
            </div>
        );
    }

    return (
        <div>
            <div className="mx-auto max-w-7xl px-4">
                <div className="min-h-[60px] w-full">
                    <p className="py-6 text-24 font-semibold text-ink-dark">Giỏ hàng</p>
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-6">
                    {/* List Items */}
                    <div className="w-full lg:flex-1">
                        <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm">
                            <h3 className="mb-4 text-18 font-bold text-gray-800">Danh sách sản phẩm</h3>
                            <div className="divide-y divide-gray-100">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="py-4">
                                        <div className="flex items-start gap-4">
                                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border">
                                                <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between gap-2">
                                                    <p className="text-14 font-medium text-gray-900 line-clamp-2">{item.name}</p>
                                                    <div className="text-right">
                                                        <div className="text-15 font-bold text-pink-600">{formatPrice(item.price)}</div>
                                                        {item.originalPrice && item.originalPrice > item.price && (
                                                            <div className="text-12 text-gray-400 line-through">{formatPrice(item.originalPrice)}</div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mt-3 flex items-center justify-between">
                                                    <button
                                                        onClick={() => openDeleteModal(Number(item.id), item.name)}
                                                        className="text-13 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                                                    >
                                                        Xóa
                                                    </button>
                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => updateQuantity(Number(item.id), item.quantity - 1)}
                                                            className="flex h-7 w-7 items-center justify-center rounded-full border bg-gray-50 text-gray-600 disabled:opacity-30 cursor-pointer"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="min-w-[20px] text-center text-14 font-bold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(Number(item.id), item.quantity + 1)}
                                                            className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500 text-white hover:bg-pink-600 cursor-pointer"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 border-t pt-4 text-center cursor-pointer">
                                <button onClick={openClearAllModal} className="text-14 text-red-500 hover:underline">
                                    Xóa tất cả sản phẩm
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="w-full lg:w-[400px] space-y-4">
                        {/* Delivery Info */}
                        <div className="rounded-2xl bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center gap-6">
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input type="radio" name="delivery" defaultChecked className="h-4 w-4 border-gray-300 text-pink-600 focus:ring-pink-500" />
                                    <span className="text-14 font-medium text-gray-700">Giao tận nơi</span>
                                </label>
                                <label className="flex cursor-pointer items-center gap-2">
                                    <input type="radio" name="delivery" className="h-4 w-4 border-gray-300 text-pink-600 focus:ring-pink-500" />
                                    <span className="text-14 font-medium text-gray-700">Tại siêu thị</span>
                                </label>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-15 font-bold text-gray-800">Thông tin nhận hàng</h4>
                                    <button
                                        onClick={() => setIsAddressModalOpen(true)}
                                        className="text-13 font-semibold text-blue-600 hover:text-blue-700"
                                    >
                                        {selectedAddress ? "Thay đổi" : "Thêm ngay"}
                                    </button>
                                </div>

                                {selectedAddress ? (
                                    <div className="mt-3 rounded-xl bg-gray-50 p-3 text-13">
                                        <div className="flex items-center gap-2 font-bold text-gray-900">
                                            <span>{selectedAddress.recipientName}</span>
                                            <span className="h-3 w-px bg-gray-300"></span>
                                            <span>{selectedAddress.phone}</span>
                                        </div>
                                        <p className="mt-1 text-gray-600 line-clamp-2">
                                            {selectedAddress.address}, {selectedAddress.district}, {selectedAddress.city}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="mt-3 rounded-xl bg-red-50 p-3 text-13 text-red-600 font-medium">
                                        Vui lòng nhập thông tin nhận hàng
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Price Details */}
                        <div className="rounded-2xl bg-white p-5 shadow-sm">
                            <div className="space-y-3">
                                <div className="flex justify-between text-14 text-gray-600">
                                    <span>Tổng tiền hàng</span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-14 text-gray-600">
                                    <span>Giảm giá trực tiếp</span>
                                    <span className="text-green-600">-{formatPrice(totalDiscount)}</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between items-center">
                                    <span className="text-15 font-bold text-gray-800">Tổng thanh toán</span>
                                    <div className="text-right">
                                        <div className="text-20 font-bold text-pink-600">{formatPrice(finalPrice)}</div>
                                        <div className="text-12 text-gray-400">(Đã bao gồm VAT)</div>
                                    </div>
                                </div>
                            </div>
                            <Link to="/checkout" className="mt-6 w-full rounded-xl bg-pink-600 py-4 text-16 font-bold text-white shadow-lg shadow-pink-100 hover:bg-pink-700 transition-all active:scale-[0.98] block text-center">
                                THANH TOÁN ({totalItems})
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmAction}
                message={modalMessage}
            />

            <AddressModal
                isOpen={isAddressModalOpen}
                onClose={() => setIsAddressModalOpen(false)}
            />
        </div>
    );
};

export default CartPage;
