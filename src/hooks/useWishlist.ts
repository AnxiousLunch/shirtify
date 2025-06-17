// src/hooks/useWishlist.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
}

interface WishlistState {
  items: WishlistItem[];
  toggleItem: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (item) => {
        const existingItem = get().items.find(i => i.id === item.id);
        if (existingItem) {
          set(state => ({ items: state.items.filter(i => i.id !== item.id) }));
        } else {
          set(state => ({ items: [...state.items, item] }));
        }
      },
      isInWishlist: (id) => !!get().items.find(i => i.id === id),
    }),
    {
      name: 'wishlist-storage',
    }
  )
);