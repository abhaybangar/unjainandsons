"use server";

import { getProducts, getProductById, getProductBySlug, getCategories, getCollections } from "@/lib/product.js";

export async function fetchProductsAction(options = {}) {
  return await getProducts(options);
}

export async function fetchProductByIdAction(id) {
  return await getProductById(id);
}

export async function fetchProductBySlugAction(slug) {
  return await getProductBySlug(slug);
}

export async function fetchCategoriesAction() {
  return await getCategories();
}

export async function fetchCollectionsAction() {
  return await getCollections();
}
