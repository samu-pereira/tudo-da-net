import React from "react";
import UseCartQuantity from "./hooks/UseCartQuantity.js";

function CartIcon({ handleCart }) {
  const cartQuantity = UseCartQuantity();

  return (
    <div className="cart-icon" onClick={handleCart}>
      <img
        width="30"
        height="30"
        src="https://img.icons8.com/metro/30/311847/shopping-cart.png"
        alt="shopping-cart"
      />
      {
        cartQuantity > 0
          ? <span className="cart-quantity">{cartQuantity}</span>
          : <></>
      }
    </div>
  );
};

export default CartIcon;
