import Header from "../Header/Header";
import Footer from "../footer/Footer";
import Home from "../../../pages/Home";
import ServiceInfoSection from "../../../pages/home/components/ServiceInfoSection";

function DefaultLayout() {
    return (
        <div className="min-h-dvh bg-white">
            <Header />
            <Home />

            <ServiceInfoSection />
            <Footer />

        </div>
    );

}
export default DefaultLayout;