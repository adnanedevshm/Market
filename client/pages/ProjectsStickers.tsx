import SectionPage from "@/components/SectionPage";
import ProductGrid, { Product } from "@/components/ProductGrid";

const stickerProducts: Product[] = [
  {
    id: "sticker1",
    title: "ملصقات SHM",
    description: "مجموعة ملصقات بشعار SHM الفريد. تصاميم جميلة وملونة. جودة عالية ومقاومة للماء. مثالية للهدايا.",
    image: "https://via.placeholder.com/300x300?text=ملصقات1",
    category: "stickers",
  },
  {
    id: "sticker2",
    title: "ملصقات مخصصة",
    description: "ملصقات حسب الطلب مع تصاميم مخصصة. جودة احترافية ومتينة. ألوان زاهية وواضحة. طلب الآن.",
    image: "https://via.placeholder.com/300x300?text=ملصقات2",
    category: "stickers",
  },
  {
    id: "sticker3",
    title: "ملصقات فريدة",
    description: "مجموعة ملصقات فريدة بتصاميم حصرية. مصنوعة من مواد عالية الجودة. مقاومة للتمزق والماء. تصاميم عصرية.",
    image: "https://via.placeholder.com/300x300?text=ملصقات3",
    category: "stickers",
  },
];

export default function ProjectsStickers() {
  return (
    <SectionPage
      title="الملصقات"
      description="ملصقات بتصاميم مختلفة وفريدة"
      icon="🎨"
      color="from-purple-600 to-indigo-700"
      backHref="/projects"
      backLabel="عودة إلى المشاريع"
    >
      <ProductGrid products={stickerProducts} />
    </SectionPage>
  );
}
