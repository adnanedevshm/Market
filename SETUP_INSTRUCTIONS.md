# E-Commerce Platform Setup Instructions

## ⚠️ CRITICAL SETUP STEPS

This e-commerce platform uses REAL integrations with Supabase, PayPal, and Twilio. All data is stored in actual databases and all payments are processed through real APIs.

### Step 1: Set Up Supabase Database

1. Go to your Supabase project: https://hjdahlbicvyujgiecuqr.supabase.co
2. Navigate to the **SQL Editor** section
3. Create a new query and copy all the SQL from `supabase/schema.sql`
4. Execute the SQL to create all tables and indexes
5. Then create another query and copy all the SQL from `supabase/seed-data.sql`
6. Execute to populate with initial product data

**Verification**: 
- Check that these tables exist: `users`, `products`, `variants`, `patterns`, `favorites`, `orders`, `order_items`, `donations`
- Check that you have 10 products in the `products` table
- Check that each product has at least 2 variants

### Step 2: Verify Environment Variables

All required environment variables are set in `.env`:

```
VITE_SUPABASE_URL=https://hjdahlbicvyujgiecuqr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_PAYPAL_CLIENT_ID=Acmi3Wy9PLC4YgTEUvgSC7nCetu57IK4b5dKSo3NblBOMGALn4d1oUm5xYhFjjF2cCb-686fIUJ9i2ey
VITE_PAYPAL_MODE=sandbox
VITE_TWILIO_ACCOUNT_SID=AC263af387b4c70921cf392a7b125de152
VITE_TWILIO_AUTH_TOKEN=e6a72ccccfeb9e2de21f768afd5cafa1
VITE_TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
VITE_TWILIO_WHATSAPP_TO=whatsapp:+212612989463
```

⚠️ **IMPORTANT**: For production, never commit `.env` with secrets. Use environment management tools.

### Step 3: Add PayPal Client Secret (Server-Side)

The server needs the PayPal Client Secret to call PayPal APIs. You must add this to your deployment environment:

**For local development**, add to `.env.local` (not in git):
```
PAYPAL_CLIENT_SECRET=your_actual_secret_from_paypal
```

**For production deployment**, set this in your hosting platform's environment variables (Netlify, Vercel, etc.)

To get your PayPal Client Secret:
1. Go to https://developer.paypal.com/dashboard
2. Click "Apps & Credentials"
3. Select Sandbox mode
4. Copy your Secret from the "Signature" section

### Step 4: Restart Dev Server

After setting up Supabase and environment variables:

```bash
npm run dev
# or
pnpm dev
```

The development server will restart automatically.

## Testing the Full Flow

### Test 1: View Products
1. Open the app at the preview URL
2. Navigate to any category (e.g., Scout Camping, Medical)
3. You should see the 10 seeded products
4. **Verification**: Products load from real Supabase database

### Test 2: Test Product Details
1. Click on any product
2. Select a size (variant) and pattern (color)
3. Watch the price update dynamically
4. **Verification**: Data loaded from Supabase variants and patterns tables

### Test 3: Add to Cart
1. Select size, pattern, and quantity
2. Click "Add to Cart"
3. Check browser DevTools → Application → Local Storage
4. Look for `shm_cart` key with your cart data
5. **Verification**: Cart persists to localStorage

### Test 4: Authentication
1. Click "دخول" (Login)
2. Enter your email and send magic link
3. Check your email for the verification link
4. **Verification**: Supabase auth is working

### Test 5: Create Real PayPal Order
1. Add items to cart
2. Go to checkout
3. Click PayPal button
4. **Open DevTools → Network tab** (IMPORTANT!)
5. Watch for requests to `/api/paypal/order` 
6. Click "Continue to PayPal Sandbox"
7. **Verification Checklist**:
   - ✅ Network tab shows POST to `/api/paypal/order`
   - ✅ Response contains real `orderID` from PayPal
   - ✅ PayPal button shows Sandbox environment
   - ✅ Console shows logs: "PayPal Order ID: ..."

### Test 6: Complete Checkout
1. After payment approval in PayPal Sandbox
2. Confirm order
3. Check Supabase:
   - Go to your project → Table Editor
   - View `orders` table → should see new order with `status: confirmed`
   - View `order_items` table → should see cart items
4. Check Twilio/WhatsApp:
   - Admin notification should arrive at +212612989463
   - **Look for WhatsApp message with order details**
5. **Verification**:
   - ✅ Order created in database
   - ✅ Order has real PayPal transaction ID
   - ✅ WhatsApp notification received

## Anti-Simulation Verification (MANDATORY)

To prove this is NOT simulated, verify these REAL indicators:

### 1. Database Verification
```sql
-- In Supabase SQL Editor, run this after ordering:
SELECT * FROM orders ORDER BY created_at DESC LIMIT 1;
SELECT * FROM order_items WHERE order_id = 'YOUR_ORDER_ID';
```
✅ Order exists in real database

### 2. PayPal Verification
1. Go to https://www.sandbox.paypal.com/signin
2. Log in with sandbox business account
3. Check "Transactions" or "Payments"
4. You should see your real transaction
5. ✅ Real PayPal order captured

### 3. Network Verification
1. DevTools → Network tab
2. Filter by XHR/Fetch
3. After checkout, you should see:
   - `POST /api/paypal/order` → real backend call
   - `POST /api/orders` → real database insertion
   - PayPal API calls from server
4. ✅ All network requests visible

### 4. Console Verification
1. DevTools → Console
2. Look for these logs:
   ```
   ✅ PayPal order created successfully!
   PayPal Order ID: XXXXX
   ✅ WhatsApp message sent successfully!
   Twilio Message SID: XXXXX
   ✅ Order created in database: XXXXX
   ```
3. ✅ All operations logged

## Common Issues & Solutions

### PayPal Orders Not Creating
- Check `VITE_PAYPAL_CLIENT_ID` in `.env`
- Check `PAYPAL_CLIENT_SECRET` in server environment
- Check console for error messages
- Verify network tab shows `/api/paypal/order` request

### Supabase Connection Failed
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`
- Check Supabase project status
- Verify tables exist in Supabase dashboard

### WhatsApp Notifications Not Working
- Verify Twilio credentials in `.env`
- Ensure phone number format is correct: `whatsapp:+212612989463`
- Check Twilio dashboard for message logs
- Verify WhatsApp is connected to your Twilio account

### Products Not Loading
- Check Supabase seed data was executed
- Verify `products` table has data
- Check browser console for errors
- Verify `VITE_SUPABASE_ANON_KEY` allows public product access (RLS policy)

## Database Security Notes

This platform uses Row-Level Security (RLS) on Supabase:

- **Users**: Can only see/edit their own profile
- **Products**: Everyone can view (needed for shopping)
- **Favorites**: Users can only manage their own
- **Orders**: Users can only see their own orders

## Next Steps

After successful setup and testing:

1. ✅ Create more products via Supabase
2. ✅ Customize product images (currently using Unsplash URLs)
3. ✅ Set up real PayPal production credentials (when ready)
4. ✅ Deploy to Netlify or Vercel
5. ✅ Monitor real orders in Supabase dashboard

## Support

If something isn't working:

1. Check `SETUP_INSTRUCTIONS.md` (this file)
2. Look at server logs (dev terminal)
3. Check browser console (DevTools)
4. Check Supabase dashboard for data
5. Verify all `.env` variables are set

---

**Remember**: This is a REAL e-commerce system with real database, real payments, and real notifications. Every action has actual consequences on your Supabase and PayPal accounts.
