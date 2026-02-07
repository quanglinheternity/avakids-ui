import { BannerProvider } from "./contexts/BannerContext";
import DefaultLayout from "./layouts/components/DefaultLayout/DefaultLayout"
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetailPage from "./pages/product-detail/ProductDetailPage";


function App() {

  return (
    <>
      <BannerProvider>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="product/:id" element={<ProductDetailPage />} />
          </Route>
        </Routes>
      </BannerProvider>
    </>

  )
}

export default App
