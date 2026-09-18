import { connectDB } from "./mongodb.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Collection from "../models/Collection.js";
import { PRODUCTS } from "../data/products.js";

const FALLBACK_CATEGORIES = [
  { name: "Earrings", slug: "earrings", description: "Bespoke stud, drop & jhumka earrings in 18KT & 22KT gold.", image: "/earings.jpeg" },
  { name: "Rings", slug: "rings", description: "Solitaire, bridal & everyday gold rings.", image: "/ring.jpeg" },
  { name: "Bangles", slug: "bangles", description: "Handcrafted gold bangles & tennis bracelets.", image: "/handbraclete.jpeg" },
  { name: "Chains", slug: "chains", description: "Durable & elegant 14KT & 22KT gold chains.", image: "/chain2.jpeg" },
  { name: "Pendants", slug: "pendants", description: "Intricate gold & diamond pendants.", image: "/rajee_pendant.png" },
  { name: "Necklaces", slug: "necklaces", description: "Royal short neckwear & traditional temple chokers.", image: "/oshinika_neckwear.png" },
];

const FALLBACK_COLLECTIONS = [
  { title: "Bridal Heritage", slug: "bridal-heritage", subtitle: "Royal Indian Wedding Collections", description: "Heavy 22KT gold neckwear, chokers & regal jhumkas.", bannerImage: "/oshinika_neckwear.png", isFeatured: true },
  { title: "Royal Solitaire", slug: "royal-solitaire", subtitle: "IGI Certified Diamond Solitaires", description: "Platinum & white gold engagement rings & studs.", bannerImage: "/ethereal_ring.png", isFeatured: true },
  { title: "Daily Elegance", slug: "daily-elegance", subtitle: "Lightweight Contemporary Jewels", description: "14KT & 18KT modern chains, studs & mangalsutras.", bannerImage: "/solitaire_studs.png", isFeatured: true },
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
    _id: doc._id ? doc._id.toString() : doc.id.toString(),
    slug: doc.slug || slugify(doc.name),
    createdAt: doc.createdAt ? doc.createdAt.toISOString() : new Date().toISOString(),
    updatedAt: doc.updatedAt ? doc.updatedAt.toISOString() : new Date().toISOString(),
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

  try {
    const conn = await connectDB();
    if (conn) {
      const query = {};

      if (category && category !== "All") {
        query.category = { $regex: new RegExp(`^${category}$`, "i") };
      }
      if (karat && karat !== "All") {
        query.karat = karat;
      }
      if (occasion && occasion !== "All") {
        query.occasion = occasion;
      }
      if (gender && gender !== "All") {
        query.gender = gender;
      }
      if (maxPrice && Number(maxPrice) > 0) {
        query.price = { $lte: Number(maxPrice) };
      }
      if (search && search.trim() !== "") {
        const regex = new RegExp(search.trim(), "i");
        query.$or = [
          { name: regex },
          { description: regex },
          { category: regex },
          { karat: regex },
        ];
      }

      let sortOptions = { isFeatured: -1, createdAt: -1 };
      if (sort === "price_asc") sortOptions = { price: 1 };
      if (sort === "price_desc") sortOptions = { price: -1 };
      if (sort === "newest") sortOptions = { isNew: -1, createdAt: -1 };

      const products = await Product.find(query)
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      if (products && products.length > 0) {
        return products.map(formatProduct);
      }
    }
  } catch (err) {
    console.warn("Mongoose getProducts fallback activated:", err.message);
  }

  // Resilient fallback logic if DB unreachable or empty
  let list = PRODUCTS.map((p) => ({
    ...p,
    slug: slugify(p.name),
    _id: String(p.id),
  })).filter((p) => {
    if (category !== "All" && p.category.toLowerCase() !== category.toLowerCase()) return false;
    if (karat !== "All" && p.karat !== karat) return false;
    if (occasion !== "All" && p.occasion !== occasion) return false;
    if (gender !== "All" && p.gender !== gender) return false;
    if (p.price > maxPrice) return false;
    if (search) {
      const q = search.toLowerCase();
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
  try {
    const conn = await connectDB();
    if (conn) {
      let product = await Product.findOne({ id: Number(id) }).lean();
      if (!product && mongoose.Types.ObjectId.isValid(id)) {
        product = await Product.findById(id).lean();
      }
      if (product) return formatProduct(product);
    }
  } catch (err) {
    console.warn("Mongoose getProductById fallback activated:", err.message);
  }

  const found = PRODUCTS.find((p) => p.id === Number(id) || String(p.id) === String(id));
  return found ? formatProduct(found) : null;
}

export async function getProductBySlug(slug) {
  try {
    const conn = await connectDB();
    if (conn) {
      const product = await Product.findOne({ slug }).lean();
      if (product) return formatProduct(product);
    }
  } catch (err) {
    console.warn("Mongoose getProductBySlug fallback activated:", err.message);
  }

  const found = PRODUCTS.find((p) => slugify(p.name) === slug);
  return found ? formatProduct(found) : null;
}

export async function getCategories() {
  try {
    const conn = await connectDB();
    if (conn) {
      const cats = await Category.find({}).lean();
      if (cats && cats.length > 0) {
        return cats.map((c) => ({ ...c, _id: c._id.toString() }));
      }
    }
  } catch (err) {
    console.warn("Mongoose getCategories fallback activated:", err.message);
  }
  return FALLBACK_CATEGORIES;
}

export async function getCollections() {
  try {
    const conn = await connectDB();
    if (conn) {
      const cols = await Collection.find({}).lean();
      if (cols && cols.length > 0) {
        return cols.map((c) => ({ ...c, _id: c._id.toString() }));
      }
    }
  } catch (err) {
    console.warn("Mongoose getCollections fallback activated:", err.message);
  }
  return FALLBACK_COLLECTIONS;
}