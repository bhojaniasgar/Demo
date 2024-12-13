import React, { useState } from 'react';
import { View, FlatList, SafeAreaView, StatusBar, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../../store/cart/cartSlice';
import { useAppSelector } from '../../store/store';
import { TCartItem } from '../../models/cart';
import { Portal, Modal } from 'react-native-paper';
import { useDebounce } from '../../hooks/useDebounce';
import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { cartStyles } from './cart.style';

/**
 * A component that renders the cart screen. It renders a list of products in
 * the cart, the total amount, and a checkout button. When the checkout button
 * is pressed, it shows a modal asking the user to confirm the checkout. If the
 * user confirms, it clears the cart and dismisses the modal. If the user
 * cancels, it just dismisses the modal.
 *
 * The component uses the {@link removeFromCart}, {@link updateQuantity}, and
 * {@link clearCart} actions to manage the cart. It also uses the
 * {@link useAppSelector} hook to get the list of products in the cart and the
 * total amount.
 */
const Cart = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { items, totalAmount } = useAppSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const debouncedUpdateQuantity = useDebounce((id: number, quantity: number) => {
        dispatch(updateQuantity({ id, quantity }));
    }, 300);

/**
 * Renders an individual cart item with its details and controls.
 *
 * @param {Object} param - The parameter object.
 * @param {TCartItem} param.item - The cart item to render.
 *
 * @returns {JSX.Element} A view representing a cart item with its title,
 * price, quantity, and controls for adjusting quantity or removing the item.
 *
 * The component includes:
 * - Product title displayed in a text component.
 * - Price and quantity of the product.
 * - Buttons to increase or decrease the quantity with debounced updates.
 * - A button to remove the item from the cart.
 *
 * Accessibility features:
 * - Text components have accessibility labels for screen readers.
 * - Buttons are accessible with specific roles and labels describing actions.
 */
    const renderItem = ({ item }: { item: TCartItem }) => (
        <View style={cartStyles.card}>
            <View style={cartStyles.cardContent}>
                <Text style={cartStyles.productTitle} accessibilityRole="text" accessibilityLabel={item.title}>
                    {item.title}
                </Text>
                <View style={cartStyles.priceContainer}>
                    <Text style={cartStyles.price} accessibilityRole="text" accessibilityLabel={`Price: $${(item.price * item.quantity).toFixed(2)}`}>
                        ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                    <Text style={cartStyles.quantity} accessibilityRole="text" accessibilityLabel={`Quantity: ${item.quantity}`}>
                        Qty: {item.quantity}
                    </Text>
                </View>
                <View style={cartStyles.actions}>
                    <View style={cartStyles.quantityControls}>
                        <TouchableOpacity
                            onPress={() => debouncedUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            accessible={true}
                            accessibilityLabel={`Decrease quantity of ${item.title}`}
                            accessibilityRole="button"
                            style={[cartStyles.quantityButton, item.quantity <= 1 && cartStyles.quantityButtonDisabled]}
                        >
                            <Text style={cartStyles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={cartStyles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity
                            onPress={() => debouncedUpdateQuantity(item.id, item.quantity + 1)}
                            style={cartStyles.quantityButton}
                            accessible={true}
                            accessibilityLabel={`Increase quantity of ${item.title}`}
                            accessibilityRole="button"
                        >
                            <Text style={cartStyles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => dispatch(removeFromCart(item.id))}
                        style={cartStyles.removeButton}
                        accessible={true}
                        accessibilityLabel={`Remove ${item.title} from cart`}
                        accessibilityRole="button"
                    >
                        <Text style={cartStyles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    /**
     * Toggles the modal visibility to true, which will show the confirmation modal to the user.
     * This function is called when the user clicks on the checkout button in the cart screen.
     */
    const handleCheckout = () => {
        setIsModalVisible(true);
    };

    /**
     * Called when the user confirms the checkout modal.
     * Clears the cart and closes the modal.
     */
    const confirmCheckout = () => {
        dispatch(clearCart());
        setIsModalVisible(false);
    };

    return (
        <SafeAreaView style={cartStyles.safeContainer}>
            <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
            <View style={cartStyles.header}>
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Go back to the previous screen"
                    accessibilityRole="button"
                    onPress={() => navigation.goBack()} style={cartStyles.backButton}>
                    <CaretLeft size={24} />

                </TouchableOpacity>
                <Text style={cartStyles.headerTitle}>Cart</Text>
            </View>
            <View style={cartStyles.container}>
                {items.length === 0 ? (
                    <View style={cartStyles.emptyCart}>
                        <Text style={cartStyles.emptyCartTitle}>Your cart is empty</Text>
                        <Text style={cartStyles.emptyCartText}>Add some items to get started</Text>
                    </View>
                ) : (
                    <>
                        <FlatList
                            data={items}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            contentContainerStyle={cartStyles.listContainer}
                            showsVerticalScrollIndicator={false}
                        />
                    </>
                )}

            </View>
            <View style={cartStyles.totalCard}>
                <View style={cartStyles.totalCardContent}>
                    <View style={cartStyles.summaryRow}>
                        <Text style={cartStyles.summaryText}>Subtotal</Text>
                        <Text style={cartStyles.summaryValue}>${totalAmount.toFixed(2)}</Text>
                    </View>
                    <View style={[cartStyles.summaryRow, cartStyles.totalRow]}>
                        <Text style={cartStyles.totalText}>Total</Text>
                        <Text style={cartStyles.totalAmount}>${totalAmount.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleCheckout}
                        disabled={items.length === 0}
                        accessible={true}
                        accessibilityLabel="Proceed to checkout"
                        accessibilityRole="button"
                        style={[cartStyles.checkoutButton, items.length === 0 && cartStyles.checkoutButtonDisabled]}
                    >
                        <Text style={cartStyles.checkoutButtonText}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Portal>
                <Modal
                    visible={isModalVisible}
                    onDismiss={() => setIsModalVisible(false)}
                    contentContainerStyle={cartStyles.modal}
                >
                    <Text style={cartStyles.modalTitle}>Order placed successfully!</Text>
                    <TouchableOpacity
                        onPress={confirmCheckout}
                        style={cartStyles.modalButton}
                        accessible={true}
                        accessibilityLabel="Confirm and close modal"
                    >
                        <Text style={cartStyles.modalButtonText}>OK</Text>
                    </TouchableOpacity>
                </Modal>
            </Portal>
        </SafeAreaView>
    );
};

export default Cart;
