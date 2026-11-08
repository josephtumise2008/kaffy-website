import ProductArt from "./ProductArt";
import { PRODUCTS } from "../data/products";

const BUYERS = [
  { title: "Event planners", text: "Souvenir boxes and bags for weddings, birthdays and parties, delivered before your date.", cta: "Plan event packaging", type: "Event planner" },
  { title: "Companies", text: "End-of-year and client gift packaging for your whole team, priced for large quantities.", cta: "Request a corporate quote", type: "Company / corporate" },
  { title: "Gift and hamper businesses", text: "Rose boxes, hamper boxes and fillers in steady supply for your weekly orders.", cta: "Set up regular supply", type: "Gift / hamper business" },
  { title: "Individuals", text: "Buying a few pieces for yourself? Retail orders are welcome too.", cta: "Shop single pieces", href: "#catalogue" },
];

// onChooseBuyer pre-fills the quote form with the buyer type.
export default function Buyers({ onChooseBuyer }) {
  return (
    <section id="buyers">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>Built for buyers who order in quantity</h2>
            <p className="lede">Tell us who you're buying for and we'll recommend the right boxes, quantities and delivery plan.</p>
          </div>
        </div>
        <div className="buyers-grid">
          <article className="buyer feature">
            <div>
              <h3>Retailers, resellers and distributors</h3>
              <p>Restock your shop with fast-moving gift boxes and papers at wholesale prices. Mixed cartons are welcome, so you can combine designs in one order.</p>
            </div>
            <div className="stack" aria-hidden="true">
              {[PRODUCTS[2], PRODUCTS[1], PRODUCTS[3]].map((p) => <ProductArt key={p.id} product={p} />)}
            </div>
            <a href="#quote" onClick={() => onChooseBuyer("Retailer / reseller")}>Get reseller prices</a>
          </article>
          {BUYERS.map((b) => (
            <article className="buyer" key={b.title}>
              <div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
              <a href={b.href || "#quote"} onClick={() => b.type && onChooseBuyer(b.type)}>{b.cta}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
