import ProductPage from "@/components/ProductPage";
import { getProductById } from "@/data/products";

export default function ScoutBackpackPage() {
  const product = getProductById("scout-backpack-001");

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">المنتج غير موجود</p>
      </div>
    );
  }

  return (
    <ProductPage
      product={product}
      categoryName="معدات الكشافة والتخييم"
      categoryPath="/scout-camping/equipment"
    />
  );
}
