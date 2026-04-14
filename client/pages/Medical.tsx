import Layout from "@/components/Layout";
import CategoryGrid, { Category } from "@/components/CategoryGrid";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const categories: Category[] = [
  {
    id: "devices",
    label: "الأجهزة الطبية",
    icon: "💉",
    href: "/medical/devices",
    description: "أجهزة قياس الضغط والأكسجين والسكر",
  },
  {
    id: "kits",
    label: "الحزم الطبية",
    icon: "🏥",
    href: "/medical/kits",
    description: "حزم الإسعافات والحماية الطبية",
  },
];

export default function Medical() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-red-600 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl text-white">⚕️</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              المعدات الطبية
            </h1>
          </div>
          <p className="text-white/90 text-lg">
            معدات وأدوات صحية موثوقة ومعتمدة
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
            className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-600 font-semibold transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>الرئيسية</span>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
