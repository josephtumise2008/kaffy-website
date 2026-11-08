import { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import TrustStrip from "../components/TrustStrip";
import Buyers from "../components/Buyers";
import Catalogue from "../components/Catalogue";
import QuoteForm from "../components/QuoteForm";
import Footer from "../components/Footer";
import { Occasions, Process, Reviews, Visit, CtaBand } from "../components/Sections";
import { CartDrawer, Toast, WhatsAppFloat } from "../components/Overlays";
import { BUYER_TYPES } from "../data/products";

export default function Home() {
  // Shared between sections: occasion cards filter the catalogue,
  // buyer cards pre-fill the quote form.
  const [filter, setFilter] = useState("all");
  const [buyerType, setBuyerType] = useState(BUYER_TYPES[0]);

  return (
    <>
      <div className="demo-bar">
        <strong>Sample preview</strong> prepared for Boxes & Papers by Kaffy. Prices, stock and photos are placeholders.
        <a href="#/dashboard">See your admin dashboard</a>
      </div>
      <Header />
      <main id="top">
        <Hero />
        <TrustStrip />
        <Buyers onChooseBuyer={setBuyerType} />
        <Catalogue filter={filter} onFilter={setFilter} />
        <Occasions onPick={setFilter} />
        <Process />
        <QuoteForm buyerType={buyerType} onBuyerType={setBuyerType} />
        <Reviews />
        <Visit />
        <CtaBand />
      </main>
      <Footer />
      <WhatsAppFloat />
      <CartDrawer />
      <Toast />
    </>
  );
}
