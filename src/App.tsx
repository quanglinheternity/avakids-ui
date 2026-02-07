import { BannerProvider } from "./contexts/BannerContext";
import { AuthProvider } from "./contexts/AuthContext";
import DefaultLayout from "./layouts/components/DefaultLayout/DefaultLayout"
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetailPage from "./pages/product-detail/ProductDetailPage";
import LoginPage from "./pages/auth/LoginPage";


function App() {

  return (
    <>
      <AuthProvider>
        <BannerProvider>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>
              <Route index element={<Home />} />
              <Route path="product/:id" element={<ProductDetailPage />} />
              <Route path="login" element={<LoginPage />} />
            </Route>
          </Routes>
        </BannerProvider>
      </AuthProvider>
    </>

  )
}

export default App
