import SectionPage from "@/components/SectionPage";
import ProductGrid, { Product } from "@/components/ProductGrid";

const equipmentProducts: Product[] = [
  {
    id: "sac",
    title: "الحقيبة",
    description: "حقيبة ظهر قوية وموثوقة. سعة كبيرة لتخزين المعدات. مصنوعة من مواد متينة وآمنة. مناسبة للمخيم والرحلات.",
    image: "https://via.placeholder.com/300x300?text=الحقيبة",
    category: "equipment",
  },
  {
    id: "sac2.0",
    title: "الحقيبة 2.0",
    description: "نسخة محسّنة من الحقيبة بتصميم عصري. أكثر كفاءة وراحة. مواد متقدمة وتصميم ذكي. مثالية للرحلات الطويلة.",
    image: "https://via.placeholder.com/300x300?text=الحقيبة20",
    category: "equipment",
  },
  {
    id: "tente",
    title: "الخيمة",
    description: "خيمة عسكرية قوية وموثوقة. تصميم فسيح ومريح. حماية كاملة من العوامل الجوية. سهلة التركيب والفك.",
    image: "https://via.placeholder.com/300x300?text=الخيمة",
    category: "equipment",
  },
  {
    id: "couture",
    title: "مجموعة الخياطة",
    description: "مجموعة خياطة محمولة صغيرة. تحتوي على إبر وخيوط متعددة الألوان. حقيبة صغيرة حماية. ضرورية لإصلاح الملابس المتضررة.",
    image: "https://via.placeholder.com/300x300?text=الخياطة",
    category: "equipment",
  },
];

export default function ScoutEquipment() {
  return (
    <SectionPage
      title="المعدات الأساسية"
      description="الحقائب والخيام والمعدات الأساسية للمخيم"
      icon="🎒"
      color="from-green-600 to-teal-700"
      backHref="/scout-camping"
      backLabel="عودة إلى الكشافة والتخييم"
    >
      <ProductGrid products={equipmentProducts} />
    </SectionPage>
  );
}
