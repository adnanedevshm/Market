// ============================================================================
// BASE DE DONNÉES PRODUITS - SHM MARKETPLACE
// Contient tous les produits avec images, descriptions et options
// ============================================================================

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface ProductVariant {
  id: string;
  type: "size" | "color" | "model";
  options: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "shm" | "scout" | "medical" | "projects" | "packs";
  subcategory: string;
  price: number;
  discountPrice?: number;
  description: string;
  detailedDescription: string;
  images: ProductImage[];
  availability: boolean;
  variants?: ProductVariant[];
  rating?: number;
  reviewCount?: number;
  isFragile?: boolean;
}

// ============================================================================
// PRODUITS SHM
// ============================================================================

export const SHM_PRODUCTS: Product[] = [
  {
    id: "shm-uniform-001",
    name: "Uniforme SHM Complet",
    slug: "uniforme-shm-complet",
    category: "shm",
    subcategory: "uniform",
    price: 299.99,
    discountPrice: 249.99,
    description: "Uniforme complet pour les étudiants SHM",
    detailedDescription:
      "Uniforme officiel SHM de haute qualité, composé d'une veste et d'un pantalon. Tissu confortable et durable, parfait pour les événements scolaires et cérémonies.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=800&fit=crop",
        alt: "Uniforme SHM Complet",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&h=800&fit=crop",
        alt: "Vue détail - Veste",
      },
      {
        url: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=800&h=800&fit=crop",
        alt: "Vue détail - Pantalon",
      },
    ],
    availability: true,
    variants: [
      {
        id: "size",
        type: "size",
        options: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"],
      },
      {
        id: "color",
        type: "color",
        options: ["Noir", "Bleu Marine"],
      },
    ],
    rating: 4.5,
    reviewCount: 24,
  },
  {
    id: "shm-accessories-001",
    name: "Nœud Papillon SHM",
    slug: "noeud-papillon-shm",
    category: "shm",
    subcategory: "accessories",
    price: 49.99,
    description: "Nœud papillon officiel SHM",
    detailedDescription:
      "Accessoire élégant aux couleurs de SHM. Nœud papillon de haute qualité avec attache réglable.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1624378439385-6ce0a9bfc328?w=800&h=800&fit=crop",
        alt: "Nœud Papillon SHM",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1590080876000-b0fdd2b81e1f?w=800&h=800&fit=crop",
        alt: "Détail du nœud",
      },
    ],
    availability: true,
    rating: 4.8,
    reviewCount: 12,
  },
  {
    id: "shm-badges-001",
    name: "Badges et Insignes SHM",
    slug: "badges-insignes-shm",
    category: "shm",
    subcategory: "accessories",
    price: 19.99,
    description: "Ensemble de badges officiels SHM",
    detailedDescription:
      "Badges de qualité élevée représentant les différentes branches et niveaux de SHM. Idéal pour personnaliser votre uniforme.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1616594039964-ae3995e32cc6?w=800&h=800&fit=crop",
        alt: "Badges SHM",
        isPrimary: true,
      },
    ],
    availability: true,
    rating: 4.6,
    reviewCount: 18,
  },
];

// ============================================================================
// PRODUITS SCOUT & CAMPING
// ============================================================================

export const SCOUT_PRODUCTS: Product[] = [
  {
    id: "scout-tent-001",
    name: "Tente de Camping 3 Personnes",
    slug: "tente-camping-3-personnes",
    category: "scout",
    subcategory: "equipment",
    price: 599.99,
    discountPrice: 499.99,
    description: "Tente spacieuse pour les sorties en camping",
    detailedDescription:
      "Tente durable et imperméable pour 3 personnes. Design compact, facile à installer. Parfaite pour les expéditions scout et randonnées.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=800&fit=crop",
        alt: "Tente Camping 3P",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1504680390367-361c6d9f38f4?w=800&h=800&fit=crop",
        alt: "Tente montée",
      },
      {
        url: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=800&fit=crop",
        alt: "Détail intérieur",
      },
    ],
    availability: true,
    variants: [
      {
        id: "color",
        type: "color",
        options: ["Vert", "Bleu", "Gris"],
      },
    ],
    isFragile: false,
    rating: 4.7,
    reviewCount: 45,
  },
  {
    id: "scout-backpack-001",
    name: "Sac à Dos Scout 60L",
    slug: "sac-dos-scout-60l",
    category: "scout",
    subcategory: "equipment",
    price: 299.99,
    description: "Sac à dos professionnel pour les sorties",
    detailedDescription:
      "Sac à dos de grande capacité avec compartiments multiples. Design ergonomique, idéal pour les expéditions de plusieurs jours.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop",
        alt: "Sac à Dos 60L",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop",
        alt: "Vue latérale",
      },
    ],
    availability: true,
    variants: [
      {
        id: "color",
        type: "color",
        options: ["Noir", "Bleu", "Vert Kaki"],
      },
    ],
    rating: 4.6,
    reviewCount: 32,
  },
  {
    id: "scout-sleeping-001",
    name: "Sac de Couchage 3 Saisons",
    slug: "sac-couchage-3-saisons",
    category: "scout",
    subcategory: "equipment",
    price: 249.99,
    description: "Sac de couchage confortable et léger",
    detailedDescription:
      "Sac de couchage thermique pour 3 saisons. Compact et léger, parfait pour les campements scout.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&h=800&fit=crop",
        alt: "Sac de Couchage",
        isPrimary: true,
      },
    ],
    availability: true,
    rating: 4.5,
    reviewCount: 28,
  },
];

