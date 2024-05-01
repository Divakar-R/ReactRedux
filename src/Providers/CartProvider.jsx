import { useState, createContext, useContext } from "react";

const CartContext = createContext();

const useCartData = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, useCartData };
