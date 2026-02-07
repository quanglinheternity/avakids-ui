import { BannerProvider } from "./contexts/BannerContext";
import DefaultLayout from "./layouts/components/DefaultLayout/DefaultLayout"


function App() {

  return (
    <>
      <BannerProvider>
        <DefaultLayout />
      </BannerProvider>
    </>

  )
}

export default App
