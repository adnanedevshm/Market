import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import { Mail, Loader, CheckCircle, AlertCircle, Lock } from "lucide-react";
import { toast } from "sonner";

type AuthMode = "method" | "email" | "password" | "otp" | "success";
type LoginMethod = "password" | "otp";

export default function LoginAuth() {
  const navigate = useNavigate();
  const { signInWithOtp, verifyOtp, signIn, user } = useAuth();

  const [mode, setMode] = useState<AuthMode>("method");
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authMethod, setAuthMethod] = useState<"otp" | "magic">("otp");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSignInWithPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        const errorMsg = error.message || "Erreur de connexion";
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        toast.success("Connexion réussie !");
        setMode("success");
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Une erreur est survenue";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await signInWithOtp(email);
      if (error) {
        const errorMsg = error.message || "Erreur d'envoi du code OTP";
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        toast.success("Code envoyé à votre adresse email !");
        if (authMethod === "otp") {
          setMode("otp");
        } else {
          setMode("success");
        }
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Une erreur est survenue";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) {
      setError("الرجاء إدخال الرمز");
      toast.error("الرجاء إدخال الرمز");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await verifyOtp(email, otpCode);
      if (error) {
        const errorMsg = error.message || "Erreur de vérification du code";
        setError(errorMsg);
        toast.error(errorMsg);
      } else {
        toast.success("Authentification réussie !");
        setMode("success");
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Une erreur est survenue";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Lock className="w-8 h-8 text-white" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              🔐 تسجيل الدخول
            </h1>
          </div>
        </div>
      </section>

      {/* Login Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {mode === "method" && (
            // Method selector
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                الدخول
              </h2>
              <p className="text-gray-600 mb-6">
                اختر طريقة الدخول المفضلة لديك
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setMode("password");
                    setLoginMethod("password");
                    setEmail("");
                    setPassword("");
                    setError(null);
                  }}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  دخول بكلمة المرور
                </button>

                <button
                  onClick={() => {
                    setMode("email");
                    setLoginMethod("otp");
                    setEmail("");
                    setError(null);
                  }}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  دخول برمز بريد إلكتروني
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 text-sm text-center mb-4">
                  ليس لديك حساب؟
                </p>
                <button
                  onClick={() => navigate("/register")}
                  className="w-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-4 rounded-lg transition-all"
                >
                  إنشاء حساب جديد
                </button>
              </div>
            </div>
          )}

          {mode === "password" && (
            // Password login form
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                دخول بكلمة المرور
              </h2>
              <p className="text-gray-600 mb-6">
                أدخل بريدك الإلكتروني وكلمة المرور
              </p>

              <form onSubmit={handleSignInWithPassword} className="space-y-4">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email-password"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    البريد الإلكتروني *
                  </label>
                  <input
                    id="email-password"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password-login"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    كلمة المرور *
                  </label>
                  <input
                    id="password-login"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
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
                  disabled={loading || !email || !password}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      جاري الدخول...
                    </>
                  ) : (
                    "دخول"
                  )}
                </button>
              </form>

              <div className="mt-4 space-y-2">
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="block w-full text-center text-indigo-600 hover:text-indigo-700 text-sm font-semibold"
                >
                  نسيت كلمة المرور؟
                </button>
                <button
                  onClick={() => {
                    setMode("method");
                    setEmail("");
                    setPassword("");
                    setError(null);
                  }}
                  className="block w-full text-center text-gray-600 hover:text-gray-700 text-sm font-semibold"
                >
                  ← اختر طريقة أخرى
                </button>
              </div>
            </div>
          )}

          {mode === "email" && (
            // Email input form
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                الدخول بسهولة
              </h2>
              <p className="text-gray-600 mb-6">
                لا توجد كلمات مرور - نستخدم رسائل البريد الإلكتروني الآمنة فقط
              </p>

              {/* Auth Method Selector */}
              <div className="mb-6 flex gap-3">
                <label className="flex-1 flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="authMethod"
                    value="otp"
                    checked={authMethod === "otp"}
                    onChange={() => setAuthMethod("otp")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    رمز PIN
                  </span>
                </label>
                <label className="flex-1 flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="authMethod"
                    value="magic"
                    checked={authMethod === "magic"}
                    onChange={() => setAuthMethod("magic")}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    رابط سحري
                  </span>
                </label>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-4">
                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    عنوان بريدك الإلكتروني *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="your@email.com"
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
                  disabled={loading || !email}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      جاري الإرسال...
                    </>
                  ) : authMethod === "otp" ? (
                    "إرسال الرمز"
                  ) : (
                    "إرسال الرابط"
                  )}
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                {authMethod === "otp"
                  ? "سنرسل لك رمز PIN مؤقت"
                  : "سنرسل لك رابطاً سحرياً للدخول"}
              </p>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-600 text-sm text-center">
                  ليس لديك حساب؟
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="w-full text-indigo-600 hover:text-indigo-700 font-semibold py-2 mt-2"
                >
                  إنشاء حساب جديد
                </button>
              </div>
            </div>
          )}

          {mode === "otp" && authMethod === "otp" && (
            // OTP verification form
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-2">
                أدخل الرمز
              </h2>
              <p className="text-gray-600 mb-6">
                أرسلنا رمز PIN مؤقت إلى{" "}
                <span className="font-semibold text-gray-700">{email}</span>
              </p>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                {/* OTP Input */}
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    رمز PIN (6 أرقام) *
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otpCode}
                    onChange={(e) =>
                      setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    maxLength={6}
                    disabled={loading}
                    className="w-full px-4 py-3 text-center text-2xl tracking-widest border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed font-mono"
                    placeholder="000000"
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
                  disabled={loading || otpCode.length !== 6}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      جاري التحقق...
                    </>
                  ) : (
                    "✓ تحقق من الرمز"
                  )}
                </button>

                {/* Back Button */}
                <button
                  type="button"
                  onClick={() => {
                    setMode("email");
                    setOtpCode("");
                    setError(null);
                  }}
                  className="w-full text-indigo-600 font-semibold py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  ← استخدم بريد إلكتروني آخر
                </button>
              </form>
            </div>
          )}

          {mode === "success" && (
            // Success message
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-700 mb-3">
                {authMethod === "otp"
                  ? "تم التحقق بنجاح!"
                  : "تحقق من بريدك الإلكتروني"}
              </h2>
              <p className="text-gray-600 mb-6">
                {authMethod === "otp"
                  ? "تم تسجيل دخولك بنجاح. سيتم توجيهك الآن..."
                  : "أرسلنا لك رابطاً سحرياً. انقر عليه في بريدك الإلكتروني للدخول."}
              </p>

              {authMethod === "otp" && (
                <button
                  onClick={() => navigate("/")}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-all"
                >
                  ابدأ التسوق الآن
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
