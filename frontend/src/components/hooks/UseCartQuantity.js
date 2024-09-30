import { useState, useEffect } from "react";

function UseCartQuantity() {
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    // Função para atualizar a quantidade do carrinho
    const updateCartQuantity = () => {
      const cart = localStorage.getItem("userCart");
      if (cart) {
        const parsedCart = JSON.parse(cart);
        setCartQuantity(parsedCart.length);
      }
    };

    // Atualiza ao carregar o componente
    updateCartQuantity();

    // Evento de mudança no localStorage
    window.addEventListener("storage", updateCartQuantity);

    // Removendo o evento ao desmontar o componente
    return () => window.removeEventListener("storage", updateCartQuantity);
  }, []);

  return cartQuantity;
}

export default UseCartQuantity;
