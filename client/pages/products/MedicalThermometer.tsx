import ProductPage from "@/components/ProductPage";
import { getProductById } from "@/data/products";

export default function MedicalThermometerPage() {
  const product = getProductById("medical-thermometer-001");

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
      categoryName="معدات طبية"
      categoryPath="/medical/devices"
    />
  );
}
