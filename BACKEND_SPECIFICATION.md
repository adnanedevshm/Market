# 🔧 SPÉCIFICATION COMPLÈTE DU BACKEND

## 📋 TABLE DES MATIÈRES
1. [Architecture globale](#architecture-globale)
2. [Configuration PayPal](#configuration-paypal)
3. [Configuration Supabase](#configuration-supabase)
4. [Endpoints API](#endpoints-api)
5. [Variables d'environnement](#variables-denvironnement)
6. [Authentification & Sécurité](#authentification--sécurité)
7. [Schéma de base de données](#schéma-de-base-de-données)
8. [Déploiement](#déploiement)

---

## Architecture globale

### Stack Backend
- **Framework**: Express.js (Node.js)
- **Database**: PostgreSQL (via Supabase)
- **Payment**: PayPal API (Sandbox & Production)
- **Storage**: Supabase Storage (images, fichiers)
- **Hosting**: Vercel ou Netlify (avec MCP)
- **Auth**: Supabase Auth + JWT tokens

### Flux de requête
```
Client Frontend
    ↓
Fetch API Call
    ↓
Express Server (port 8080)
    ↓
Supabase Database / PayPal API / External Services
    ↓
Response JSON
    ↓
Frontend (React)
```

---

## Configuration PayPal

### 1. Obtenir les credentials PayPal

**SANDBOX (Développement)**
1. Aller sur: https://developer.paypal.com/dashboard
2. Login avec compte PayPal Developer
3. Aller à "Apps & Credentials"
4. Sélectionner "Sandbox" (dropdown en haut)
5. Copier:
   - `Client ID` (commence par "AXD...")
   - `Secret` (commence par "EKn...")

**PRODUCTION (Avant de déployer)**
1. Même processus mais sélectionner "Live" au lieu de "Sandbox"
2. Utiliser ces credentials en production UNIQUEMENT

### 2. Variables d'environnement PayPal

```env
# .env (development/sandbox)
VITE_PAYPAL_CLIENT_ID=AXDIjQ0xuS2k0hyHnD2X6G5wNboByxvCj4uMiZQYZFuZP6RxqEQrsb0y-xEXQFYPVFbO9RuaXvhxDiJI
PAYPAL_CLIENT_SECRET=EKn1Ud0ggFKdQp6Ku5w0UrgzW85gJtwlb-486uN1QV99YJH6ENs1pW78MIXVH3QlVlDjAYE3kKODHAhV
VITE_PAYPAL_MODE=sandbox

# Production (à ajouter lors du déploiement)
VITE_PAYPAL_CLIENT_ID=<LIVE_CLIENT_ID>
PAYPAL_CLIENT_SECRET=<LIVE_SECRET>
VITE_PAYPAL_MODE=production
```

### 3. Endpoints PayPal utilisés

| Endpoint | Méthode | Utilité |
|----------|---------|---------|
| `/oauth2/token` | POST | Obtenir access token |
| `/checkout/orders` | POST | Créer une commande |
| `/checkout/orders/{id}/capture` | POST | Capturer le paiement |
| `/checkout/orders/{id}` | GET | Vérifier le statut |

---

## Configuration Supabase

### 1. Créer un projet Supabase

1. Aller sur: https://supabase.com
2. Click "New Project"
3. Sélectionner région (préférer Europe)
4. Copier:
   - `Project URL`
   - `Anon Key` (public, pour client)
   - `Service Role Key` (secret, pour serveur)

### 2. Variables d'environnement Supabase

```env
# Client-side (visible, safe for public)
VITE_SUPABASE_URL=https://hjdahlbicvyujgiecuqr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Server-side (SECRET, ne jamais partager)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. RLS (Row Level Security)

**⚠️ IMPORTANT**: Configurer RLS policies pour chaque table

```sql
-- users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  USING (auth.uid() = id);

-- orders table
CREATE POLICY "Users can view their own orders"
  ON orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- user_favorites table
CREATE POLICY "Users can manage their favorites"
  ON user_favorites
  FOR ALL
  USING (auth.uid() = user_id);
```

---

## Endpoints API

### 1. PayPal Endpoints

#### POST /api/paypal/order
**Description**: Créer une commande PayPal
**Auth**: Non (mais sécuriser avec CSRF token)
**Body**:
```json
{
  "amount": 250,
  "currency": "MAD",
  "description": "Achat produit SHM"
}
```
**Response**:
```json
{
  "success": true,
  "paypalOrderId": "7A82434..."
}
```

#### POST /api/paypal/capture
**Description**: Capturer un paiement PayPal
**Auth**: JWT (utilisateur connecté)
**Body**:
```json
{
  "paypalOrderId": "7A82434..."
}
```
**Response**:
```json
{
  "success": true,
  "transactionId": "5FJ82..."
}
```

#### GET /api/paypal/verify/:orderid
**Description**: Vérifier le statut d'une commande
**Auth**: JWT
**Response**:
```json
{
  "status": "COMPLETED",
  "amount": 250,
  "currency": "MAD"
}
```

---

### 2. Orders Endpoints

#### POST /api/orders
**Description**: Créer une commande
**Auth**: JWT
**Body**:
```json
{
  "items": [
    {
      "productId": "kit1",
      "productName": "حزمة الإسعافات",
      "quantity": 1,
      "price": 300
    }
  ],
  "total": 300,
  "city": "Casablanca",
  "address": "Rue X, Quartier Y",
  "paymentMethod": "paypal",
  "paypalOrderId": "7A82434..."
}
```
**Response**:
```json
{
  "success": true,
  "orderId": "uuid-123-456"
}
```

#### GET /api/orders/:id
**Description**: Récupérer une commande
**Auth**: JWT
**Response**:
```json
{
  "id": "uuid-123-456",
  "userId": "user-uuid",
  "totalPrice": 300,
  "status": "confirmed",
  "items": [...]
}
```

#### GET /api/orders
**Description**: Récupérer toutes les commandes de l'utilisateur
**Auth**: JWT
**Response**:
```json
[
  {
    "id": "uuid-123-456",
    "totalPrice": 300,
    "status": "confirmed"
  }
]
```

---

### 3. Products Endpoints

#### GET /api/products
**Description**: Récupérer tous les produits (ou par catégorie)
**Auth**: Non
**Query**: `?category=Medical`
**Response**:
```json
[
  {
    "id": "kit1",
    "name": "حزمة الإسعافات",
    "price": 300,
    "category": "Medical"
  }
]
```

#### GET /api/products/:id
**Description**: Récupérer un produit
**Auth**: Non
**Response**:
```json
{
  "id": "kit1",
  "name": "حزمة الإسعافات",
  "price": 300,
  "description": "..."
}
```

---

### 4. User Endpoints

#### POST /api/auth/register
**Description**: Créer un nouvel utilisateur
**Auth**: Non
**Body**:
```json
{
  "email": "user@example.com",
  "password": "securePass123!",
  "nom": "Ahmed",
  "prenom": "Ali",
  "telephone": "+212600000000",
  "ville": "Casablanca"
}
```
**Response**:
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

#### POST /api/auth/login
**Description**: Authentifier un utilisateur
**Auth**: Non
**Body**:
```json
{
  "email": "user@example.com",
  "password": "securePass123!"
}
```
**Response**:
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

---

## Variables d'environnement

### .env (à la racine du projet)
```env
# ============ PAYPAL ============
VITE_PAYPAL_CLIENT_ID=AXDIjQ0xuS2k0hyHnD2X6G5wNboByxvCj4uMiZQYZFuZP6RxqEQrsb0y-xEXQFYPVFbO9RuaXvhxDiJI
PAYPAL_CLIENT_SECRET=EKn1Ud0ggFKdQp6Ku5w0UrgzW85gJtwlb-486uN1QV99YJH6ENs1pW78MIXVH3QlVlDjAYE3kKODHAhV
VITE_PAYPAL_MODE=sandbox

# ============ SUPABASE ============
VITE_SUPABASE_URL=https://hjdahlbicvyujgiecuqr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ============ TWILIO (Optionnel) ============
VITE_TWILIO_ACCOUNT_SID=AC263...
VITE_TWILIO_AUTH_TOKEN=e6a72...
VITE_TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
VITE_TWILIO_WHATSAPP_TO=whatsapp:+212612989463

# ============ GENERAL ============
NODE_ENV=development
VITE_PUBLIC_BUILDER_KEY=__BUILDER_PUBLIC_KEY__
PING_MESSAGE="ping pong"
```

### Secrets Netlify/Vercel
Ajouter les mêmes variables dans le dashboard du provider:
- Settings → Environment Variables
- Les clés públiques (VITE_*) sont aussi accessibles au client

---

## Authentification & Sécurité

### 1. JWT Token Flow

```
Login Request
    ↓
Server vérifie credentials Supabase Auth
    ↓
Supabase retourne JWT token
    ↓
Client stocke token en localStorage (ou HttpOnly cookie)
    ↓
Requêtes ultérieures envoient token en header:
Authorization: Bearer <TOKEN>
```

### 2. CORS Configuration

```javascript
// server/index.ts
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://76bf0f6a3e83486c91000ccc0a90f600-polar-continent-cqxvmtbu.builderio.xyz',
    'https://shm-marketplace.vercel.app' // Production URL
  ],
  credentials: true
}));
```

### 3. Validation & Sanitization

```javascript
// Toujours valider avec Zod
import { z } from 'zod';

const CreateOrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1),
    quantity: z.number().int().positive()
  })).min(1),
  total: z.number().positive(),
  paymentMethod: z.enum(['paypal', 'cash'])
});

