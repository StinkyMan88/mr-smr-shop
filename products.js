// ADD PRODUCTS HERE.
// Each product can have:
// - images: ["./assets/products/image1.png", "./assets/products/image2.png", ...] (First image is primary)
// - OR image: "./assets/products/image1.png" (for single image)

var PRODUCTS = [
  {
    id: "dior-b22-001",
    name: "Dior B22",
    brand: "Dior",
    category: "Sneakers",
    price: 29,
    ref: "smr-b22",
    images: [
      "./assets/products/dior-black.png",
      "./assets/products/dior-black-reflective.png",
      "./assets/products/dior-gray.png",
      "./assets/products/dior-white.png"
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
      "./assets/products/gelnycblack.webp",
      "./assets/products/gelnycblue.webp",
      "./assets/products/gelnycdarkgray.webp",
      "./assets/products/gelnycgray.webp",
      "./assets/products/gelnycgrayblack.webp",
      "./assets/products/gelnycpink.webp"
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
      "./assets/products/gelnycgray.webp"
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
      "./assets/products/gelnycblack.webp"
    ],
    featured: false,
    date: "2026-08-25"
  }
];

if (typeof window !== "undefined") {
  window.PRODUCTS = PRODUCTS;
}
