import { useState } from "react";
import { PRODUCTS, naira } from "../data/products";
import { useCart } from "../context/CartContext";
import { Toast } from "../components/Overlays";
import "../styles/dashboard.css";

// Demo data showing how Kaffy's store admin will look. In the live store
// (WooCommerce + Paystack) these come from real orders.
const DEMO_ORDERS = [
  { id: "#KF-1048", name: "Amaka Stores", type: "Retailer · Onitsha", items: "500 × Printed gift bags", total: 170000, pay: "Paystack · Card", status: "paid" },
  { id: "#KF-1047", name: "Grace Events", type: "Event planner · Ibadan", items: "200 × Heart rose box", total: 860000, pay: "Paystack · Transfer", status: "packed" },
  { id: "#KF-1046", name: "Zenith Hampers", type: "Gift business · Abuja", items: "100 × Quilted gift box", total: 590000, pay: "Paystack · USSD", status: "shipped" },
  { id: "#KF-1045", name: "Mrs Adeyemi", type: "Individual · Lagos", items: "50 × Wrapping paper rolls", total: 45000, pay: "Bank transfer", status: "pending" },
  { id: "#KF-1044", name: "Kano Gift Hub", type: "Distributor · Kano", items: "1,000 × Magnetic box", total: 2600000, pay: "Paystack · Transfer", status: "shipped" },
];

const STATUSES = { pending: "Awaiting payment", paid: "Paid · to pack", packed: "Packed", shipped: "Shipped" };

const DEMO_QUOTES = [
  { name: "Events by Tolu", type: "Event planner", detail: "300 pcs heart rose box · Abuja (FCT) · needed 10 Feb" },
  { name: "Brightline Logistics", type: "Company", detail: "1,000+ notebook sets with logo · Lagos · needed 15 Dec" },
];

const LOW_STOCK = 700;

function Kpis({ stock }) {
  const low = PRODUCTS.filter((p) => stock[p.id] < LOW_STOCK);
  return (
    <div className="kpis">
      <div className="kpi"><small>Sales today</small><strong>₦1,842,500</strong><span>Paid online and by transfer</span></div>
      <div className="kpi"><small>New orders</small><strong>7</strong><span>3 waiting to be packed</span></div>
      <div className="kpi"><small>Quote requests</small><strong>{DEMO_QUOTES.length}</strong><span>From the bulk quote form</span></div>
      <div className={`kpi ${low.length ? "alert" : ""}`}>
        <small>Low stock</small>
        <strong>{low.length} {low.length === 1 ? "item" : "items"}</strong>
        <span>{low.length ? `${low.map((p) => p.name).join(", ")} below ${LOW_STOCK}` : "All products well stocked"}</span>
      </div>
    </div>
  );
}

