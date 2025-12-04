import {Route, Routes} from "react-router";
import IntroductoryPage from "../introductory-page/introductory-page.tsx";
import Header from "../header/header.tsx";
import {lazy, Suspense} from "react";

const ProductsLazyPage = lazy(() => import("../products/products.tsx"));
const ProductIdLazyPage = lazy(() => import("../productIdPage/productIdPage.tsx"))
const CreateProductLazyPage = lazy(() => import("../create-product/create-product.tsx"));

const App = () => {


  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<IntroductoryPage />}
        ></Route>
        <Route
          path="/products"
          element={<Suspense fallback={(<div>...Loading</div>)}><ProductsLazyPage /></Suspense>}
        ></Route>
        <Route
          path="/products/:id"
          element={<Suspense fallback={(<div>...Loading</div>)}><ProductIdLazyPage /></Suspense>}
        ></Route>
        <Route
          path="/createProduct"
          element={<Suspense fallback={(<div>...Loading</div>)}><CreateProductLazyPage /></Suspense>}
        ></Route>
      </Routes>
    </>
  )
}

export default App
