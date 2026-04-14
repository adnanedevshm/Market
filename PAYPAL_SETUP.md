# PayPal Server Configuration

## 🔴 CRITICAL: Missing PayPal Credentials

Le serveur ne peut pas appeler l'API PayPal sans:
1. **VITE_PAYPAL_CLIENT_ID** ✅ (déjà configuré)
2. **PAYPAL_CLIENT_SECRET** ❌ (MANQUANT - à configurer)

---

## 📋 Comment configurer PAYPAL_CLIENT_SECRET

### Step 1: Obtenir votre Secret PayPal

1. Allez à: https://developer.paypal.com/dashboard/
2. Connectez-vous (créez un compte si nécessaire)
3. Cliquez sur **"Apps & Credentials"**
4. Assurez-vous que vous êtes en mode **"Sandbox"** (en haut)
5. Sous "REST API apps", trouvez votre application
6. Cliquez sur le nom de l'application
7. Vous verrez:
   - **Client ID** (déjà utilisé)
   - **Secret** ← COPIER CETTE VALEUR

### Step 2: Ajouter à votre environnement

**Pour développement local**, créez ou modifiez `.env.local`:

```bash
# .env.local
VITE_PAYPAL_CLIENT_ID=Acmi3Wy9PLC4YgTEUvgSC7nCetu57IK4b5dKSo3NblBOMGALn4d1oUm5xYhFjjF2cCb-686fIUJ9i2ey
PAYPAL_CLIENT_SECRET=AYjDjXYYQKJjVEgrYRYFTmVrPZqDZfqDfYJGnWZC2x5YNTH0xVoHRVj4jvqsAWqgbQKOXQWv7MqNEBE

VITE_PAYPAL_MODE=sandbox
VITE_SUPABASE_URL=https://hjdahlbicvyujgiecuqr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**IMPORTANT**: `.env.local` est déjà dans `.gitignore`, donc les secrets ne seront pas commitées.

### Step 3: Redémarrer le serveur

```bash
# Stop le serveur (Ctrl+C)
# Puis relancez:
pnpm dev
```

---

## ✅ Vérifier la configuration

### Dans le terminal (logs du serveur)

Vous devriez voir:
```
🔧 PayPal Configuration:
  Mode: sandbox
  Client ID configured: true
  Client Secret configured: true
```

Si vous voyez `false` pour Client Secret, cela signifie qu'il n'est pas chargé.

### Dans le browser (DevTools Console)

Après avoir cliqué sur PayPal Button:
```
📦 Creating real PayPal order...
🔑 Requesting PayPal access token...
✅ PayPal access token obtained
✅ PayPal order created successfully!
PayPal Order ID: XXXXXXX
```

Si vous voyez une erreur, c'est que le secret est incorrect ou manquant.

---

## 🐛 Troubleshooting

### "PayPal Client Secret not configured on server"

**Cause**: Variable d'environnement `PAYPAL_CLIENT_SECRET` n'existe pas

**Solution**:
1. Vérifiez que `.env.local` a `PAYPAL_CLIENT_SECRET=...`
2. Redémarrez le serveur
3. Vérifiez les logs

### "Failed to authenticate with PayPal"

**Causes possibles**:
1. Secret incorrect
2. Client ID et Secret ne correspondent pas
3. Compte PayPal n'existe pas

**Solution**:
1. Allez à https://developer.paypal.com/dashboard/
2. Vérifiez que vous êtes bien en **Sandbox** mode
3. Copiez exactement le Secret (sans espaces)
4. Testez avec un curl:

```bash
curl -X POST https://api.sandbox.paypal.com/v2/oauth2/token \
  -H "Accept: application/json" \
  -H "Accept-Language: en_US" \
  -u "YOUR_CLIENT_ID:YOUR_SECRET" \
  -d "grant_type=client_credentials"
```

---

## 📊 Variable d'environnement checklist

**Client-side** (`.env`):
- [x] VITE_PAYPAL_CLIENT_ID
- [x] VITE_PAYPAL_MODE

**Server-side** (`.env.local`):
- [ ] PAYPAL_CLIENT_SECRET ← À configurer!

---

## 🔒 Sécurité

**IMPORTANT**:
- ✅ `.env.local` est dans `.gitignore` (secrets sécurisés)
- ✅ PAYPAL_CLIENT_SECRET ne sera jamais commité
- ✅ Pour production, utilisez des secrets management (Netlify, Vercel, etc.)

---

## Une fois configuré

Le flow PayPal complet fonctionne:
1. ✅ PayPal Smart Buttons charge
2. ✅ Utilisateur clique "Approve"
3. ✅ Serveur crée commande PayPal réelle
4. ✅ Utilisateur approuve le paiement
5. ✅ Serveur capture la transaction
6. ✅ Commande enregistrée en Supabase
7. ✅ WhatsApp notification envoyée

---

**Status**: ⏳ En attente de configuration du secret
**Next**: Configurez PAYPAL_CLIENT_SECRET et relancez le serveur
