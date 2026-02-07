import DeliveryLocation from './DeliveryLocationProps';
import HeaderIconButton from './HeaderIconButton';
import InputHeader from './Input';
import Logo from './Logo';
import { useAuth } from '../../../../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Menu = () => {
    const { user, isAuthenticated } = useAuth(); // authentication state

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#e82e81] text-white">
            <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-3  py-3 lg:flex-nowrap">
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
                        <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-800/20 p-2 rounded-lg transition-colors">
                            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <span className="text-sm font-medium">{user.name || 'Tài khoản'}</span>
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

                    <HeaderIconButton
                        iconClass="icon-cartHeader"
                        text="Giỏ hàng"
                        showBadge={true}
                        // badgeCount={3}
                        className="relative hover:bg-gray-800/20"
                        textClassName="font-medium"
                    />
                    <span className="hidden h-6 w-px bg-white/30 sm:inline-block"></span>
                    <div className="hidden sm:block">
                        <DeliveryLocation
                            address={'13 Đường Lê Lợi, Quận 1, TP.HCM'}
                        // prefixText="Địa chỉ nhận hàng:"
                        // onClick={handleChangeAddress}
                        // badgeCount={0}
                        />
                    </div>
                    <span className="hidden h-6 w-px bg-white/30 sm:inline-block"></span>
                    <div className="hidden sm:block rounded-full cursor-pointer rounded-full bg-gray-800/25 p-1 transition-all duration-200 hover:bg-gray-800/40 active:scale-[0.98] ">
                        <HeaderIconButton
                            iconClass="icon-infoHeader"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Menu;
