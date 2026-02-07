import Header from "../Header/Header";
import Footer from "../footer/Footer";

import ServiceInfoSection from "../../../pages/home/components/ServiceInfoSection";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
    return (
        <div className="min-h-dvh bg-white">
            <Header />
            <Outlet />

            <ServiceInfoSection />
            <Footer />

        </div>
    );

}
export default DefaultLayout;