import HomeContent from "./HomeContent";
import { getProducts } from "@/lib/product";

export default async function Home() {
  const products = await getProducts();

  return <HomeContent products={products} />;
}