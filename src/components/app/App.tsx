import {Route, Routes} from "react-router";
import IntroductoryPage
  from "../introductory-page/introductory-page.tsx";
import Products from "../products/products.tsx";
import ProductIdPage from "../productIdPage/productIdPage.tsx";
import CreateProduct from "../create-product/create-product.tsx";
import Header from "../header/header.tsx";


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
          element={<Products />}
        ></Route>
        <Route
          path="/products/:id"
          element={<ProductIdPage />}
        ></Route>
        <Route
          path="/createProduct"
          element={<CreateProduct />}
        ></Route>
      </Routes>
    </>
  )
}

export default App
