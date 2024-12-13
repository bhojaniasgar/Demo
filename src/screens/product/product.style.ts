import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { StatusBar } from 'react-native';

interface ProductStyles {
    safeContainer: ViewStyle;
    container: ViewStyle;
    searchBar: TextStyle;
    loader: ViewStyle;
    noDataContainer: ViewStyle;
    noDataText: TextStyle;
    header: ViewStyle;
    cartIconContainer: ViewStyle;
    badge: ViewStyle;
    badgeText: TextStyle;
    flatList: ViewStyle;
}

const productStyles = StyleSheet.create<ProductStyles>({
    safeContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: StatusBar.currentHeight || 0,
    },
    container: {
        flex: 1,
    },
    searchBar: {
        flex: 1,
        padding: 12,
        backgroundColor: '#ffffff',
        borderRadius: 16,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        paddingLeft: 20,
        paddingRight: 20,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50%',
    },
    noDataText: {
        fontSize: 18,
        color: '#666',
        fontWeight: '500',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 16,
    },
    cartIconContainer: {
        marginLeft: 16,
        padding: 8,
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: '#FF4444',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
        paddingHorizontal: 4,
    },
    flatList: {
        marginTop: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
});

export {
    productStyles,
};
