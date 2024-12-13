import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCartItem, TCartState } from '../../models/cart';



const initialState: TCartState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<TCartItem>) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.items.push({
                    ...newItem,
                    quantity: 1,
                });
            } else {
                existingItem.quantity++;
            }

            state.totalQuantity++;
            state.totalAmount += newItem.price;
        },

        updateQuantity(state, action: PayloadAction<{ id: number, quantity: number }>) {
            const { id, quantity } = action.payload;
            const existingItemIndex = state.items.findIndex(item => item.id === id);

            if (existingItemIndex !== -1) {
                const existingItem = state.items[existingItemIndex];
                if (quantity <= 0) {
                    // Remove item
                    state.totalQuantity -= existingItem.quantity;
                    state.totalAmount -= existingItem.price * existingItem.quantity;
                    state.items.splice(existingItemIndex, 1);
                } else {
                    // Update quantity
                    const quantityDiff = quantity - existingItem.quantity;
                    state.items[existingItemIndex].quantity = quantity;
                    state.totalQuantity += quantityDiff;
                    state.totalAmount += existingItem.price * quantityDiff;
                }
            }
        },

        removeFromCart(state, action: PayloadAction<number>) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= existingItem.price * existingItem.quantity;
                state.items = state.items.filter(item => item.id !== id);
            }
        },

        clearCart(state) {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
    },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
