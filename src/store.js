import { configureStore } from '@reduxjs/toolkit';

// Slices
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import offerReducer from './slices/offerSlice';
import productReducer from './slices/productSlice';
import profilReducer from './slices/profilSlice';
import userReducer from './slices/userSlice';

// Persist Configuration
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfigAuth = {
  key: 'auth',
  storage
};

const persistConfigUser = {
  key: 'user',
  storage
};

const persistConfigProfil = {
  key: 'users',
  storage
};

// Persisted Reducer List
const persistedAuth = persistReducer(persistConfigAuth, authReducer);
const persistedUser = persistReducer(persistConfigUser, userReducer);
const persistedProfil = persistReducer(persistConfigProfil, profilReducer);

const reducer = {
  auth: persistedAuth,
  category: categoryReducer,
  offer: offerReducer,
  product: productReducer,
  profil: persistedProfil,
  user: persistedUser,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true
});

export const persistor = persistStore(store);