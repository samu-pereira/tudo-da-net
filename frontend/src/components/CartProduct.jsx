import React, { useEffect, useState } from "react";
import Skeleton from "./common/Skeleton";
import axios from "axios";
import "../styles/cart.css"


function CartProduct({ productId, quantity, totalValue, setTotalValue, setUserCart }) {
  const [productData, setProductData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [quant, setQuant] = useState(parseInt(quantity));
  const [totalPrice, setTotalPrice] = useState(1)

  function handleQuantity(e) {
    const newQuantity = e.target.value > 0 && e.target.value < 100 ? e.target.value : quantity;
    setQuant(newQuantity);
    handleNewQuantity(newQuantity);
  }

  function plusQuantity () {
    const newQuantity = parseInt(quant) + 1;
    if (newQuantity > 99) return
    setQuant(newQuantity);
    handleNewQuantity(newQuantity);
  } 

  function subtractQuantity () {
    const newQuantity = parseInt(quant) - 1;
    if (newQuantity < 1 ) return handleDelete();
    setQuant(newQuantity);
    handleNewQuantity(newQuantity);
  } 

  function totalProductPrice(price) {
    if (quant == 0) return
    const calculateTotal = parseFloat(price) * quant;
    setTotalPrice(calculateTotal);
  }

  function handleDelete() {
    if (window.confirm("Deseja excluir o produto?")){
    try {
      const userCart = localStorage.getItem("userCart");
      const cart = JSON.parse(userCart) 

      console.log("Cart Before Delete ------> ", cart);
      console.log("Product Id ------> ", productId);

      const updatedCart = cart.filter((value) => value._id !== productId);
      localStorage.setItem("userCart", JSON.stringify(updatedCart))

      setUserCart(updatedCart);

      window.alert(`${productData.info} excluido do carrinho`);
      console.log("Cart After Delete ------> ", updatedCart);

    } catch (error) {
      console.log(error);
    }}}


  
  function handleNewQuantity(newQuantity) {
    try {
      const userCart = localStorage.getItem("userCart");
      const cart = JSON.parse(userCart) 

      console.log("Cart Before Add ------> ", cart);

      const updatedItem = cart.find((cartItem) => cartItem._id === productId);

      updatedItem.quantity = newQuantity;
      setUserCart(cart);
      localStorage.setItem("userCart", JSON.stringify(cart))

      console.log("Cart After Add ------> ", cart);
      
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect (() => {
    async function getProductById(id) {
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${id}`)
        setProductData(response.data);

      } catch (error) {
        console.log(error)
      }
    }
    getProductById(productId);
    setIsLoading(false);
  }, [productId]);

  useEffect (() => {
    totalProductPrice(productData.price);
  }, [productData, quant])

  return (
    <section className="cart-container">
      { isLoading
        ? <Skeleton />
        : <>
            <div className="cart-info">
              <img height={100} width={100} src={productData.url} alt="product" />
              <div className="info-txt">
                <p>{productData.info}</p>
                <button className="delete-product" onClick={() => handleDelete()}>
                  Delete
                </button>
              </div>
            </div>

            <p className="cart-price">R${parseFloat(productData.price).toFixed(2)}</p>

            <div className="cart-quant">
              <button
                className="quant-minus"
                type="button"
                onClick={() => subtractQuantity()}
              >
                -
              </button>

              <input
                  className="quant-value"
                  type="number"
                  value={quant}
                  min={1}
                  max={99}
                  onFocus={(e) => e.target.select()}
                  onChange={handleQuantity}
                />
              
              <button
                className="quant-plus" 
                type="button" 
                onClick={() => plusQuantity()}
              > 
              + 
              </button>
            </div>

            <p className="cart-total">R${totalPrice.toFixed(2)}</p>     
          </>
      }      
    </section>
  );
}

export default CartProduct ;
