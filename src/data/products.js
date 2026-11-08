// Sample catalogue — replace names, prices and stock with Kaffy's real figures.
export const WHATSAPP_NUMBER = "2349043020239";

export const PRODUCTS = [
  {
    id: "heart-rose",
    name: "Heart rose box",
    short: "Heart rose box",
    note: "Preserved-rose heart box with clear lid. Valentine's best seller.",
    art: "heart", color: "#B3122E", accent: "#F3C6CF",
    tiers: [4800, 4300, 3700, 3300], stock: 2400,
    tags: ["valentine", "wedding", "birthday"],
  },
  {
    id: "quilted-box",
    name: "Quilted luxury gift box",
    short: "Quilted box",
    note: "Diamond-quilted rigid box with rose clasp. Two sizes.",
    art: "box", color: "#9E1B32", accent: "#E9B8C2",
    tiers: [6500, 5900, 5200, 4700], stock: 1150,
    tags: ["christmas", "valentine", "corporate"],
  },
  {
    id: "magnetic-box",
    name: "Magnetic closure box",
    short: "Magnetic box",
    note: "Matte rigid box with magnetic flap. Black, white or red.",
    art: "box", color: "#2B1B1F", accent: "#C8A27A",
    tiers: [3800, 3400, 2900, 2600], stock: 3200,
    tags: ["corporate", "birthday", "wedding"],
  },
  {
    id: "gift-bags",
    name: "Printed gift bags",
    short: "Gift bags",
    note: "Rope-handle paper bags, medium size. Festive and plain prints.",
    art: "bag", color: "#C8A27A", accent: "#9E1B32",
    tiers: [450, 400, 340, 300], stock: 12000,
    tags: ["christmas", "birthday", "wedding"],
  },
  {
    id: "wrapping-paper",
    name: "Gift wrapping paper rolls",
    short: "Wrapping paper",
    note: "Glossy and kraft rolls, 70cm wide. Christmas prints in stock.",
    art: "roll", color: "#1E5B47", accent: "#F2D27A",
    tiers: [900, 800, 680, 600], stock: 8500,
    tags: ["christmas", "birthday"],
  },
  {
    id: "notebook-set",
    name: "Executive notebook & pen set",
    short: "Notebook set",
    note: "Hardcover A5 notebook and pen in a gift box. Ready for logo branding.",
    art: "notebook", color: "#1F2A44", accent: "#C8A27A",
    tiers: [5500, 5000, 4400, 4000], stock: 640,
    tags: ["corporate", "christmas"],
  },
];

export const TIER_BREAKS = [50, 100, 500, 1000];

export const OCCASIONS = [
  { id: "christmas", label: "Christmas", text: "Festive boxes, bags and wrapping paper", className: "occ-christmas" },
  { id: "valentine", label: "Valentine's", text: "Rose boxes, heart boxes and red packaging", className: "occ-valentine" },
  { id: "wedding", label: "Weddings", text: "Souvenir boxes and bags for guests", className: "occ-wedding" },
  { id: "birthday", label: "Birthdays", text: "Gift boxes, bags and party papers", className: "occ-birthday" },
  { id: "corporate", label: "Corporate", text: "Client gifts and end-of-year packs", className: "occ-corporate" },
];

export const STATES = ["Lagos", "Abia", "Abuja (FCT)", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
  "Katsina", "Kebbi", "Kogi", "Kwara", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
  "Sokoto", "Taraba", "Yobe", "Zamfara"];

export const BUYER_TYPES = ["Retailer / reseller", "Distributor", "Event planner", "Company / corporate",
  "Gift / hamper business", "Individual"];

export function tierIndex(qty) {
  if (qty >= 1000) return 3;
  if (qty >= 500) return 2;
  if (qty >= 100) return 1;
  return 0;
}

export function unitPrice(product, qty) {
  return product.tiers[tierIndex(qty)];
}

export function naira(n) {
  return "₦" + Math.round(n).toLocaleString("en-NG");
}

export function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id);
}
