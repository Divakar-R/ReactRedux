import React from "react";
import ReactDOM from "react-dom/client";
import Cart from "./Components/Cart.jsx";
import { CartProvider } from "./Providers/CartProvider.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Cart />
    </Provider>
  </React.StrictMode>
);
