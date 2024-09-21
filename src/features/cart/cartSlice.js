import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cart: [
    {
      pizzaId: "1",
      quantity: 3,
      name: "Diavola",
      unitPrice: 16,
      totalPrice: 48,
    },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizzaToCart(state, action) {
      const existingPizza = state.cart.find(
        (pizza) => pizza.pizzaId === action.payload.pizzaId,
      );
      if (existingPizza) {
        existingPizza.quantity++;
        existingPizza.totalPrice += action.payload.unitPrice;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removePizzaFromCart(state, action) {
      const existingPizza = state.cart.find(
        (pizza) => pizza.pizzaId === action.payload,
      );
      if (existingPizza.quantity === 1) {
        state.cart = state.cart.filter(
          (pizza) => pizza.pizzaId !== action.payload,
        );
      } else {
        existingPizza.quantity--;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addPizzaToCart, removePizzaFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
