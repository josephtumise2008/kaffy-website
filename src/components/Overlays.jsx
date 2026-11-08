// Cart drawer, Paystack demo modal, toast and floating WhatsApp button.
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { naira, waLink } from "../data/products";
import ProductArt from "./ProductArt";
import { WhatsAppIcon } from "./Icons";

export function CartDrawer() {
  const { lines, total, isOpen, close, increase, decrease, remove } = useCart();
  const [paying, setPaying] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") { close(); setPaying(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  useEffect(() => {
    document.body.classList.toggle("drawer-open", isOpen);
    return () => document.body.classList.remove("drawer-open");
  }, [isOpen]);

  const orderText = `Hello Kaffy, I'd like to order:\n${lines.map((l) => `• ${l.qty} pcs ${l.product.name}`).join("\n")}\nTotal: ${naira(total)}`;

  return (
    <>
      <div className="drawer-backdrop" onClick={close} />
      <aside className="drawer" aria-labelledby="cartTitle" aria-hidden={!isOpen}>
        <div className="drawer-head">
          <h2 id="cartTitle">Your order</h2>
          <button className="close-btn" ref={closeRef} onClick={close} aria-label="Close cart">×</button>
        </div>

        <div className="drawer-items">
          {lines.length === 0 ? (
            <div className="empty">
              <p><b>Your cart is empty.</b></p>
              <p>Add products from the wholesale catalogue to start an order.</p>
            </div>
          ) : lines.map(({ product, qty, price, total: lineTotal }) => (
            <div className="cart-item" key={product.id}>
              <div className="thumb"><ProductArt product={product} /></div>
              <div>
                <b>{product.name}</b>
                <small>{naira(price)} per piece</small>
                <div className="cart-qty">
                  <button onClick={() => decrease(product.id)} aria-label="Remove 50">−</button>
                  <span>{qty} pcs</span>
                  <button onClick={() => increase(product.id)} aria-label="Add 50">+</button>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <b>{naira(lineTotal)}</b>
                <button className="remove" onClick={() => remove(product.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="drawer-foot">
          <div className="row"><span>Total</span><span>{naira(total)}</span></div>
          <button className="btn btn-primary" disabled={!lines.length} onClick={() => setPaying(true)}>
            Pay securely with Paystack
          </button>
          <a className="btn btn-ghost" style={{ color: "var(--ink)" }} href={waLink(orderText)} target="_blank" rel="noopener noreferrer">
            Send order on WhatsApp instead
          </a>
          <p className="pay-note">Delivery cost is confirmed before dispatch.</p>
        </div>
      </aside>

      {paying && (
        <PaystackModal amount={total} onClose={() => setPaying(false)}
          onOpenDashboard={() => { setPaying(false); close(); }} />
      )}
    </>
  );
}

function PaystackModal({ amount, onClose, onOpenDashboard }) {
  const closeRef = useRef(null);
  useEffect(() => { closeRef.current?.focus(); }, []);

  return (
    <div className="modal show" role="dialog" aria-modal="true" aria-labelledby="payTitle"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <div className="paystack">Paystack checkout</div>
        <h2 id="payTitle">Secure payment opens here</h2>
        <p>
          On the live website, this button opens Paystack so customers can pay <b>{naira(amount)}</b> instantly.
          The order then appears on Kaffy's dashboard and stock updates automatically.
        </p>
        <div className="pay-methods"><span>Card</span><span>Bank transfer</span><span>USSD</span></div>
        <a href="#/dashboard" className="btn btn-primary" style={{ width: "100%" }} onClick={onOpenDashboard}>See the order dashboard</a>
        <button ref={closeRef} className="btn" style={{ width: "100%", marginTop: 8, background: "none" }} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export function Toast() {
  const { toast } = useCart();
  return <div className={`toast ${toast ? "show" : ""}`} role="status" aria-live="polite">{toast}</div>;
}

export function WhatsAppFloat() {
  return (
    <a className="wa-float" href={waLink("Hello Kaffy, I'd like to make an enquiry about your gift boxes.")}
      target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
      <WhatsAppIcon />
    </a>
  );
}
