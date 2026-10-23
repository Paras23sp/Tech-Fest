// PriceProof demo dataset. All offers below are fictional and are not live retailer prices.
const catalogue = [
  {
    keywords: ["headphone", "headphones", "headset"], name: "Wireless Headphones", category: "Audio", offers: [
      { seller: "Store A", price: 2000, delivery: 150, fees: 0, discount: 0, returns: "7-day return", warranty: "1-year warranty", condition: "No known conditional fees", source: "Demo data" },
      { seller: "Store B", price: 2100, delivery: 0, fees: 0, discount: 50, returns: "10-day return", warranty: "1-year warranty", condition: "Discount eligibility should be verified", source: "Demo data" },
      { seller: "Store C", price: 1900, delivery: 300, fees: 0, discount: 0, returns: "Replacement only", warranty: "6-month warranty", condition: "Return shipping details unknown", source: "Demo data" }
    ]
  },
  {
    keywords: ["mouse", "gaming mouse"], name: "Wireless Mouse", category: "Accessories", offers: [
      { seller: "Store A", price: 499, delivery: 50, fees: 0, discount: 0, returns: "7-day return", warranty: "1-year warranty", condition: "No known conditional fees", source: "Demo data" },
      { seller: "Store B", price: 529, delivery: 0, fees: 0, discount: 0, returns: "10-day return", warranty: "1-year warranty", condition: "No known conditional fees", source: "Demo data" },
      { seller: "Store C", price: 479, delivery: 80, fees: 0, discount: 0, returns: "Replacement only", warranty: "6-month warranty", condition: "Return shipping details unknown", source: "Demo data" }
    ]
  },
  {
    keywords: ["keyboard", "mechanical keyboard"], name: "Keyboard", category: "Accessories", offers: [
      { seller: "Store A", price: 899, delivery: 50, fees: 0, discount: 0, returns: "7-day return", warranty: "1-year warranty", condition: "No known conditional fees", source: "Demo data" },
      { seller: "Store B", price: 949, delivery: 0, fees: 0, discount: 30, returns: "10-day return", warranty: "1-year warranty", condition: "Discount eligibility should be verified", source: "Demo data" },
      { seller: "Store C", price: 849, delivery: 100, fees: 0, discount: 0, returns: "Replacement only", warranty: "6-month warranty", condition: "Return shipping details unknown", source: "Demo data" }
    ]
  },
  {
    keywords: ["laptop", "notebook computer"], name: "Laptop", category: "Computers", offers: [
      { seller: "Store A", price: 52990, delivery: 0, fees: 99, discount: 1000, returns: "7-day return", warranty: "1-year warranty", condition: "Bank discount may require eligibility", source: "Demo data" },
      { seller: "Store B", price: 51990, delivery: 499, fees: 0, discount: 0, returns: "10-day return", warranty: "1-year warranty", condition: "No known conditional fees", source: "Demo data" },
      { seller: "Store C", price: 53500, delivery: 0, fees: 0, discount: 500, returns: "Replacement only", warranty: "2-year warranty", condition: "Confirm warranty coverage", source: "Demo data" }
    ]
  },
  {
    keywords: ["monitor", "computer monitor"], name: "Computer Monitor", category: "Computers", offers: [
      { seller: "Store A", price: 8999, delivery: 250, fees: 0, discount: 0, returns: "7-day return", warranty: "1-year warranty", condition: "No known conditional fees", source: "Demo data" },
      { seller: "Store B", price: 9299, delivery: 0, fees: 0, discount: 400, returns: "10-day return", warranty: "3-year warranty", condition: "Discount eligibility should be verified", source: "Demo data" },
      { seller: "Store C", price: 8799, delivery: 399, fees: 0, discount: 0, returns: "Replacement only", warranty: "1-year warranty", condition: "Return shipping details unknown", source: "Demo data" }
    ]
  },
  {
    keywords: ["phone", "smartphone", "mobile"], name: "Smartphone", category: "Mobiles", offers: [
      { seller: "Store A", price: 18999, delivery: 99, fees: 0, discount: 500, returns: "7-day return", warranty: "1-year warranty", condition: "Discount eligibility should be verified", source: "Demo data" },
      { seller: "Store B", price: 19249, delivery: 0, fees: 0, discount: 0, returns: "10-day return", warranty: "1-year warranty", condition: "No known conditional fees", source: "Demo data" },
      { seller: "Store C", price: 18499, delivery: 299, fees: 0, discount: 0, returns: "Replacement only", warranty: "1-year warranty", condition: "Return shipping details unknown", source: "Demo data" }
    ]
  },
  {
    keywords: ["earbuds", "ear bud", "wireless earbuds"], name: "Wireless Earbuds", category: "Audio", offers: [
      { seller: "Store A", price: 1499, delivery: 50, fees: 0, discount: 0, returns: "7-day return", warranty: "1-year warranty", condition: "No known conditional fees", source: "Demo data" },
      { seller: "Store B", price: 1599, delivery: 0, fees: 0, discount: 100, returns: "10-day return", warranty: "1-year warranty", condition: "Discount eligibility should be verified", source: "Demo data" },
      { seller: "Store C", price: 1399, delivery: 120, fees: 0, discount: 0, returns: "Replacement only", warranty: "6-month warranty", condition: "Return shipping details unknown", source: "Demo data" }
    ]
  }
];

