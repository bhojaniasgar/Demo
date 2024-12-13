import React, { useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView, StatusBar, Text, TouchableOpacity, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/cart/cartSlice';
import { useAppSelector } from '../store/store';
import { TCartItem } from '../models/cart';
import { Portal, Modal } from 'react-native-paper';
import { useDebounce } from '../hooks/useDebounce';
import { CaretLeft } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

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
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Text style={styles.productTitle} accessibilityRole="text" accessibilityLabel={item.title}>
                    {item.title}
                </Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price} accessibilityRole="text" accessibilityLabel={`Price: $${(item.price * item.quantity).toFixed(2)}`}>
                        ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                    <Text style={styles.quantity} accessibilityRole="text" accessibilityLabel={`Quantity: ${item.quantity}`}>
                        Qty: {item.quantity}
                    </Text>
                </View>
                <View style={styles.actions}>
                    <View style={styles.quantityControls}>
                        <TouchableOpacity
                            onPress={() => debouncedUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            accessible={true}
                            accessibilityLabel={`Decrease quantity of ${item.title}`}
                            accessibilityRole="button"
                            style={[styles.quantityButton, item.quantity <= 1 && styles.quantityButtonDisabled]}
                        >
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity
                            onPress={() => debouncedUpdateQuantity(item.id, item.quantity + 1)}
                            style={styles.quantityButton}
                            accessible={true}
                            accessibilityLabel={`Increase quantity of ${item.title}`}
                            accessibilityRole="button"
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => dispatch(removeFromCart(item.id))}
                        style={styles.removeButton}
                        accessible={true}
                        accessibilityLabel={`Remove ${item.title} from cart`}
                        accessibilityRole="button"
                    >
                        <Text style={styles.removeButtonText}>Remove</Text>
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
        <SafeAreaView style={styles.safeContainer}>
            <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel="Go back to the previous screen"
                    accessibilityRole="button"
                    onPress={() => navigation.goBack()} style={styles.backButton}>
                    <CaretLeft size={24} />

                </TouchableOpacity>
                <Text style={styles.headerTitle}>Cart</Text>
            </View>
            <View style={styles.container}>
                {items.length === 0 ? (
                    <View style={styles.emptyCart}>
                        <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
                        <Text style={styles.emptyCartText}>Add some items to get started</Text>
                    </View>
                ) : (
                    <>
                        <FlatList
                            data={items}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            contentContainerStyle={styles.listContainer}
                            showsVerticalScrollIndicator={false}
                        />
                    </>
                )}

            </View>
            <View style={styles.totalCard}>
                <View style={styles.totalCardContent}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryText}>Subtotal</Text>
                        <Text style={styles.summaryValue}>${totalAmount.toFixed(2)}</Text>
                    </View>
                    <View style={[styles.summaryRow, styles.totalRow]}>
                        <Text style={styles.totalText}>Total</Text>
                        <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleCheckout}
                        disabled={items.length === 0}
                        accessible={true}
                        accessibilityLabel="Proceed to checkout"
                        accessibilityRole="button"
                        style={[styles.checkoutButton, items.length === 0 && styles.checkoutButtonDisabled]}
                    >
                        <Text style={styles.checkoutButtonText}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Portal>
                <Modal
                    visible={isModalVisible}
                    onDismiss={() => setIsModalVisible(false)}
                    contentContainerStyle={styles.modal}
                >
                    <Text style={styles.modalTitle}>Order placed successfully!</Text>
                    <TouchableOpacity
                        onPress={confirmCheckout}
                        style={styles.modalButton}
                        accessible={true}
                        accessibilityLabel="Confirm and close modal"
                    >
                        <Text style={styles.modalButtonText}>OK</Text>
                    </TouchableOpacity>
                </Modal>
            </Portal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        // borderBottomWidth: 1,
        // borderBottomColor: '#eee',
    },
    backButton: {
        marginRight: 16,
    },
    safeContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: StatusBar.currentHeight || 0,
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 8,
        marginBottom: 120,
    },
    listContainer: {
        paddingBottom: 100,
    },
    emptyCart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    emptyCartTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    emptyCartText: {
        fontSize: 16,
        color: '#666',
    },
    card: {
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardContent: {
        padding: 16,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2c2c2c',
    },
    quantity: {
        fontSize: 14,
        color: '#666',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1a1a1a',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        padding: 4,
    },
    quantityButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    quantityButtonDisabled: {
        opacity: 0.5,
    },
    quantityButtonText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '600',
    },
    quantityText: {
        marginHorizontal: 12,
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    removeButton: {
        backgroundColor: '#ff4444',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 8,
        marginLeft: 16,
    },
    removeButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    totalCard: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8,
    },
    totalCardContent: {
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryText: {
        fontSize: 16,
        color: '#666',
    },
    summaryValue: {
        fontSize: 16,
        color: '#1a1a1a',
        fontWeight: '500',
    },
    totalRow: {
        marginTop: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        marginBottom: 16,
    },
    totalText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
    },
    checkoutButton: {
        backgroundColor: '#007AFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    checkoutButtonDisabled: {
        backgroundColor: '#ccc',
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    modal: {
        backgroundColor: 'white',
        padding: 24,
        margin: 20,
        borderRadius: 16,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#007AFF',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginTop: 16,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Cart;
