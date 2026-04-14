import SectionPage from "@/components/SectionPage";
import ProductGrid, { Product } from "@/components/ProductGrid";

const communicationProducts: Product[] = [
  {
    id: "lampe",
    title: "المشعل",
    description: "مشعل قوي وموثوق للإضاءة. بطارية طويلة الأمد وإضاءة قوية. مواد متينة تتحمل الضغط والماء. أساسي لكل مخيم.",
    image: "https://via.placeholder.com/300x300?text=المشعل",
    category: "communication",
  },
  {
    id: "talkie-walkie",
    title: "جهاز اتصال (Talkie-walkie)",
    description: "جهاز اتصال لاسلكي محمول. مدى اتصال جيد وواضح. بطارية قوية وآمنة. مثالي لتنسيق الفعاليات والمخيمات.",
    image: "https://via.placeholder.com/300x300?text=تاكيواكي",
    category: "communication",
  },
  {
    id: "sifflet",
    title: "الصفارة",
    description: "صفارة عسكرية قوية وواضحة. صوت عالي يسمع من بعيد. مصنوعة من مواد قوية. أداة ضرورية للإشارات والطوارئ.",
    image: "https://via.placeholder.com/300x300?text=الصفارة",
    category: "communication",
  },
];

export default function ScoutCommunication() {
  return (
    <SectionPage
      title="الاتصالات والأدوات"
      description="الأجهزة اللاسلكية والمشاعل والصفارات"
      icon="📡"
      color="from-green-600 to-teal-700"
      backHref="/scout-camping"
      backLabel="عودة إلى الكشافة والتخييم"
    >
      <ProductGrid products={communicationProducts} />
    </SectionPage>
  );
}
