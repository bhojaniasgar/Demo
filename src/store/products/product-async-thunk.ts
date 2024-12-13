import { createAsyncThunk } from '@reduxjs/toolkit';
import { productListApi } from '../../services/product-service';

const productListAsyncThunk = createAsyncThunk(
	'product/list',
	async () => {
		const response = await productListApi();
		return response;
	}
);

export { productListAsyncThunk };
