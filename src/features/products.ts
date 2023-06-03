import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../types/Product';

const productsSlice = createSlice({
  name: 'products',
  initialState: [] as Product[],
  reducers: {
    add: (products, action: PayloadAction<Product>) => [action.payload, ...products],
    remove: (products, action: PayloadAction<number>) => products.filter(
      product => product.id !== action.payload,
    ),
    setInitialState: (products, action: PayloadAction<Product[]>) => action.payload,
  }
})

export default productsSlice.reducer;
export const { actions } = productsSlice;
