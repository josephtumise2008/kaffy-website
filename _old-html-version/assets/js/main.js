(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const STATES = ["Lagos", "Abia", "Abuja (FCT)", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
    "Kebbi", "Kogi", "Kwara", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
    "Taraba", "Yobe", "Zamfara"];

  $("#year").textContent = new Date().getFullYear();

  /* Mobile menu */
  const toggle = $("#menuToggle"), links = $("#navLinks");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  $$("a", links).forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false");
  }));

  /* Toast */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  /* WhatsApp float */
  $("#waFloat").href = waLink("Hello Kaffy, I'd like to make an enquiry about your gift boxes.");

  /* Feature stack art */
  $("#featureStack").innerHTML = [PRODUCTS[2], PRODUCTS[1], PRODUCTS[3]].map(productArt).join("");

  /* ---------- Bulk calculator ---------- */
  const calcProduct = $("#calcProduct"), calcQty = $("#calcQty");
  calcProduct.innerHTML = PRODUCTS.map(p => `<option value="${p.id}">${p.name}</option>`).join("");

  function updateCalc() {
    const p = PRODUCTS.find(x => x.id === calcProduct.value);
    const qty = +calcQty.value;
    const i = tierIndex(qty);
    const unit = p.tiers[i];
    const total = unit * qty;
    const saving = (p.tiers[0] - unit) * qty;

    $("#qtyOut").textContent = qty.toLocaleString("en-NG");
    $("#ladder").innerHTML = p.tiers.map((price, idx) =>
      `<div class="rung ${idx === i ? "active" : ""}"><b>${TIER_BREAKS[idx].toLocaleString("en-NG")}${idx === 3 ? "+" : ""} pcs</b><span>${naira(price)}</span></div>`
    ).join("");
    $("#perPiece").textContent = `${naira(unit)} per piece`;
    $("#calcTotal").textContent = naira(total);
    $("#saving").textContent = saving > 0 ? `You save ${naira(saving)}` : "Buy 100+ to save more";
    $("#calcWa").href = waLink(
      `Hello Kaffy, I'd like to order ${qty.toLocaleString("en-NG")} pcs of ${p.name} at ${naira(unit)} per piece (total ${naira(total)}). Please confirm availability and delivery.`
    );
  }
  calcProduct.addEventListener("change", updateCalc);
  calcQty.addEventListener("input", updateCalc);
  updateCalc();

  /* ---------- Catalogue ---------- */
  const grid = $("#productGrid");
  function renderProducts(filter = "all") {
    const list = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.tags.includes(filter));
    grid.innerHTML = list.map(p => {
      const low = p.stock < 1000;
      return `
      <article class="product">
        <div class="product-art">
          <span class="stock-pill ${low ? "low" : ""}"><i></i>${p.stock.toLocaleString("en-NG")} in stock</span>
          ${productArt(p)}
        </div>
        <div class="product-body">
          <h3>${p.name}</h3>
          <p>${p.note}</p>
          <table class="tier-table">
            <thead><tr><th>Quantity</th><th>Price per piece</th></tr></thead>
            <tbody>${p.tiers.map((t, i) => `<tr><td>${TIER_BREAKS[i].toLocaleString("en-NG")}${i === 3 ? "+" : ""} pcs</td><td>${naira(t)}</td></tr>`).join("")}</tbody>
          </table>
          <div class="product-actions">
            <button class="btn btn-primary" data-add="${p.id}">Add 50 to cart</button>
            <a class="btn btn-whatsapp icon-btn" aria-label="Order ${p.name} on WhatsApp" target="_blank" rel="noopener"
               href="${waLink(`Hello Kaffy, I'm interested in ${p.name} in bulk. Please send your best price for my quantity.`)}">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z"/></svg>
            </a>
          </div>
        </div>
      </article>`;
    }).join("");
  }
  renderProducts();

  function setFilter(f) {
    $$("#filters .chip").forEach(c => c.setAttribute("aria-pressed", c.dataset.filter === f));
    renderProducts(f);
  }
  $("#filters").addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (chip) setFilter(chip.dataset.filter);
  });
  $$("[data-filter-link]").forEach(a => a.addEventListener("click", () => {
    setFilter(a.dataset.filterLink);
  }));

  /* ---------- Cart ---------- */
  const cart = new Map(); // id -> qty
  const body = document.body;

  function cartTotal() {
    let sum = 0;
    cart.forEach((qty, id) => {
      const p = PRODUCTS.find(x => x.id === id);
      sum += p.tiers[tierIndex(qty)] * qty;
    });
    return sum;
  }

  function renderCart() {
    const items = $("#cartItems");
    let count = 0;
    cart.forEach(q => count += q);
    const badge = $("#cartCount");
    badge.textContent = count > 999 ? "999+" : count;
    badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump");

    if (!cart.size) {
      items.innerHTML = `<div class="empty"><p><b>Your cart is empty.</b></p><p>Add products from the wholesale catalogue to start an order.</p></div>`;
    } else {
      items.innerHTML = [...cart].map(([id, qty]) => {
        const p = PRODUCTS.find(x => x.id === id);
        const unit = p.tiers[tierIndex(qty)];
        return `<div class="cart-item">
          <div class="thumb">${productArt(p)}</div>
          <div>
            <b>${p.name}</b>
            <small>${naira(unit)} per piece</small>
            <div class="cart-qty">
              <button data-dec="${id}" aria-label="Remove 50">−</button>
              <span>${qty} pcs</span>
              <button data-inc="${id}" aria-label="Add 50">+</button>
            </div>
          </div>
          <div style="text-align:right">
            <b>${naira(unit * qty)}</b>
            <button class="remove" data-remove="${id}">Remove</button>
          </div>
        </div>`;
      }).join("");
    }
    const total = cartTotal();
    $("#cartTotal").textContent = naira(total);
    $("#payAmount").textContent = naira(total);
    const lines = [...cart].map(([id, qty]) => {
      const p = PRODUCTS.find(x => x.id === id);
      return `• ${qty} pcs ${p.name}`;
    });
    $("#cartWa").href = waLink(`Hello Kaffy, I'd like to order:\n${lines.join("\n")}\nTotal: ${naira(total)}`);
    $("#checkoutBtn").disabled = !cart.size;
  }

  function openCart() {
    body.classList.add("drawer-open");
    $("#drawer").setAttribute("aria-hidden", "false");
    $("#closeCart").focus();
  }
  function closeCart() {
    body.classList.remove("drawer-open");
    $("#drawer").setAttribute("aria-hidden", "true");
  }

  grid.addEventListener("click", e => {
    const btn = e.target.closest("[data-add]");
    if (!btn) return;
    const id = btn.dataset.add;
    cart.set(id, (cart.get(id) || 0) + 50);
    renderCart();
    toast(`Added 50 × ${PRODUCTS.find(p => p.id === id).name} to cart`);
  });
  $("#cartItems").addEventListener("click", e => {
    const t = e.target;
    if (t.dataset.inc) cart.set(t.dataset.inc, cart.get(t.dataset.inc) + 50);
    if (t.dataset.dec) {
      const q = cart.get(t.dataset.dec) - 50;
      q > 0 ? cart.set(t.dataset.dec, q) : cart.delete(t.dataset.dec);
    }
    if (t.dataset.remove) cart.delete(t.dataset.remove);
    renderCart();
  });
  $("#cartBtn").addEventListener("click", openCart);
  $("#closeCart").addEventListener("click", closeCart);
  $("#drawerBackdrop").addEventListener("click", closeCart);

  const modal = $("#payModal");
  $("#checkoutBtn").addEventListener("click", () => { modal.classList.add("show"); $("#closeModal").focus(); });
  $("#closeModal").addEventListener("click", () => modal.classList.remove("show"));
  modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("show"); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeCart(); modal.classList.remove("show"); }
  });
  renderCart();
  $("#cartCount").classList.remove("bump");

  /* ---------- Quote form ---------- */
  $("#qProduct").innerHTML = PRODUCTS.map(p => `<option>${p.name}</option>`).join("") + `<option>Mixed carton / several products</option>`;
  $("#qState").innerHTML = `<option value="">Choose a state</option>` + STATES.map(s => `<option>${s}</option>`).join("");

  // Buyer-type links prefill the form
  $$("[data-buyer]").forEach(a => a.addEventListener("click", () => { $("#qBuyer").value = a.dataset.buyer; }));

  $("#quoteForm").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target;
    let ok = true;
    ["qName", "qPhone", "qState"].forEach(id => {
      const field = $("#" + id).closest(".field");
      const valid = $("#" + id).value.trim() !== "";
      field.classList.toggle("invalid", !valid);
      if (!valid && ok) { $("#" + id).focus(); ok = false; }
    });
    if (!ok) return;

    const d = Object.fromEntries(new FormData(f));
    const msg = [
      "Hello Kaffy, I'd like a bulk quote.",
      "",
      `Name: ${d.name}`,
      d.business ? `Business: ${d.business}` : null,
      `Phone: ${d.phone}`,
      `Buying as: ${d.buyer}`,
      `Product: ${d.product}`,
      `Quantity: ${d.qty}`,
      `Deliver to: ${d.state}`,
      d.date ? `Needed by: ${d.date}` : null,
      d.notes ? `Notes: ${d.notes}` : null
    ].filter(Boolean).join("\n");
    window.open(waLink(msg), "_blank", "noopener");
    toast("Your quote request is ready to send in WhatsApp");
  });
})();
