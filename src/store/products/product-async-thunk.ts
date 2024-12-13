import { createAsyncThunk } from '@reduxjs/toolkit';
import { productListApi } from '../../services/product-service';

//INFO : transaction list
const productListAsyncThunk = createAsyncThunk(
	'product/list',
	async () => {
		const response = await productListApi();
		return response;
	}
);

export { productListAsyncThunk };
