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

const removeItem = (i, state) => {
  const newArray = state.cartItems;
  const indexToRemove = state.cartItems.findIndex((item) => item._id === i._id);
  if (indexToRemove !== -1) {
    newArray.splice(indexToRemove, 1);
  }
  return newArray;
};

export const useStateHook = () => {
  const addToCart = cartStore((state) => state.addToCart);
  const cartCount = cartStore((state) => state.cartCount);
  const removeFromCart = cartStore((state) => state.removeFromCart);
  const resetCart = cartStore((state) => state.resetCart);

  return {
    addToCart,
    cartCount,
    removeFromCart,
    resetCart,
  };
};
