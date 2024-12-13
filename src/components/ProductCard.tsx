import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator, ViewStyle, ImageStyle, TextStyle } from 'react-native';
import { TProductModal } from '../models/product';
import { localAssets } from '../resources/assets';
import { useAppDispatch } from '../store/store';
import { addToCart } from '../store/cart/cartSlice';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withSequence,
    runOnJS,
} from 'react-native-reanimated';

interface ProductCardProps {
    product: TProductModal;
}

/**
 * A component that renders a product card with an image, title, price, and an
 * "Add to Cart" button. The image is loaded asynchronously and shows a loading
 * indicator until it is loaded. The button is accessible with a double tap.
 *
 * The component uses the {@link useAppDispatch} hook to get the Redux dispatch
 * function and the {@link addToCart} action to add the product to the cart.
 *
 * @param {TProductModal} product - The product to render.
 *
 * @returns {JSX.Element} A view representing a product card.
 *
 * Accessibility features:
 * - The image has an accessibility label describing the product and an
 *   accessibility role of "image".
 * - The button is accessible with a double tap and has an accessibility label
 *   and hint describing the action.
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const addItemToCart = useCallback(() => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    }, [dispatch, product]);

    const handleAddToCart = () => {
        scale.value = withSequence(
            withSpring(1.1, { damping: 2 }),
            withSpring(1, { damping: 2 }, (finished) => {
                if (finished) {
                    runOnJS(addItemToCart)();
                }
            })
        );
    };

    return (
        <Animated.View style={[styles.card, animatedStyle]}>
            <Image
                source={product.image ? { uri: product.image } : localAssets.noImage}
                style={[styles.image, isLoading && styles.imageLoading]}
                resizeMode="contain"
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                accessibilityLabel={`Image of ${product.title}`}
                accessibilityRole="image"
            />
            {isLoading && (
                <ActivityIndicator
                    animating={true}
                    color="#0066cc"
                    size="large"
                    style={styles.loader}
                    accessibilityLabel="Loading product image"
                />
            )}
            <View style={styles.content}>
                <Text numberOfLines={2} style={styles.title}>
                    {product.title}
                </Text>
                <Text style={styles.price}>
                    ${product.price.toFixed(2)}
                </Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity
                    onPress={handleAddToCart}
                    style={styles.button}
                    activeOpacity={0.7}
                    accessibilityLabel={`Add ${product.title} to cart`}
                    accessibilityHint="Double tap to add the product to your cart"
                    accessibilityRole="button"
                >
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonLabel}>Add to Cart</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

interface ProductCardStyles {
    card: ViewStyle;
    image: ImageStyle;
    content: ViewStyle;
    title: TextStyle;
    price: TextStyle;
    actions: ViewStyle;
    button: ViewStyle;
    buttonContent: ViewStyle;
    buttonLabel: TextStyle;
    loader: ViewStyle;
    imageLoading: ImageStyle;
}

const styles = StyleSheet.create<ProductCardStyles>({
    card: {
        margin: 8,
        elevation: 4,
        borderRadius: 16,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    image: {
        height: 220,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 16,
    },
    content: {
        padding: 16,
        gap: 8,
    },
    title: {
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 8,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    price: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0066cc',
        letterSpacing: 0.5,
    },
    actions: {
        padding: 16,
        paddingTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    button: {
        width: '100%',
        maxWidth: 300,
        borderRadius: 25,
        backgroundColor: '#0066cc',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        overflow: 'hidden',
    },
    buttonContent: {
        flexDirection: 'row',
        paddingVertical: 12,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
        color: '#ffffff',
        textTransform: 'uppercase',
    },
    loader: {
        position: 'absolute',
        top: 110,
        left: 0,
        right: 0,
    },
    imageLoading: {
        opacity: 0.7,
    },
});

export default ProductCard;