function Orders() {
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const { showToast } = useCart();

  function updateStatus(id, status) {
    setOrders((list) => list.map((o) => (o.id === id ? { ...o, status } : o)));
    showToast(`Order ${id} marked as ${STATUSES[status].toLowerCase()}`);
  }

  return (
    <section className="panel" id="orders">
      <div className="panel-head">
        <div><h2>Recent orders</h2><p>Change an order's status and the customer can be notified.</p></div>
      </div>
      <div className="scroll">
        <table className="data">
          <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th></tr></thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td data-label="Order"><b>{o.id}</b><small>Today</small></td>
                <td data-label="Customer"><b>{o.name}</b><small>{o.type}</small></td>
                <td data-label="Items">{o.items}</td>
                <td data-label="Total"><b>{naira(o.total)}</b></td>
                <td data-label="Payment">{o.pay}</td>
                <td data-label="Status">
                  <select className={`status ${o.status}`} value={o.status} aria-label={`Status for order ${o.id}`}
                    onChange={(e) => updateStatus(o.id, e.target.value)}>
                    {Object.entries(STATUSES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Stock({ stock, onAdjust }) {
  return (
    <section className="panel" id="stock">
      <div className="panel-head">
        <div><h2>Stock levels</h2><p>Stock drops automatically when an order is paid. Adjust it here after a restock.</p></div>
      </div>
      {PRODUCTS.map((p) => {
        const qty = stock[p.id];
        const low = qty < LOW_STOCK;
        const scale = p.id === "gift-bags" ? 12000 : 4000;
        const pct = Math.max(3, Math.min(100, (qty / scale) * 100));
        return (
          <div className="stock-row" key={p.id}>
            <div>
              <b>{p.name}</b><br />
              <small>{naira(p.tiers[0])} – {naira(p.tiers[3])} per piece</small>{" "}
              {low && <span className="low-tag">Restock soon</span>}
            </div>
            <div className={`bar ${low ? "low" : ""}`}><i style={{ width: `${pct}%` }} /></div>
            <div className="stepper">
              <button onClick={() => onAdjust(p.id, -50)} aria-label={`Reduce ${p.name} stock by 50`}>−</button>
              <output>{qty.toLocaleString("en-NG")}</output>
              <button onClick={() => onAdjust(p.id, 50)} aria-label={`Add 50 to ${p.name} stock`}>+</button>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default function Dashboard() {
  const [stock, setStock] = useState(() => Object.fromEntries(PRODUCTS.map((p) => [p.id, p.stock])));
  const adjust = (id, delta) => setStock((s) => ({ ...s, [id]: Math.max(0, s[id] + delta) }));
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="dashboard-page">
      <div className="demo-bar"><strong>Dashboard preview</strong> with demo orders. In the live store, this fills with real orders and works from Kaffy's phone.</div>
      <div className="app">
        <aside className="side">
          <a href="#/" className="logo">
            <span className="logo-mark" aria-hidden="true" />
            <span className="logo-text">Kaffy Admin <small>TBL Kaffy Resources</small></span>
          </a>
          <nav aria-label="Dashboard">
            <a href="#/dashboard" aria-current="page"><span className="label">Overview</span></a>
            <a href="#/dashboard" onClick={(e) => { e.preventDefault(); document.getElementById("orders").scrollIntoView(); }}>
              <span className="label">Orders</span><span className="badge">3 new</span>
            </a>
            <a href="#/dashboard" onClick={(e) => { e.preventDefault(); document.getElementById("stock").scrollIntoView(); }}>
              <span className="label">Products & stock</span>
            </a>
            <a href="#/dashboard" onClick={(e) => { e.preventDefault(); document.getElementById("quotes").scrollIntoView(); }}>
              <span className="label">Quote requests</span><span className="badge">{DEMO_QUOTES.length}</span>
            </a>
            <a href="#/dashboard" onClick={(e) => { e.preventDefault(); document.getElementById("staff").scrollIntoView(); }}>
              <span className="label">Staff</span>
            </a>
          </nav>
          <div className="who"><b>Signed in as Kaffy</b><span>Owner · full access</span></div>
        </aside>

        <main className="main">
          <div className="top">
            <div>
              <h1>{greeting}, Kaffy</h1>
              <p>Here's how the store is doing today.</p>
            </div>
            <a href="#/" className="back">View website</a>
          </div>

          <Kpis stock={stock} />
          <Orders />

          <div className="grid-2">
            <Stock stock={stock} onAdjust={adjust} />
            <div className="side-panels">
              <section className="panel" id="quotes">
                <div className="panel-head"><h2>Bulk quote requests</h2></div>
                {DEMO_QUOTES.map((q) => (
                  <div className="quote" key={q.name}>
                    <div><b>{q.name}</b><small>{q.type}</small></div>
                    <small>{q.detail}</small>
                    <a href="#/dashboard">Reply on WhatsApp</a>
                  </div>
                ))}
              </section>

              <section className="panel" id="staff">
                <div className="panel-head"><h2>Staff access</h2></div>
                <div className="staff">
                  <div className="member"><span className="avatar">K</span><div><b>Kaffy</b><small>Owner</small></div><span className="role">Full access</span></div>
                  <div className="member"><span className="avatar staff-av">S</span><div><b>Shop staff</b><small>Staff account</small></div><span className="role mgr">Orders & stock</span></div>
                </div>
                <p className="perm">Staff can process orders and update stock. Only the owner can change prices, see total revenue and manage payouts.</p>
              </section>
            </div>
          </div>
        </main>
      </div>
      <Toast />
    </div>
  );
}
