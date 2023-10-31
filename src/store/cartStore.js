import { create } from "zustand";

const useCartStore = create((set) => ({
  cartItems: [],

  addToCart: (item) =>
    set((state) => ({
      cartItems: [...state.cartItems, item],
    })),

  removefromcart: (itemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== itemId),
    })),
  removeOneItemCart: (item) =>
    set((state) => ({
      cartItems: [...removeItem(item, state)],
    })),
  clearCart: () => set({ cartItems: [] }),
}));

function removeItem(i, state) {
  const newArray = state.cartItems;
  const indexToRemove = state.cartItems.findIndex((item) => item._id === i._id);

  if (indexToRemove !== -1) {
    newArray.splice(indexToRemove, 1);
  }

  return newArray;
}

export const useStateHook = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const removeOneItemCart = useCartStore((state) => state.removeOneItemCart);
  const clearCart = useCartStore((state) => state.clearCart);

  return {
    removeOneItemCart,
    addToCart,
    clearCart,
  };
};

export default useCartStore;
