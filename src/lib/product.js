import { PRODUCTS } from "../data/products.js";

const CATEGORIES_DATA = [
  { name: "Gold Necklaces", slug: "necklaces", description: "Royal short neckwear & traditional temple chokers in 22KT gold.", image: "/oshinika_neckwear.png" },
  { name: "Pure Silver Ornaments", slug: "silver", description: "Fine 925 sterling silver payal, gifts & pooja articles.", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop" },
  { name: "Silver Chains", slug: "chains", description: "Durable & shining 925 silver chains for men & women.", image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=600&auto=format&fit=crop" },
  { name: "Antique Articles", slug: "antique", description: "One stop shop for authentic antique masterpieces & heirlooms.", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=600&auto=format&fit=crop" },
  { name: "Bangles & Kadas", slug: "bangles", description: "Handcrafted gold bangles, kadas & bracelets.", image: "/handbraclete.jpeg" },
  { name: "Rings & Solitaires", slug: "rings", description: "Bridal, diamond & everyday gold rings.", image: "/ring.jpeg" },
  { name: "Earrings & Jhumkas", slug: "earrings", description: "Traditional royal jhumkas & solitaire studs.", image: "/earings.jpeg" },
  { name: "Pendants", slug: "pendants", description: "Intricate gold & diamond pendants and mangalsutras.", image: "/rajee_pendant.png" },
];

const COLLECTIONS_DATA = [
  { title: "Bridal Heritage", slug: "bridal-heritage", subtitle: "Royal Indian Wedding Collections", description: "Heavy 22KT gold neckwear, chokers & regal jhumkas.", bannerImage: "/oshinika_neckwear.png", isFeatured: true },
  { title: "Pure Silver Collection", slug: "pure-silver", subtitle: "925 Hallmarked Silver & Chains", description: "Chhatrapati Sambhajinagar's finest silver payal, chains & pooja articles.", bannerImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop", isFeatured: true },
  { title: "Antique Heirlooms", slug: "antique-heirlooms", subtitle: "Vintage & Temple Artistry", description: "Exquisite antique pooja thalis, temple haar and traditional artifacts.", bannerImage: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=600&auto=format&fit=crop", isFeatured: true },
  { title: "Daily Elegance", slug: "daily-elegance", subtitle: "Lightweight Contemporary Jewels", description: "14KT & 18KT modern chains, studs & daily essentials.", bannerImage: "/solitaire_studs.png", isFeatured: true },
  { title: "Festive Glow", slug: "festive-glow", subtitle: "Celebration Essentials", description: "Textured gold kadas & heritage bangles.", bannerImage: "/vajra_kada.png", isFeatured: true },
];

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function formatProduct(doc) {
  if (!doc) return null;
  return {
    ...doc,
    _id: String(doc.id || doc._id),
    slug: doc.slug || slugify(doc.name),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function getProducts(options = {}) {
  const {
    category = "All",
    karat = "All",
    occasion = "All",
    gender = "All",
    maxPrice = 600000,
    search = "",
    sort = "featured",
    page = 1,
    limit = 50,
  } = options;

  let list = PRODUCTS.map(formatProduct).filter((p) => {
    if (category && category !== "All" && p.category.toLowerCase() !== category.toLowerCase()) return false;
    if (karat && karat !== "All" && p.karat !== karat) return false;
    if (occasion && occasion !== "All" && p.occasion !== occasion) return false;
    if (gender && gender !== "All" && p.gender !== gender) return false;
    if (p.price > maxPrice) return false;
    if (search && search.trim() !== "") {
      const q = search.trim().toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.karat.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
  else if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
  else if (sort === "newest") list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  else list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));

  return list.slice((page - 1) * limit, page * limit);
}

export async function getProductById(id) {
  const found = PRODUCTS.find((p) => p.id === Number(id) || String(p.id) === String(id));
  return found ? formatProduct(found) : null;
}

export async function getProductBySlug(slug) {
  const found = PRODUCTS.find((p) => slugify(p.name) === slug || String(p.id) === String(slug));
  return found ? formatProduct(found) : null;
}

export async function getCategories() {
  return CATEGORIES_DATA;
}

export async function getCollections() {
  return COLLECTIONS_DATA;
}