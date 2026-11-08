import { useState } from "react";
import { PRODUCTS, STATES, BUYER_TYPES, waLink } from "../data/products";
import { useCart } from "../context/CartContext";
import { CheckIcon, WhatsAppIcon } from "./Icons";

const QUANTITIES = ["50 – 99 pieces", "100 – 499 pieces", "500 – 999 pieces", "1,000+ pieces"];
const REQUIRED = { name: "Enter your name.", phone: "Enter a phone number we can reach you on.", state: "Choose where we should deliver." };

export default function QuoteForm({ buyerType, onBuyerType }) {
  const { showToast } = useCart();
  const [form, setForm] = useState({
    name: "", phone: "", business: "", product: PRODUCTS[0].name,
    qty: QUANTITIES[1], state: "", date: "", notes: "",
  });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    const found = Object.fromEntries(
      Object.entries(REQUIRED).filter(([key]) => !form[key].trim()).map(([key, msg]) => [key, msg])
    );
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      document.getElementById(`q-${firstError}`)?.focus();
      return;
    }

    const message = [
      "Hello Kaffy, I'd like a bulk quote.",
      "",
      `Name: ${form.name}`,
      form.business && `Business: ${form.business}`,
      `Phone: ${form.phone}`,
      `Buying as: ${buyerType}`,
      `Product: ${form.product}`,
      `Quantity: ${form.qty}`,
      `Deliver to: ${form.state}`,
      form.date && `Needed by: ${form.date}`,
      form.notes && `Notes: ${form.notes}`,
    ].filter(Boolean).join("\n");

    window.open(waLink(message), "_blank", "noopener");
    showToast("Your quote request is ready to send in WhatsApp");
  }

  const field = (key, label, input, full = false) => (
    <div className={`field ${full ? "full" : ""} ${errors[key] ? "invalid" : ""}`}>
      <label htmlFor={`q-${key}`}>{label}</label>
      {input}
      {errors[key] && <span className="error" role="alert">{errors[key]}</span>}
    </div>
  );

  return (
    <section id="quote">
      <div className="wrap quote-grid">
        <div className="quote-aside">
          <h2>Request a bulk quote</h2>
          <p className="lede">For large quantities, mixed cartons or custom branding. Your request goes straight to our WhatsApp, and we reply with a price and delivery plan.</p>
          <ul>
            <li><CheckIcon />Prices for 50 to 1,000+ pieces</li>
            <li><CheckIcon />Delivery cost to your state included in the quote</li>
            <li><CheckIcon />Mixed cartons and several products in one order</li>
          </ul>
        </div>

        <form className="form" onSubmit={handleSubmit} noValidate>
          {field("name", "Your name", <input id="q-name" value={form.name} onChange={set("name")} autoComplete="name" />)}
          {field("phone", "Phone or WhatsApp number", <input id="q-phone" type="tel" inputMode="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" />)}
          {field("business", "Business name (optional)", <input id="q-business" value={form.business} onChange={set("business")} autoComplete="organization" />)}
          {field("buyer", "I'm buying as",
            <select id="q-buyer" value={buyerType} onChange={(e) => onBuyerType(e.target.value)}>
              {BUYER_TYPES.map((b) => <option key={b}>{b}</option>)}
            </select>)}
          {field("product", "Product",
            <select id="q-product" value={form.product} onChange={set("product")}>
              {PRODUCTS.map((p) => <option key={p.id}>{p.name}</option>)}
              <option>Mixed carton / several products</option>
            </select>)}
          {field("qty", "Quantity",
            <select id="q-qty" value={form.qty} onChange={set("qty")}>
              {QUANTITIES.map((q) => <option key={q}>{q}</option>)}
            </select>)}
          {field("state", "Delivery state",
            <select id="q-state" value={form.state} onChange={set("state")}>
              <option value="">Choose a state</option>
              {STATES.map((s) => <option key={s}>{s}</option>)}
            </select>)}
          {field("date", "Date you need it", <input id="q-date" type="date" value={form.date} onChange={set("date")} />)}
          {field("notes", "Anything else? (colours, sizes, logo printing)",
            <textarea id="q-notes" value={form.notes} onChange={set("notes")} />, true)}

          <button type="submit" className="btn btn-whatsapp"><WhatsAppIcon /> Send quote request on WhatsApp</button>
          <p className="form-foot">Your request opens in WhatsApp with all your details filled in, ready to send.</p>
        </form>
      </div>
    </section>
  );
}