// Utiliser dans les routes
export const handleOrder = async (req, res) => {
  try {
    const data = CreateOrderSchema.parse(req.body);
    // ... sûr maintenant
  } catch (error) {
    return res.status(400).json({ error: 'Invalid data' });
  }
};
```

---

## Schéma de base de données

### Tables principales

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  nom TEXT NOT NULL,
  prenom TEXT NOT NULL,
  telephone TEXT,
  ville TEXT,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'normal' CHECK (role IN ('normal', 'scout', 'admin')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  paypal_order_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Favorites
CREATE TABLE user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);
```

### Indexes importants

```sql
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_paypal_order_id ON orders(paypal_order_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_user_favorites_user_id ON user_favorites(user_id);
```

---

## Déploiement

### Sur Netlify

1. **Connecter repo GitHub** → Netlify
2. **Build command**: `npm run build`
3. **Publish directory**: `dist`
4. **Environment variables** dans Settings:
   - VITE_PAYPAL_CLIENT_ID
   - PAYPAL_CLIENT_SECRET
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY

5. **Configurer Serverless Functions** (optionnel):
```javascript
// netlify/functions/api.js
exports.handler = async (event, context) => {
  // Express app wrapper
  return expressApp(event, context);
};
```

### Sur Vercel

1. **Connecter repo GitHub** → Vercel
2. **Environment variables** dans Settings
3. **Build command** détecté automatiquement
4. **Functions** s'exécutent automatiquement dans `/api`

