import SectionPage from "@/components/SectionPage";
import ProductGrid, { Product } from "@/components/ProductGrid";

const deviceProducts: Product[] = [
  {
    id: "tensiometre",
    title: "جهاز قياس الضغط",
    description: "جهاز قياس ضغط الدم الرقمي. دقة عالية وقراءة سريعة. سهل الاستخدام للجميع. مناسب للاستخدام المنزلي والطبي.",
    image: "https://via.placeholder.com/300x300?text=قياسالضغط",
    category: "devices",
  },
  {
    id: "oxymetre",
    title: "مقياس الأكسجين",
    description: "جهاز قياس نسبة الأكسجين في الدم. دقيق وسريع. سهل التعلق على الإصبع. مفيد لمراقبة صحة التنفس.",
    image: "https://via.placeholder.com/300x300?text=قياسالأكسجين",
    category: "devices",
  },
  {
    id: "glucometre",
    title: "جهاز قياس السكر",
    description: "جهاز قياس السكر في الدم بدقة عالية. سريع وآمن. نتائج فورية وموثوقة. مناسب للمراقبة اليومية.",
    image: "https://via.placeholder.com/300x300?text=قياسالسكر",
    category: "devices",
  },
];

export default function MedicalDevices() {
  return (
    <SectionPage
      title="الأجهزة الطبية"
      description="أجهزة قياس موثوقة ودقيقة للاستخدام المنزلي"
      icon="💉"
      color="from-pink-600 to-red-600"
      backHref="/medical"
      backLabel="عودة إلى الطبية"
    >
      <ProductGrid products={deviceProducts} />
    </SectionPage>
  );
}
