
import axios from 'axios';
import { TProductModal } from '../models/product';

const API_URL = 'https://fakestoreapi.com';

/**
 * Fetches a list of products from the fake store API.
 *
 * @returns {Promise<TProductModal[]>} A promise that resolves to a list of products.
 * @throws {Error} If the API request fails.
 */
const productListApi = async (): Promise<TProductModal[]> => {
	try {
		const response = await axios.get(`${API_URL}/products`);
		return response.data;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
};

export { productListApi };
