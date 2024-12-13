import { combineReducers } from '@reduxjs/toolkit';
import cartSlice from './cart/cartSlice';
import productSlice from './products/productSlice';

const rootReducer = combineReducers({
	cart: cartSlice,
	product: productSlice,
});

export default rootReducer;
