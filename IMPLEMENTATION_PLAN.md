# Plan d'Implémentation E-Commerce Complet

## 📊 État Actuel du Projet
- ✅ Structure React 18 + Vite + TailwindCSS
- ✅ React Router 6 avec routing complet
- ✅ CartContext et AuthContext existants
- ✅ Supabase intégré
- ✅ Composants UI (Radix UI)
- ✅ FloatingCartButton et pages de base
- ⚠️ À améliorer : Services manquants, types incomplets, PayPal non complet

## 🎯 Architecture Finale (Structure existante /client)

```
client/
├── components/
│   ├── Layout.tsx (existant)
│   ├── ProductCard.tsx (à améliorer)
│   ├── SizeSelector.tsx (NOUVEAU)
│   ├── ColorPatternCustomizer.tsx (NOUVEAU)
│   ├── ProductImageGallery.tsx (améliorer)
│   ├── PayPalButton.tsx (existant, à améliorer)
│   └── ui/ (Radix UI)
├── contexts/
│   ├── CartContext.tsx (à améliorer)
│   ├── AuthContext.tsx (existant, bon état)
│   └── FavoritesContext.tsx (NOUVEAU)
├── pages/
│   ├── Home.tsx (existant)
│   ├── ProductDetail.tsx (NOUVEAU - générique)
│   ├── Cart.tsx (existant, à améliorer)
│   ├── Favorites.tsx (NOUVEAU)
│   ├── Donation.tsx (existant, à améliorer)
│   ├── OrderForm.tsx (existant, à améliorer)
│   └── ... (autres pages existantes)
├── services/ (NOUVEAU)
│   ├── supabase.ts
│   ├── productService.ts
│   ├── orderService.ts
│   └── paymentService.ts
├── types/ (NOUVEAU)
│   ├── product.ts
│   ├── order.ts
│   ├── user.ts
│   └── variant.ts
├── lib/ (NOUVEAU)
│   ├── constants.ts
│   └── utils.ts
└── data/ (existant, à remplacer par DB)
```

## 📋 Phases d'Implémentation

### PHASE 1 : Types & Services Fondamentaux
1. ✅ Créer tous les types TypeScript
2. ✅ Créer les services (product, order, payment)
3. ✅ Configurer Supabase client + admin

### PHASE 2 : Base de Données Supabase
1. ✅ SQL schema pour users, products, variants, patterns, orders
2. ✅ RLS policies
3. ✅ Indexes pour performance

### PHASE 3 : Contextes & État Global
1. ✅ Améliorer CartContext (persistence localStorage + Supabase)
2. ✅ Créer FavoritesContext
3. ✅ Vérifier AuthContext

### PHASE 4 : Composants UI Critiques
1. ✅ SizeSelector
2. ✅ ColorPatternCustomizer
3. ✅ ProductImageGallery amélioré
4. ✅ ProductCard amélioré

### PHASE 5 : Pages Centrales
1. ✅ ProductDetail (générique avec :id)
2. ✅ Cart amélioré
3. ✅ Favorites
4. ✅ OrderForm amélioré

### PHASE 6 : Paiement
1. ✅ PayPalButton amélioré
2. ✅ Payment Service (generatePayPalLink)
3. ✅ Callback de paiement → création commande

### PHASE 7 : Donation
1. ✅ Page Donation avec PayPal direct
2. ✅ Génération lien PayPal dynamique

### PHASE 8 : Intégrations Finales
1. ✅ Routing complet
2. ✅ Persistence localStorage
3. ✅ Tests flux complet

---

## 🔍 Détails par Composant

### 1. Types TypeScript (`client/types/`)

#### `client/types/product.ts`
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  category: string;
  variants: Variant[];
  patterns: Pattern[];
}

interface Variant {
  id: string;
  productId: string;
  size: string;
  price: number;
  dimensions?: string;
}

interface Pattern {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor?: string;
}
```

#### `client/types/order.ts`
```typescript
interface OrderItem {
  id?: string;
  productId: string;
  variantId: string;
  patternId: string;
  quantity: number;
  price: number;
  productName: string;
}

