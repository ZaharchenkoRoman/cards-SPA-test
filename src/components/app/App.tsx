import {Route, Routes} from "react-router";
import IntroductoryPage from "../introductory-page/introductory-page.tsx";
import Header from "../header/header.tsx";
import {lazy} from "react";

const ProductsLazyPage = lazy(() => import("../allCards/AllCards.tsx"));
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
          element={<ProductsLazyPage />}
        ></Route>
        <Route
          path="/products/:id"
          element={<ProductIdLazyPage />}
        ></Route>
        <Route
          path="/createProduct"
          element={<CreateProductLazyPage />}
        ></Route>
      </Routes>
    </>
  )
}

export default App
