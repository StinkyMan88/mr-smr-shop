const DISCORD_TICKET_URL = "https://discord.com/channels/YOUR_SERVER_ID/YOUR_TICKET_CHANNEL_ID";

let currentProduct = null;
let currentImageIndex = 0;
let currentQcIndex = 0;


/* =========================
   QC STYLES
========================= */

const qcStyles = document.createElement("style");

qcStyles.textContent = `
.qc-section {
  margin-top: 24px;
  padding-top: 22px;
  border-top: 1px solid rgba(127,127,127,.18);
}

.qc-section.hidden {
  display: none;
}

.qc-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.qc-header .eyebrow {
  display: block;
  margin-bottom: 4px;
}

.qc-header h3 {
  margin: 0;
  font-size: 18px;
}

.qc-count {
  font-size: 12px;
  opacity: .6;
  white-space: nowrap;
}

.qc-image-wrap {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 14px;
}

.qc-image-wrap img {
  display: block;
  width: 100%;
  max-height: 420px;
  object-fit: contain;
  border-radius: 14px;
}

.qc-image-wrap .gallery-arrow {
  z-index: 2;
}

#qcThumbnails {
  margin-top: 10px;
}

#qcThumbnails.hidden {
  display: none;
}

#qcThumbnails .thumb-btn {
  cursor: pointer;
}
`;

document.head.appendChild(qcStyles);



/* =========================
   PRICE
========================= */

function euro(v) {

  return new Intl.NumberFormat(
    "en-GB",
    {
      style: "currency",
      currency: "EUR"
    }
  ).format(v || 0);

}



/* =========================
   UNIQUE
========================= */

function unique(a) {

  return [
    ...new Set(a)
  ].sort(
    (x, y) => x.localeCompare(y)
  );

}



/* =========================
   PRODUCTS
========================= */

function getProductsList() {

  if (
    typeof window !== "undefined" &&
    window.PRODUCTS &&
    Array.isArray(window.PRODUCTS)
  ) {

    return window.PRODUCTS;

  }


  if (
    typeof PRODUCTS !== "undefined" &&
    Array.isArray(PRODUCTS)
  ) {

    return PRODUCTS;

  }


  return [];

}



/* =========================
   PRODUCT IMAGES
========================= */

function getProductImages(p) {

  if (!p)
    return [
      "./assets/placeholder.svg"
    ];


  if (
    Array.isArray(p.images) &&
    p.images.length > 0
  ) {

    return p.images;

  }


  if (p.image)
    return [
      p.image
    ];


  return [
    "./assets/placeholder.svg"
  ];

}



/* =========================
   QC IMAGES
========================= */

function getProductQc(p) {

  if (!p)
    return [];


  if (Array.isArray(p.qc))
    return p.qc.filter(Boolean);


  if (Array.isArray(p.QC))
    return p.QC.filter(Boolean);


  if (Array.isArray(p.qcImages))
    return p.qcImages.filter(Boolean);


  return [];

}



/* =========================
   FILTERS
========================= */

function populate() {

  const brandFilter =
    document.getElementById("brandFilter");

  const categoryFilter =
    document.getElementById("categoryFilter");

  const products =
    getProductsList();



  if (brandFilter) {

    brandFilter.innerHTML =
      '<option value="all">All brands</option>';


    unique(
      products
        .map(p => p.brand)
        .filter(Boolean)
    ).forEach(v => {

      let o =
        document.createElement("option");

      o.value = v;
      o.textContent = v;

      brandFilter.appendChild(o);

    });


    brandFilter.value = "all";

  }



  if (categoryFilter) {

    categoryFilter.innerHTML =
      '<option value="all">All categories</option>';


    unique(
      products
        .map(p => p.category)
        .filter(Boolean)
    ).forEach(v => {

      let o =
        document.createElement("option");

      o.value = v;
      o.textContent = v;

      categoryFilter.appendChild(o);

    });


    categoryFilter.value = "all";

  }

}