// ============================================================================
// PRODUITS MÉDICAL
// ============================================================================

export const MEDICAL_PRODUCTS: Product[] = [
  {
    id: "medical-kit-001",
    name: "Trousse de Premiers Secours Complète",
    slug: "trousse-premiers-secours-complete",
    category: "medical",
    subcategory: "kits",
    price: 179.99,
    description: "Kit de premiers secours professionnel",
    detailedDescription:
      "Trousse médicale complète avec tous les équipements essentiels. Parfaite pour les événements, les clubs, ou à avoir chez soi.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0f?w=800&h=800&fit=crop",
        alt: "Trousse Premiers Secours",
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1631217314831-c6227db76b6e?w=800&h=800&fit=crop",
        alt: "Contenu détail",
      },
    ],
    availability: true,
    isFragile: true,
    rating: 4.8,
    reviewCount: 52,
  },
  {
    id: "medical-thermometer-001",
    name: "Thermomètre Numérique Infra-Rouge",
    slug: "thermometre-numerique-ir",
    category: "medical",
    subcategory: "devices",
    price: 89.99,
    description: "Thermomètre sans contact précis",
    detailedDescription:
      "Thermomètre infrarouge de précision médicale. Mesure sans contact, résultats en 1 seconde.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1631217314831-c6227db76b6e?w=800&h=800&fit=crop",
        alt: "Thermomètre",
        isPrimary: true,
      },
    ],
    availability: true,
    rating: 4.7,
    reviewCount: 35,
  },
];

// ============================================================================
// PRODUITS PROJETS
// ============================================================================

export const PROJECTS_PRODUCTS: Product[] = [
  {
    id: "projects-printing-001",
    name: "Services d'Impression Personnalisée",
    slug: "impression-personnalisee",
    category: "projects",
    subcategory: "printing",
    price: 0.99,
    description: "Impression de documents personnalisés",
    detailedDescription:
      "Services d'impression professionnels pour tous vos besoins de personnalisation. Flyers, affiches, cartes de visite, etc.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1633356713697-85b57294b26a?w=800&h=800&fit=crop",
        alt: "Services Impression",
        isPrimary: true,
      },
    ],
    availability: true,
    rating: 4.4,
    reviewCount: 16,
  },
  {
    id: "projects-pottery-001",
    name: "Ateliers de Poterie",
    slug: "ateliers-poterie",
    category: "projects",
    subcategory: "pottery",
    price: 49.99,
    description: "Cours de poterie et céramique",
    detailedDescription:
      "Ateliers créatifs de poterie pour tous les niveaux. Apprenez les techniques traditionelles de céramique.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1565193566173-7ceb3ee3c82b?w=800&h=800&fit=crop",
        alt: "Atelier Poterie",
        isPrimary: true,
      },
    ],
    availability: true,
    rating: 4.6,
    reviewCount: 22,
  },
];

// ============================================================================
// PRODUITS PACKS
// ============================================================================

export const PACKS_PRODUCTS: Product[] = [
  {
    id: "packs-starter-001",
    name: "Pack Démarrage Complet",
    slug: "pack-demarrage-complet",
    category: "packs",
    subcategory: "houssypiye",
    price: 799.99,
    discountPrice: 699.99,
    description: "Pack complet pour bien commencer",
    detailedDescription:
      "Bundle spécial contenant les essentiels pour débuter votre aventure. Uniforme, équipement de base, et accessoires.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=800&fit=crop",
        alt: "Pack Complet",
        isPrimary: true,
      },
    ],
    availability: true,
    rating: 4.7,
    reviewCount: 38,
  },
];

// ============================================================================
// FONCTION UTILITAIRE - OBTENIR PRODUIT PAR ID
// ============================================================================

export function getProductById(id: string): Product | undefined {
  const allProducts = [
    ...SHM_PRODUCTS,
    ...SCOUT_PRODUCTS,
    ...MEDICAL_PRODUCTS,
    ...PROJECTS_PRODUCTS,
    ...PACKS_PRODUCTS,
  ];
  return allProducts.find((p) => p.id === id);
}

// ============================================================================
// FONCTION UTILITAIRE - OBTENIR PRODUITS PAR CATÉGORIE
// ============================================================================

export function getProductsByCategory(category: string): Product[] {
  const allProducts = [
    ...SHM_PRODUCTS,
    ...SCOUT_PRODUCTS,
    ...MEDICAL_PRODUCTS,
    ...PROJECTS_PRODUCTS,
    ...PACKS_PRODUCTS,
  ];
  return allProducts.filter((p) => p.category === category);
}
