import { useCart } from "../../contexts/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice, totalDiscount, finalPrice, clearCart, totalItems } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
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
            <div className="mx-auto max-w-7xl">
                <div className="min-h-[60px] w-full px-4">
                    <p className="py-6 text-24 font-semibold text-ink-dark">Giỏ hàng</p>
                </div>
                <div className="">
                    <div className="flex items-start justify-between">
                        <div className="mb-4 mr-4 flex w-[calc(100%_-_432px)] max-w-[848px] flex-col gap-4">
                            <div className="overflow-hidden rounded-2xl bg-white p-[24px_30px]">
                                <h3 className="mb-4 text-18 font-600 leading-22 text-black-100">Danh sách sản phẩm</h3>
                                {cartItems.map((item) => (
                                    <div key={item.id} className="w-[calc(100%_-_20px)] border-b border-grayBorder-100 py-16px last:border-b-0 !border-none">
                                        <div className="flex items-start px-8px">
                                            <div className="w-[80px] cursor-pointer">
                                                <div className="flex flex-col items-center gap-4px">
                                                    <div className="cursor-pointer">
                                                        <div className="relative h-auto overflow-hidden" style={{ height: '80px', width: '80px' }}>
                                                            <picture>
                                                                <img src={item.image} alt={item.name} loading="lazy" fetchPriority="auto" decoding="async" className="object-contain transition-opacity duration-300 opacity-100" style={{ width: '80px', height: '80px' }} />
                                                            </picture>
                                                        </div>
                                                    </div>
                                                    <div onClick={() => removeFromCart(item.id)} className="cursor-pointer text-14 text-gray-700 hover:text-red-500">Xóa</div>
                                                </div>
                                            </div>
                                            <div className="w-[calc(100%_-_68px)] pl-4">
                                                <div className="mb-2 items-start justify-between gap-4 grid grid-cols-[auto_200px]">
                                                    <p className="font-400 text-14 text-black-100 line-clamp-2 cursor-pointer">{item.name}</p>
                                                    <div className="flex items-center justify-end gap-8px">
                                                        <span className="text-16 font-600 leading-24 text-primaryNeutral">{formatPrice(item.price)}</span>
                                                        {item.originalPrice && item.originalPrice > item.price && (
                                                            <span className="text-14 font-500 leading-20 text-gray-700 line-through">{formatPrice(item.originalPrice)}</span>
                                                        )}
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-3 w-3 text-pink-500">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between gap-4">
                                                    <div></div>
                                                    <div className="flex flex-col items-end">
                                                        <div className="flex items-center justify-between gap-3">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                </svg>
                                                            </button>
                                                            <span className="min-w-5 text-center text-14 font-semibold">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E12D39] text-white hover:bg-red-600"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="my-3"></div>
                                <div className="flex items-center justify-center">
                                    <button onClick={clearCart} className="text-16 text-[#E12D39] underline">Xóa tất cả sản phẩm</button>
                                </div>
                            </div>
                        </div>
                        {/* Summary Section */}
                        <div className="sticky top-[124px] w-full max-w-[416px] self-start space-y-4">
                            <div className="rounded-xl bg-white p-4">
                                <div className="flex items-center gap-8">
                                    <label className="flex cursor-pointer items-center gap-3">
                                        <div className="relative flex items-center justify-center">
                                            <input className="peer h-5 w-5 appearance-none rounded-full border-2 border-gray-300 checked:border-[#E12D39]" type="radio" value="2" defaultChecked name="radio-group" />
                                            <div className="absolute h-2.5 w-2.5 rounded-full bg-[#E12D39] opacity-0 peer-checked:opacity-100"></div>
                                        </div>
                                        <span className="text-14 text-gray-700">Giao tận nơi</span>
                                    </label>
                                    <label className="flex cursor-pointer items-center gap-3">
                                        <div className="relative flex items-center justify-center">
                                            <input className="peer h-5 w-5 appearance-none rounded-full border-2 border-gray-300 checked:border-[#E12D39]" type="radio" value="1" name="radio-group" />
                                            <div className="absolute h-2.5 w-2.5 rounded-full bg-[#E12D39] opacity-0 peer-checked:opacity-100"></div>
                                        </div>
                                        <span className="text-14 text-gray-700">Nhận tại siêu thị</span>
                                    </label>
                                </div>
                            </div>

                            <div className="rounded-xl bg-white p-4">
                                <div className="flex w-full items-center justify-between">
                                    <span className="text-18 font-normal text-gray-700">Thông tin nhận hàng</span>
                                    <button className="text-14 text-blue-500 hover:underline">Thêm ngay</button>
                                </div>
                                <div className="mt-2 text-14 text-red-500">
                                    Vui lòng nhập thông tin nhận hàng
                                </div>
                                <p className="mt-1 text-14 text-gray-500">Cổ đô, An Khánh, Hà Nội</p>
                            </div>

                            <div className="rounded-xl bg-white p-4">
                                <div className="mb-3 flex items-center justify-between text-14 text-gray-600">
                                    <span>Tổng tiền hàng</span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>
                                <div className="mb-3 flex items-center justify-between text-14">
                                    <span className="text-gray-600">Giảm giá sản phẩm</span>
                                    <span className="text-green-600">-{formatPrice(totalDiscount)}</span>
                                </div>
                                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                                    <span className="text-14 text-gray-600">Tạm tính tổng thanh toán</span>
                                    <span className="text-18 font-bold text-green-600">{formatPrice(finalPrice)}</span>
                                </div>
                                <button className="mt-4 w-full rounded-lg bg-[#E12D39] py-3 text-16 font-bold text-white hover:bg-red-600 transition-colors">
                                    Thanh toán ({totalItems})
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
