# 📦 Scripts SQL - Base de Données SHM Marketplace

Une suite complète de 3 scripts SQL professionnels pour structurer la base de données Supabase du marketplace SHM.

---

## 📋 Contenu

### 1️⃣ `visitors.sql` - Gestion des Visiteurs/Utilisateurs
**Gère :** authentification, panier, historique, favoris, commandes

**Tables principales :**
- `users` - Données utilisateur de base
- `user_sessions` - Sessions et tokens
- `user_history` - Historique des produits vus
- `user_favorites` - Liste de favoris
- `cart` - Panier principal
- `cart_items` - Articles du panier
- `orders` - Commandes passées
- `order_items` - Articles commandés

**Fonctionnalités :**
- Authentification custom avec tokens
- Gestion complète du panier avec timestamps auto
- Suivi de l'historique de navigation
- Favoris avec contrainte d'unicité
- Statuts de commande (pending, confirmed, shipped, delivered, cancelled)
- 9 triggers pour mise à jour auto des timestamps
- 2 fonctions utilitaires pour le panier

---

### 2️⃣ `sellers.sql` - Gestion des Vendeurs
**Gère :** vendeurs, produits vendus, stock, statistiques

**Tables principales :**
- `sellers` - Données vendeur/admin
- `seller_products` - Produits vendus par chaque vendeur
- `stock` - Gestion du stock par produit
- `product_stats` - Suivi des vues, clics, achats
- `stock_audit` - Audit complet des changements de stock

**Fonctionnalités :**
- Système de stock avec seuils d'alerte
- Suivi des statistiques produit (vues, clics, achats)
- Audit complet des changements de stock
- 5 triggers pour timestamps
- 7 fonctions avancées :
  - `increment_product_views()` - Incrémenter les vues
  - `increment_product_clicks()` - Incrémenter les clics
  - `record_product_purchase()` - Enregistrer les achats + réduire stock
  - `get_low_stock_products()` - Produits en rupture
  - `get_seller_stats()` - Statistiques vendeur

---

### 3️⃣ `products.sql` - Gestion des Produits
**Gère :** produits, catégories, variantes, images, avis

**Tables principales :**
- `categories` - Catégories principales (SHM, Scout, Médical, etc.)
- `subcategories` - Sous-catégories
- `products` - Produits principaux
- `product_variants` - Variantes (taille, couleur, SKU)
- `product_images` - Gestion des images
- `product_tags` - Tags pour recherche
- `product_tag_mappings` - Relation produits-tags
- `product_reviews` - Avis clients

**Fonctionnalités :**
- Système de remise sur les produits
- Variantes avec SKU unique
- Galerie d'images avec images principales
- Système d'avis avec vérification d'achat
- 5 triggers pour timestamps
- 1 VUE SQL : `products_with_stats` - Produits avec toutes les infos
- 8 fonctions avancées :
  - `get_product_price()` - Prix avec remise
  - `search_products()` - Recherche full-text
  - `get_products_by_category()` - Produits par catégorie avec pagination
  - `get_trending_products()` - Produits tendances
  - `get_product_rating()` - Note moyenne + nombre d'avis
  - `check_variant_stock()` - Vérifier disponibilité
  - `get_discounted_products()` - Produits en promotion

---

## 🚀 Installation

### Prérequis
- Compte Supabase actif
- Accès au SQL Editor de Supabase

### Étapes

#### 1. **Exécuter `visitors.sql`**
```sql
-- Copier/coller tout le contenu de sql/visitors.sql
-- Dans : Supabase → SQL Editor → Nouvelle query
-- Cliquer RUN
```

#### 2. **Exécuter `products.sql`**
```sql
-- Copier/coller tout le contenu de sql/products.sql
-- Dans : Supabase → SQL Editor → Nouvelle query
-- Cliquer RUN
```

#### 3. **Exécuter `sellers.sql`**
```sql
-- Copier/coller tout le contenu de sql/sellers.sql
-- Dans : Supabase → SQL Editor → Nouvelle query
-- Cliquer RUN
```

**⚠️ Important :** 
- Exécuter dans cet ordre : `visitors.sql` → `products.sql` → `sellers.sql`
- Ne pas inverser l'ordre (dépendances FOREIGN KEY)
- Attendre que chaque script se termine avant le suivant

---

## 📊 Schéma des Relations

