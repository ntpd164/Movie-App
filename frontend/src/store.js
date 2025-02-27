import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
// import cartReducer from './features/cart/cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    // cart: cartReducer,
  },
});

console.log('Configured store:', store);

export default store;