/* =========================
   FILTERED PRODUCTS
========================= */

function filtered() {

  const products =
    getProductsList();


  const searchInput =
    document.getElementById("searchInput");

  const brandFilter =
    document.getElementById("brandFilter");

  const categoryFilter =
    document.getElementById("categoryFilter");

  const sortFilter =
    document.getElementById("sortFilter");


  let q =
    searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";


  let b =
    brandFilter
      ? brandFilter.value
      : "all";


  let c =
    categoryFilter
      ? categoryFilter.value
      : "all";


  let s =
    sortFilter
      ? sortFilter.value
      : "featured";



  let r =
    products.filter(p => {

      if (!p)
        return false;


      let x =
        `${p.name || ""} ${p.brand || ""} ${p.category || ""} ${p.ref || ""}`
          .toLowerCase();


      let matchesQuery =
        !q || x.includes(q);


      let matchesBrand =
        !b ||
        b === "all" ||
        p.brand === b;


      let matchesCategory =
        !c ||
        c === "all" ||
        p.category === c;


      return (
        matchesQuery &&
        matchesBrand &&
        matchesCategory
      );

    });



  if (s === "newest") {

    r.sort(
      (a, b) =>
        new Date(b.date || 0) -
        new Date(a.date || 0)
    );

  }


  if (s === "price-low") {

    r.sort(
      (a, b) =>
        (a.price || 0) -
        (b.price || 0)
    );

  }


  if (s === "price-high") {

    r.sort(
      (a, b) =>
        (b.price || 0) -
        (a.price || 0)
    );

  }


  if (s === "name") {

    r.sort(
      (a, b) =>
        (a.name || "").localeCompare(
          b.name || ""
        )
    );

  }


  if (s === "featured") {

    r.sort(
      (a, b) =>
        Number(b.featured || 0) -
        Number(a.featured || 0)
    );

  }


  return r;

}



/* =========================
   ESCAPE HTML
========================= */

function esc(v) {

  return String(v || "")
    .replace(
      /[&<>"']/g,
      c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      }[c])
    );

}



/* =========================
   RENDER PRODUCTS
========================= */

function render() {

  const grid =
    document.getElementById("productGrid");

  const productCount =
    document.getElementById("productCount");

  const emptyState =
    document.getElementById("emptyState");


  if (!grid)
    return;


  let r =
    filtered();


  grid.innerHTML = "";



  if (productCount) {

    productCount.textContent =
      `${r.length} product${r.length === 1 ? "" : "s"}`;

  }



  if (emptyState) {

    emptyState.classList.toggle(
      "hidden",
      r.length !== 0
    );

  }



  r.forEach(p => {

    let imgs =
      getProductImages(p);


    let mainImg =
      imgs[0];


    let card =
      document.createElement("article");


    card.className =
      "product-card";


    card.innerHTML = `

      <div class="product-image">

        <img
          src="${esc(mainImg)}"
          alt="${esc(p.name)}"
          loading="lazy"
          onerror="this.onerror=null;this.src='./assets/placeholder.svg'"
        >

      </div>


      <div class="product-info">

        <div class="product-meta">

          <span class="product-brand">
            ${esc(p.brand)}
          </span>

          <span class="product-category">
            ${esc(p.category)}
          </span>

        </div>


        <h3 class="product-name">
          ${esc(p.name)}
        </h3>


        <div class="product-bottom">

          <span class="product-price">
            ${euro(p.price)}
          </span>

          <span class="product-ref">
            ${esc(p.ref)}
          </span>

        </div>

      </div>
    `;


    card.onclick =
      () => openModal(p);


    grid.appendChild(card);

  });

}



/* =========================
   MAIN IMAGE
========================= */

