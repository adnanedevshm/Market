import SectionPage from "@/components/SectionPage";
import ProductGrid, { Product } from "@/components/ProductGrid";

const products: Product[] = [
  {
    id: "specialise",
    title: "الحزمة المتخصصة",
    description: "حزم متخصصة حسب احتياجاتك ومتطلباتك. تجمع بين منتجات مختارة بعناية. جودة عالية وسعر منافس. تواصل معنا لتخصيص حزمتك.",
    image: "https://via.placeholder.com/300x300?text=حزمةمتخصصة",
    category: "packs",
  },
];

export default function PacksSpecialize() {
  return (
    <SectionPage
      title="الحزم المتخصصة"
      description="حزم مخصصة حسب احتياجاتك والمناسبات"
      icon="⭐"
      color="from-amber-600 to-orange-600"
      backHref="/packs"
      backLabel="عودة إلى الحزم"
    >
      <ProductGrid products={products} />
    </SectionPage>
  );
}
