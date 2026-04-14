import Layout from "@/components/Layout";
import CategoryGrid, { Category } from "@/components/CategoryGrid";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const categories: Category[] = [
  {
    id: "houssypiye",
    label: "الحزمة الأساسية",
    icon: "📦",
    href: "/packs/houssypiye",
    description: "حزمة أساسية شاملة",
  },
  {
    id: "housymealhadaya",
    label: "حزمة الهدايا",
    icon: "🎁",
    href: "/packs/housymealhadaya",
    description: "حزم هدايا فاخرة ومميزة",
  },
  {
    id: "specialise",
    label: "الحزم المتخصصة",
    icon: "⭐",
    href: "/packs/specialise",
    description: "حزم متخصصة حسب الاحتياج",
  },
];

export default function Packs() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-600 to-orange-600 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl text-white">📦</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              الحزم والعروض
            </h1>
          </div>
          <p className="text-white/90 text-lg">
            حزم متنوعة وعروض خاصة على منتجاتنا
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="section-title text-center mb-8">اختر الحزمة</h2>
        <CategoryGrid categories={categories} />

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 font-semibold transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>الرئيسية</span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
