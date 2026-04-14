import SectionPage from "@/components/SectionPage";
import ProductGrid, { Product } from "@/components/ProductGrid";

const clothingProducts: Product[] = [
  {
    id: "casquette",
    title: "القبعة",
    description: "قبعة عسكرية تقليدية بلون أسود. تحمل شعار SHM. مصنوعة من مواد متينة ومريحة. مناسبة للاستخدام اليومي والفعاليات.",
    image: "https://via.placeholder.com/300x300?text=القبعة",
    category: "clothing",
  },
  {
    id: "lunettes_solaires",
    title: "النظارات الشمسية",
    description: "نظارات شمسية حامية من الأشعة فوق البنفسجية. تصميم عصري وأنيق. عدسات عالية الجودة. مناسبة لجميع الأنشطة الخارجية.",
    image: "https://via.placeholder.com/300x300?text=النظارات",
    category: "clothing",
  },
];

export default function ScoutClothing() {
  return (
    <SectionPage
      title="الملابس والأكسسوارات"
      description="القبعات والنظارات والملابس المساعدة"
      icon="👟"
      color="from-green-600 to-teal-700"
      backHref="/scout-camping"
      backLabel="عودة إلى الكشافة والتخييم"
    >
      <ProductGrid products={clothingProducts} />
    </SectionPage>
  );
}
