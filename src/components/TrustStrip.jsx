import { FactoryIcon, TruckIcon, LockIcon, DiscountIcon } from "./Icons";

const POINTS = [
  { Icon: FactoryIcon, title: "Factory-direct stock", text: "Better prices on every carton" },
  { Icon: TruckIcon, title: "Nationwide delivery", text: "Waybill to any state, or pick up in Lagos" },
  { Icon: LockIcon, title: "Secure online payment", text: "Card, transfer or USSD via Paystack" },
  { Icon: DiscountIcon, title: "Bigger order, lower price", text: "Four price levels up to 1,000+ pieces" },
];

export default function TrustStrip() {
  return (
    <section className="trust" aria-label="Why buy from us">
      <ul className="wrap trust-list">
        {POINTS.map(({ Icon, title, text }) => (
          <li key={title}><Icon /><span>{title}<small>{text}</small></span></li>
        ))}
      </ul>
    </section>
  );
}