interface Order {
  id?: string;
  userId?: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  paypalOrderId?: string;
  createdAt?: string;
}
```

#### `client/types/user.ts`
```typescript
interface User {
  id: string;
  email: string;
  nom?: string;
  prenom?: string;
  telephone?: string;
  ville?: string;
  avatar?: string;
  createdAt?: string;
}
```

---

### 2. Services (`client/services/`)

#### `client/services/productService.ts`
```typescript
// getProducts()
// getProductById(id)
// getVariants(productId)
// getPatterns()
```

#### `client/services/orderService.ts`
```typescript
// createOrder(order: Order)
// getUserOrders(userId)
// updateOrderStatus(orderId, status)
```

#### `client/services/paymentService.ts`
```typescript
// generatePayPalLink(orderTotal)
// verifyPaypalPayment(paypalOrderId)
// createPaypalOrder(amount, description)
```

---

### 3. CartContext Amélioré

**Fonctionnalités:**
- addItem(product, variant, pattern, quantity)
- updateQuantity(id, quantity)
- removeItem(id)
- clearCart()
- getTotal()
- **Persistence:** localStorage + sync avec DB si authentifié

---

### 4. FavoritesContext (NOUVEAU)

**Fonctionnalités:**
- addFavorite(productId)
- removeFavorite(productId)
- isFavorite(productId)
- getFavorites()
- **Persistence:** localStorage + table `user_favorites` si authentifié

---

### 5. Composants UI Nouveaux

#### SizeSelector
- Liste des tailles disponibles
- Selection avec callback
- Validation obligatoire

#### ColorPatternCustomizer
- Sélecteur de couleur/motif
- Preview dynamique
- Validation obligatoire

---

### 6. Page ProductDetail (Générique)

**Route:** `/product/:id`

**Logique:**
1. Charger produit via `productService.getProductById(id)`
2. Afficher image, nom, description
3. Afficher variants (tailles)
4. Afficher patterns (couleurs/motifs)
5. Calcul prix dynamique
6. Gestion quantité
7. Validation : taille + pattern obligatoires
8. Bouton "Ajouter au panier" → CartContext

---

### 7. Page Cart Améliorée

**Fonctionnalités:**
- Liste items avec image, variante, prix, quantité
- Actions: +/-, supprimer, vider
- Calcul total dynamique
- Toggle "personnalisation avancée"
- Bouton "Passer la commande" → OrderForm Modal

---

### 8. Page Favorites (NOUVELLE)

**Route:** `/favorites`

**Fonctionnalités:**
- Afficher produits favoris
- Bouton + pour ajouter au panier
- Bouton X pour retirer des favoris
- Fallback "Aucun favori"

---

### 9. OrderForm Amélioré

**Fonctionnalités:**
- Champs: nom, prénom, email, téléphone, adresse
- Validation complète (Zod)
- Récapitulatif commande
- Intégration PayPal
- Après paiement réussi:
  - Créer commande en BD
  - Vider panier
  - Confirmer utilisateur
  - Rediriger

---

### 10. PayPalButton Amélioré

**Fonctionnalités:**
- Intégrer Smart Buttons
- Générer ordre PayPal avec montant total
- onSuccess callback → créer commande
- Error handling avec toast
- Disable jusqu'à ce que commande soit valide

---

### 11. Page Donation

**Route:** `/donation`

**Fonctionnalités:**
- Choix montant (prédéfini + custom)
- Choix type (bébé, hôpital, SDF, etc)
- Générer lien PayPal direct
- Pas de panier, paiement immédiat
- Confirmation post-paiement

---

## 🗄️ Schéma Base de Données

```sql
-- users (existe déjà via Supabase Auth)
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT NOT NULL UNIQUE,
  nom TEXT,
  prenom TEXT,
  telephone TEXT,
  ville TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  base_price DECIMAL NOT NULL CHECK (base_price > 0),
  image_url TEXT,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- variants (tailles)
CREATE TABLE public.variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size TEXT NOT NULL,
  price DECIMAL NOT NULL CHECK (price > 0),
  dimensions TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- patterns (couleurs/motifs)
CREATE TABLE public.patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  primary_color TEXT,
  secondary_color TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- orders
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  total DECIMAL NOT NULL CHECK (total > 0),
  status TEXT DEFAULT 'pending',
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  paypal_order_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- order_items
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  variant_id UUID REFERENCES variants(id),
  pattern_id UUID REFERENCES patterns(id),
  quantity INT NOT NULL CHECK (quantity > 0),
  price DECIMAL NOT NULL CHECK (price > 0),
  created_at TIMESTAMP DEFAULT NOW()
);

-- user_favorites (existe déjà)
CREATE TABLE public.user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
```

---

## 🔐 RLS Policies

```sql
-- users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE USING (auth.uid() = id);

-- products table - public read
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT USING (is_active = true);

-- orders table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders"
  ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- user_favorites
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own favorites"
  ON user_favorites FOR ALL USING (auth.uid() = user_id);
```

---

## 📱 Flux Utilisateur Complet

### Flux Achat Produit
1. Home → Navigation
2. Catégorie → Liste produits
3. Clic produit → ProductDetail (/product/:id)
4. Sélectionner taille + pattern
5. Ajouter quantité
6. "Ajouter au panier" → CartContext + localStorage
7. Cart → Review items
8. "Passer la commande" → OrderForm Modal
9. Remplir données client
10. PayPal payment
11. Success → Créer Order en BD → Confirmation

### Flux Donation
1. Home → Section "اعمال خيرية"
2. Lien vers /donation
3. Sélectionner montant + type
4. "Donner maintenant" → Générer lien PayPal
5. PayPal payment
6. Success → Toast de remerciement

---

## 🧪 Checklist de Tests

- [ ] Charger produits depuis BD
- [ ] Ajouter produit au panier
- [ ] Modifier quantité
- [ ] Retirer du panier
- [ ] Ajouter aux favoris
- [ ] Authentification
- [ ] Passer commande
- [ ] Paiement PayPal
- [ ] Créer commande en BD
- [ ] Donation PayPal
- [ ] Persistence localStorage
- [ ] Synchronisation BD si authentifié

---

## 📝 Notes Importantes

1. **ProductDetail générique** : Au lieu de créer une page par produit, créer une seule page `/product/:id` qui charge depuis BD
2. **PayPal dynamique** : Générer ordre avec montant exact chaque fois
3. **Persistence** : localStorage immédiat, sync BD après auth
4. **Images** : Utiliser URLs externes avec lazy loading + fallback
5. **Validation** : Zod partout (formulaires, API, DB)

---

## 📈 Prochaines Étapes Post-MVP

- Système de remise/coupon
- Reviews de produits
- Wishlist avancée
- Tracking de commandes
- Dashboard vendeur
- Gestion stock
- Analytics
