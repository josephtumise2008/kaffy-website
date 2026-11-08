import { useState } from "react";
import { useCart } from "../context/CartContext";
import { BagIcon, MenuIcon } from "./Icons";

const LINKS = [
  { href: "#catalogue", label: "Catalogue" },
  { href: "#buyers", label: "Who we supply" },
  { href: "#occasions", label: "Occasions" },
  { href: "#how", label: "How to order" },
  { href: "#visit", label: "Visit us" },
  { href: "#/dashboard", label: "Admin dashboard", className: "nav-admin" },
];

export function Logo({ title = "Boxes & Papers", subtitle = "by Kaffy · TBL Kaffy Resources" }) {
  return (
    <a href="#top" className="logo" aria-label="Boxes & Papers by Kaffy home">
      <span className="logo-mark" aria-hidden="true" />
      <span className="logo-text">{title} <small>{subtitle}</small></span>
    </a>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, open } = useCart();

  return (
    <header className="site-header">
      <nav className="wrap nav" aria-label="Main">
        <Logo />
        <ul className={`nav-links ${menuOpen ? "open" : ""}`} id="navLinks">
          {LINKS.map((l) => (
            <li key={l.href}><a href={l.href} className={l.className} onClick={() => setMenuOpen(false)}>{l.label}</a></li>
          ))}
        </ul>
        <div className="nav-actions">
          <a href="#quote" className="btn btn-primary">Get a bulk quote</a>
          <button className="cart-btn" onClick={open} aria-label={`Open cart, ${count} pieces`}>
            <BagIcon />
            <span key={count} className={`cart-count ${count ? "bump" : ""}`}>{count > 999 ? "999+" : count}</span>
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen((o) => !o)}
            aria-label="Open menu" aria-expanded={menuOpen} aria-controls="navLinks">
            <MenuIcon />
          </button>
        </div>
      </nav>
    </header>
  );
}
