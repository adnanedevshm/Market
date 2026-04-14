import SectionPage from "@/components/SectionPage";
import ProductGrid, { Product } from "@/components/ProductGrid";

const hikingProducts: Product[] = [
  {
    id: "vestes",
    title: "الجاكتات",
    description: "جاكتات متخصصة للمشي والتنزه. تصميم عملي مع عزل حراري. مواد مقاومة للماء. مريحة وخفيفة الوزن.",
    image: "https://via.placeholder.com/300x300?text=الجاكتات",
    category: "hiking",
  },
  {
    id: "chaussures",
    title: "الأحذية",
    description: "أحذية مشي احترافية مريحة وقوية. نعل متخصص لتثبيت آمن. مصنوعة من مواد عالية الجودة. مناسبة لكل أنواع التضاريس.",
    image: "https://via.placeholder.com/300x300?text=الأحذية",
    category: "hiking",
  },
];

export default function ScoutHiking() {
  return (
    <SectionPage
      title="ملابس المشي والتنزه"
      description="الملابس المتخصصة والأحذية المقاومة"
      icon="🥾"
      color="from-green-600 to-teal-700"
      backHref="/scout-camping"
      backLabel="عودة إلى الكشافة والتخييم"
    >
      <ProductGrid products={hikingProducts} />
    </SectionPage>
  );
}
