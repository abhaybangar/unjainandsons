import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    sku: {
      type: String,
      default: function () {
        return `ZIV-${this.id || Math.floor(Math.random() * 10000)}`;
      },
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    collectionSlug: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      index: true,
    },
    stock: {
      type: Number,
      default: 10,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    karat: {
      type: String,
      required: true,
      index: true,
    },
    occasion: {
      type: String,
      required: true,
      index: true,
    },
    gender: {
      type: String,
      required: true,
      index: true,
    },
    weight: {
      type: String,
      required: true,
    },
    metal: {
      type: String,
      required: true,
    },
    stones: {
      type: String,
      required: true,
    },
    isNew: {
      type: Boolean,
      default: false,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    ratings: {
      type: Number,
      default: 4.8,
    },
    numReviews: {
      type: Number,
      default: 12,
    },
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
  }
);

// Compound text index for catalog search
productSchema.index({ name: "text", description: "text", category: "text", karat: "text" });

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;