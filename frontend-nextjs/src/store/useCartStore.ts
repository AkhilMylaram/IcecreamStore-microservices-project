import { create } from 'zustand';
import { cartApi } from '@/lib/api';

export interface CartItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartStore {
    items: CartItem[];
    setItems: (items: CartItem[]) => void;
    refreshFromServer: () => Promise<void>;
    addItem: (product: any) => Promise<void>;
    removeItem: (id: string | number) => Promise<void>;
    updateQuantity: (id: string | number, delta: number) => Promise<void>;
    clearCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>()((set, get) => ({
    items: [],
    setItems: (items) => set({ items }),
    refreshFromServer: async () => {
        try {
            const data = await cartApi.getCart();
            set({ items: (data || []).map((i: any) => ({ id: i.product_id, name: i.name, price: Number(i.price), quantity: i.quantity, image: i.image })) });
        } catch (e) {
            console.error('Failed to refresh cart from server', e);
        }
    },
    addItem: async (product) => {
        try {
            await cartApi.addItem({ product_id: product.id || product._id, name: product.name, price: product.price, image: product.image || product.image_url, quantity: 1 });
            await get().refreshFromServer();
        } catch (e) {
            console.error('Failed to add item to server cart', e);
        }
    },
    removeItem: async (id) => {
        try {
            await cartApi.removeItem(id.toString());
            await get().refreshFromServer();
        } catch (e) {
            console.error('Failed to remove item from server cart', e);
        }
    },
    updateQuantity: async (id, delta) => {
        try {
            // Simple approach: remove and re-add or call backend if supported; we'll re-sync after modification by adding a new record with delta quantity
            await cartApi.addItem({ product_id: id.toString(), name: '', price: 0, image: '', quantity: delta });
            await get().refreshFromServer();
        } catch (e) {
            console.error('Failed to update quantity', e);
        }
    },
    clearCart: async () => {
        try {
            await cartApi.clearCart();
            set({ items: [] });
        } catch (e) {
            console.error('Failed to clear cart', e);
        }
    },
}));
