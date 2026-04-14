# ⚙️ SETUP FONCTIONNEL COMPLET

**Status Actuel**: Backend partiellement configuré, API prêtes mais **credentials manquantes**

---

## 🚨 CREDENTIALS CRITIQUES MANQUANTES

### 1. Supabase Service Role Key (OBLIGATOIRE)
Le serveur ne peut pas accéder à Supabase sans cela.

**Où le trouver**:
1. Allez à: https://app.supabase.com/project/hjdahlbicvyujgiecuqr/settings/api
2. Sous "Service Role Key", copez la clé complète
3. Ajoutez à votre environnement:

```bash
# Pour local: ajouter à .env.local
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
VITE_SUPABASE_URL=https://hjdahlbicvyujgiecuqr.supabase.co
```

**Pourquoi c'est critique**:
- Les routes `/api/orders` et `/api/donation` en ont besoin
- Sans elle, les données ne s'enregistrent pas en base

### 2. PayPal Client Secret (OBLIGATOIRE)
Le serveur l'utilise pour communiquer avec PayPal API.

**Où le trouver**:
1. Allez à: https://developer.paypal.com/dashboard
2. Cliquez "Apps & Credentials"
3. Sélectionnez "Sandbox"
4. Sous votre app, cliquez sur l'app name
5. Copez le "Secret"
6. Ajoutez à votre environnement:

```bash
# Pour local: ajouter à .env.local
PAYPAL_CLIENT_SECRET=AYjDjXYYQKJj...
```

**Pourquoi c'est critique**:
- La route `/api/paypal/order` l'utilise
- Sans elle, le serveur ne peut pas créer de commandes PayPal

---

## ✅ CHECKLIST SETUP BACKEND

- [ ] 1. Vérifier que Supabase DB tables existent
  - Allez à Supabase → Table Editor
  - Devriez voir: `users`, `products`, `variants`, `patterns`, `favorites`, `orders`, `order_items`, `donations`

- [ ] 2. Ajouter SUPABASE_SERVICE_ROLE_KEY à l'environnement
  
- [ ] 3. Ajouter PAYPAL_CLIENT_SECRET à l'environnement

- [ ] 4. Redémarrer le serveur dev: `pnpm dev`

- [ ] 5. Tester `/api/ping` dans le browser
  - URL: http://localhost:8080/api/ping
  - Devrait retourner: `{"message":"ping pong"}`

---

## 🧪 TEST DES API ENDPOINTS

### Test 1: PayPal Order Creation
```bash
curl -X POST http://localhost:8080/api/paypal/order \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "currency": "MAD",
    "description": "Test Order"
  }'
```

**Réponse attendue**:
```json
{
  "success": true,
  "paypalOrderId": "XXXXXXX",
  "orderDetails": {...}
}
```

### Test 2: Order Creation
```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": null,
    "items": [
      {
        "productId": "xxx",
        "productName": "Test Product",
        "quantity": 1,
        "price": 100
      }
    ],
    "total": 100,
    "customerName": "Test User",
    "customerEmail": "test@example.com",
    "customerPhone": "+212600000000",
    "customerAddress": "Test Address"
  }'
```

**Réponse attendue**:
```json
{
  "success": true,
  "orderId": "abc-123-xyz",
  "orderData": {...}
}
```

### Test 3: Donation
```bash
curl -X POST http://localhost:8080/api/donation \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50,
    "donationType": "education",
    "donorName": "Test Donor",
    "donorEmail": "donor@example.com",
    "paypalOrderId": "xxxxxxx"
  }'
```

---

## 🔄 FULL E-COMMERCE FLOW TEST

### 1. Utilisateur voit les produits
✅ **Frontend**: Charge depuis Supabase via `productService.ts`
- Logs: "Chargement des produits..."
- Données: Viennent de la table `products`

### 2. Utilisateur ajoute au panier
✅ **Frontend**: Stocké en localStorage (CartContext)
- Pas de backend nécessaire pour le panier

### 3. Utilisateur valide la commande
✅ **Backend Route**: `POST /api/orders`
- Insère dans `orders` table
- Insère dans `order_items` table
- Envoie notifications Twilio
- Capture le paiement PayPal

