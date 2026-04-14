import SectionPage from "@/components/SectionPage";
import ProductGrid, { Product } from "@/components/ProductGrid";

const kitsProducts: Product[] = [
  {
    id: "kit_de_feu",
    title: "حزمة النار",
    description: "حزمة متكاملة لإشعال النار. تحتوي على مواد قابلة للاشتعال وأدوات آمنة. مناسبة للمخيمات والرحلات البرية.",
    image: "https://via.placeholder.com/300x300?text=حزمةالنار",
    category: "kits",
  },
  {
    id: "kit_de_secours",
    title: "صندوق الإسعافات الأولية",
    description: "صندوق إسعافات أولية شامل ومعقم. يحتوي على أدوات طبية أساسية وضمادات. معتمد وآمن للاستخدام الفوري.",
    image: "https://via.placeholder.com/300x300?text=الاسعافات",
    category: "kits",
  },
  {
    id: "kit_de_cuisine",
    title: "حزمة الطهي",
    description: "مجموعة أدوات الطهي المتنقلة. تحتوي على أواني وملاعق وشوك. خفيفة الوزن وقوية. مثالية للطهي في الطبيعة.",
    image: "https://via.placeholder.com/300x300?text=حزمةالطهي",
    category: "kits",
  },
  {
    id: "kit24",
    title: "حزمة 24 ساعة",
    description: "حزمة شاملة لرحلة 24 ساعة. تحتوي على كل ما تحتاجه للبقاء والراحة. جودة عالية وشاملة.",
    image: "https://via.placeholder.com/300x300?text=حزمة24",
    category: "kits",
  },
];

export default function ScoutKits() {
  return (
    <SectionPage
      title="الحزم المتخصصة"
      description="حزم متكاملة للطهي والنار والإسعافات الأولية"
      icon="🧰"
      color="from-green-600 to-teal-700"
      backHref="/scout-camping"
      backLabel="عودة إلى الكشافة والتخييم"
    >
      <ProductGrid products={kitsProducts} />
    </SectionPage>
  );
}
