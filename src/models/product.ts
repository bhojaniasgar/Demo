type TProductModal = {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
}
type TProductState = {
    isLoading: boolean
    productList: TProductModal[],
    filteredProducts: TProductModal[]
}


export type { TProductModal, TProductState };
