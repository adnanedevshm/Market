import SectionPage from "@/components/SectionPage";
import ProductGrid, { Product } from "@/components/ProductGrid";

const accessoriesProducts: Product[] = [
  {
    id: "noeud",
    title: "النعقد",
    description: "نعقد عسكرية بألوان مختلفة. تصميم تقليدي وأنيق. مصنوعة من مواد عالية الجودة. مناسبة للزي الموحد.",
    image: "https://via.placeholder.com/300x300?text=النعقد",
    category: "accessories",
  },
  {
    id: "badge",
    title: "الشارات",
    description: "شارات معدنية أصلية بتصاميم مختلفة. رموز الإنجاز والتميز. جودة عالية وتصميم مميز. تستخدم لتزيين الزي الموحد.",
    image: "https://via.placeholder.com/300x300?text=الشارات",
    category: "accessories",
  },
  {
    id: "porte-cle",
    title: "مفاتيح",
    description: "مفاتيح معدنية برمز SHM الفريد. تصميم عملي وأنيق. مصنوعة من معادن فاخرة. هدية جميلة وعملية.",
    image: "https://via.placeholder.com/300x300?text=مفاتيح",
    category: "accessories",
  },
  {
    id: "ceinture",
    title: "الحزام",
    description: "حزام عسكري أصلي بجودة عالية. مصنوع من مواد متينة وآمنة. لون أسود فاخر. إكسسوار أساسي يتماشى مع الزي الموحد.",
    image: "https://via.placeholder.com/300x300?text=الحزام",
    category: "accessories",
  },
  {
    id: "collier",
    title: "القلادة",
    description: "قلادة معدنية أصلية برمز SHM الفريد. تحمل قيمة رمزية عميقة. مصنوعة من معادن فاخرة. إكسسوار جميل وأنيق للارتداء اليومي.",
    image: "https://via.placeholder.com/300x300?text=القلادة",
    category: "accessories",
  },
  {
    id: "fourragere",
    title: "الفراغة",
    description: "فراغة عسكرية بألوان رسمية. رمز من رموز التمييز والانتماء. مصنوعة من مواد عالية الجودة. عنصر جميل من الزي الموحد.",
    image: "https://via.placeholder.com/300x300?text=الفراغة",
    category: "accessories",
  },
  {
    id: "bracelet",
    title: "الأساور",
    description: "أساور معدنية بتصاميم عصرية جميلة. تحمل شعار SHM. مصنوعة من معادن عالية الجودة. متوفرة بألوان مختلفة.",
    image: "https://via.placeholder.com/300x300?text=الأساور",
    category: "accessories",
  },
];

export default function SHMAccessories() {
  return (
    <SectionPage
      title="الاكسسوارات"
      description="عناصر الهوية والانتماء - نعقد، شارات، مفاتيح، وغيرها"
      icon="🎖️"
      color="from-red-600 to-red-700"
      backHref="/shm"
      backLabel="عودة إلى SHM"
    >
      <ProductGrid products={accessoriesProducts} />
    </SectionPage>
  );
}
