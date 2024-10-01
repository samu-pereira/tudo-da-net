import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/product.css";


function Product({ product }) {
  const { url, info, price, stock, _id } = product;
  const [ quantity, setQuantity ] = useState(1);
  const navigate = useNavigate();

  function handleQuantity(value) {
    setQuantity(value > 0 && value <= stock ? value : 1);
  }

  function plusQuantity () {
    const newQuantity = quantity + 1;
    if (newQuantity > stock) return
    setQuantity(newQuantity);
  } 

  function subtractQuantity () {
    const newQuantity = quantity - 1;
    if (newQuantity < 1 ) return
    setQuantity(newQuantity);
  } 

  function DisplayInfo({ info }) {
    if (info.length > 52 ) {
      const trimmedInfo = info.substring(0, 48);
      const words = trimmedInfo.split(" ");
      const lastWord = words[words.length - 1];
      const maxString = 52;
      const ellipsis = "...";

      const reducedInfo = lastWord.length + ellipsis.length > maxString - trimmedInfo.indexOf(lastWord)
        ? trimmedInfo.substring(0, trimmedInfo.indexOf(lastWord) - 1) + ellipsis
        : trimmedInfo + ellipsis
    

      return (
        <span className="info-ellipsis" title={info}>{reducedInfo}</span>
      );

    } else {
      return (
        <span className="info">
          {info}
        </span>)
    }
  }

  async function handleAdd() {
    try {
      const response = await axios.get("http://localhost:3001/api/user", 
      {
        headers: { Authorization: localStorage.getItem("authToken")},
        withCredentials: true,  
      });

      console.log("Product Response ------> ", response);

      const { userId } = response.data;

      const userCart = localStorage.getItem(`userCart`);

      if (!userCart) {
        localStorage.setItem(`userCart`, JSON.stringify([{ _id, quantity }]))
        window.alert(`Adicionado ${quantity} x ${info} ao carrinho`);
        window.dispatchEvent(new Event('storage'));
        return setQuantity(1);
      }
      const cart = JSON.parse(userCart) 

      console.log("Cart Before Add ------> ", cart);

      const existingItem = cart.find((cartItem) => cartItem._id === _id);

      if(existingItem) {
        if(existingItem.quantity + quantity > stock) return window.alert("Estoque insuficiente")
          existingItem.quantity += quantity;
      } else cart.push({ _id, quantity });

      localStorage.setItem(`userCart`, JSON.stringify(cart))

      window.alert(`Adicionado ${quantity} x ${info} ao carrinho`);

      setQuantity(1);
      
      console.log("Add Product Response ------> ", { _id, quantity });
      console.log("Cart After Add ------> ", cart);

      window.dispatchEvent(new Event('storage'));

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

      <div className="product-info">
        <DisplayInfo info={info} />
      </div>

      <span className="product-price">
        <h5 className="price-tag">R$</h5>
        <h2 className="price-value">{price.toFixed(2)}</h2>
        <h5 className="stock-value">Estoque {stock}</h5>        
      </span>
      
      <div className="product-add">
        <button className="add-button" onClick={() => handleAdd()}>Adicionar</button>
        <div className="add-quantity">
          <input
            className="quantity-value"
            type="number"
            value={quantity}
            min={1}
            max={stock}
            onFocus={(e) => e.target.select()}
            onChange={(e) => handleQuantity(e.target.value)}
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
