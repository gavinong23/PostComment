import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'reduxjs-toolkit-persist';
import postReducer from './slices/PostSlice';
import authenticateReducer from './slices/AuthenticateSlice';
import storage from 'reduxjs-toolkit-persist/lib/storage';

const reducers = combineReducers({
    post: postReducer,
    user: authenticateReducer           
});

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;