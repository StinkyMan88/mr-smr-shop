// ADD PRODUCTS HERE.
// Copy an object, change the values, and upload the image to assets/products/.
// Each product can have:
// - images: ["assets/products/image1.jpg", "assets/products/image2.jpg", ...] (First image is primary)
// - OR image: "assets/products/image1.jpg" (for single image)

const PRODUCTS = [
  {
    id: "dior-b22-001",
    name: "Dior B22",
    brand: "Dior",
    category: "Sneakers",
    price: 59.90,
    ref: "DIORB22-001",
    images: [
      "assets/products/dior-b22.jpg",
      "assets/placeholder.svg"
    ],
    featured: true,
    date: "2026-09-01"
  },
  {
    id: "asics-gel-nyc-001",
    name: "Gel-NYC",
    brand: "ASICS",
    category: "Sneakers",
    price: 42.90,
    ref: "ASICSNYC-001",
    images: [
      "assets/products/asics-gel-nyc.jpg",
      "assets/placeholder.svg"
    ],
    featured: true,
    date: "2026-08-30"
  },
  {
    id: "nike-p6000-001",
    name: "P-6000",
    brand: "Nike",
    category: "Sneakers",
    price: 34.90,
    ref: "NIKEP6000-001",
    images: [
      "assets/products/nike-p6000.jpg",
      "assets/placeholder.svg"
    ],
    featured: false,
    date: "2026-08-28"
  },
  {
    id: "gucci-cap-001",
    name: "GG Cap",
    brand: "Gucci",
    category: "Accessories",
    price: 24.90,
    ref: "GUCCICAP-001",
    images: [
      "assets/products/gucci-cap.jpg",
      "assets/placeholder.svg"
    ],
    featured: false,
    date: "2026-08-25"
  }
];
