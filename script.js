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

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

["discordTop", "discordBottom", "modalDiscordButton"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.href = DISCORD_TICKET_URL;
});

function euro(v) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" }).format(v || 0);
}

function unique(a) {
  return [...new Set(a)].sort((x, y) => x.localeCompare(y));
}

function getProductsList() {
  if (typeof window !== "undefined" && window.PRODUCTS && Array.isArray(window.PRODUCTS)) {
    return window.PRODUCTS;
  }
  if (typeof PRODUCTS !== "undefined" && Array.isArray(PRODUCTS)) {
    return PRODUCTS;
  }
  return [];
}

function getProductImages(p) {
  if (!p) return ["assets/placeholder.svg"];
  if (Array.isArray(p.images) && p.images.length > 0) return p.images;
  if (p.image) return [p.image];
  return ["assets/placeholder.svg"];
}

function populate() {
  const products = getProductsList();
  if (brandFilter) {
    brandFilter.innerHTML = '<option value="all">All brands</option>';
    unique(products.map(p => p.brand).filter(Boolean)).forEach(v => {
      let o = document.createElement("option");
      o.value = v;
      o.textContent = v;
      brandFilter.appendChild(o);
    });
    brandFilter.value = "all";
  }

  if (categoryFilter) {
    categoryFilter.innerHTML = '<option value="all">All categories</option>';
    unique(products.map(p => p.category).filter(Boolean)).forEach(v => {
      let o = document.createElement("option");
      o.value = v;
      o.textContent = v;
      categoryFilter.appendChild(o);
    });
    categoryFilter.value = "all";
  }
}

function filtered() {
  const products = getProductsList();
  let q = searchInput ? searchInput.value.trim().toLowerCase() : "",
    b = brandFilter ? brandFilter.value : "all",
    c = categoryFilter ? categoryFilter.value : "all",
    s = sortFilter ? sortFilter.value : "featured";

  let r = products.filter(p => {
    if (!p) return false;
    let x = `${p.name || ''} ${p.brand || ''} ${p.category || ''} ${p.ref || ''}`.toLowerCase();
    let matchesQuery = !q || x.includes(q);
    let matchesBrand = !b || b === "all" || p.brand === b;
    let matchesCategory = !c || c === "all" || p.category === c;
    return matchesQuery && matchesBrand && matchesCategory;
  });

  if (s === "newest") r.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  if (s === "price-low") r.sort((a, b) => (a.price || 0) - (b.price || 0));
  if (s === "price-high") r.sort((a, b) => (b.price || 0) - (a.price || 0));
  if (s === "name") r.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
  if (s === "featured") r.sort((a, b) => Number(b.featured || 0) - Number(a.featured || 0));
  return r;
}

function esc(v) {
  return String(v || "").replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[c]));
}

function render() {
  if (!grid) return;
  let r = filtered();
  grid.innerHTML = "";
  if (productCount) {
    productCount.textContent = `${r.length} product${r.length === 1 ? "" : "s"}`;
  }
  if (emptyState) {
    emptyState.classList.toggle("hidden", r.length !== 0);
  }
  r.forEach(p => {
    let imgs = getProductImages(p);
    let mainImg = imgs[0];
    let card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-image">
        <img src="${esc(mainImg)}" alt="${esc(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='assets/placeholder.svg'">
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
  if (modalImage) {
    modalImage.src = newImgSrc;
  }

  // Update active thumbnail
  if (modalThumbnails) {
    const thumbs = modalThumbnails.querySelectorAll(".thumb-btn");
    thumbs.forEach((btn, i) => {
      btn.classList.toggle("active", i === currentImageIndex);
    });
  }
}

function openModal(p) {
  if (!modal) return;
  currentProduct = p;
  currentImageIndex = 0;
  let imgs = getProductImages(p);

  // Set initial main image
  if (modalImage) {
    modalImage.src = imgs[0];
    modalImage.onerror = function() {
      this.onerror = null;
      this.src = "assets/placeholder.svg";
    };
    modalImage.alt = p.name || "";
  }

  // Setup navigation arrows
  if (imgs.length > 1) {
    if (prevImgBtn) prevImgBtn.classList.remove("hidden");
    if (nextImgBtn) nextImgBtn.classList.remove("hidden");
  } else {
    if (prevImgBtn) prevImgBtn.classList.add("hidden");
    if (nextImgBtn) nextImgBtn.classList.add("hidden");
  }

  // Populate thumbnails
  if (modalThumbnails) {
    modalThumbnails.innerHTML = "";
    if (imgs.length > 1) {
      modalThumbnails.classList.remove("hidden");
      imgs.forEach((imgUrl, index) => {
        let thumbBtn = document.createElement("button");
        thumbBtn.type = "button";
        thumbBtn.className = `thumb-btn ${index === 0 ? "active" : ""}`;
        thumbBtn.innerHTML = `<img src="${esc(imgUrl)}" alt="${esc(p.name)} image ${index + 1}" onerror="this.onerror=null;this.src='assets/placeholder.svg'">`;
        thumbBtn.onclick = () => switchImage(index);
        modalThumbnails.appendChild(thumbBtn);
      });
    } else {
      modalThumbnails.classList.add("hidden");
    }
  }

  if (modalBrand) modalBrand.textContent = p.brand || "";
  if (modalCategory) modalCategory.textContent = p.category || "";
  if (modalName) modalName.textContent = p.name || "";
  if (modalPrice) modalPrice.textContent = euro(p.price);
  if (modalRef) modalRef.textContent = p.ref || "";

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modal) return;
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
  if (toast) {
    toast.textContent = "Reference copied!";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1800);
  }
}

if (prevImgBtn) prevImgBtn.onclick = () => switchImage(currentImageIndex - 1);
if (nextImgBtn) nextImgBtn.onclick = () => switchImage(currentImageIndex + 1);

if (searchInput) searchInput.oninput = render;
if (brandFilter) brandFilter.onchange = render;
if (categoryFilter) categoryFilter.onchange = render;
if (sortFilter) sortFilter.onchange = render;
if (copyRefButton) copyRefButton.onclick = copyRef;

document.querySelectorAll("[data-close-modal]").forEach(x => (x.onclick = closeModal));

document.onkeydown = e => {
  if (!modal || modal.classList.contains("hidden")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowLeft") switchImage(currentImageIndex - 1);
  if (e.key === "ArrowRight") switchImage(currentImageIndex + 1);
};

function initApp() {
  populate();
  render();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
