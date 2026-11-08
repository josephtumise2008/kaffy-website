import { Logo } from "./Header";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Logo />
            <p className="footer-about">Wholesale and retail gift boxes, bags and papers. Nationwide delivery from Lagos Island.</p>
          </div>
          <div>
            <h3>Shop</h3>
            <ul>
              <li><a href="#catalogue">Wholesale catalogue</a></li>
              <li><a href="#occasions">Occasions</a></li>
              <li><a href="#quote">Bulk quote</a></li>
            </ul>
          </div>
          <div>
            <h3>Help</h3>
            <ul>
              <li><a href="#how">How to order</a></li>
              <li><a href="#visit">Delivery & payment</a></li>
              <li><a href="#/dashboard">Admin dashboard preview</a></li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li>53 Docemu Street, Lagos Island</li>
              <li><a href="tel:+2349043020239">+234 904 302 0239</a></li>
              <li><a href="https://instagram.com/boxes_papersbykaffy" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} TBL Kaffy Resources. All rights reserved.</span>
          <span>Sample website designed by Joseph</span>
        </div>
      </div>
    </footer>
  );
}
