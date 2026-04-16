/**
 * Mock Products - Fallback data when products don't exist in Supabase
 * Used when product IDs are simple strings instead of UUIDs
 */

import type { ProductDetail } from "@/types";

export const mockProducts: Record<string, ProductDetail> = {
  // SHM Uniform
  "chemise": {
    id: "chemise",
    name: "القميص",
    title: "القميص",
    description: "قميص موحد SHM بجودة عالية. مصنوع من مواد أصلية وفاخرة.",
    detailed_description:
      "قميص عسكري موحد من SHM يتميز بجودة عالية جداً. مصنوع من مواد أصلية وفاخرة تضمن الراحة والمتانة. متوفر بألوان رسمية متعددة. يناسب جميع الأحجام من XS إلى XXL.",
    price: 450,
    basePrice: 450,
    category: "SHM",
    imageUrl: "https://via.placeholder.com/400x400?text=القميص",
    image_url: "https://via.placeholder.com/400x400?text=القميص",
  },
  "casquette": {
    id: "casquette",
    name: "القبعة",
    title: "القبعة",
    description: "قبعة عسكرية SHM برمز فريد. تصميم أنيق وعملي.",
    detailed_description:
      "قبعة عسكرية رسمية من SHM بتصميم حديث وأنيق. مصنوعة من مواد عالية الجودة تضمن الراحة والمتانة. برمز SHM الفريد على الجبهة. تناسب جميع أحجام الرؤوس.",
    price: 250,
    basePrice: 250,
    category: "SHM",
    imageUrl: "https://via.placeholder.com/400x400?text=القبعة",
    image_url: "https://via.placeholder.com/400x400?text=القبعة",
  },

  // SHM Accessories
  "noeud": {
    id: "noeud",
    name: "النعقد",
    title: "النعقد",
    description:
      "نعقد عسكرية بألوان مختلفة. تصميم تقليدي وأنيق. مصنوعة من مواد عالية الجودة.",
    detailed_description:
      "نعقد عسكرية رسمية بألوان متعددة. تصميم تقليدي وأنيق يناسب الزي الموحد. مصنوعة من مواد عالية الجودة وتتحمل الاستخدام المكثف.",
    price: 150,
    basePrice: 150,
    category: "SHM Accessories",
    imageUrl: "https://via.placeholder.com/400x400?text=النعقد",
    image_url: "https://via.placeholder.com/400x400?text=النعقد",
  },
  "badge": {
    id: "badge",
    name: "الشارات",
    title: "الشارات",
    description:
      "شارات معدنية أصلية بتصاميم مختلفة. رموز الإنجاز والتميز. جودة عالية.",
    detailed_description:
      "شارات معدنية أصلية بتصاميم فريدة. تمثل رموز الإنجاز والتميز في المنظمة. مصنوعة من معادن فاخرة. تستخدم لتزيين الزي الموحد.",
    price: 100,
    basePrice: 100,
    category: "SHM Accessories",
    imageUrl: "https://via.placeholder.com/400x400?text=الشارات",
    image_url: "https://via.placeholder.com/400x400?text=الشارات",
  },
  "porte-cle": {
    id: "porte-cle",
    name: "مفاتيح",
    title: "مفاتيح",
    description:
      "مفاتيح معدنية برمز SHM الفريد. تصميم عملي وأنيق. مصنوعة من معادن فاخرة.",
    detailed_description:
      "مفاتيح معدنية برمز SHM الفريد. تصميم عملي وأنيق. مصنوعة من معادن فاخرة. هدية جميلة وعملية.",
    price: 80,
    basePrice: 80,
    category: "SHM Accessories",
    imageUrl: "https://via.placeholder.com/400x400?text=مفاتيح",
    image_url: "https://via.placeholder.com/400x400?text=مفاتيح",
  },
  "ceinture": {
    id: "ceinture",
    name: "الحزام",
    title: "الحزام",
    description:
      "حزام عسكري أصلي بجودة عالية. مصنوع من مواد متينة وآمنة. لون أسود فاخر.",
    detailed_description:
      "حزام عسكري أصلي بجودة عالية. مصنوع من مواد متينة وآمنة. لون أسود فاخر. إكسسوار أساسي يتماشى مع الزي الموحد.",
    price: 200,
    basePrice: 200,
    category: "SHM Accessories",
    imageUrl: "https://via.placeholder.com/400x400?text=الحزام",
    image_url: "https://via.placeholder.com/400x400?text=الحزام",
  },
  "collier": {
    id: "collier",
    name: "القلادة",
    title: "القلادة",
    description:
      "قلادة معدنية أصلية برمز SHM الفريد. تحمل قيمة رمزية عميقة.",
    detailed_description:
      "قلادة معدنية أصلية برمز SHM الفريد. تحمل قيمة رمزية عميقة. مصنوعة من معادن فاخرة. إكسسوار جميل وأنيق للارتداء اليومي.",
    price: 120,
    basePrice: 120,
    category: "SHM Accessories",
    imageUrl: "https://via.placeholder.com/400x400?text=القلادة",
    image_url: "https://via.placeholder.com/400x400?text=القلادة",
  },
  "fourragere": {
    id: "fourragere",
    name: "الفراغة",
    title: "الفراغة",
    description:
      "فراغة عسكرية بألوان رسمية. رمز من رموز التمييز والانتماء.",
    detailed_description:
      "فراغة عسكرية بألوان رسمية. رمز من رموز التمييز والانتماء. مصنوعة من مواد عالية الجودة. عنصر جميل من الزي الموحد.",
    price: 180,
    basePrice: 180,
    category: "SHM Accessories",
    imageUrl: "https://via.placeholder.com/400x400?text=الفراغة",
    image_url: "https://via.placeholder.com/400x400?text=الفراغة",
  },
  "bracelet": {
    id: "bracelet",
    name: "الأساور",
    title: "الأساور",
    description:
      "أساور معدنية بتصاميم عصرية جميلة. تحمل شعار SHM.",
    detailed_description:
      "أساور معدنية بتصاميم عصرية جميلة. تحمل شعار SHM. مصنوعة من معادن عالية الجودة. متوفرة بألوان مختلفة.",
    price: 90,
    basePrice: 90,
    category: "SHM Accessories",
    imageUrl: "https://via.placeholder.com/400x400?text=الأساور",
    image_url: "https://via.placeholder.com/400x400?text=الأساور",
  },

  // Projects
  "t-shirt": {
    id: "t-shirt",
    name: "طباعة القمصان",
    title: "طباعة القمصان",
    description: "تصميم وطباعة قمصان بألوان وتصاميم مختلفة.",
    detailed_description:
      "خدمة متخصصة في تصميم وطباعة القمصان بألوان وتصاميم مختلفة. يمكنك اختيار التصميم أو تقديم تصميمك الخاص.",
    price: 350,
    basePrice: 350,
    category: "Projects",
    imageUrl: "https://via.placeholder.com/400x400?text=طباعة+القمصان",
    image_url: "https://via.placeholder.com/400x400?text=طباعة+القمصان",
  },

  // Default fallback
  "default": {
    id: "default",
    name: "منتج",
    title: "منتج",
    description: "منتج متاح للطلب",
    detailed_description: "منتج متاح للطلب. للمزيد من المعلومات يرجى التواصل معنا.",
    price: 0,
    basePrice: 0,
    category: "عام",
    imageUrl: "https://via.placeholder.com/400x400?text=منتج",
    image_url: "https://via.placeholder.com/400x400?text=منتج",
  },
};

export function getMockProduct(productId: string): ProductDetail | null {
  return mockProducts[productId] || null;
}
