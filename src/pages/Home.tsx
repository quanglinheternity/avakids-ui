import BlogSection from './home/components/BlogSection';
import FlashSaleSection from './home/components/FlashSaleSection'
import HeroSection from './home/components/HeroSection';
import Sidebar from './home/components/Sidebar';
import SuggestedProductsSection from './home/components/SuggestedProductsSection';
import TetBanner from '../pages/home/components/TetBanner';

const Home = () => {
    return (
        <div className="relative mx-auto min-h-screen max-w-[1200px] pt-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                <aside className="hidden lg:sticky lg:top-6 lg:block lg:col-span-3 lg:self-start xl:col-span-3">
                    <Sidebar />
                </aside>

                <main className="col-span-1 space-y-6 lg:col-span-9">
                    <HeroSection />
                    <TetBanner />
                    <FlashSaleSection />
                    <SuggestedProductsSection />
                    <BlogSection />
                </main>

            </div>

        </div>
    );
};

export default Home;