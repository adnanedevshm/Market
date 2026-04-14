import Layout from "@/components/Layout";
import CategoryGrid, { Category } from "@/components/CategoryGrid";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const categories: Category[] = [
  {
    id: "equipment",
    label: "المعدات الأساسية",
    icon: "🎒",
    href: "/scout-camping/equipment",
    description: "الأكياس، الخيام، والمعدات الأساسية",
  },
  {
    id: "kits",
    label: "الحزم المتخصصة",
    icon: "🧰",
    href: "/scout-camping/kits",
    description: "حزم الطهي، النار، الإسعافات الأولية",
  },
  {
    id: "accessories",
    label: "الملابس والأكسسوارات",
    icon: "👟",
    href: "/scout-camping/clothing",
    description: "الملابس، القبعات، الأحذية والنظارات",
  },
  {
    id: "communication",
    label: "الاتصالات والأدوات",
    icon: "📡",
    href: "/scout-camping/communication",
    description: "أجهزة التواصل والمشاعل والصفارات",
  },
  {
    id: "hiking",
    label: "ملابس المشي والتنزه",
    icon: "🥾",
    href: "/scout-camping/hiking",
    description: "الملابس المتخصصة والأحذية",
  },
];

export default function ScoutCamping() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-teal-700 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl text-white">⛺</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              الكشافة والتخييم
            </h1>
          </div>
          <p className="text-white/90 text-lg">
            جميع معدات المخيم والكشافة والمشي في الطبيعة
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="section-title text-center mb-8">اختر القسم</h2>
        <CategoryGrid categories={categories} />

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 font-semibold transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>الرئيسية</span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
