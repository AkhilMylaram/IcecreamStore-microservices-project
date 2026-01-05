import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartStore {
    items: CartItem[];
    addItem: (product: any) => void;
    removeItem: (id: string | number) => void;
    updateQuantity: (id: string | number, delta: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            items: [],
            addItem: (product) => set((state) => {
                const existingItem = state.items.find((item) => item.id === (product.id || product._id));
                if (existingItem) {
                    return {
                        items: state.items.map((item) =>
                            item.id === (product.id || product._id)
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    };
                }
                return {
                    items: [
                        ...state.items,
                        {
                            id: product.id || product._id,
                            name: product.name,
                            price: product.price,
                            quantity: 1,
                            image: product.image || product.image_url,
                        },
                    ],
                };
            }),
            removeItem: (id) => set((state) => ({
                items: state.items.filter((item) => item.id !== id),
            })),
            updateQuantity: (id, delta) => set((state) => ({
                items: state.items.map((item) =>
                    item.id === id
                        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                        : item
                ),
            })),
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'icecream-cart',
        }
    )
);
