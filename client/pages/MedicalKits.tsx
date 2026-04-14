import SectionPage from "@/components/SectionPage";
import ProductGrid, { Product } from "@/components/ProductGrid";

const kitProducts: Product[] = [
  {
    id: "kit1",
    title: "حزمة الإسعافات الأولية 1",
    description: "حزمة إسعافات أولية شاملة ومعقمة. تحتوي على الأساسيات الطبية. معتمدة وآمنة. مناسبة للعائلات والمؤسسات.",
    image: "https://via.placeholder.com/300x300?text=حزمة1",
    category: "kits",
  },
  {
    id: "kit2",
    title: "حزمة الإسعافات الأولية 2",
    description: "نسخة محسّنة من حزمة الإسعافات. أدوات إضافية وأكمل. جودة طبية عالية. مثالية للرحلات والفعاليات.",
    image: "https://via.placeholder.com/300x300?text=حزمة2",
    category: "kits",
  },
  {
    id: "kit3",
    title: "حزمة الإسعافات الأولية 3",
    description: "حزمة إسعافات متقدمة وشاملة. جميع المعدات الضرورية. معقمة بشكل كامل. للاستخدام المهني والعائلي.",
    image: "https://via.placeholder.com/300x300?text=حزمة3",
    category: "kits",
  },
];

export default function MedicalKits() {
  return (
    <SectionPage
      title="الحزم الطبية"
      description="حزم إسعافات أولية متكاملة وموثوقة"
      icon="🏥"
      color="from-pink-600 to-red-600"
      backHref="/medical"
      backLabel="عودة إلى الطبية"
    >
      <ProductGrid products={kitProducts} />
    </SectionPage>
  );
}
