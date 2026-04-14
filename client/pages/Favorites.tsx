/**
 * Favorites Page - View and manage favorite products
 * Route: /favorites
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

import Layout from "@/components/Layout";
import { useFavorites } from "@/context/FavoritesContext";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/services/productService";
import type { ProductDetail } from "@/types";

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useFavorites();
  const { addToCart } = useCart();

  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [loading, setLoading] = useState(true);

  // Load favorite products
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const loadedProducts: ProductDetail[] = [];

        for (const productId of favorites) {
          const product = await getProductById(productId);
          if (product) {
            loadedProducts.push(product);
          }
        }

        setProducts(loadedProducts);
      } catch (error) {
        console.error("Error loading favorites:", error);
        toast.error("Erreur lors du chargement des favoris");
      } finally {
        setLoading(false);
      }
    };

    if (favorites.length > 0) {
      loadFavorites();
    } else {
      setLoading(false);
    }
  }, [favorites]);

  const handleRemoveFavorite = async (productId: string) => {
    await removeFavorite(productId);
  };

  const handleQuickAdd = (product: ProductDetail) => {
    if (!product.variants || product.variants.length === 0) {
      toast.error("Ce produit n'a pas de variantes disponibles");
      return;
    }

    if (!product.patterns || product.patterns.length === 0) {
      toast.error("Ce produit n'a pas de motifs disponibles");
      return;
    }

    // Add first variant and pattern
    const cartItem = {
      id: crypto.randomUUID(),
      productId: product.id,
      productName: product.name,
      variantId: product.variants[0].id,
      variantSize: product.variants[0].size,
      patternId: product.patterns[0].id,
      patternName: product.patterns[0].name,
      price: product.variants[0].price,
      quantity: 1,
      imageUrl: product.imageUrl,
    };

    addToCart(cartItem);
  };

  const handleViewProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Mes Favoris</h1>
          <p className="text-gray-600 mt-2">
            {favorites.length} produit{favorites.length !== 1 ? "s" : ""} ajouté{favorites.length !== 1 ? "s" : ""}
          </p>
        </div>

        {products.length === 0 ? (
          <Card className="p-12 text-center bg-gray-50 border-gray-200">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Aucun favori</h2>
            <p className="text-gray-600 mb-6">
              Vous n'avez pas encore ajouté de produits à vos favoris.
            </p>
            <Button
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowRight className="h-4 w-4" />
              Continuer le shopping
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-gray-100 aspect-square">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => handleViewProduct(product.id)}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/300x300?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-500">Image non disponible</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">
                      {product.category}
                    </p>
                    <h3 className="font-bold text-gray-900 line-clamp-2 mt-1">
                      {product.name}
                    </h3>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-blue-600">
                      {product.basePrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">MAD</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewProduct(product.id)}
                      className="flex-1"
                    >
                      Voir
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleQuickAdd(product)}
                      className="flex-1 gap-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Ajouter
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFavorite(product.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Heart className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
