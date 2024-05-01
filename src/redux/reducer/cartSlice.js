import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: {
    items: [],
    subTotal: 0,
    shipping: 0,
    total: 0,
  },
};

const getTotals = (cCart) => {
  cCart.subTotal = cCart?.items?.reduce((a, v) => {
    return a + v.price * v.quantity;
  }, 0);
  cCart.total = cCart?.subTotal + cCart.shipping;
  return cCart;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.cart = action.payload;
    },
    removeFromCart: (state, action) => {
      let payload = action.payload;
      state.cart.items = state.cart.items.filter((p, i) =>
        i === payload.index ? false : true
      );
      state.cart = getTotals(state.cart);
    },
    quantityUpdate: (state, action) => {
      let { index, quantity } = action.payload;
      state.cart.items[index].quantity = quantity;
      state.cart = getTotals(state.cart);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, quantityUpdate, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
