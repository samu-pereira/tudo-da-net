import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../components/Product.jsx";
import "../../styles/home.css";

function Home() {
  const [productList, setProductList] = useState([]);

  async function GetProductList() {
    try {
      const response = await axios.get("http://localhost:3001/api/products", {
        withCredentials: true,
      });
      console.log("Product List ------> ", response.data);
      setProductList(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetProductList();
  }, []);

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
