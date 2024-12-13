import { Reducer, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import { MMKV } from 'react-native-mmkv';
import { REDUX_PERSISTENT_STORE_KEY, SliceNames } from '../constants/redux-constant';
import { TRootState } from '../models/redux.store';
import { Storage } from 'redux-persist';
import rootReducer from './root-reducer';


const storage = new MMKV();

const reduxStorage: Storage = {
	getItem: (key) => {
		const value = storage.getString(key);
		return Promise.resolve(value);
	},
	removeItem: (key) => {
		storage.delete(key);
		return Promise.resolve();
	},
	setItem: (key, value) => {
		storage.set(key, value);
		return Promise.resolve(true);
	},
};

const persistedReducer = persistReducer(
	{
		blacklist: [],
		key: REDUX_PERSISTENT_STORE_KEY,
		storage: reduxStorage,
		timeout: 0,
		version: -1,
		whitelist: [SliceNames.CART],

	},
	rootReducer as Reducer<TRootState>
);

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);
export default store;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<TRootState>();
