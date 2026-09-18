import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Product from "../src/models/Product.js";
import Category from "../src/models/Category.js";
import Collection from "../src/models/Collection.js";
import User from "../src/models/User.js";
import { PRODUCTS } from "../src/data/products.js";

const CATEGORIES_DATA = [
  { name: "Earrings", slug: "earrings", description: "Bespoke stud, drop & jhumka earrings in 18KT & 22KT gold.", image: "/earings.jpeg" },
  { name: "Rings", slug: "rings", description: "Solitaire, bridal & everyday gold rings.", image: "/ring.jpeg" },
  { name: "Bangles", slug: "bangles", description: "Handcrafted gold bangles & tennis bracelets.", image: "/handbraclete.jpeg" },
  { name: "Chains", slug: "chains", description: "Durable & elegant 14KT & 22KT gold chains.", image: "/chain2.jpeg" },
  { name: "Pendants", slug: "pendants", description: "Intricate gold & diamond pendants.", image: "/rajee_pendant.png" },
  { name: "Necklaces", slug: "necklaces", description: "Royal short neckwear & traditional temple chokers.", image: "/oshinika_neckwear.png" },
];

const COLLECTIONS_DATA = [
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

async function seedDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not set in process.env");
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("✅ MongoDB connected successfully!");

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Collection.deleteMany({});
    await User.deleteMany({});
    console.log("🧹 Cleared existing database records.");

    // Seed Categories
    const seededCategories = await Category.insertMany(CATEGORIES_DATA);
    console.log(`✅ Seeded ${seededCategories.length} categories.`);

    // Seed Collections
    const seededCollections = await Collection.insertMany(COLLECTIONS_DATA);
    console.log(`✅ Seeded ${seededCollections.length} collections.`);

    // Seed Users with bcrypt hashed passwords
    const adminPasswordHash = await bcrypt.hash("adminpassword123", 10);
    const customerPasswordHash = await bcrypt.hash("customerpassword123", 10);

    const seededUsers = await User.insertMany([
      {
        name: "Zivara Admin",
        email: "admin@zivara.com",
        password: adminPasswordHash,
        role: "ADMIN",
        phone: "+91 9876543210",
      },
      {
        name: "Demo Customer",
        email: "customer@zivara.com",
        password: customerPasswordHash,
        role: "CUSTOMER",
        phone: "+91 9876543211",
      },
    ]);
    console.log(`✅ Seeded ${seededUsers.length} initial user accounts.`);

    // Prepare Products with slugs, collectionSlug, stock, images array
    const preparedProducts = PRODUCTS.map((p) => {
      const slug = slugify(p.name);
      let collectionSlug = "daily-elegance";
      if (p.occasion === "Bridal Wear") collectionSlug = "bridal-heritage";
      else if (p.occasion === "Elevated Essentials") collectionSlug = "royal-solitaire";
      else if (p.occasion === "Festive Glow") collectionSlug = "festive-glow";

      return {
        ...p,
        slug,
        collectionSlug,
        stock: p.isNew ? 5 : 12,
        images: [p.image],
        sku: `ZIV-${p.category.toUpperCase().slice(0, 3)}-${p.id}`,
      };
    });

    const seededProducts = await Product.insertMany(preparedProducts);
    console.log(`✅ Seeded ${seededProducts.length} product documents into catalog.`);

    console.log("🎉 Seeding completed successfully!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedDatabase();