const DISCORD_TICKET_URL = "https://discord.com/channels/YOUR_SERVER_ID/YOUR_TICKET_CHANNEL_ID";
const grid = document.getElementById("productGrid"),
  searchInput = document.getElementById("searchInput"),
  brandFilter = document.getElementById("brandFilter"),
  categoryFilter = document.getElementById("categoryFilter"),
  sortFilter = document.getElementById("sortFilter"),
  productCount = document.getElementById("productCount"),
  emptyState = document.getElementById("emptyState");

const modal = document.getElementById("productModal"),
  modalImage = document.getElementById("modalImage"),
  prevImgBtn = document.getElementById("prevImgBtn"),
  nextImgBtn = document.getElementById("nextImgBtn"),
  modalThumbnails = document.getElementById("modalThumbnails"),
  modalBrand = document.getElementById("modalBrand"),
  modalCategory = document.getElementById("modalCategory"),
  modalName = document.getElementById("modalName"),
  modalPrice = document.getElementById("modalPrice"),
  modalRef = document.getElementById("modalRef"),
  copyRefButton = document.getElementById("copyRefButton"),
  toast = document.getElementById("toast");

let currentProduct = null;
let currentImageIndex = 0;

document.getElementById("year").textContent = new Date().getFullYear();
["discordTop", "discordBottom", "modalDiscordButton"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.href = DISCORD_TICKET_URL;
});

function euro(v) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" }).format(v);
}

function unique(a) {
  return [...new Set(a)].sort((x, y) => x.localeCompare(y));
}

function getProductImages(p) {
  if (Array.isArray(p.images) && p.images.length > 0) return p.images;
  if (p.image) return [p.image];
  return ["assets/placeholder.svg"];
}

function populate() {
  unique(PRODUCTS.map(p => p.brand)).forEach(v => {
    let o = document.createElement("option");
    o.value = v;
    o.textContent = v;
    brandFilter.appendChild(o);
  });
  unique(PRODUCTS.map(p => p.category)).forEach(v => {
    let o = document.createElement("option");
    o.value = v;
    o.textContent = v;
    categoryFilter.appendChild(o);
  });
}

function filtered() {
  let q = searchInput.value.trim().toLowerCase(),
    b = brandFilter.value,
    c = categoryFilter.value,
    s = sortFilter.value;
  let r = PRODUCTS.filter(p => {
    let x = `${p.name} ${p.brand} ${p.category} ${p.ref}`.toLowerCase();
    return (!q || x.includes(q)) && (b === "all" || p.brand === b) && (c === "all" || p.category === c);
  });
  if (s === "newest") r.sort((a, b) => new Date(b.date) - new Date(a.date));
  if (s === "price-low") r.sort((a, b) => a.price - b.price);
  if (s === "price-high") r.sort((a, b) => b.price - a.price);
  if (s === "name") r.sort((a, b) => a.name.localeCompare(b.name));
  if (s === "featured") r.sort((a, b) => Number(b.featured) - Number(a.featured));
  return r;
}

function esc(v) {
  return String(v).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[c]));
}

function render() {
  let r = filtered();
  grid.innerHTML = "";
  productCount.textContent = `${r.length} product${r.length === 1 ? "" : "s"}`;
  emptyState.classList.toggle("hidden", r.length !== 0);
  r.forEach(p => {
    let imgs = getProductImages(p);
    let mainImg = imgs[0];
    let card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image">
        <img src="${esc(mainImg)}" alt="${esc(p.name)}" loading="lazy" onerror="this.src='assets/placeholder.svg'">
      </div>
      <div class="product-info">
        <div class="product-meta">
          <span class="product-brand">${esc(p.brand)}</span>
          <span class="product-category">${esc(p.category)}</span>
        </div>
        <h3 class="product-name">${esc(p.name)}</h3>
        <div class="product-bottom">
          <span class="product-price">${euro(p.price)}</span>
          <span class="product-ref">${esc(p.ref)}</span>
        </div>
      </div>`;
    card.onclick = () => openModal(p);
    grid.appendChild(card);
  });
}

function switchImage(index) {
  if (!currentProduct) return;
  let imgs = getProductImages(currentProduct);
  if (imgs.length <= 1) return;

  currentImageIndex = (index + imgs.length) % imgs.length;
  let newImgSrc = imgs[currentImageIndex];
  modalImage.src = newImgSrc;

  // Update active thumbnail
  const thumbs = modalThumbnails.querySelectorAll(".thumb-btn");
  thumbs.forEach((btn, i) => {
    btn.classList.toggle("active", i === currentImageIndex);
  });
}

function openModal(p) {
  currentProduct = p;
  currentImageIndex = 0;
  let imgs = getProductImages(p);

  // Set initial main image
  modalImage.src = imgs[0];
  modalImage.onerror = () => (modalImage.src = "assets/placeholder.svg");
  modalImage.alt = p.name;

  // Setup navigation arrows
  if (imgs.length > 1) {
    if (prevImgBtn) prevImgBtn.classList.remove("hidden");
    if (nextImgBtn) nextImgBtn.classList.remove("hidden");
  } else {
    if (prevImgBtn) prevImgBtn.classList.add("hidden");
    if (nextImgBtn) nextImgBtn.classList.add("hidden");
  }

  // Populate thumbnails
  modalThumbnails.innerHTML = "";
  if (imgs.length > 1) {
    modalThumbnails.classList.remove("hidden");
    imgs.forEach((imgUrl, index) => {
      let thumbBtn = document.createElement("button");
      thumbBtn.type = "button";
      thumbBtn.className = `thumb-btn ${index === 0 ? "active" : ""}`;
      thumbBtn.innerHTML = `<img src="${esc(imgUrl)}" alt="${esc(p.name)} image ${index + 1}" onerror="this.src='assets/placeholder.svg'">`;
      thumbBtn.onclick = () => switchImage(index);
      modalThumbnails.appendChild(thumbBtn);
    });
  } else {
    modalThumbnails.classList.add("hidden");
  }

  modalBrand.textContent = p.brand;
  modalCategory.textContent = p.category;
  modalName.textContent = p.name;
  modalPrice.textContent = euro(p.price);
  modalRef.textContent = p.ref;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

async function copyRef() {
  if (!currentProduct) return;
  try {
    await navigator.clipboard.writeText(currentProduct.ref);
  } catch {
    let t = document.createElement("textarea");
    t.value = currentProduct.ref;
    document.body.appendChild(t);
    t.select();
    document.execCommand("copy");
    t.remove();
  }
  toast.textContent = "Reference copied!";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

if (prevImgBtn) prevImgBtn.onclick = () => switchImage(currentImageIndex - 1);
if (nextImgBtn) nextImgBtn.onclick = () => switchImage(currentImageIndex + 1);

searchInput.oninput = render;
brandFilter.onchange = render;
categoryFilter.onchange = render;
sortFilter.onchange = render;
copyRefButton.onclick = copyRef;
document.querySelectorAll("[data-close-modal]").forEach(x => (x.onclick = closeModal));

document.onkeydown = e => {
  if (modal.classList.contains("hidden")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") switchImage(currentImageIndex - 1);
  if (e.key === "ArrowRight") switchImage(currentImageIndex + 1);
};

populate();
render();
