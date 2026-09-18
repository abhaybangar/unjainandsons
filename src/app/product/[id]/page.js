import ProductDetails from "./ProductDetails";
import { getProductById, getProductBySlug, getProducts } from "@/lib/product";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { id } = await params;
  let product = await getProductById(id);
  if (!product) {
    product = await getProductBySlug(id);
  }
  return {
    title: product ? `${product.name} | Uttamchand Nemichand Jain & Sons` : "Jewellery Details | Uttamchand Nemichand Jain & Sons",
    description: product ? product.description : "Handcrafted gold, silver ornaments & antique articles from Uttamchand Nemichand Jain & Sons, Chhatrapati Sambhajinagar.",
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;

  let product = await getProductById(id);
  if (!product) {
    product = await getProductBySlug(id);
  }

  if (!product) {
    return <ProductDetails product={null} related={[]} />;
  }

  const categoryProducts = await getProducts({ category: product.category, limit: 4 });
  const related = categoryProducts.filter((p) => String(p.id) !== String(product.id)).slice(0, 3);

  return <ProductDetails product={product} related={related} />;
}