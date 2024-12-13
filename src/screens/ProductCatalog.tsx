import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StatusBar, StyleSheet, TextInput, RefreshControl, View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { useAppDispatch, useAppSelector } from '../store/store';
import { productListAsyncThunk } from '../store/products/product-async-thunk';
import { setFilteredProducts } from '../store/products/productSlice';
import { ShoppingCart } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteConst } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 * A component that is rendered when there are no products to show.
 * It shows a FadeIn animation with a message saying "No products found".
 * @returns {JSX.Element}
 */
const NoDataComponent = () => (
    <Animated.View entering={FadeIn} style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No products found</Text>
    </Animated.View>
);

/**
 * A component that renders a list of products. It renders a search bar to
 * filter the products by title, a cart icon that shows the total quantity of
 * items in the cart and a list of products. Each product is rendered as a
 * {@link ProductCard} component. If there are no products to show, it shows a
 * {@link NoDataComponent} component.
 *
 * The component uses the {@link productListAsyncThunk} thunk to load the list
 * of products. It also uses the {@link setFilteredProducts} action to filter
 * the products based on the search query.
 *
 * @returns {JSX.Element} A JSX element that renders the product catalog.
 */
const ProductCatalog = () => {
    const { isLoading, productList, filteredProducts } = useAppSelector((state) => state.product);
    const { totalQuantity } = useAppSelector((state) => state.cart);
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const [searchQuery, setSearchQuery] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useAppDispatch();
    const loadProducts = useCallback(async () => {
        dispatch(productListAsyncThunk());
    }, [dispatch]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    useEffect(() => {
        dispatch(setFilteredProducts(
            productList.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        ));
    }, [searchQuery, productList, dispatch]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadProducts();
        setRefreshing(false);
    }, [loadProducts]);

    if (!refreshing && isLoading) {
        return <Loader text="Loading products..." />;
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <Animated.View entering={FadeIn} style={styles.container}>
                <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent />

                <View style={styles.header}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search products..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor="#666"
                        accessibilityLabel="Search products"
                        accessibilityHint="Type to search for products"
                        accessibilityRole="search"
                    />

                    <TouchableOpacity
                        onPress={() => navigation.navigate(RouteConst.CART_SCREEN)}
                        accessibilityLabel="Go to cart"
                        accessibilityHint={`You have ${totalQuantity} items in your cart`}
                        accessibilityRole="button"
                        style={styles.cartIconContainer}>
                        <ShoppingCart size={24} color="#333" weight="bold" />
                        {totalQuantity > 0 && (
                            <View style={styles.badge} accessible accessibilityLabel={`Cart badge: ${totalQuantity} items`}>
                                <Text style={styles.badgeText}>{totalQuantity}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={filteredProducts}
                    renderItem={({ item }) => <ProductCard product={item} />}
                    keyExtractor={item => item.id.toString()}
                    ListEmptyComponent={NoDataComponent}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            accessibilityLabel="Refreshing products list"
                            accessibilityHint="Swipe down to refresh the product catalog"
                        />
                    }
                />

            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
        marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + 16 : 16,
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
});

export default ProductCatalog;
