import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "../components/Contexts.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Cart from "./pages/Cart.jsx";
import Layout from "../components/Layout.jsx";

const AppRoutes = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/api/login" element={<Login />} />
            <Route path="/api/signup" element={<SignUp />} />
            <Route path="/api/cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>   
  );
};

export default AppRoutes;
