import React, { useEffect, useState } from "react";
import CartProduct from "../../components/CartProduct.jsx";
import Loading from "../../components/common/Loading.jsx";
import axios from "axios";
import "../../styles/cart.css";

function Cart() {
  document.title = "Cart";
  const [userCart, setUserCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);

    async function calculateTotalValue (cart) {
      try {
        const productDetails = await Promise.all(
          cart.map(async (item) => {
            const response = await axios.get(`http://localhost:3001/api/products/${item._id}`);
            return { ...response.data, quantity: item.quantity };
          })
        );

        const inicialValue = 0;
        const total = productDetails.reduce((acc, product) => {
          return acc + (parseFloat(product.price * product.quantity))
        }, inicialValue);
      
        setTotalValue(total);

      } catch (error) {
        console.log(error)        
      }
    };  

  async function GetUserCart() {
    const cart = localStorage.getItem("userCart");
    if (!cart) return
    const parsedCart = JSON.parse(cart);
    
    try {
     
    setUserCart(parsedCart);
    console.log("Cart Response with details ------> ", parsedCart);

    calculateTotalValue(parsedCart);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetUserCart()
    console.log("UserCart ------> ", userCart)
    setIsLoading(false);
  }, []);

  return (
    <>
      <main className="cart-main">
          {isLoading 
            ? <Loading /> 
            : <>
                {userCart.length > 0 
                  ? <div className="cartlist-container">
                      <div className="label-list">
                        <h3 className="label-info">Produtos</h3>
                        <h3 className="label-price">Preço Unitário</h3>
                        <h3 className="label-quant">Quantidade</h3>
                        <h3 className="label-total">Preço Total</h3>
                      </div>

                      <div className="cart-list">
                        {userCart.map((product, index) => (
                          <CartProduct
                            key={index} 
                            productId={product._id} 
                            quantity={product.quantity}
                            setUserCart={setUserCart}
                            calculateTotalValue={calculateTotalValue}
                          />
                        ))}                    
                      </div>
                    </div>

                  : <h1>Your cart is empty</h1>
                }
              </>
          }
      </main>

      {userCart.length > 0 
        ? <footer className="cart-footer">
            <h1><strong>Valor Total: R${totalValue.toFixed(2)}</strong></h1>
            <button className="pay-button">Pagar</button>
          </footer>
        : <></>
      }
    </>
  );
}

export default Cart;
