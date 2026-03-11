'use client';

import { useCartStore } from '@/stores/cartStore';

export function useCart() {
  const { items, addItem, removeItem, updateQuantity, clearCart, getItemCount, getSubtotal } =
    useCartStore();

  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const isEmpty = items.length === 0;

  return {
    items,
    itemCount,
    subtotal,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
