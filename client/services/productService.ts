/**
 * Product Service - Handles all product-related operations with Supabase
 */

import { supabase } from '@/lib/supabase';
import type { Product, ProductDetail, Variant, Pattern } from '@/types';

/**
 * Fetch all active products
 */
export async function getProducts(category?: string): Promise<Product[]> {
  try {
    let query = supabase
      .from('products')
      .select('*')
      .eq('is_active', true);

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Fetch a single product with its variants and patterns
 */
export async function getProductById(productId: string): Promise<ProductDetail | null> {
  try {
    console.log(`🔍 Recherche du produit ${productId} dans Supabase...`);

    // Fetch product
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('is_active', true)
      .single();

    if (productError) {
      console.error('❌ Erreur Supabase:', {
        code: productError.code,
        message: productError.message,
        details: productError.details,
        hint: productError.hint,
      });
      throw new Error(`Supabase Error: ${productError.message}`);
    }

    if (!product) {
      console.error(`❌ Produit non trouvé: ${productId}`);
      throw new Error(`Produit avec l'ID "${productId}" n'existe pas`);
    }

    console.log(`✅ Produit trouvé:`, product);

    // Fetch variants
    const { data: variants = [], error: variantsError } = await supabase
      .from('variants')
      .select('*')
      .eq('product_id', productId);

    if (variantsError) {
      console.warn('⚠️ Erreur lors du chargement des variantes:', variantsError);
    }

    // Fetch patterns
    const { data: patterns = [], error: patternsError } = await supabase
      .from('patterns')
      .select('*');

    if (patternsError) {
      console.warn('⚠️ Erreur lors du chargement des motifs:', patternsError);
    }

    return {
      ...product,
      variants: variants as Variant[],
      patterns: patterns as Pattern[],
    } as ProductDetail;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('❌ Erreur lors du chargement du produit:', errorMsg);
    throw error; // Propagate error with context
  }
}

/**
 * Fetch variants for a product
 */
export async function getVariants(productId: string): Promise<Variant[]> {
  try {
    const { data, error } = await supabase
      .from('variants')
      .select('*')
      .eq('product_id', productId);

    if (error) {
      console.error('Error fetching variants:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching variants:', error);
    return [];
  }
}

/**
 * Fetch all patterns
 */
export async function getPatterns(): Promise<Pattern[]> {
  try {
    const { data, error } = await supabase
      .from('patterns')
      .select('*');

    if (error) {
      console.error('Error fetching patterns:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching patterns:', error);
    return [];
  }
}

/**
 * Search products by name or category
 */
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`);

    if (error) {
      console.error('Error searching products:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

/**
 * Get products by category with pagination
 */
export async function getProductsByCategory(
  category: string,
  limit: number = 20,
  offset: number = 0
): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

/**
 * Get variant details by ID
 */
export async function getVariantById(variantId: string): Promise<Variant | null> {
  try {
    const { data, error } = await supabase
      .from('variants')
      .select('*')
      .eq('id', variantId)
      .single();

    if (error || !data) {
      console.error('Error fetching variant:', error);
      return null;
    }

    return data as Variant;
  } catch (error) {
    console.error('Error fetching variant:', error);
    return null;
  }
}

/**
 * Get pattern details by ID
 */
export async function getPatternById(patternId: string): Promise<Pattern | null> {
  try {
    const { data, error } = await supabase
      .from('patterns')
      .select('*')
      .eq('id', patternId)
      .single();

    if (error || !data) {
      console.error('Error fetching pattern:', error);
      return null;
    }

    return data as Pattern;
  } catch (error) {
    console.error('Error fetching pattern:', error);
    return null;
  }
}
