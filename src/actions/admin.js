"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb.js";
import { requireAdmin } from "@/lib/permissions.js";
import Product from "@/models/Product.js";
import Category from "@/models/Category.js";
import Collection from "@/models/Collection.js";
import Order from "@/models/Order.js";
import User from "@/models/User.js";
import Coupon from "@/models/Coupon.js";
import Review from "@/models/Review.js";

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

// -------------------------------------------------------------
// Dashboard Overview Stats
// -------------------------------------------------------------
export async function getAdminStatsAction() {
  try {
    await requireAdmin();
    await connectDB();

    const [productCount, categoryCount, userCount, orders, lowStockProducts] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      User.countDocuments(),
      Order.find({}).sort({ createdAt: -1 }).limit(10).lean(),
      Product.find({ stock: { $lte: 5 } }).select("name price stock karat category image id").lean(),
    ]);

    const allOrders = await Order.find({}).select("total orderStatus createdAt").lean();
    const totalRevenue = allOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalOrdersCount = allOrders.length;

    return {
      success: true,
      stats: {
        totalRevenue,
        totalOrders: totalOrdersCount,
        totalProducts: productCount,
        totalCustomers: userCount,
        totalCategories: categoryCount,
      },
      recentOrders: orders.map((o) => ({
        ...o,
        _id: o._id.toString(),
        createdAt: o.createdAt?.toISOString(),
      })),
      lowStockProducts: lowStockProducts.map((p) => ({
        ...p,
        _id: p._id.toString(),
      })),
    };
  } catch (error) {
    console.error("getAdminStatsAction error:", error);
    return { success: false, error: error.message };
  }
}

