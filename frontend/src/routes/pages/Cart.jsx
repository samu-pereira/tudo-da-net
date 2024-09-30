import React, { useContext, useEffect, useState } from "react";
import CartProduct from "../../components/CartProduct.jsx";
import { UserContext } from "../../components/contexts/Contexts.jsx";
import axios from "axios";
import "../../styles/cart.css"
import Loading from "../../components/common/Loading.jsx";

function Cart() {
  document.title = "Cart";
  const [userCart, setUserCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);


  async function GetUserCart() {
    try {
      
      const cart = localStorage.getItem("userCart");
      if (!cart) return

      const parsedCart = JSON.parse(cart);
      setUserCart(parsedCart);
      console.log("Cart Response ------> ", parsedCart);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetUserCart()
    setIsLoading(false);
  }, []);

  return (
    <>
      <main className="cart-main">
          { isLoading 
            ? <Loading /> 
            : <div className="cartlist-container">
                <div className="label-list">
                  <h3 className="label-info">Produtos</h3>
                  <h3 className="label-price">Preço Unitário</h3>
                  <h3 className="label-quant">Quantidade</h3>
                  <h3 className="label-total">Preço Total</h3>
                </div>
                <div className="cart-list">
                  {userCart.length > 0 ? (
                    <>
                      {userCart.map((product, index) => (
                        <CartProduct
                        key={index} 
                        productId={product._id} 
                        quantity={product.quantity}
                        totalValue={totalValue}
                        setTotalValue={setTotalValue}
                        setUserCart={setUserCart}
                        />
                      ))}


                    
                    </>

                  ) : (
                    <p>Your cart is empty</p>
                  )}
                </div>
              </div> 
          }
      </main>
      <footer className="cart-footer">
        <h1><strong>Valor Total: R${totalValue.toFixed(2)}</strong></h1>
        <button className="pay-button">Pagar</button>
      </footer>
    </>
  );
}

export default Cart;
