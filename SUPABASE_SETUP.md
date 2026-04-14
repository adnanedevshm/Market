# Supabase Integration Setup Guide

## ✅ Current Status

- [x] Environment variables configured
  - `VITE_SUPABASE_URL`: https://hjdahlbicvyujgiecuqr.supabase.co
  - `VITE_SUPABASE_ANON_KEY`: Configured
  - `SUPABASE_SERVICE_ROLE_KEY`: Configured

- [x] Client-side Supabase client (`client/lib/supabase.ts`) - Ready
- [x] Server-side Supabase admin client (`server/lib/supabase.ts`) - Ready
- [x] Authentication context with auth methods - Ready
- [x] Favorites functionality with Sonner toast notifications - Ready
- [x] PayPal integration route (`/api/paypal/order`) - Ready

## 📋 Required Database Schema

Based on `sql/README.md`, the database needs three scripts to be executed in Supabase:

### 1. **visitors.sql** - User & Order Management
Tables to create:
- `users` - User profiles
- `user_sessions` - Session management
- `user_history` - Product view history
- `user_favorites` - Favorites list
- `cart` - Shopping cart
- `cart_items` - Cart line items
- `orders` - Order records
- `order_items` - Order line items

### 2. **products.sql** - Product & Catalog Management
Tables to create:
- `categories` - Product categories
- `subcategories` - Sub-categories
- `products` - Main product records
- `product_variants` - Size, color, SKU variants
- `product_images` - Product photos
- `product_tags` - Search tags
- `product_tag_mappings` - Tag relationships
- `product_reviews` - Customer reviews

### 3. **sellers.sql** - Seller & Inventory Management
Tables to create:
- `sellers` - Seller/admin profiles
- `seller_products` - Products per seller
- `stock` - Inventory tracking
- `product_stats` - Product statistics (views, clicks, purchases)
- `stock_audit` - Stock change audit log

## 🚀 Next Steps to Complete Setup

### Step 1: Execute SQL Scripts in Supabase
1. Go to your Supabase project: https://app.supabase.com
2. Navigate to **SQL Editor**
3. Create new queries and paste the contents from `sql/visitors.sql`, `sql/products.sql`, `sql/sellers.sql`
4. Execute each script in order (visitors → products → sellers)

**Note:** The SQL files are not included in this repository. Reference the descriptions in `sql/README.md` to execute the schemas in Supabase, or contact the team for the SQL files.

### Step 2: Enable Row Level Security (RLS)
After tables are created, enable RLS on sensitive tables:

```sql
-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Public read access for products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (is_active = true);
```

### Step 3: Test Integrations

#### Test Client Authentication
```typescript
import { useAuth } from "@/context/AuthContext";

// In a component:
const { user, signIn, signUp } = useAuth();
```

#### Test Favorites
- Navigate to any product page
- Click the "Ajouter aux favoris" button
- Should see toast notification
- Favorite status should persist for logged-in users

#### Test PayPal Integration
- Configure `VITE_PAYPAL_CLIENT_ID` environment variable
- Add PayPal button to product page
- Button should load and process payments

## 📊 API Endpoints Created

### Order Management
- `POST /api/order` - Create standard order (Twilio/WhatsApp notification)
- `POST /api/paypal/order` - Save PayPal transaction

### Existing
- `GET /api/ping` - Health check
- `GET /api/demo` - Demo endpoint

## 🔐 Security Configuration

### Current Setup
- ✅ Anon key for client-side operations (auth, favorites, products)
- ✅ Service role key for server-side admin operations (orders, stock)
- ✅ Environment variables using ProposeEnvVariable (secrets masked)

### Recommended Additional Security
- [ ] Enable RLS on all tables
- [ ] Create appropriate RLS policies per table
- [ ] Set up webhook for order notifications
- [ ] Configure email verification in Supabase Auth
- [ ] Enable MFA for seller accounts
- [ ] Implement rate limiting on API endpoints

## 🧪 Testing Checklist

- [ ] Supabase connection verified (check DevServer logs)
- [ ] User signup/login working
- [ ] User profile saved to database
- [ ] Favorites functionality working
- [ ] PayPal orders being saved to database
- [ ] Server Supabase client can access admin operations
- [ ] Cart operations working (if cart page exists)

## 📝 Environment Variables Checklist

```
✅ VITE_SUPABASE_URL=https://hjdahlbicvyujgiecuqr.supabase.co
✅ VITE_SUPABASE_ANON_KEY=*** (secret)
✅ SUPABASE_SERVICE_ROLE_KEY=*** (secret)
⏳ VITE_PAYPAL_CLIENT_ID=your_paypal_client_id (if using PayPal)
⏳ TWILIO_ACCOUNT_SID=your_account_sid (if using WhatsApp orders)
⏳ TWILIO_AUTH_TOKEN=your_auth_token (if using WhatsApp orders)
⏳ TWILIO_WHATSAPP_NUMBER=your_whatsapp_number (if using WhatsApp orders)
⏳ ADMIN_WHATSAPP=admin_number (if using WhatsApp orders)
```

## 📞 Troubleshooting

### Supabase connection fails
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
- Check DevServer logs for connection errors
- Ensure Supabase project is active and not in read-only mode

### Auth not working
- Check if `users` table exists in Supabase
- Verify Supabase Auth is enabled in project settings
- Check browser console for specific error messages

### Favorites/Orders not saving
- Verify corresponding table exists (`user_favorites`, `orders`)
- Check RLS policies aren't blocking writes
- Ensure service role key is set for server operations

## 🎯 Next Integration Steps

After completing this setup:
1. Implement user profile management page
2. Add cart and checkout functionality
3. Integrate inventory/stock management
4. Set up order tracking for customers
5. Add seller dashboard for inventory management
6. Implement product review system
