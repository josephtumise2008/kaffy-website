import { useState } from "react";
import { PRODUCTS, TIER_BREAKS, tierIndex, naira, waLink, findProduct } from "../data/products";
import { WhatsAppIcon } from "./Icons";
import ProductArt from "./ProductArt";

// The signature element: buyers drag the quantity and watch the per-piece price drop.
export default function BulkCalculator() {
  const [productId, setProductId] = useState(PRODUCTS[0].id);
  const [qty, setQty] = useState(100);

  const product = findProduct(productId);
  const tier = tierIndex(qty);
  const unit = product.tiers[tier];
  const total = unit * qty;
  const saving = (product.tiers[0] - unit) * qty;
  const message = `Hello Kaffy, I'd like to order ${qty.toLocaleString("en-NG")} pcs of ${product.name} at ${naira(unit)} per piece (total ${naira(total)}). Please confirm availability and delivery.`;

  return (
    <aside className="calc reveal d2" aria-labelledby="calcTitle">
      <div className="calc-head">
        <h2 id="calcTitle">Work out your bulk price</h2>
        <span>Sample prices</span>
      </div>

      <p className="calc-label" id="pickLabel">Product</p>
      <div className="product-picker" role="radiogroup" aria-labelledby="pickLabel">
        {PRODUCTS.map((p) => (
          <button key={p.id} type="button" role="radio" aria-checked={p.id === productId}
            className="pick" onClick={() => setProductId(p.id)} title={p.name}>
            <span className="pick-art" aria-hidden="true"><ProductArt product={p} /></span>
            <span>{p.short}</span>
          </button>
        ))}
      </div>

      <label htmlFor="calcQty">Quantity</label>
      <div className="qty-row">
        <input type="range" id="calcQty" min="50" max="1000" step="50" value={qty}
          onChange={(e) => setQty(Number(e.target.value))} />
        <output className="qty-out" htmlFor="calcQty">{qty.toLocaleString("en-NG")}</output>
      </div>

      <div className="ladder" aria-label="Price per piece by quantity">
        {product.tiers.map((price, i) => (
          <div key={i} className={`rung ${i === tier ? "active" : ""}`}>
            <b>{TIER_BREAKS[i].toLocaleString("en-NG")}{i === 3 ? "+" : ""} pcs</b>
            <span>{naira(price)}</span>
          </div>
        ))}
      </div>

      <div className="calc-total">
        <div>
          <small>{naira(unit)} per piece</small>
          <strong>{naira(total)}</strong>
        </div>
        <span className="saving">{saving > 0 ? `You save ${naira(saving)}` : "Buy 100+ to save more"}</span>
      </div>

      <a className="btn btn-whatsapp" href={waLink(message)} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon /> Send this order on WhatsApp
      </a>
    </aside>
  );
}
