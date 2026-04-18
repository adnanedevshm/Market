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

  // Medical Kits
  "kit1": {
    id: "kit1",
    name: "حزمة الإسعافات الأولية 1",
    title: "حزمة الإسعافات الأولية 1",
    description: "حزمة إسعافات أولية شاملة ومعقمة. تحتوي على الأساسيات الطبية.",
    detailed_description:
      "حزمة إسعافات أولية شاملة ومعقمة. تحتوي على الأساسيات الطبية. معتمدة وآمنة. مناسبة للعائلات والمؤسسات.",
    price: 300,
    basePrice: 300,
    category: "Medical Kits",
    imageUrl: "https://via.placeholder.com/400x400?text=حزمة+إسعافات+1",
    image_url: "https://via.placeholder.com/400x400?text=حزمة+إسعافات+1",
  },
  "kit2": {
    id: "kit2",
    name: "حزمة الإسعافات الأولية 2",
    title: "حزمة الإسعافات الأولية 2",
    description: "نسخة محسّنة من حزمة الإسعافات. أدوات إضافية وأكمل.",
    detailed_description:
      "نسخة محسّنة من حزمة الإسعافات. أدوات إضافية وأكمل. جودة طبية عالية. مثالية للرحلات والفعاليات.",
    price: 450,
    basePrice: 450,
    category: "Medical Kits",
    imageUrl: "https://via.placeholder.com/400x400?text=حزمة+إسعافات+2",
    image_url: "https://via.placeholder.com/400x400?text=حزمة+إسعافات+2",
  },
  "kit3": {
    id: "kit3",
    name: "حزمة الإسعافات الأولية 3",
    title: "حزمة الإسعافات الأولية 3",
    description: "حزمة إسعافات متقدمة وشاملة. جميع المعدات الضرورية.",
    detailed_description:
      "حزمة إسعافات متقدمة وشاملة. جميع المعدات الضرورية. معقمة بشكل كامل. للاستخدام المهني والعائلي.",
    price: 600,
    basePrice: 600,
    category: "Medical Kits",
    imageUrl: "https://via.placeholder.com/400x400?text=حزمة+إسعافات+3",
    image_url: "https://via.placeholder.com/400x400?text=حزمة+إسعافات+3",
  },

  // Scout Kits
  "kit_de_feu": {
    id: "kit_de_feu",
    name: "حزمة النار",
    title: "حزمة النار",
    description: "حزمة متكاملة لإشعال النار. تحتوي على مواد قابلة للاشتعال.",
    detailed_description:
      "حزمة متكاملة لإشعال النار. تحتوي على مواد قابلة للاشتعال وأدوات آمنة. مناسبة للمخيمات والرحلات البرية.",
    price: 200,
    basePrice: 200,
    category: "Scout Kits",
    imageUrl: "https://via.placeholder.com/400x400?text=حزمة+النار",
    image_url: "https://via.placeholder.com/400x400?text=حزمة+النار",
  },
  "kit_de_secours": {
    id: "kit_de_secours",
    name: "صندوق الإسعافات الأولية",
    title: "صندوق الإسعافات الأولية",
    description: "صندوق إسعافات أولية شامل ومعقم. يحتوي على أدوات طبية.",
    detailed_description:
      "صندوق إسعافات أولية شامل ومعقم. يحتوي على أدوات طبية أساسية وضمادات. معتمد وآمن للاستخدام الفوري.",
    price: 350,
    basePrice: 350,
    category: "Scout Kits",
    imageUrl: "https://via.placeholder.com/400x400?text=صندوق+الإسعافات",
    image_url: "https://via.placeholder.com/400x400?text=صندوق+الإسعافات",
  },
  "kit_de_cuisine": {
    id: "kit_de_cuisine",
    name: "حزمة الطهي",
    title: "حزمة الطهي",
    description: "مجموعة أدوات الطهي المتنقلة. تحتوي على أواني وملاعق.",
    detailed_description:
      "مجموعة أدوات الطهي المتنقلة. تحتوي على أواني وملاعق وشوك. خفيفة الوزن وقوية. مثالية للطهي في الطبيعة.",
    price: 280,
    basePrice: 280,
    category: "Scout Kits",
    imageUrl: "https://via.placeholder.com/400x400?text=حزمة+الطهي",
    image_url: "https://via.placeholder.com/400x400?text=حزمة+الطهي",
  },
  "kit24": {
    id: "kit24",
    name: "حزمة 24 ساعة",
    title: "حزمة 24 ساعة",
    description: "حزمة شاملة لرحلة 24 ساعة. تحتوي على كل ما تحتاجه.",
    detailed_description:
      "حزمة شاملة لرحلة 24 ساعة. تحتوي على كل ما تحتاجه للبقاء والراحة. جودة عالية وشاملة.",
    price: 800,
    basePrice: 800,
    category: "Scout Kits",
    imageUrl: "https://via.placeholder.com/400x400?text=حزمة+24+ساعة",
    image_url: "https://via.placeholder.com/400x400?text=حزمة+24+ساعة",
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

/**
 * Get a product by ID, with auto-generation of missing products
 */
export function getMockProduct(productId: string): ProductDetail | null {
  // Check if product exists in mock data
  if (mockProducts[productId]) {
    return mockProducts[productId];
  }

  // Auto-generate product for IDs not explicitly defined
  // This allows the app to handle any product ID gracefully
  const autoProduct: ProductDetail = {
    id: productId,
    name: productId.replace(/-/g, " "),
    title: productId.replace(/-/g, " "),
    description: `Produit: ${productId}`,
    detailed_description: `Produit: ${productId}. Pour plus de détails, veuillez nous contacter.`,
    price: 0,
    basePrice: 0,
    category: "Produits",
    imageUrl: `https://via.placeholder.com/400x400?text=${encodeURIComponent(productId)}`,
    image_url: `https://via.placeholder.com/400x400?text=${encodeURIComponent(productId)}`,
  };

  console.log(`⚠️ Produit auto-généré pour ${productId}`);
  return autoProduct;
}
