
import store from '../store/store';
import { TCartState } from './cart';
import { TProductState } from './product';

type TRootState = {
	product: TProductState,
	cart: TCartState;
};

type TAppDispatch = typeof store.dispatch;


export type { TAppDispatch, TRootState };
