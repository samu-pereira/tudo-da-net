import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Product from "../../components/Product.jsx";
import axios from "axios";
import "../../styles/home.css";

function Home() {
  const [productList, setProductList] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";

  async function GetProductList() {
    try {
      const response = await axios.get(`http://localhost:3001/api/products`, {
      // const response = await axios.get(`http://localhost:3001/api/products?search=${query}`, {
        withCredentials: true,
      });
      console.log("Product List ------> ", response.data);

      const filterProducts = response.data.filter(item => item.info.toLowerCase().includes(query))
      setProductList(filterProducts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetProductList();
  }, [query]);

  return (
    <main className="home-main">
      <div className="main-container">
        <div className="product-list">
          {productList.length > 0 ? (
            productList.map((product, index) => (
              <Product key={index} product={product} />
            ))
          ) : (
            <p>Nenhum produto disponível.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Home;
