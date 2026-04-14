import SectionPage from "@/components/SectionPage";
import ProductGrid, { Product } from "@/components/ProductGrid";

const products: Product[] = [
  {
    id: "houssypiye",
    title: "الحزمة الأساسية",
    description: "حزمة شاملة تحتوي على المنتجات الأساسية. تجمع بين جودة عالية وسعر مناسب. مثالية للمبتدئين والعائلات. توفر 15% من السعر الأساسي.",
    image: "https://via.placeholder.com/300x300?text=حزمةأساسية",
    category: "packs",
  },
];

export default function PacksHoussypiye() {
  return (
    <SectionPage
      title="الحزمة الأساسية"
      description="حزمة شاملة للمبتدئين والعائلات"
      icon="📦"
      color="from-amber-600 to-orange-600"
      backHref="/packs"
      backLabel="عودة إلى الحزم"
    >
      <ProductGrid products={products} />
    </SectionPage>
  );
}
