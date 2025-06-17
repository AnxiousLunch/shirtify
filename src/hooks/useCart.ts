// src/hooks/useCart.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existingItem = get().items.find(i => i.id === item.id && i.size === item.size);
        if (existingItem) {
          set(state => ({
            items: state.items.map(i =>
              i.id === item.id && i.size === item.size
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }));
        } else {
          set(state => ({
            items: [...state.items, { ...item, quantity: 1 }],
          }));
        }
      },
      removeItem: (id, size) => {
        set(state => ({
          items: state.items.filter(i => !(i.id === id && i.size === size)),
        }));
      },
      updateQuantity: (id, size, quantity) => {
        set(state => ({
          items: state.items.map(i =>
            i.id === id && i.size === size
              ? { ...i, quantity: Math.max(1, quantity) }
              : i
          ),
        }));
      },
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'cart-storage', // unique name for localStorage key
    }
  )
);