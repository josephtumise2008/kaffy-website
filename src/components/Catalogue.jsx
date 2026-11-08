import { PRODUCTS, OCCASIONS, TIER_BREAKS, naira, waLink } from "../data/products";
import { useCart } from "../context/CartContext";
import ProductArt from "./ProductArt";
import { WhatsAppIcon } from "./Icons";

function ProductCard({ product }) {
  const { add, STEP } = useCart();
  const low = product.stock < 1000;

  return (
    <article className="product">
      <div className="product-art">
        <span className={`stock-pill ${low ? "low" : ""}`}><i />{product.stock.toLocaleString("en-NG")} in stock</span>
        <ProductArt product={product} />
      </div>
      <div className="product-body">
        <h3>{product.name}</h3>
        <p>{product.note}</p>
        <table className="tier-table">
          <thead><tr><th>Quantity</th><th>Price per piece</th></tr></thead>
          <tbody>
            {product.tiers.map((price, i) => (
              <tr key={i}><td>{TIER_BREAKS[i].toLocaleString("en-NG")}{i === 3 ? "+" : ""} pcs</td><td>{naira(price)}</td></tr>
            ))}
          </tbody>
        </table>
        <div className="product-actions">
          <button className="btn btn-primary" onClick={() => add(product.id)}>Add {STEP} to cart</button>
          <a className="btn btn-whatsapp icon-btn" target="_blank" rel="noopener noreferrer"
            aria-label={`Order ${product.name} on WhatsApp`}
            href={waLink(`Hello Kaffy, I'm interested in ${product.name} in bulk. Please send your best price for my quantity.`)}>
            <WhatsAppIcon />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Catalogue({ filter, onFilter }) {
  const filters = [{ id: "all", label: "All" }, ...OCCASIONS];
  const list = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.tags.includes(filter));

  return (
    <section className="products" id="catalogue">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>Wholesale catalogue</h2>
            <p className="lede">Every price below is per piece. Add to cart and pay online, or send the order straight to WhatsApp.</p>
          </div>
          <div className="filters" role="group" aria-label="Filter by occasion">
            {filters.map((f) => (
              <button key={f.id} className="chip" aria-pressed={filter === f.id} onClick={() => onFilter(f.id)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="product-grid">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <p className="products-note">
          Need a quantity above 1,000, a mixed carton or your logo printed on the boxes?{" "}
          <a href="#quote">Request a bulk quote</a> and we'll reply with a price.
        </p>
      </div>
    </section>
  );
}
