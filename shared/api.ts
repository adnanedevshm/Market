/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Product in order type
 */
export interface OrderProduct {
  name: string;
  quantity: number;
}

/**
 * Order request type
 */
export interface OrderRequest {
  customerName: string;
  customerPhone: string;
  email: string;
  address: string;
  products: OrderProduct[];
  notes?: string;
}

/**
 * Backward compatibility - Legacy order request with single product
 */
export interface LegacyOrderRequest extends OrderRequest {
  productName?: string;
  quantity?: number;
}

/**
 * Order response type
 */
export interface OrderResponse {
  success: boolean;
  message: string;
  orderId?: string;
  error?: string;
  details?: Record<string, unknown>;
}