function switchImage(index) {

  if (!currentProduct)
    return;


  let imgs =
    getProductImages(currentProduct);


  if (imgs.length <= 1)
    return;


  currentImageIndex =
    (index + imgs.length) %
    imgs.length;


  let newImgSrc =
    imgs[currentImageIndex];


  const modalImage =
    document.getElementById("modalImage");


  const modalThumbnails =
    document.getElementById(
      "modalThumbnails"
    );



  if (modalImage) {

    modalImage.src =
      newImgSrc;

  }



  if (modalThumbnails) {

    const thumbs =
      modalThumbnails.querySelectorAll(
        ".thumb-btn"
      );


    thumbs.forEach(
      (btn, i) => {

        btn.classList.toggle(
          "active",
          i === currentImageIndex
        );

      }
    );

  }

}



/* =========================
   QC IMAGE
========================= */

function switchQc(index) {

  if (!currentProduct)
    return;


  let qc =
    getProductQc(currentProduct);


  if (qc.length <= 1)
    return;


  currentQcIndex =
    (index + qc.length) %
    qc.length;


  const qcImage =
    document.getElementById(
      "qcImage"
    );


  const qcThumbnails =
    document.getElementById(
      "qcThumbnails"
    );



  if (qcImage) {

    qcImage.src =
      qc[currentQcIndex];

    qcImage.alt =
      `${currentProduct.name || "Product"} QC ${currentQcIndex + 1}`;

  }



  if (qcThumbnails) {

    const thumbs =
      qcThumbnails.querySelectorAll(
        ".thumb-btn"
      );


    thumbs.forEach(
      (btn, i) => {

        btn.classList.toggle(
          "active",
          i === currentQcIndex
        );

      }
    );

  }

}



/* =========================
   RENDER QC
========================= */

function renderQc(p) {

  const qc =
    getProductQc(p);


  const qcSection =
    document.getElementById(
      "qcSection"
    );


  const qcImage =
    document.getElementById(
      "qcImage"
    );


  const qcThumbnails =
    document.getElementById(
      "qcThumbnails"
    );


  const prevQcBtn =
    document.getElementById(
      "prevQcBtn"
    );


  const nextQcBtn =
    document.getElementById(
      "nextQcBtn"
    );


  const qcCount =
    document.getElementById(
      "qcCount"
    );



  if (!qcSection)
    return;


  currentQcIndex = 0;



  qcSection.classList.toggle(
    "hidden",
    qc.length === 0
  );



  if (qcCount) {

    qcCount.textContent =
      qc.length
        ? `${qc.length} photo${qc.length === 1 ? "" : "s"}`
        : "";

  }



  if (!qc.length) {

    if (qcImage)
      qcImage.src = "";


    if (qcThumbnails) {

      qcThumbnails.innerHTML = "";

      qcThumbnails.classList.add(
        "hidden"
      );

    }


    if (prevQcBtn)
      prevQcBtn.classList.add("hidden");


    if (nextQcBtn)
      nextQcBtn.classList.add("hidden");


    return;

  }



  if (qcImage) {

    qcImage.src =
      qc[0];

    qcImage.alt =
      `${p.name || "Product"} QC 1`;


    qcImage.onerror =
      function () {

        this.onerror = null;

        this.src =
          "./assets/placeholder.svg";

      };

  }



  if (qc.length > 1) {

    if (prevQcBtn)
      prevQcBtn.classList.remove(
        "hidden"
      );


    if (nextQcBtn)
      nextQcBtn.classList.remove(
        "hidden"
      );



    if (qcThumbnails) {

      qcThumbnails.innerHTML = "";

      qcThumbnails.classList.remove(
        "hidden"
      );


      qc.forEach(
        (imgUrl, index) => {

          let thumbBtn =
            document.createElement(
              "button"
            );


          thumbBtn.type =
            "button";


          thumbBtn.className =
            `thumb-btn ${index === 0 ? "active" : ""}`;


          thumbBtn.innerHTML = `

            <img
              src="${esc(imgUrl)}"
              alt="${esc(p.name)} QC ${index + 1}"
              onerror="this.onerror=null;this.src='./assets/placeholder.svg'"
            >

          `;


          thumbBtn.onclick =
            (e) => {

              e.stopPropagation();

              switchQc(index);

            };


          qcThumbnails.appendChild(
            thumbBtn
          );

        }
      );

    }

  } else {

    if (prevQcBtn)
      prevQcBtn.classList.add(
        "hidden"
      );


    if (nextQcBtn)
      nextQcBtn.classList.add(
        "hidden"
      );


    if (qcThumbnails) {

      qcThumbnails.innerHTML = "";

      qcThumbnails.classList.add(
        "hidden"
      );

    }

  }

}



