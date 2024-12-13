import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StatusBar, TextInput, RefreshControl, View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import ProductCard from '../../components/ProductCard';
import Loader from '../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { productListAsyncThunk } from '../../store/products/product-async-thunk';
import { setFilteredProducts } from '../../store/products/productSlice';
import { ShoppingCart } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteConst } from '../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { productStyles } from './product.style';

/**
 * A component that is rendered when there are no products to show.
 * It shows a FadeIn animation with a message saying "No products found".
 * @returns {JSX.Element}
 */
const NoDataComponent = () => (
    <Animated.View entering={FadeIn} style={productStyles.noDataContainer}>
        <Text style={productStyles.noDataText}>No products found</Text>
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
        dispatch(productListAsyncThunk()).unwrap().then(() => {
            setRefreshing(false);
        }).catch(() => {
            setRefreshing(false);
        });
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
        setSearchQuery('');
        await loadProducts();
    }, [loadProducts]);

    if (!refreshing && isLoading) {
        return <Loader text="Loading products..." />;
    }

    return (
        <SafeAreaView style={productStyles.safeContainer}>
            <Animated.View entering={FadeIn} style={productStyles.container}>
                <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent />

                <View style={productStyles.header}>
                    <TextInput
                        style={productStyles.searchBar}
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
                        style={productStyles.cartIconContainer}>
                        <ShoppingCart size={24} color="#333" weight="bold" />
                        {totalQuantity > 0 && (
                            <View style={productStyles.badge} accessible accessibilityLabel={`Cart badge: ${totalQuantity} items`}>
                                <Text style={productStyles.badgeText}>{totalQuantity}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={filteredProducts}
                    style={productStyles.flatList}
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

export default ProductCatalog;
