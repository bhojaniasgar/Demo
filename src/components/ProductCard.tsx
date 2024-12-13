import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { TProductModal } from '../models/product';
import { localAssets } from '../resources/assets';
import { useAppDispatch } from '../store/store';
import { addToCart } from '../store/cart/cartSlice';

interface ProductCardProps {
    product: TProductModal;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    return (
        <View style={styles.card}>
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
        </View>
    );
};

const styles = StyleSheet.create({
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
