import DeliveryLocation from './DeliveryLocationProps';
import HeaderIconButton from './HeaderIconButton';
import InputHeader from './Input';
import Logo from './Logo';
import { useAuth } from '../../../../contexts/AuthContext';
import { useCart } from '../../../../contexts/CartContext';
import { useAddress } from '../../../../contexts/AddressContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import AddressModal from '../../../../pages/cart/components/AddressModal';

const Menu = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const { totalItems } = useCart();
    const { selectedAddress } = useAddress();
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#e82e81] text-white">
            <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-3 py-3 lg:flex-nowrap px-4">
                {/* Logo */}
                <div className="shrink-0">
                    <Logo />
                </div>

                {/* Search */}
                <div className="order-3 w-full lg:order-none lg:w-auto lg:flex-1">
                    <InputHeader />
                </div>

                {/* User Actions */}
                <div className="ml-auto flex items-center gap-2">
                    {isAuthenticated && user ? (
                        <Tippy
                            interactive
                            placement="bottom-start"
                            delay={[0, 100]}
                            arrow={false}
                            hideOnClick={false}
                            offset={[0, 10]}
                            content={
                                <div className="bg-white text-gray-800 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] py-2 w-64 animate-fadeIn overflow-hidden border border-gray-100">
                                    <div className="px-5 py-4 bg-gradient-to-r from-primary-60 to-white mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                                {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <p className="text-sm font-bold text-gray-900 truncate">{user.fullName || 'Thành viên'}</p>
                                                <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-2 space-y-0.5">
                                        <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 hover:bg-primary-60/50 rounded-lg transition-all group">
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white border border-transparent group-hover:border-primary-100">
                                                <svg className="w-4 h-4 text-gray-500 group-hover:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-600">Thông tin cá nhân</span>
                                        </Link>
                                        <Link to="/orders" className="flex items-center gap-3 px-3 py-2.5 hover:bg-primary-60/50 rounded-lg transition-all group">
                                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white border border-transparent group-hover:border-primary-100">
                                                <svg className="w-4 h-4 text-gray-500 group-hover:text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-600">Đơn hàng của tôi</span>
                                        </Link>
                                        <div className="h-px bg-gray-50 my-2 mx-3"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-red-50 rounded-lg transition-all group text-left"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-red-50/50 flex items-center justify-center group-hover:bg-white border border-transparent group-hover:border-red-100">
                                                <svg className="w-4 h-4 text-red-400 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-semibold text-red-500 group-hover:text-red-600">Đăng xuất</span>
                                        </button>
                                    </div>
                                </div>
                            }
                        >
                            <div className="relative flex cursor-pointer items-center rounded-md p-2 transition-all active:scale-[0.98] hover:bg-gray-800/20 group">
                                <div className="icon-userHeader !brightness-0 !invert shrink-0"></div>
                                <div className="ml-2 flex flex-col leading-tight hidden sm:flex">
                                    <span className="text-[11px] font-medium text-white/90 uppercase tracking-wide">Tài khoản</span>
                                    <span className="text-sm font-bold truncate max-w-[120px]">{user.fullName || 'Khách'}</span>
                                </div>
                            </div>
                        </Tippy>
                    ) : (
                        <Link to="/login">
                            <HeaderIconButton
                                iconClass="icon-userHeader"
                                text="Đăng nhập"
                                className="hover:bg-gray-800/20"
                                textClassName="font-medium"
                            />
                        </Link>
                    )}

                    <span className="hidden h-6 w-px bg-white/30 sm:inline-block"></span>

                    <Link to="/cart">
                        <HeaderIconButton
                            iconClass="icon-cartHeader"
                            text="Giỏ hàng"
                            showBadge={totalItems > 0}
                            badgeCount={totalItems}
                            className="relative hover:bg-gray-800/20"
                            textClassName="font-medium"
                        />
                    </Link>

                    <span className="hidden h-6 w-px bg-white/30 sm:inline-block"></span>

                    <div className="hidden sm:block">
                        <DeliveryLocation
                            address={selectedAddress ? `${selectedAddress.address}, ${selectedAddress.district}` : 'Chọn địa chỉ giao hàng'}
                            onClick={() => setIsAddressModalOpen(true)}
                        />
                    </div>
                </div>
            </div>

            <AddressModal
                isOpen={isAddressModalOpen}
                onClose={() => setIsAddressModalOpen(false)}
            />
        </header>
    );
};

export default Menu;
