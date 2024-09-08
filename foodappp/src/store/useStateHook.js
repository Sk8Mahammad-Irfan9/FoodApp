import { create } from "zustand";

const cartStore = create((set) => ({
  cartItems: [],
  addToCart: (item) =>
    set((state) => ({ cartItems: [...state.cartItems, item] })),
  removeFromCart: (item) =>
    set((state) => ({
      cartItems: [...removeItem(item, state)],
    })),
  resetCart: () => set((state) => ({ cartItems: [] })),
}));

function removeItem(i, state) {
  const newArray = state.cartItems;
  const indexToRemove = state.cartItems.findIndex((item) => item._id === i.id);

  if (indexToRemove !== -1) {
    newArray.splice(indexToRemove, 1);
  }

  return newArray;
}

export const useStateHook = () => {
  const cartCount = cartStore((state) => state.cartItems);
  const addToCart = cartStore((state) => state.addToCart);
  const removeFromCart = cartStore((state) => state.removeFromCart);
  const resetCart = cartStore((state) => state.resetCart);
  return {
    cartCount,
    addToCart,
    removeFromCart,
    resetCart,
  };
};
