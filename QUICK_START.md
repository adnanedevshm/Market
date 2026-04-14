# Quick Start Guide - Test Real E-Commerce System

**⏱️ Time to first test: 5-10 minutes**

## Step 1: Set Up Database (2 minutes)

1. Open Supabase dashboard: https://app.supabase.com
2. Go to your project
3. Click **"SQL Editor"** → **"New query"**
4. Copy entire contents of: `supabase/schema.sql`
5. Click **"Run"** (or Ctrl+Enter)
6. Wait for success message
7. Create another query
8. Copy entire contents of: `supabase/seed-data.sql`
9. Click **"Run"**
10. **✅ Database ready!**

**Verify**: Go to "Table Editor" → You should see 10 products in the `products` table

## Step 2: Verify Credentials (1 minute)

Check `.env` file has these:
```
VITE_SUPABASE_URL=https://hjdahlbicvyujgiecuqr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
VITE_PAYPAL_CLIENT_ID=Acmi3Wy9PLC4YgTEUvgSC7nC...
VITE_TWILIO_ACCOUNT_SID=AC263af38...
VITE_TWILIO_AUTH_TOKEN=e6a72cc...
VITE_TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
VITE_TWILIO_WHATSAPP_TO=whatsapp:+212612989463
```

✅ All set? Continue.

## Step 3: Add Server Secret (1 minute)

**For local testing**, update your `.env` file or `.env.local`:

```
PAYPAL_CLIENT_SECRET=AYjDjXYYQKJjVEgrYRYFTmVrPZqDZfqDfYJGnWZC2x5YNTH0xVoHRVj4jvqsAWqgbQKOXQWv7MqNEBE
```

To find your real PayPal Client Secret:
1. Go to https://developer.paypal.com/dashboard
2. Click **Apps & Credentials**
3. Select **Sandbox** (NOT production)
4. Under "Signature", copy your **Secret**
5. Add to .env as shown above

## Step 4: Start Development Server (1 minute)

```bash
pnpm dev
# or
npm run dev
```

Wait for: `✅ Dev server ready at ...`

## Step 5: Test Product Loading (2 minutes)

1. Open the app in preview
2. Navigate to any category (e.g., "Scout Camping")
3. **Verify**: You see the 10 products loaded from Supabase
4. Click on a product
5. **Verify**: See details, variants, patterns

## Step 6: Test Full Checkout Flow (5 minutes)

### 6a. Add to Cart
1. On product page, select:
   - Size (variant)
   - Pattern (color)
   - Quantity
2. Click "Add to Cart"
3. **Verify**: Cart shows quantity

### 6b. Login
1. Click "دخول" (Login) in navbar
2. Enter your email
3. Check email for magic link
4. Click link to verify
5. Return to checkout

### 6c. Checkout
1. Click cart → "Proceed to Checkout"
2. Fill form (name, email, phone, address)
3. Click "Proceed to Payment"

### 6d. PayPal (THE REAL TEST)
1. **IMPORTANT: Open DevTools** (F12 or right-click → Inspect)
2. Go to **Network** tab
3. Click **PayPal button**
4. **Watch Network tab** - you should see:
   - `POST /api/paypal/order` ← This is the real API call!
5. In **Console**, look for:
   ```
   ✅ PayPal order created successfully!
   PayPal Order ID: XXXXXXX
   ```
6. Click **"Continue to PayPal Sandbox"**
7. Log in with sandbox account:
   - Email: `sb-p123456@personal.example.com`
   - Password: `Test1234!`
8. Click **"Approve"**
9. App creates order in Supabase
10. **You should get WhatsApp message on your phone!**

## Step 7: Verify Real Data (3 minutes)

### In Supabase:
1. Go to **Table Editor**
2. Click **`orders`** table
3. **Verify**: New order appears
4. Check the `paypal_order_id` field - contains real PayPal ID

### In PayPal:
1. Go to https://www.sandbox.paypal.com
2. Log in with your **sandbox BUSINESS account**
3. Go to **Activity** → **Transactions**
4. **Verify**: Your test transaction appears

### WhatsApp:
1. Check your phone for WhatsApp message from admin number
2. **Verify**: Message contains:
   - Order ID
   - Product names
   - Total amount

## 🎯 You Now Have Proof It's Real

✅ Products loaded from Supabase  
✅ Network request to `/api/paypal/order` visible  
✅ PayPal Order ID created (real, not fake)  
✅ Order saved to Supabase database  
✅ WhatsApp message received  
✅ Transaction visible in PayPal Sandbox  

**This is NOT simulated. This is a REAL e-commerce system.**

## ❌ If Something Doesn't Work

### Products not showing?
- Did you run both SQL files (schema + seed data)?
- Check Supabase → Table Editor → products table (should have 10 items)
- Check console for errors

### PayPal button not loading?
- Check `.env` has `VITE_PAYPAL_CLIENT_ID`
- Check browser console for errors
- PayPal API might take a few seconds to load

### WhatsApp not received?
- Check Twilio credentials in `.env`
- Verify phone number format: `whatsapp:+212612989463`
- Check that your Twilio WhatsApp sandbox is activated
- Message might take 5-10 seconds

### Order not in Supabase?
- Check browser Network tab - did `/api/orders` call succeed?
- Check browser console for error messages
- Check Supabase logs for issues

## 🔍 Troubleshooting Console Logs

Open **DevTools → Console** and look for these logs during checkout:

### Success Path:
```
📝 Processing order creation...
✅ Order data validation passed
✅ Order created in database: abc-123-xyz
✅ Order verified in database
✅ Order items created in database
💳 Capturing PayPal payment...
✅ PayPal payment captured and order confirmed
📤 Sending admin WhatsApp notification...
✅ Admin notification sent!
📤 Sending customer confirmation...
✅ Customer confirmation sent!
```

### Error Path:
```
❌ Database error creating order: [error message]
❌ PayPal capture failed: [error message]
⚠️ Failed to send notification
```

## 📊 Test Checklist

- [ ] Database tables created in Supabase
- [ ] 10 products visible in app
- [ ] Can select variants and patterns
- [ ] Can add items to cart
- [ ] Can login with email
- [ ] PayPal button loads
- [ ] Network tab shows `/api/paypal/order` request
- [ ] PayPal sandbox login works
- [ ] Order appears in Supabase after approval
- [ ] PayPal transaction visible in sandbox dashboard
- [ ] WhatsApp message received on phone
- [ ] Console shows success logs

## 📞 Sandbox Credentials

**PayPal Sandbox Business Account**:
- Email: `sb-p123456@personal.example.com` (check your PayPal email for exact address)
- Password: `Test1234!`
- API is in sandbox mode

**Twilio WhatsApp**:
- Messages go to: `+212612989463`
- From: `whatsapp:+14155238886`

**Supabase**:
- Project: `hjdahlbicvyujgiecuqr`
- URL: `https://hjdahlbicvyujgiecuqr.supabase.co`

## 🚀 Next Steps After Testing

1. Create more products in Supabase
2. Customize images (replace Unsplash URLs)
3. Build remaining pages (Favorites, OrderHistory)
4. Deploy to production
5. Switch PayPal to production credentials

---

**Start Now**: Go to Supabase and run the schema SQL!

Questions? Check `SETUP_INSTRUCTIONS.md` for details.
