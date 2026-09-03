import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import productReducer from './features/product/productSlice';
import uiReducer from './features/ui/uiSlice';
import adminsReducer from './features/admins/adminsSlice';
import categoriesReducer from './features/categories/categoriesSlice';
import adminProductsReducer from './features/adminProducts/adminProductsSlice';
import variantsReducer from './features/variants/variantsSlice';
import usersReducer from './features/users/usersSlice';
import addressesReducer from './features/addresses/addressesSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      product: productReducer,
      ui: uiReducer,
      admins: adminsReducer,
      categories: categoriesReducer,
      adminProducts: adminProductsReducer,
      variants: variantsReducer,
      users: usersReducer,
      addresses: addressesReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
