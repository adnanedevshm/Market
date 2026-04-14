import { Link } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, userProfile, signOut, loading } = useAuth();

  const navItems = [
    { label: "SHM", href: "/shm" },
    { label: "الكشافة والتخييم", href: "/scout-camping" },
    { label: "المشاريع", href: "/projects" },
    { label: "الحزم", href: "/packs" },
    { label: "الطبية", href: "/medical" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="shm-gradient sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-white text-xl md:text-2xl font-bold">
              SHM
            </div>
            <div className="hidden sm:block text-white text-sm">Marketplace</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-white hover:text-gray-200 transition-colors font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {!loading && user ? (
              <div className="hidden md:flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-white font-semibold text-sm">
                    {userProfile?.nom || user.email}
                  </span>
                  {userProfile?.role === "scout" && (
                    <span className="text-yellow-300 text-xs">
                      ✓ عضو في الكشافة
                    </span>
                  )}
                </div>
                <button
                  onClick={() => signOut()}
                  className="text-white hover:text-red-200 transition-colors p-2 rounded-lg hover:bg-white/10"
                  title="Déconnexion"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                <User size={18} />
                <span>دخول</span>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-[#6b0000] border-t border-white/20">
            <div className="container mx-auto px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block text-white hover:text-gray-200 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Auth buttons for mobile */}
              <div className="border-t border-white/20 pt-3 mt-3">
                {!loading && user ? (
                  <>
                    <div className="text-white text-sm font-semibold py-2">
                      {userProfile?.nom || user.email}
                      {userProfile?.role === "scout" && (
                        <span className="block text-yellow-300 text-xs">
                          ✓ عضو في الكشافة
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 text-red-300 hover:text-red-200 font-semibold py-2"
                    >
                      <LogOut size={18} />
                      <span>تسجيل الخروج</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center gap-2 text-white hover:text-gray-200 font-semibold py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={18} />
                    <span>دخول</span>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">منصة SHM</h3>
              <p className="text-gray-400 text-sm">
                المعدات، المشاريع، والابتكار
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">التواصل</h3>
              <a
                href="https://wa.me/212675202336"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                WhatsApp: +212 6 75 20 23 36
              </a>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">الروابط</h3>
              <div className="space-y-2 text-sm">
                <Link
                  to="/"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  الرئيسية
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 SHM Marketplace. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