**Logs attendus**:
```
📝 Processing order creation...
✅ Order data validation passed
✅ Order created in database: abc-123-xyz
💳 Capturing PayPal payment...
✅ PayPal payment captured
📤 Sending admin WhatsApp notification...
✅ Admin notification sent!
```

### 4. Vérifications
**Supabase**: Check `orders` table → nouvelle commande avec `paypal_order_id`
**PayPal**: Check sandbox dashboard → transaction visible
**Twilio**: Check WhatsApp → message reçu

---

## 🐛 TROUBLESHOOTING

### "Supabase server credentials are not set"
**Solution**: Ajouter `SUPABASE_SERVICE_ROLE_KEY` à l'environnement

### "Failed to create PayPal order"
**Causes possibles**:
1. `PAYPAL_CLIENT_SECRET` manquant
2. `VITE_PAYPAL_CLIENT_ID` invalide
3. Connexion internet
4. Limite de requêtes PayPal

**Solution**:
```bash
# Vérifiez que .env.local a:
PAYPAL_CLIENT_ID=Acmi3Wy9PLC4YgTEUvgSC7nCetu57IK4b5dKSo3NblBOMGALn4d1oUm5xYhFjjF2cCb-686fIUJ9i2ey
PAYPAL_CLIENT_SECRET=AYjDjXYYQKJj...
VITE_PAYPAL_MODE=sandbox
```

### "Order not saved to database"
**Causes possibles**:
1. Supabase credentials incorrects
2. Table `orders` n'existe pas
3. RLS policies bloquent l'insertion

**Solution**:
1. Vérifiez Supabase → Table Editor
2. Vérifiez RLS policies: `ALTER TABLE orders ENABLE ROW LEVEL SECURITY;`
3. Vérifiez les logs serveur

### PayPal Button ne s'affiche pas
**Logs à vérifier** (DevTools Console):
```
🔍 renderPayPalButtons called
window.paypal available: true
containerRef.current: true
containerRef.current.isConnected: true
✅ PayPal buttons rendered successfully
```

Si vous voyez "window.paypal available: false", le script PayPal n'a pas chargé.

---

## 📊 ARCHITECTURE FONCTIONNELLE

```
┌─────────────────────────────────────────┐
│        UTILISATEUR (Browser)            │
└────────────────┬────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
┌────────┐ ┌──────────┐ ┌────────────┐
│ Frontend│ │ PayPal  │ │ Supabase   │
│ Routes │ │ Smart   │ │ Products   │
│ & Pages│ │ Buttons │ │ (READ)     │
└────┬───┘ └────┬────┘ └────────────┘
     │         │
     └────┬────┘
          ▼
    ┌─────────────────────┐
    │   Express Server    │
    │   (Backend API)     │
    ├─────────────────────┤
    │ POST /api/orders    │  ← CREATE orders + items
    │ POST /api/paypal/.. │  ← PayPal API calls
    │ POST /api/donation  │  ← Donation inserts
    └──────┬──────────────┘
           │
    ┌──────┼──────────┐
    │      │          │
    ▼      ▼          ▼
 Supabase PayPal    Twilio
 (WRITE) (Verify)   (Notify)
```

---

## 🎯 PROCHAINES ÉTAPES

1. **Setup Credentials** ← PRIORITÉ 1
   - Ajouter SUPABASE_SERVICE_ROLE_KEY
   - Ajouter PAYPAL_CLIENT_SECRET
   - Redémarrer serveur

2. **Tester API Endpoints**
   - Utiliser les curl commands ci-dessus
   - Vérifier les réponses

3. **Test Full Flow**
   - Faire une donation de test
   - Vérifier commande en Supabase
   - Vérifier transaction en PayPal
   - Vérifier WhatsApp reçu

4. **Production Ready**
   - Tous les tests passent
   - Logs console ok
   - Data en Supabase
   - Payments fonctionnels

---

**Important**: Sans les credentials, le backend ne peut pas:
- ❌ Accéder à Supabase
- ❌ Appeler PayPal API
- ❌ Sauvegarder les commandes
- ❌ Envoyer les notifications

Ajoutez-les maintenant pour que tout fonctionne!
