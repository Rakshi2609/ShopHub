import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  shippingAddress: localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {},
  paymentMethod: localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : ''
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((x) => x._id === id);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
    removeOrderedItems: (state, action) => {
      // Remove items that were ordered (action.payload is array of product IDs)
      const orderedProductIds = action.payload;
      console.log('Cart slice - Before removal:', state.cartItems.length, state.cartItems);
      console.log('Cart slice - IDs to remove:', orderedProductIds);
      state.cartItems = state.cartItems.filter(
        (item) => !orderedProductIds.includes(item._id)
      );
      console.log('Cart slice - After removal:', state.cartItems.length, state.cartItems);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  saveShippingAddress,
  savePaymentMethod,
  clearCart,
  removeOrderedItems
} = cartSlice.actions;

export default cartSlice.reducer;
