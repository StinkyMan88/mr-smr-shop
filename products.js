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
      "./dior-black.png",
      "./dior-black-reflective.png",
      "./dior-gray.png",
      "./dior-white.png"
    ],
    featured: true,
    date: "2026-09-01"
  },
  {
    id: "asics-gel-nyc-001",
    name: "Asics Gel-NYC (1:1 version)",
    brand: "Asics",
    category: "Sneakers",
    price: 45.00,
    ref: "smr-ASGN11",
    images: [
      "./gelnycblack.webp",
      "./gelnycblue.webp",
      "./gelnycdarkgray.webp",
      "./gelnycgray.webp",
      "./gelnycgrayblack.webp",
      "./gelnycpink.webp"
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
