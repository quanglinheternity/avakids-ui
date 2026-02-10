import DeliveryLocation from './DeliveryLocationProps';
import HeaderIconButton from './HeaderIconButton';
import InputHeader from './Input';
import Logo from './Logo';
import { useAuth } from '../../../../contexts/AuthContext';
import { useCart } from '../../../../contexts/CartContext';
import { useAddress } from '../../../../contexts/AddressContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import AddressModal from '../../../../pages/cart/components/AddressModal';

const Menu = () => {
    const { user, isAuthenticated } = useAuth();
    const { totalItems } = useCart();
    const { selectedAddress } = useAddress();
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

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
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-800/20 p-2 rounded-lg transition-colors">
                            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold border border-white/30">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <span className="text-sm font-semibold hidden sm:inline-block">{user.name || 'Tài khoản'}</span>
                        </div>
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
