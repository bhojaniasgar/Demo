import { TProductModal } from "./product";

type TCartItem = TProductModal & {
    quantity: number;
}

type TCartState = {
    items: TCartItem[];
    totalQuantity: number;
    totalAmount: number;
};

export type { TCartState, TCartItem };