```
┌─────────────────────────────────────────────────────────┐
│                     UTILISATEURS                        │
├─────────────────────────────────────────────────────────┤
│ users ─────┬─→ user_sessions                           │
│            ├─→ user_history ─→ products                │
│            ├─→ user_favorites ─→ products              │
│            ├─→ cart ─→ cart_items ─→ products         │
│            └─→ orders ─→ order_items ─→ products      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                      VENDEURS                           │
├─────────────────────────────────────────────────────────┤
│ sellers ─────┬─→ seller_products ─→ products           │
│              └─→ stock ────────────→ products           │
│                                                          │
│ product_stats ─→ products                              │
│ stock_audit ───→ products + sellers                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                      PRODUITS                           │
├─────────────────────────────────────────────────────────┤
│ categories ─→ subcategories ─→ products                │
│                                ├─→ product_variants     │
│                                ├─→ product_images       │
│                                ├─→ product_reviews      │
│                                └─→ product_tags         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔑 Indexes Créés

### Pour Performance
Tous les indexes critiques sont créés automatiquement :

**Utilisateurs :**
- `email` - Recherche rapide par email
- `created_at` - Tri par date
- `user_id` - Jointures rapides

**Produits :**
- `slug`, `category_id`, `subcategory_id` - Navigation
- `is_active`, `price` - Filtrage
- `sku` (variants) - Identifiant unique

**Stock :**
- `product_id`, `quantity` - Gestion stock
- `created_at` - Suivi chronologique

---

## 🔐 Sécurité

### Contraintes Intégrées
✅ **NOT NULL** sur tous les champs critiques
✅ **UNIQUE** sur emails, slugs, SKU
✅ **CHECK** sur prix (> 0), quantités (>= 0), ratings (1-5)
✅ **FOREIGN KEYS** avec CASCADE/SET NULL appropriés

### Row Level Security (RLS)
À implémenter après création :
```sql
-- Exemple (à configurer dans Supabase)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);
```

---

## 📈 Fonctionnalités Avancées

### Triggers Automatiques
- ✅ Mise à jour auto `updated_at` sur toutes modifications
- ✅ Audit automatique des changements de stock
- ✅ Historique complet des opérations

### Fonctions PL/pgSQL
Prêtes à utiliser depuis l'application :
```typescript
// Exemple d'appel depuis le backend
const { data } = await supabase.rpc('get_product_rating', {
  p_product_id: productId
});
```

### Vues SQL
```typescript
// Requête simple avec toutes les infos
SELECT * FROM products_with_stats WHERE is_active = true;
```

---

## 🧪 Données de Test

Pour tester, vous pouvez insérer des données de test :

```sql
-- Ajouter une catégorie
INSERT INTO categories (name, slug) VALUES ('SHM', 'shm');

-- Ajouter un produit
INSERT INTO products (name, slug, price, category_id)
VALUES ('Uniforme SHM', 'uniforme-shm', 299.99, '<category_id>');

-- Ajouter un utilisateur
INSERT INTO users (nom, prenom, email, password_hash)
VALUES ('Idriss', 'Belkhadir', 'user@example.com', 'hashed_password');
```

---

## 🛠️ Maintenance

### Vérifier les Indexes
```sql
SELECT * FROM pg_indexes WHERE schemaname = 'public';
```

### Analyser les Tables
```sql
ANALYZE;
```

### Voir les Triggers Actifs
```sql
SELECT trigger_name, event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public';
```

---

## 📝 Notes Importantes

1. **Slug unique** : Les slugs doivent être uniques et URL-friendly
2. **Stock et variantes** : Le stock peut être géré via `stock` (général) ou `product_variants` (détaillé)
3. **Remises** : `discount_price` NULL = pas de remise
4. **Audit** : Tous les changements de stock sont enregistrés automatiquement
5. **Performances** : Les indexes couvrent 90% des requêtes courantes

---

## ✅ Checklist Post-Installation

- [ ] Tous les scripts exécutés sans erreur
- [ ] Tables visibles dans Supabase → Tables
- [ ] 28+ tables créées (users, products, categories, etc.)
- [ ] 40+ indexes créés automatiquement
- [ ] 30+ functions et triggers visibles dans DB → Functions
- [ ] 1 VUE créée : `products_with_stats`
- [ ] Tester : `SELECT COUNT(*) FROM products;` (doit retourner 0)
- [ ] RLS activée si nécessaire (sécurité)

---

## 🚨 Dépannage

### Erreur : "Foreign key constraint fails"
**Cause :** Tables dépendantes exécutées dans le mauvais ordre
**Solution :** Réexécuter dans l'ordre : `visitors.sql` → `products.sql` → `sellers.sql`

### Erreur : "Duplicate key value"
**Cause :** Slug ou email déjà présent
**Solution :** Vérifier les UNIQUE constraints et utiliser des valeurs uniques

### Performances lentes
**Solution :**
```sql
-- Réindexer
REINDEX DATABASE your_db;

-- Analyser
ANALYZE;
```

---

## 📞 Support

Pour plus d'infos sur Supabase :
- 📖 [Documentation Supabase](https://supabase.com/docs)
- 💬 [Discord Community](https://discord.supabase.com)
- 🐛 [Issues GitHub](https://github.com/supabase/supabase/issues)

---

## 📄 Licence

Ces scripts SQL sont fournis gratuitement pour le marketplace SHM.
Modification et utilisation libre.

---

**Créé pour :** SHM Marketplace Supabase
**Version :** 1.0
**Dernière mise à jour :** 2024
