# MR SMR SELLER — GitHub Pages

## Upload
Create a GitHub repository, upload all files, then go to:
**Settings → Pages → Deploy from a branch → main → / (root) → Save**

## Change Discord
Open `script.js` and replace:
`https://discord.com/channels/YOUR_SERVER_ID/YOUR_TICKET_CHANNEL_ID`
with your Discord ticket-panel/channel URL.

The website does **not** create a Discord ticket by itself. GitHub Pages is static. The button opens your Discord ticket location.

## Add a product
Open `products.js` and copy an existing object.

Example:
{
  id:"nike-af1-001",
  name:"Air Force 1",
  brand:"Nike",
  category:"Sneakers",
  price:39.90,
  ref:"AF1-001",
  image:"assets/products/nike-af1.jpg",
  featured:true,
  date:"2026-09-01"
}

Then upload `nike-af1.jpg` into:
`assets/products/`

The important field is `ref`: make it unique for every product.

Customers click a product → copy the REF → open Discord → create/open a ticket → send the REF + size + color + quantity.
