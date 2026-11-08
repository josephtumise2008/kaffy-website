import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { findProduct, unitPrice } from "../data/products";

const CartContext = createContext(null);
const STEP = 50; // wholesale items are added in packs of 50

export function CartProvider({ children }) {
  const [items, setItems] = useState({}); // { productId: quantity }
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef();

  const showToast = useCallback((message) => {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  }, []);

  const add = useCallback((id) => {
    setItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + STEP }));
    showToast(`Added ${STEP} × ${findProduct(id).name} to cart`);
  }, [showToast]);

  const change = useCallback((id, delta) => {
    setItems((prev) => {
      const qty = (prev[id] || 0) + delta;
      const next = { ...prev };
      if (qty > 0) next[id] = qty;
      else delete next[id];
      return next;
    });
  }, []);

  const remove = useCallback((id) => change(id, -Infinity), [change]);

  const lines = useMemo(() =>
    Object.entries(items).map(([id, qty]) => {
      const product = findProduct(id);
      const price = unitPrice(product, qty);
      return { product, qty, price, total: price * qty };
    }), [items]);

  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const total = lines.reduce((sum, l) => sum + l.total, 0);

  const value = {
    lines, count, total, isOpen, toast, STEP,
    add, remove, showToast,
    increase: (id) => change(id, STEP),
    decrease: (id) => change(id, -STEP),
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
