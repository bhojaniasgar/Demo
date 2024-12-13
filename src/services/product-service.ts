
import axios from 'axios';
import { TProductModal } from '../models/product';

const API_URL = 'https://fakestoreapi.com';

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
