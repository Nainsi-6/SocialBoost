import { useMutation, useQuery } from '@tanstack/react-query';

// ============================================
// Types
// ============================================

export interface CreateOrderPayload {
    serviceId: number;
    serviceName?: string;
    link: string;
    quantity: number;
    amount: number;
    serviceCategory: 'followers' | 'likes' | 'comments' | 'views';
    customerMobile?: string;
    remark?: string;
}

export interface ValidateLinkPayload {
    link: string;
    serviceCategory: 'followers' | 'likes' | 'comments' | 'views';
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

export interface CreateOrderData {
    orderId: string;
    serviceId: number;
    serviceName: string | null;
    link: string;
    quantity: number;
    amount: number;
    status: string;
    serviceCategory: string;
    linkType: string;
    paymentUrl: string | null;
    zapupiOrderId: string | null;
    createdAt: string;
}

export interface ValidateLinkData {
    linkType: string;
    valid: boolean;
    allowedServices?: string[];
}

export interface OrderData {
    id: string;
    serviceId: number;
    link: string;
    quantity: number;
    amount: number;
    status: string;
    remark: string | null;
    createdAt: string;
    updatedAt: string;
    payment: {
        id: string;
        zapupiOrderId: string;
        amount: number;
        status: string;
        paymentUrl: string | null;
        utr: string | null;
        createdAt: string;
    } | null;
    smmOrder: {
        id: string;
        smmOrderId: string | null;
        status: string;
        startCount: number | null;
        remains: number | null;
    } | null;
}

export interface PaymentStatusData {
    payment: {
        id: string;
        orderId: string;
        amount: number;
        status: string;
        utr: string | null;
        zapupiOrderId: string;
        paymentUrl: string | null;
        createdAt: string;
        updatedAt: string;
    } | null;
    status?: string; // 'NOT_CREATED' when payment doesn't exist yet
    liveStatus: unknown;
}

// ============================================
// API Fetch Helpers
// ============================================

async function apiFetch<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });

    const data = await response.json();

    if (!response.ok && !data.success) {
        throw new Error(data.message || data.error || 'Request failed');
    }

    return data;
}

// ============================================
// Mutations (TanStack Query)
// ============================================

/**
 * Create a new order.
 * Calls Next.js BFF → Express backend → ZapUPI.
 * Returns paymentUrl for redirect.
 */
export function useCreateOrder() {
    return useMutation<ApiResponse<CreateOrderData>, Error, CreateOrderPayload>({
        mutationFn: (payload) =>
            apiFetch<CreateOrderData>('/api/orders', {
                method: 'POST',
                body: JSON.stringify(payload),
            }),
    });
}

/**
 * Validate an Instagram link against a service category.
 */
export function useValidateLink() {
    return useMutation<ApiResponse<ValidateLinkData>, Error, ValidateLinkPayload>({
        mutationFn: (payload) =>
            apiFetch<ValidateLinkData>('/api/orders/validate-link', {
                method: 'POST',
                body: JSON.stringify(payload),
            }),
    });
}

// ============================================
// Queries (TanStack Query)
// ============================================

/**
 * Fetch a single order by ID.
 * Exponential backoff: 2s → 4s → 8s → 16s, then stop.
 * Use for pages that just need to check once (e.g. my-orders).
 */
export function useOrder(orderId: string | null, enabled = true) {
    return useQuery<ApiResponse<OrderData>, Error>({
        queryKey: ['order', orderId],
        queryFn: () => apiFetch<OrderData>(`/api/orders/${orderId}`),
        enabled: !!orderId && enabled,
        retry: 3,
        refetchInterval: (query) => {
            const count = query.state.dataUpdateCount;
            if (count >= 4) return false;
            return Math.min(2000 * Math.pow(2, count), 16000);
        },
    });
}

/**
 * Fetch order status with CONTINUOUS polling (every 5s).
 * Stops only when order reaches a terminal state (COMPLETED or FAILED).
 * Use on the payment status page where we need to wait for webhook.
 */
export function useOrderPolling(orderId: string | null, enabled = true) {
    return useQuery<ApiResponse<OrderData>, Error>({
        queryKey: ['order-poll', orderId],
        queryFn: () => apiFetch<OrderData>(`/api/orders/${orderId}`),
        enabled: !!orderId && enabled,
        retry: 3,
        refetchInterval: (query) => {
            const data = query.state.data;
            if (!data?.data) return 5000; // keep polling if no data yet

            const orderStatus = data.data.status;
            const paymentStatus = data.data.payment?.status;

            // Stop polling on terminal states
            if (orderStatus === 'COMPLETED' || orderStatus === 'FAILED') return false;
            if (paymentStatus === 'FAILED') return false;

            return 5000; // poll every 5s
        },
    });
}

/**
 * Fetch payment status for an order.
 * Exponential backoff, max 4 retries.
 */
export function usePaymentStatus(orderId: string | null, enabled = true) {
    return useQuery<ApiResponse<PaymentStatusData>, Error>({
        queryKey: ['payment-status', orderId],
        queryFn: () => apiFetch<PaymentStatusData>(`/api/payments/status/${orderId}`),
        enabled: !!orderId && enabled,
        retry: 3,
        refetchInterval: (query) => {
            const count = query.state.dataUpdateCount;
            if (count >= 4) return false;
            return Math.min(2000 * Math.pow(2, count), 16000);
        },
    });
}