---

## Checklist de configuration

- [ ] Créer projet Supabase
- [ ] Récupérer credentials PayPal (Sandbox)
- [ ] Copier variables d'environnement dans .env
- [ ] Exécuter migration SQL pour créer tables
- [ ] Configurer RLS policies dans Supabase
- [ ] Tester endpoints PayPal localement
- [ ] Tester endpoints Supabase localement
- [ ] Configurer CORS pour domaine de production
- [ ] Tester flux complet: Produit → Panier → PayPal → Commande
- [ ] Déployer sur Netlify/Vercel
- [ ] Ajouter variables d'environnement production
- [ ] Tester paiement en Sandbox sur production

---

## Support & Debugging

### Erreurs PayPal courantes

| Erreur | Cause | Solution |
|--------|-------|----------|
| 406 Not Acceptable | Headers mal formés | Vérifier Content-Type, Authorization |
| 401 Unauthorized | Credentials invalides | Vérifier CLIENT_ID & SECRET |
| 400 Bad Request | Montant/devise invalides | Vérifier format montant |

### Erreurs Supabase courantes

| Erreur | Cause | Solution |
|--------|-------|----------|
| Table does not exist | Nom de table incorrect | Vérifier `user_favorites` vs `favorites` |
| No relation found | Foreign key manquante | Créer la table référencée |
| RLS violation | Pas d'accès utilisateur | Configurer policies RLS |

---

## Ressources utiles

- PayPal Developer: https://developer.paypal.com
- Supabase Docs: https://supabase.com/docs
- Express.js: https://expressjs.com
- Zod Validation: https://zod.dev
- JWT Tokens: https://jwt.io
