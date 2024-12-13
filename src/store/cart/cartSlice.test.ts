import cartReducer, { addToCart, removeFromCart, clearCart, updateQuantity } from './cartSlice';
import { TCartState, TCartItem } from '../../models/cart';

describe('cartSlice reducer tests', () => {
    const initialState: TCartState = {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
    };

    const mockItem: TCartItem = {
        id: 1,
        name: 'Test Product',
        price: 100,
    };

    test('should handle initial state', () => {
        expect(cartReducer(undefined, { type: undefined })).toEqual(initialState);
    });

    test('should handle addToCart (new item)', () => {
        const state = cartReducer(initialState, addToCart(mockItem));

        expect(state.items.length).toBe(1);
        expect(state.items[0]).toEqual({ ...mockItem, quantity: 1 });
        expect(state.totalQuantity).toBe(1);
        expect(state.totalAmount).toBe(100);
    });

    test('should handle addToCart (existing item)', () => {
        const stateWithItem: TCartState = {
            items: [{ ...mockItem, quantity: 1 }],
            totalQuantity: 1,
            totalAmount: 100,
        };

        const state = cartReducer(stateWithItem, addToCart(mockItem));

        expect(state.items.length).toBe(1);
        expect(state.items[0].quantity).toBe(2);
        expect(state.totalQuantity).toBe(2);
        expect(state.totalAmount).toBe(200);
    });

    test('should handle updateQuantity (increase)', () => {
        const stateWithItem: TCartState = {
            items: [{ ...mockItem, quantity: 2 }],
            totalQuantity: 2,
            totalAmount: 200,
        };

        const state = cartReducer(stateWithItem, updateQuantity({ id: 1, quantity: 3 }));

        expect(state.items[0].quantity).toBe(3);
        expect(state.totalQuantity).toBe(3);
        expect(state.totalAmount).toBe(300);
    });

    test('should handle updateQuantity (decrease)', () => {
        const stateWithItem: TCartState = {
            items: [{ ...mockItem, quantity: 3 }],
            totalQuantity: 3,
            totalAmount: 300,
        };

        const state = cartReducer(stateWithItem, updateQuantity({ id: 1, quantity: 2 }));

        expect(state.items[0].quantity).toBe(2);
        expect(state.totalQuantity).toBe(2);
        expect(state.totalAmount).toBe(200);
    });

    test('should handle updateQuantity (remove item)', () => {
        const stateWithItem: TCartState = {
            items: [{ ...mockItem, quantity: 1 }],
            totalQuantity: 1,
            totalAmount: 100,
        };

        const state = cartReducer(stateWithItem, updateQuantity({ id: 1, quantity: 0 }));

        expect(state.items.length).toBe(0);
        expect(state.totalQuantity).toBe(0);
        expect(state.totalAmount).toBe(0);
    });

    test('should handle removeFromCart', () => {
        const stateWithItem: TCartState = {
            items: [{ ...mockItem, quantity: 1 }],
            totalQuantity: 1,
            totalAmount: 100,
        };

        const state = cartReducer(stateWithItem, removeFromCart(1));

        expect(state.items.length).toBe(0);
        expect(state.totalQuantity).toBe(0);
        expect(state.totalAmount).toBe(0);
    });

    test('should handle clearCart', () => {
        const stateWithItems: TCartState = {
            items: [{ ...mockItem, quantity: 2 }],
            totalQuantity: 2,
            totalAmount: 200,
        };

        const state = cartReducer(stateWithItems, clearCart());

        expect(state).toEqual(initialState);
    });
});