// -------------------------------------------------------------
// Product Management Actions
// -------------------------------------------------------------
export async function createProductAction(data) {
  try {
    await requireAdmin();
    await connectDB();

    const nextId = (await Product.countDocuments()) + 1000 + Math.floor(Math.random() * 900);
    const slug = data.slug ? slugify(data.slug) : slugify(data.name);

    const newProduct = await Product.create({
      id: Number(data.id) || nextId,
      name: data.name,
      slug,
      category: data.category.toLowerCase(),
      collectionSlug: data.collectionSlug || "daily-elegance",
      price: Number(data.price),
      stock: Number(data.stock) || 10,
      image: data.image || "/oshinika_neckwear.png",
      images: data.images && data.images.length > 0 ? data.images : [data.image || "/oshinika_neckwear.png"],
      description: data.description,
      karat: data.karat || "22KT",
      occasion: data.occasion || "Bridal Wear",
      gender: data.gender || "Women",
      weight: data.weight || "15.0g",
      metal: data.metal || "Yellow Gold",
      stones: data.stones || "None",
      isNew: Boolean(data.isNew),
      isFeatured: Boolean(data.isFeatured),
    });

    revalidatePath("/shop");
    revalidatePath("/admin/products");
    revalidatePath("/");

    return { success: true, product: JSON.parse(JSON.stringify(newProduct)) };
  } catch (error) {
    console.error("createProductAction error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProductAction(id, data) {
  try {
    await requireAdmin();
    await connectDB();

    const query = Number.isInteger(Number(id)) ? { id: Number(id) } : { _id: id };
    
    if (data.name && !data.slug) {
      data.slug = slugify(data.name);
    }

    const updated = await Product.findOneAndUpdate(query, { $set: data }, { new: true });
    if (!updated) {
      return { success: false, error: "Product not found." };
    }

    revalidatePath("/shop");
    revalidatePath("/admin/products");
    revalidatePath(`/product/${id}`);
    revalidatePath("/");

    return { success: true, product: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("updateProductAction error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProductAction(id) {
  try {
    await requireAdmin();
    await connectDB();

    const query = Number.isInteger(Number(id)) ? { id: Number(id) } : { _id: id };
    await Product.findOneAndDelete(query);

    revalidatePath("/shop");
    revalidatePath("/admin/products");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("deleteProductAction error:", error);
    return { success: false, error: error.message };
  }
}

// -------------------------------------------------------------
// Category Actions
// -------------------------------------------------------------
export async function createCategoryAction(data) {
  try {
    await requireAdmin();
    await connectDB();

    const slug = slugify(data.name);
    const newCat = await Category.create({
      name: data.name,
      slug,
      description: data.description || "",
      image: data.image || "/earings.jpeg",
    });

    revalidatePath("/admin/categories");
    revalidatePath("/shop");

    return { success: true, category: JSON.parse(JSON.stringify(newCat)) };
  } catch (error) {
    console.error("createCategoryAction error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteCategoryAction(id) {
  try {
    await requireAdmin();
    await connectDB();

    await Category.findByIdAndDelete(id);
    revalidatePath("/admin/categories");

    return { success: true };
  } catch (error) {
    console.error("deleteCategoryAction error:", error);
    return { success: false, error: error.message };
  }
}

// -------------------------------------------------------------
// Collection Actions
// -------------------------------------------------------------
export async function createCollectionAction(data) {
  try {
    await requireAdmin();
    await connectDB();

    const slug = slugify(data.title);
    const newCol = await Collection.create({
      title: data.title,
      slug,
      subtitle: data.subtitle || "",
      description: data.description || "",
      bannerImage: data.bannerImage || "/oshinika_neckwear.png",
      isFeatured: Boolean(data.isFeatured),
    });

    revalidatePath("/admin/collections");
    revalidatePath("/collections");

    return { success: true, collection: JSON.parse(JSON.stringify(newCol)) };
  } catch (error) {
    console.error("createCollectionAction error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteCollectionAction(id) {
  try {
    await requireAdmin();
    await connectDB();

    await Collection.findByIdAndDelete(id);
    revalidatePath("/admin/collections");
    revalidatePath("/collections");

    return { success: true };
  } catch (error) {
    console.error("deleteCollectionAction error:", error);
    return { success: false, error: error.message };
  }
}

// -------------------------------------------------------------
// Order Actions
// -------------------------------------------------------------
export async function updateOrderStatusAction(orderId, status) {
  try {
    await requireAdmin();
    await connectDB();

    const updated = await Order.findByIdAndUpdate(
      orderId,
      { $set: { orderStatus: status } },
      { new: true }
    );

    revalidatePath("/admin/orders");
    revalidatePath("/admin");

    return { success: true, order: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("updateOrderStatusAction error:", error);
    return { success: false, error: error.message };
  }
}

// -------------------------------------------------------------
// Coupon Actions
// -------------------------------------------------------------
export async function createCouponAction(data) {
  try {
    await requireAdmin();
    await connectDB();

    const newCoupon = await Coupon.create({
      code: data.code.toUpperCase().trim(),
      discountType: data.discountType || "PERCENTAGE",
      discountValue: Number(data.discountValue),
      minOrderAmount: Number(data.minOrderAmount) || 0,
      maxDiscount: data.maxDiscount ? Number(data.maxDiscount) : undefined,
      expiresAt: new Date(data.expiresAt),
      isActive: true,
    });

    revalidatePath("/admin/coupons");
    return { success: true, coupon: JSON.parse(JSON.stringify(newCoupon)) };
  } catch (error) {
    console.error("createCouponAction error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteCouponAction(id) {
  try {
    await requireAdmin();
    await connectDB();

    await Coupon.findByIdAndDelete(id);
    revalidatePath("/admin/coupons");

    return { success: true };
  } catch (error) {
    console.error("deleteCouponAction error:", error);
    return { success: false, error: error.message };
  }
}

// -------------------------------------------------------------
// Review Moderation Actions
// -------------------------------------------------------------
export async function approveReviewAction(reviewId, isApproved = true) {
  try {
    await requireAdmin();
    await connectDB();

    await Review.findByIdAndUpdate(reviewId, { $set: { isApproved } });
    revalidatePath("/admin/reviews");

    return { success: true };
  } catch (error) {
    console.error("approveReviewAction error:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteReviewAction(reviewId) {
  try {
    await requireAdmin();
    await connectDB();

    await Review.findByIdAndDelete(reviewId);
    revalidatePath("/admin/reviews");

    return { success: true };
  } catch (error) {
    console.error("deleteReviewAction error:", error);
    return { success: false, error: error.message };
  }
}
