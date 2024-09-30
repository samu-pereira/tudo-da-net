import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/product.css";


function Product({ product }) {
  const { url, info, price, _id } = product;
  const [ quantity, setQuantity ] = useState(1);
  const navigate = useNavigate();

  function handleQuantity(e) {
    setQuantity(e.target.value > 0 ? e.target.value : 0);
  }

  function plusQuantity () {
    const newQuantity = quantity + 1;
    if (newQuantity > 99) return
    setQuantity(newQuantity);
  } 

  function subtractQuantity () {
    const newQuantity = quantity - 1;
    if (newQuantity < 1 ) return
    setQuantity(newQuantity);
  } 

  function handleAdd() {
    
    try {
      const userCart = localStorage.getItem("userCart");
      if (!userCart) {
        localStorage.setItem("userCart", JSON.stringify([{ _id, quantity }]))
        window.alert(`Adicionado ${quantity} x ${info} ao carrinho`);
        return setQuantity(1);
      }
      const cart = JSON.parse(userCart) 

      console.log("Cart Before Add ------> ", cart);

      const existingItem = cart.find((cartItem) => cartItem._id === _id);
      existingItem 
        ? existingItem.quantity += quantity 
        : cart.push({ _id, quantity });

      localStorage.setItem("userCart", JSON.stringify(cart))

      window.alert(`Adicionado ${quantity} x ${info} ao carrinho`);

      setQuantity(1);
      
      console.log("Add Product Response ------> ", { _id, quantity });
      console.log("Cart After Add ------> ", cart);
      
    } catch (error) {
      console.log(error.response.data.msg);
      window.alert(error.response.data.msg);
      navigate("/api/login");
    }
  }

  return (
    <section className="product-container">
      <div className="img-container">
        <img src={url} alt="imagem do produto"></img>
      </div>
      <p className="product-info">{info}</p>
      <span className="product-price">
        <h5 className="price-tag">R$</h5>
        <h2 className="price-value">{price.toFixed(2)}</h2>
      </span>
      
      <div className="product-add">
        <button className="add-button" onClick={() => handleAdd()}>Adicionar</button>
        <div className="add-quantity">
          <input
            className="quantity-value"
            type="number"
            value={quantity}
            min={1}
            max={99}
            onFocus={(e) => e.target.select()}
            onChange={handleQuantity}
          />
          <div className="quantity-buttons">
            <button
              type="button"
              className="plus-button"
              onClick={() => plusQuantity()}
            >
              +
            </button>
            <button
              type="button"
              className="minus-button"
              onClick={() => subtractQuantity()}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
