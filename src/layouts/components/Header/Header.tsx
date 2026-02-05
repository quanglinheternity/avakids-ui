import Menu from './Menu/Menu';
import TopBanner from './TopBanner/TopBanner';

const Header = () => {
    return (
        <header className="w-full bg-white shadow-md">
            <TopBanner />
            <Menu />
        </header>
    );
};
export default Header;
