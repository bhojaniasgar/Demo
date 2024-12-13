import productReducer, { setFilteredProducts } from './productSlice';
import { productListAsyncThunk } from './product-async-thunk';
import { TProductModal } from '../../models/product';

describe('productSlice', () => {
  const initialState = {
    isLoading: false,
    productList: [],
    filteredProducts: [],
  };

  it('should return the initial state', () => {
    expect(productReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setFilteredProducts action', () => {
    const filteredProducts: TProductModal[] = [
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 },
    ];

    const action = setFilteredProducts(filteredProducts);
    const result = productReducer(initialState, action);

    expect(result.filteredProducts).toEqual(filteredProducts);
  });

  it('should handle productListAsyncThunk.pending action', () => {
    const action = { type: productListAsyncThunk.pending.type };
    const result = productReducer(initialState, action);

    expect(result.isLoading).toBe(true);
    expect(result.productList).toEqual([]);
  });

  it('should handle productListAsyncThunk.fulfilled action', () => {
    const payload = [
      { id: 1, name: 'Product 1', price: 10 },
      { id: 2, name: 'Product 2', price: 20 },
    ];

    const action = { type: productListAsyncThunk.fulfilled.type, payload };
    const result = productReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.productList).toEqual(payload);
  });

  it('should handle productListAsyncThunk.rejected action', () => {
    const action = { type: productListAsyncThunk.rejected.type };
    const result = productReducer(initialState, action);

    expect(result.isLoading).toBe(false);
    expect(result.productList).toEqual([]);
  });
});
