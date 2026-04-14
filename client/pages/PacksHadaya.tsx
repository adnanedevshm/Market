import SectionPage from "@/components/SectionPage";
import ProductGrid, { Product } from "@/components/ProductGrid";

const products: Product[] = [
  {
    id: "housymealhadaya",
    title: "حزمة الهدايا الفاخرة",
    description: "حزمة هدايا فاخرة تحتوي على منتجات مميزة. تصميم أنيق وتغليف جميل. مناسبة للمناسبات الخاصة والاحتفالات. هدية مثالية وكريمة.",
    image: "https://via.placeholder.com/300x300?text=حزمةهدايا",
    category: "packs",
  },
];

export default function PacksHadaya() {
  return (
    <SectionPage
      title="حزمة الهدايا"
      description="حزم هدايا فاخرة ومميزة لمناسبات خاصة"
      icon="🎁"
      color="from-amber-600 to-orange-600"
      backHref="/packs"
      backLabel="عودة إلى الحزم"
    >
      <ProductGrid products={products} />
    </SectionPage>
  );
}
