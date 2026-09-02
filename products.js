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
    name: "Nike P-6000",
    brand: "Nike",
    category: "Sneakers",
    price: 33.00,
    ref: "smr-NKP6K",
    images: [
      "./p6001.webp",
      "./p6002.webp",
      "./p6003.webp",
      "./p6004.webp",
      "./p6005.webp",
      "./p6006.webp",
      "./p6007.webp",
      "./p6008.webp",
      "./p6009.webp",
      "./p6010.webp"
    ],
    featured: false,
    date: "2026-08-28"
  },
  {
    id: "bape-zipup-001",
    name: "Bape Zip-Up",
    brand: "Bape",
    category: "Tops",
    price: 27.00,
    ref: "smr-BBAZU",
    images: [
      "./bapezip1.webp",
      "./bapezip2.webp",
      "./bapezip3.webp",
      "./bapezip4.webp",
      "./bapezip5.webp",
      "./bapezip6.webp",
      "./bapezip7.webp"
    ],
    featured: false,
    date: "2026-08-25"
  },
  {
    id: "dior-b30-001",
    name: "Dior B30",
    brand: "Dior",
    category: "Sneakers",
    price: 27,
    ref: "smr-b30",
    images: [
      "./drb301.webp",
      "./drb302.webp",
      "./drb303.webp",
      "./drb304.webp"
    ],
    featured: true,
    date: "2026-09-02"
  },
  {
    id: "lv-skates-001",
    name: "LV Skates (Normal)",
    brand: "Louis Vuitton",
    category: "Sneakers",
    price: 37,
    ref: "smr-lvs",
    images: [
      "./lvs1.webp",
      "./lvs2.webp",
      "./lvs3.webp",
      "./lvs4.webp"
    ],
    featured: true,
    date: "2026-09-02"
  },
  {
    id: "lv-skates-002",
    name: "LV Skates (Special)",
    brand: "Louis Vuitton",
    category: "Sneakers",
    price: 40,
    ref: "smr-lvsc",
    images: [
      "./lvsc1.webp",
      "./lvsc2.webp",
      "./lvsc3.webp"
    ],
    featured: true,
    date: "2026-09-02"
  },
  {
    id: "gg-rhytons-001",
    name: "Gucci Rhytons",
    brand: "Gucci",
    category: "Sneakers",
    price: 25,
    ref: "smr-ggr",
    images: [
      "./ggr1.webp",
      "./ggr2.webp",
      "./ggr3.webp"
    ],
    featured: true,
    date: "2026-09-02"
  },
  {
    id: "on-cloudmonster3-001",
    name: "On Cloudmonster 3",
    brand: "On",
    category: "Sneakers",
    price: 33,
    ref: "smr-ocm3",
    images: [
      "./oocm31.webp",
      "./oocm32.webp",
      "./oocm33.webp",
      "./oocm34.webp",
      "./oocm35.webp",
      "./oocm36.webp",
      "./oocm37.webp",
      "./oocm38.webp",
      "./oocm39.webp"
    ],
    featured: true,
    date: "2026-09-02"
  },
  {
    id: "adidas-yeezy-slides-001",
    name: "Yeezy Slides",
    brand: "Adidas",
    category: "Sneakers",
    price: 9,
    ref: "smr-mbays",
    images: [
      "./mbays1.webp",
      "./mbays2.webp",
      "./mbays3.webp",
      "./mbays4.webp",
      "./mbays5.webp",
      "./mbays6.webp",
      "./mbays7.webp",
      "./mbays8.webp",
      "./mbays9.webp"
    ],
    featured: true,
    date: "2026-09-02"
  },
  {
    id: "bapesta-low-001",
    name: "Bape Sta Low",
    brand: "Bape",
    category: "Sneakers",
    price: 33,
    ref: "smr-bbasl",
    images: [
      "./bbasl1.webp",
      "./bbasl2.webp",
      "./bbasl3.webp",
      "./bbasl4.webp",
      "./bbasl5.webp",
      "./bbasl6.webp",
      "./bbasl7.webp",
      "./bbasl8.webp",
      "./bbasl9.webp"
    ],
    featured: true,
    date: "2026-09-02"
  },
  {
    id: "balenciaba-track-led-001",
    name: "Balenciaga Track LED (1:1 version)",
    brand: "Balenciaga",
    category: "Sneakers",
    price: 59,
    ref: "smr-bbtld1",
    images: [
      "./bbtld11.webp",
      "./bbtld12.webp",
      "./bbtld13.webp",
      "./bbtld14.webp",
      "./bbtld15.webp",
      "./bbtld16.webp"
    ],
    featured: true,
    date: "2026-09-02"
  },
  {
    id: "numeris-atelier-001",
    name: "Numeris Atelier",
    brand: "Numeris",
    category: "Sneakers",
    price: 29,
    ref: "smr-nsarb",
    images: [
      "./nsarb1.webp",
      "./nsarb2.webp",
      "./nsarb3.webp",
      "./nsarb4.webp",
      "./nsarb5.webp",
      "./nsarb6.webp",
      "./nsarb7.webp",
      "./nsarb8.webp",
      "./nsarb9.webp"
    ],
    featured: true,
    date: "2026-09-02"
  }
];

if (typeof window !== "undefined") {
  window.PRODUCTS = PRODUCTS;
}
