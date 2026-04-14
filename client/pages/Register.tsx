import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import { UserPlus, Loader, CheckCircle, AlertCircle } from "lucide-react";

const MOROCCAN_CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fès",
  "Tanger",
  "Agadir",
  "Meknès",
  "Oujda",
  "Kenitra",
  "Safi",
  "El Jadida",
  "Tétouan",
  "Nador",
  "Beni Mellal",
  "Taza",
  "Laâyoune",
];

type RegisterStep = "form" | "success";

export default function Register() {
  const navigate = useNavigate();
  const { signUpDirect, user } = useAuth();

  const [step, setStep] = useState<RegisterStep>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    ville: "",
    password: "",
    confirmPassword: "",
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.nom.trim()) {
      setError("الاسم مطلوب");
      return false;
    }
    if (!formData.prenom.trim()) {
      setError("النسب مطلوب");
      return false;
    }
    if (!formData.email.trim()) {
      setError("البريد الإلكتروني مطلوب");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("البريد الإلكتروني غير صالح");
      return false;
    }
    if (!formData.telephone.trim()) {
      setError("رقم الهاتف مطلوب");
      return false;
    }
    if (!formData.ville) {
      setError("يرجى اختيار المدينة");
      return false;
    }
    if (!formData.password) {
      setError("كلمة المرور مطلوبة");
      return false;
    }
    if (formData.password.length < 8) {
      setError("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("كلمات المرور غير متطابقة");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await signUpDirect(formData.email, formData.password, {
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: formData.telephone,
        ville: formData.ville,
      });

      if (error) {
        setError(error.message);
      } else {
        setStep("success");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-600 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <UserPlus className="w-8 h-8 text-white" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              📝 إنشاء حساب جديد
            </h1>
          </div>
        </div>
      </section>

      {/* Register Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {step === "form" && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                إنضم إلينا
              </h2>
              <p className="text-gray-600 mb-6">
                أنشئ حسابك الخاص للتسوق والاستمتاع بعروضنا
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* الاسم */}
                <div>
                  <label
                    htmlFor="nom"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    الاسم *
                  </label>
                  <input
                    id="nom"
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="علي"
                  />
                </div>

                {/* النسب */}
                <div>
                  <label
                    htmlFor="prenom"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    النسب *
                  </label>
                  <input
                    id="prenom"
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="محمد"
                  />
                </div>

                {/* البريد الإلكتروني */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    البريد الإلكتروني *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="your@email.com"
                  />
                </div>

                {/* رقم الهاتف */}
                <div>
                  <label
                    htmlFor="telephone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    رقم الهاتف *
                  </label>
                  <input
                    id="telephone"
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="+212 6 XX XX XX XX"
                  />
                </div>

                {/* المدينة */}
                <div>
                  <label
                    htmlFor="ville"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    المدينة *
                  </label>
                  <select
                    id="ville"
                    name="ville"
                    value={formData.ville}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                  >
                    <option value="">اختر المدينة</option>
                    {MOROCCAN_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* كلمة المرور */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    كلمة المرور *
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="••••••••"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    على الأقل 8 أحرف
                  </p>
                </div>

                {/* تأكيد كلمة المرور */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    تأكيد كلمة المرور *
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="••••••••"
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      جاري الإنشاء...
                    </>
                  ) : (
                    "إنشاء حساب"
                  )}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 text-sm text-center">
                  هل لديك حساب بالفعل؟
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="w-full text-indigo-600 hover:text-indigo-700 font-semibold py-2 mt-2"
                >
                  دخول
                </button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-700 mb-3">
                تم إنشاء الحساب بنجاح!
              </h2>
              <p className="text-gray-600 mb-6">
                يرجى التحقق من بريدك الإلكتروني لتأكيد حسابك قبل الدخول.
              </p>
              <p className="text-gray-500 text-sm mb-6">
                تم إرسال رابط التأكيد إلى:
                <br />
                <span className="font-semibold text-gray-700">
                  {formData.email}
                </span>
              </p>

              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all"
              >
                إذهب للدخول
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