/* =========================
   OPEN MODAL
========================= */

function openModal(p) {

  const modal =
    document.getElementById(
      "productModal"
    );


  const modalImage =
    document.getElementById(
      "modalImage"
    );


  const prevImgBtn =
    document.getElementById(
      "prevImgBtn"
    );


  const nextImgBtn =
    document.getElementById(
      "nextImgBtn"
    );


  const modalThumbnails =
    document.getElementById(
      "modalThumbnails"
    );


  const modalBrand =
    document.getElementById(
      "modalBrand"
    );


  const modalCategory =
    document.getElementById(
      "modalCategory"
    );


  const modalName =
    document.getElementById(
      "modalName"
    );


  const modalPrice =
    document.getElementById(
      "modalPrice"
    );


  const modalRef =
    document.getElementById(
      "modalRef"
    );



  if (!modal)
    return;


  currentProduct =
    p;


  currentImageIndex =
    0;


  let imgs =
    getProductImages(p);



  /* MAIN IMAGE */

  if (modalImage) {

    modalImage.src =
      imgs[0];


    modalImage.onerror =
      function () {

        this.onerror = null;

        this.src =
          "./assets/placeholder.svg";

      };


    modalImage.alt =
      p.name || "";

  }



  /* MAIN IMAGE ARROWS */

  if (imgs.length > 1) {

    if (prevImgBtn)
      prevImgBtn.classList.remove(
        "hidden"
      );


    if (nextImgBtn)
      nextImgBtn.classList.remove(
        "hidden"
      );

  } else {

    if (prevImgBtn)
      prevImgBtn.classList.add(
        "hidden"
      );


    if (nextImgBtn)
      nextImgBtn.classList.add(
        "hidden"
      );

  }



  /* MAIN IMAGE THUMBNAILS */

  if (modalThumbnails) {

    modalThumbnails.innerHTML = "";


    if (imgs.length > 1) {

      modalThumbnails.classList.remove(
        "hidden"
      );


      imgs.forEach(
        (imgUrl, index) => {

          let thumbBtn =
            document.createElement(
              "button"
            );


          thumbBtn.type =
            "button";


          thumbBtn.className =
            `thumb-btn ${index === 0 ? "active" : ""}`;


          thumbBtn.innerHTML = `

            <img
              src="${esc(imgUrl)}"
              alt="${esc(p.name)} image ${index + 1}"
              onerror="this.onerror=null;this.src='./assets/placeholder.svg'"
            >

          `;


          thumbBtn.onclick =
            (e) => {

              e.stopPropagation();

              switchImage(index);

            };


          modalThumbnails.appendChild(
            thumbBtn
          );

        }
      );

    } else {

      modalThumbnails.classList.add(
        "hidden"
      );

    }

  }



  /* QC */

  renderQc(p);



  /* PRODUCT INFO */

  if (modalBrand)
    modalBrand.textContent =
      p.brand || "";


  if (modalCategory)
    modalCategory.textContent =
      p.category || "";


  if (modalName)
    modalName.textContent =
      p.name || "";


  if (modalPrice)
    modalPrice.textContent =
      euro(p.price);


  if (modalRef)
    modalRef.textContent =
      p.ref || "";



  modal.classList.remove(
    "hidden"
  );


  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.style.overflow =
    "hidden";

}



/* =========================
   CLOSE MODAL
========================= */

