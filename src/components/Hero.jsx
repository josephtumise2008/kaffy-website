import BulkCalculator from "./BulkCalculator";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="season-tag reveal"><span>In stock</span> Christmas and Valentine's boxes</p>
          <h1 className="reveal d1">Gift boxes and papers, by the hundred.</h1>
          <p className="lede reveal d2">
            We supply retailers, event planners and companies across Nigeria with gift boxes, rose boxes,
            gift bags and wrapping paper. Order from 50 pieces, and the more you buy, the less you pay per piece.
          </p>
          <div className="hero-ctas reveal d3">
            <a href="#quote" className="btn btn-light">Get a bulk quote</a>
            <a href="#catalogue" className="btn btn-ghost">See wholesale prices</a>
          </div>
          <div className="hero-facts reveal d4">
            <div><strong>50 pcs</strong>minimum order for wholesale prices</div>
            <div><strong>All states</strong>nationwide delivery or Lagos pickup</div>
            <div><strong>Direct</strong>sourced straight from the factory</div>
          </div>
        </div>
        <BulkCalculator />
      </div>
    </section>
  );
}
