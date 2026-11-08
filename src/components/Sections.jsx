// Smaller, mostly static homepage sections.
import { OCCASIONS } from "../data/products";
import { PinIcon, PhoneIcon } from "./Icons";

export function Occasions({ onPick }) {
  return (
    <section id="occasions">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>Shop by occasion</h2>
            <p className="lede">Stock up early. Seasonal boxes sell out fast before Christmas and Valentine's.</p>
          </div>
        </div>
        <div className="occasions-row">
          {OCCASIONS.map((o) => (
            <a key={o.id} href="#catalogue" className={`occasion ${o.className}`} onClick={() => onPick(o.id)}>
              <h3>{o.label}</h3><p>{o.text}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { title: "Choose your products", text: "Browse the catalogue or tell us what your event or shop needs." },
  { title: "Get your price", text: "Pay the listed bulk price online, or request a quote for larger or custom orders." },
  { title: "Confirm and pay", text: "Pay securely by card, transfer or USSD. You get a receipt immediately." },
  { title: "Receive your order", text: "We pack and waybill to your state, or you pick up from our Lagos Island store." },
];

export function Process() {
  return (
    <section className="process" id="how">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>How bulk ordering works</h2>
            <p className="lede">From quote to delivery, the whole process is handled on WhatsApp or online.</p>
          </div>
        </div>
        <ol className="steps">
          {STEPS.map((s) => <li key={s.title}><h3>{s.title}</h3><p>{s.text}</p></li>)}
        </ol>
      </div>
    </section>
  );
}

const REVIEW_SLOTS = [
  "A reseller's review about price and quality.",
  "An event planner's review about on-time delivery.",
  "A company's review about a corporate gift order.",
];

export function Reviews() {
  return (
    <section className="reviews" aria-labelledby="reviewsTitle">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2 id="reviewsTitle">What our buyers say</h2>
            <p className="lede">In the full website, real reviews from Kaffy's customers and screenshots of bulk deliveries go here.</p>
          </div>
        </div>
        <div className="review-grid">
          {REVIEW_SLOTS.map((text) => (
            <div className="review" key={text}>
              <span className="stars" aria-hidden="true">★★★★★</span>
              <p><b>Your customer review</b><br />{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: "What is the minimum order for wholesale prices?", a: "Wholesale prices start from 50 pieces per product. You can still buy single pieces at retail prices." },
  { q: "Do you deliver outside Lagos?", a: "Yes. We deliver to all states by waybill. The delivery cost is added to your quote before you pay." },
  { q: "How do I pay?", a: "Pay online by card, bank transfer or USSD through Paystack, or by bank transfer after confirming your order on WhatsApp." },
  { q: "Can you print my company logo on the boxes?", a: "Send the details through the bulk quote form and we'll confirm options, quantities and timing." },
];

export function Visit() {
  return (
    <section id="visit">
      <div className="wrap visit-grid">
        <div>
          <h2>Visit our Lagos Island store</h2>
          <div className="visit-info">
            <div><PinIcon /><p><b>53 Docemu Street, Lagos Island, Lagos</b><br />See the full range in person and collect your order.</p></div>
            <div><PhoneIcon /><p><b>+234 904 302 0239</b><br />Call or WhatsApp for orders and enquiries.</p></div>
          </div>
          <div className="faq">
            {FAQS.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <div className="map">
          <iframe title="Map showing 53 Docemu Street, Lagos Island" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
            src="https://maps.google.com/maps?q=53%20Docemu%20Street%2C%20Lagos%20Island%2C%20Lagos&z=16&output=embed" />
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="cta-band">
      <div className="wrap cta-inner">
        <h2>Planning a big order for Christmas or Valentine's?</h2>
        <a href="#quote" className="btn btn-light">Get a bulk quote</a>
      </div>
    </section>
  );
}
