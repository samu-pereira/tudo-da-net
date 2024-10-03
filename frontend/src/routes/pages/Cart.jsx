import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartProduct from "../../components/CartProduct.jsx";
import Loading from "../../components/common/Loading.jsx";
import axios from "axios";
import "../../styles/cart.css";

function Cart() {
  document.title = "Cart";
  const [userCart, setUserCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalValue, setTotalValue] = useState(0);
  const navigate = useNavigate();

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
      console.log("Get User Cart ------> ", parsedCart);

      calculateTotalValue(parsedCart);

    } catch (error) {
      console.log(error);
    }
  }

  async function handlePayment() {
    if (window.confirm("Deseja efetuar o pagamento?")){
      try {
        console.log("User Cart Before Paymant ------> ", userCart);
        const response = await axios.put("http://localhost:3001/api/products", 
          { userCart }, 
          { 
            headers: { Authorization: localStorage.getItem("authToken") },
            withCredentials: true,
          },
        ); 

        console.log("Payment Response ------> ", response);

        if(response.status === 400) {
          const { id, stock } = response.data.item;
          const newCart = userCart.map((item) => {
            if (item._id === id) {
              return { ...item, quantity: stock }
            };
            return item;
          });
          return setUserCart(newCart);
        }
        
        window.alert(response.data.msg)
        localStorage.removeItem("userCart");
        navigate("/")

      } catch (error) {
        console.log(error)
        window.alert(error.response?.data.msg)
      }
    }
  }

  useEffect(() => {
    GetUserCart()
    setIsLoading(false);
  }, []);

  return (
    <div className="cartmain-container">
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
            <button className="pay-button" onClick={handlePayment}>Pagar</button>
          </footer>
        : <></>
      }
    </div>
  );
}

export default Cart;
