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
    price: 29.00,
    ref: "smr-B22",
    images: [
      "main/products/dior-black.jpg",
      "products/dior-white.png",
      "products/dior-gray.png",
      "products/dior-black-reflective.png"
    ],
    featured: true,
    date: "2026-09-01"
  },
  {
    id: "asics-gel-nyc-001",
    name: "Asics Gel-NYC (1:1)",
    brand: "ASICS",
    category: "Sneakers",
    price: 45.00,
    ref: "smr-ASGN11",
    images: [
      "products/gelnycgray.webp",
      "products/gelnycblue.webp",
      "products/gelnycpink.webp",
      "products/gelnycblack.webp",
      "products/gelnycdarkgray.webp",
      "products/gelnycgrayblack.webp"
    ],
    featured: true,
    date: "2026-08-30"
  },
  {
    id: "nike-p6000-001",
    name: "Nike P-6000",
    brand: "Nike",
    category: "Sneakers",
    price: 33.00,
    ref: "smr-NKP6K",
    images: [
      "products/nike-p6000.jpg",
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