function closeModal() {

  const modal =
    document.getElementById(
      "productModal"
    );


  if (!modal)
    return;


  modal.classList.add(
    "hidden"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.style.overflow =
    "";

}



/* =========================
   COPY REF
========================= */

async function copyRef() {

  if (!currentProduct)
    return;


  const toast =
    document.getElementById(
      "toast"
    );


  try {

    await navigator.clipboard.writeText(
      currentProduct.ref
    );

  } catch {

    let t =
      document.createElement(
        "textarea"
      );


    t.value =
      currentProduct.ref;


    document.body.appendChild(t);

    t.select();

    document.execCommand(
      "copy"
    );

    t.remove();

  }



  if (toast) {

    toast.textContent =
      "Reference copied!";


    toast.classList.add(
      "show"
    );


    setTimeout(
      () =>
        toast.classList.remove(
          "show"
        ),
      1800
    );

  }

}



/* =========================
   INIT
========================= */

function initApp() {

  const searchInput =
    document.getElementById(
      "searchInput"
    );


  const brandFilter =
    document.getElementById(
      "brandFilter"
    );


  const categoryFilter =
    document.getElementById(
      "categoryFilter"
    );


  const sortFilter =
    document.getElementById(
      "sortFilter"
    );


  const copyRefButton =
    document.getElementById(
      "copyRefButton"
    );


  const prevImgBtn =
    document.getElementById(
      "prevImgBtn"
    );


  const nextImgBtn =
    document.getElementById(
      "nextImgBtn"
    );


  const prevQcBtn =
    document.getElementById(
      "prevQcBtn"
    );


  const nextQcBtn =
    document.getElementById(
      "nextQcBtn"
    );


  const yearEl =
    document.getElementById(
      "year"
    );



  if (yearEl)
    yearEl.textContent =
      new Date().getFullYear();



  [
    "discordTop",
    "discordBottom",
    "modalDiscordButton"
  ].forEach(id => {

    const el =
      document.getElementById(id);


    if (el)
      el.href =
        DISCORD_TICKET_URL;

  });



  /* MAIN IMAGE BUTTONS */

  if (prevImgBtn) {

    prevImgBtn.onclick =
      (e) => {

        e.stopPropagation();

        switchImage(
          currentImageIndex - 1
        );

      };

  }



  if (nextImgBtn) {

    nextImgBtn.onclick =
      (e) => {

        e.stopPropagation();

        switchImage(
          currentImageIndex + 1
        );

      };

  }



  /* QC BUTTONS */

  if (prevQcBtn) {

    prevQcBtn.onclick =
      (e) => {

        e.stopPropagation();

        switchQc(
          currentQcIndex - 1
        );

      };

  }



  if (nextQcBtn) {

    nextQcBtn.onclick =
      (e) => {

        e.stopPropagation();

        switchQc(
          currentQcIndex + 1
        );

      };

  }



  if (searchInput)
    searchInput.oninput =
      render;


  if (brandFilter)
    brandFilter.onchange =
      render;


  if (categoryFilter)
    categoryFilter.onchange =
      render;


  if (sortFilter)
    sortFilter.onchange =
      render;


  if (copyRefButton)
    copyRefButton.onclick =
      copyRef;



  document
    .querySelectorAll(
      "[data-close-modal]"
    )
    .forEach(
      x =>
        x.onclick =
          closeModal
    );



  /* KEYBOARD */

  document.onkeydown =
    e => {

      const modal =
        document.getElementById(
          "productModal"
        );


      if (
        !modal ||
        modal.classList.contains(
          "hidden"
        )
      )
        return;


      if (e.key === "Escape")
        closeModal();


      if (e.key === "ArrowLeft")
        switchImage(
          currentImageIndex - 1
        );


      if (e.key === "ArrowRight")
        switchImage(
          currentImageIndex + 1
        );

    };



  populate();

  render();

}



/* =========================
   START
========================= */

if (
  document.readyState ===
  "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initApp
  );

} else {

  initApp();

}