const money = n => "₹" + Math.round(n).toLocaleString("en-IN");
const total = o => o.price + o.delivery + o.fees - o.discount;
let currentProduct = catalogue[0];

function sortOffers(offers) {
  const sort = document.getElementById("sortSelect").value;
  return [...offers].sort((a, b) => {
    if (sort === "price") return a.price - b.price;
    if (sort === "returns") return (parseInt(b.returns) || 0) - (parseInt(a.returns) || 0);
    return total(a) - total(b);
  });
}
function findProduct(query) {
  const q = query.trim().toLowerCase();
  if (!q) return null;
  return catalogue.find(p => p.keywords.some(k => k.includes(q) || q.includes(k)) || p.name.toLowerCase().includes(q));
}
function render() {
  const offers = sortOffers(currentProduct.offers);
  document.getElementById("resultsTitle").textContent = currentProduct.name;
  document.getElementById("resultsSubtitle").textContent = "3 example offers • " + currentProduct.category + " • Fictional demo data";
  document.getElementById("searchMessage").textContent = "";
  const minTotal = Math.min(...offers.map(total));
  document.getElementById("summaryCards").innerHTML = offers.map(o => {
    const winner = total(o) === minTotal;
    return `<article class="summary-card ${winner ? "winner" : ""}">
      <div class="seller-top"><span class="seller-name">${o.seller}</span><span class="seller-label">${winner ? "LOWEST KNOWN COST" : "DEMO OFFER"}</span></div>
      <p class="product-title">${currentProduct.name}</p>
      <div class="item-price">${money(o.price)} <small>item price</small></div>
      <div class="cost-breakdown">
        <div class="cost-line"><span>Delivery</span><strong>${money(o.delivery)}</strong></div>
        <div class="cost-line"><span>Other known fees</span><strong>${money(o.fees)}</strong></div>
        <div class="cost-line"><span>Discount</span><strong>−${money(o.discount)}</strong></div>
        <div class="total-line"><span>Total known cost</span><strong>${money(total(o))}</strong></div>
      </div>
      <p class="condition-note">${o.condition}</p>
    </article>`;
  }).join("");
  document.getElementById("offerRows").innerHTML = offers.map(o => `<tr>
    <td class="seller-cell">${o.seller}<small>${currentProduct.name}</small></td>
    <td>${money(o.price)}</td><td>${money(o.delivery)}</td><td>${money(o.fees)}<small>Discount: −${money(o.discount)}</small></td>
    <td class="total-cell">${money(total(o))}</td>
    <td class="policy-cell">${o.returns}<small>${o.warranty}</small><small>${o.condition}</small></td>
  </tr>`).join("");
  document.getElementById("mobileOffers").innerHTML = offers.map(o => `<article class="mobile-offer">
    <h3>${o.seller} · ${currentProduct.name}</h3>
    <div class="mobile-row"><span>Item price</span><strong>${money(o.price)}</strong></div>
    <div class="mobile-row"><span>Delivery</span><strong>${money(o.delivery)}</strong></div>
    <div class="mobile-row"><span>Other fees</span><strong>${money(o.fees)}</strong></div>
    <div class="mobile-row"><span>Discount</span><strong>−${money(o.discount)}</strong></div>
    <div class="mobile-row"><span>Returns</span><strong>${o.returns}</strong></div>
    <div class="mobile-row"><span>Warranty</span><strong>${o.warranty}</strong></div>
    <div class="mobile-total"><span>Total known cost</span><strong>${money(total(o))}</strong></div>
    <p class="condition-note">${o.condition}</p>
  </article>`).join("");
}
document.getElementById("searchForm").addEventListener("submit", e => {
  e.preventDefault();
  const query = document.getElementById("searchInput").value;
  const product = findProduct(query);
  if (!product) {
    document.getElementById("searchMessage").textContent = query.trim()
      ? "No matching product in this demo catalogue. Try headphones, mouse, keyboard, laptop, monitor, phone or earbuds."
      : "Enter a product name to start comparing.";
    return;
  }
  currentProduct = product;
  render();
  document.getElementById("resultsSection").scrollIntoView({ behavior: "smooth", block: "start" });
});
document.getElementById("sortSelect").addEventListener("change", render);
render();
