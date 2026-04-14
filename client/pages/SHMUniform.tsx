import SectionPage from "@/components/SectionPage";
import ProductGrid, { Product } from "@/components/ProductGrid";

const uniformProducts: Product[] = [
  {
    id: "chemise",
    title: "القميص",
    description: "قميص موحد رسمي أحمر اللون. مصنوع من مواد قطنية عالية الجودة. متوفر بأحجام متعددة من S إلى 3XL. مريح وأنيق.",
    image: "https://via.placeholder.com/300x300?text=القميص",
    category: "uniform",
  },
  {
    id: "foulard",
    title: "الفولار",
    description: "فولار عسكري أنيق بألوان تناسب الزي الموحد. مصنوع من مواد عالية الجودة. متين وسهل العناية.",
    image: "https://via.placeholder.com/300x300?text=الفولار",
    category: "uniform",
  },
  {
    id: "casquette",
    title: "القبعة",
    description: "قبعة عسكرية تقليدية بلون أسود. تحمل شعار SHM. مصنوعة من مواد متينة ومريحة. مناسبة للاستخدام اليومي والفعاليات.",
    image: "https://via.placeholder.com/300x300?text=القبعة",
    category: "uniform",
  },
  {
    id: "pantalon",
    title: "البنطال",
    description: "بنطال موحد رسمي بتصميم عصري. مصنوع من مواد متينة وقوية. يوفر الراحة والحركة. متوفر بأحجام مختلفة.",
    image: "https://via.placeholder.com/300x300?text=البنطال",
    category: "uniform",
  },
];

export default function SHMUniform() {
  return (
    <SectionPage
      title="الزي الموحد"
      description="ملابس الزي الموحد الرسمية لمنظمة SHM"
      icon="👕"
      color="from-red-600 to-red-700"
      backHref="/shm"
      backLabel="عودة إلى SHM"
    >
      <ProductGrid products={uniformProducts} />
    </SectionPage>
  );
}
