import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import ProductDetails from "./Components/ProductDetailes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-product" element={<Admin />} />
        <Route
  path="/product-details/:id"
  element={<ProductDetails />}
/>
      </Routes>
    </>
  );
}

export default App;