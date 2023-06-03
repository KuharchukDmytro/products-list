import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products';

const reducer = combineReducers({
  products: productsReducer,
});

const store = configureStore({
  reducer: reducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
