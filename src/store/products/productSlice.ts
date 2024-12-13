import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceNames } from '../../constants/redux-constant';
import { TProductModal, TProductState } from '../../models/product';
import { productListAsyncThunk } from './product-async-thunk';

const initialState: TProductState = {
  isLoading: false,
  productList: [],
  filteredProducts: [],
};

const productSlice = createSlice({
  name: SliceNames.PRODUCT,
  initialState,
  reducers: {
    setFilteredProducts: (state, action: PayloadAction<TProductModal[]>) => {
      state.filteredProducts = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(productListAsyncThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(productListAsyncThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.productList = payload ?? [];
      })
      .addCase(productListAsyncThunk.rejected, state => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export const { setFilteredProducts } = productSlice.actions;
export default productSlice.reducer;
