import { Platform, StatusBar, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface CartStyles {
    header: ViewStyle;
    backButton: ViewStyle;
    safeContainer: ViewStyle;
    container: ViewStyle;
    listContainer: ViewStyle;
    emptyCart: ViewStyle;
    emptyCartTitle: TextStyle;
    emptyCartText: TextStyle;
    card: ViewStyle;
    cardContent: ViewStyle;
    productTitle: TextStyle;
    priceContainer: ViewStyle;
    price: TextStyle;
    quantity: TextStyle;
    actions: ViewStyle;
    headerTitle: TextStyle;
    quantityControls: ViewStyle;
    quantityButton: ViewStyle;
    quantityButtonDisabled: ViewStyle;
    quantityButtonText: TextStyle;
    quantityText: TextStyle;
    removeButton: ViewStyle;
    removeButtonText: TextStyle;
    totalCard: ViewStyle;
    totalCardContent: ViewStyle;
    summaryRow: ViewStyle;
    summaryText: TextStyle;
    summaryValue: TextStyle;
    totalRow: ViewStyle;
    totalText: TextStyle;
    totalAmount: TextStyle;
    checkoutButton: ViewStyle;
    checkoutButtonDisabled: ViewStyle;
    checkoutButtonText: TextStyle;
    modal: ViewStyle;
    modalTitle: TextStyle;
    modalButton: ViewStyle;
    modalButtonText: TextStyle;
}

const cartStyles = StyleSheet.create<CartStyles>({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
    },
    backButton: {
        marginRight: 16,
    },
    safeContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingVertical: StatusBar.currentHeight ? StatusBar.currentHeight + 16 : 0,
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

export {
    cartStyles,
};
