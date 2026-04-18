import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import FloatingCartButton from "@/components/FloatingCartButton";

// Pages
import Home from "./pages/Home";

// SHM Pages
import SHM from "./pages/SHM";
import SHMAccessories from "./pages/SHMAccessories";
import SHMUniform from "./pages/SHMUniform";

// Scout & Camping Pages
import ScoutCamping from "./pages/ScoutCamping";
import ScoutEquipment from "./pages/ScoutEquipment";
import ScoutKits from "./pages/ScoutKits";
import ScoutClothing from "./pages/ScoutClothing";
import ScoutCommunication from "./pages/ScoutCommunication";
import ScoutHiking from "./pages/ScoutHiking";

// Medical Pages
import Medical from "./pages/Medical";
import MedicalDevices from "./pages/MedicalDevices";
import MedicalKits from "./pages/MedicalKits";

// Projects Pages
import Projects from "./pages/Projects";
import ProjectsPrinting from "./pages/ProjectsPrinting";
import ProjectsPottery from "./pages/ProjectsPottery";
import ProjectsStickers from "./pages/ProjectsStickers";

// Packs Pages
import Packs from "./pages/Packs";
import PacksHoussypiye from "./pages/PacksHoussypiye";
import PacksHadaya from "./pages/PacksHadaya";
import PacksSpecialize from "./pages/PacksSpecialize";

// Order and Cart Pages
import Cart from "./pages/Cart";
import OrderForm from "./pages/OrderForm";

// Product Detail Pages
import SHMUniformCompletPage from "./pages/products/SHMUniformComplet";
import SHMBowtie from "./pages/products/SHMBowtie";
import SHMBadgesPage from "./pages/products/SHMBadges";
import ScoutTentPage from "./pages/products/ScoutTent";
import ScoutBackpackPage from "./pages/products/ScoutBackpack";
import ScoutSleepingBagPage from "./pages/products/ScoutSleepingBag";
import MedicalKitPage from "./pages/products/MedicalKit";
import MedicalThermometerPage from "./pages/products/MedicalThermometer";
import ProjectsPrintingPage from "./pages/products/ProjectsPrinting";
import ProjectsPotteryPage from "./pages/products/ProjectsPottery";
import PacksStarterPage from "./pages/products/PacksStarter";

// Donation Page
import Donation from "./pages/Donation";

// Auth Pages
import LoginAuth from "./pages/LoginAuth";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// Generic Product Detail Page
import ProductDetail from "./pages/ProductDetail";

// Information Pages
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Security from "./pages/Security";

// Favorites Page
import Favorites from "./pages/Favorites";

// 404 Page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <FloatingCartButton />
            <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* SHM Routes */}
          <Route path="/shm" element={<SHM />} />
          <Route path="/shm/accessories" element={<SHMAccessories />} />
          <Route path="/shm/uniform" element={<SHMUniform />} />

          {/* SHM Product Pages */}
          <Route path="/products/shm-uniform-001" element={<SHMUniformCompletPage />} />
          <Route path="/products/shm-accessories-001" element={<SHMBowtie />} />
          <Route path="/products/shm-badges-001" element={<SHMBadgesPage />} />

          {/* Scout & Camping Routes */}
          <Route path="/scout-camping" element={<ScoutCamping />} />
          <Route path="/scout-camping/equipment" element={<ScoutEquipment />} />
          <Route path="/scout-camping/kits" element={<ScoutKits />} />
          <Route path="/scout-camping/clothing" element={<ScoutClothing />} />
          <Route path="/scout-camping/communication" element={<ScoutCommunication />} />
          <Route path="/scout-camping/hiking" element={<ScoutHiking />} />

          {/* Scout Product Pages */}
          <Route path="/products/scout-tent-001" element={<ScoutTentPage />} />
          <Route path="/products/scout-backpack-001" element={<ScoutBackpackPage />} />
          <Route path="/products/scout-sleeping-001" element={<ScoutSleepingBagPage />} />

          {/* Medical Routes */}
          <Route path="/medical" element={<Medical />} />
          <Route path="/medical/devices" element={<MedicalDevices />} />
          <Route path="/medical/kits" element={<MedicalKits />} />

          {/* Medical Product Pages */}
          <Route path="/products/medical-kit-001" element={<MedicalKitPage />} />
          <Route path="/products/medical-thermometer-001" element={<MedicalThermometerPage />} />

          {/* Projects Routes */}
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/printing" element={<ProjectsPrinting />} />
          <Route path="/projects/pottery" element={<ProjectsPottery />} />
          <Route path="/projects/stickers" element={<ProjectsStickers />} />

          {/* Projects Product Pages */}
          <Route path="/products/projects-printing-001" element={<ProjectsPrintingPage />} />
          <Route path="/products/projects-pottery-001" element={<ProjectsPotteryPage />} />

          {/* Packs Routes */}
          <Route path="/packs" element={<Packs />} />
          <Route path="/packs/houssypiye" element={<PacksHoussypiye />} />
          <Route path="/packs/housymealhadaya" element={<PacksHadaya />} />
          <Route path="/packs/specialise" element={<PacksSpecialize />} />

          {/* Packs Product Pages */}
          <Route path="/products/packs-starter-001" element={<PacksStarterPage />} />

              {/* Auth Routes */}
              <Route path="/login" element={<LoginAuth />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Product Detail Route (Generic) */}
              <Route path="/product/:id" element={<ProductDetail />} />

              {/* Information Routes */}
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/security" element={<Security />} />

              {/* Favorites Route */}
              <Route path="/favorites" element={<Favorites />} />

              {/* Cart Route */}
              <Route path="/cart" element={<Cart />} />

              {/* Order Route */}
              <Route path="/order" element={<OrderForm />} />

              {/* Donation Route */}
              <Route path="/donation" element={<Donation />} />

              {/* Catch-all 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
