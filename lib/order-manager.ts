import { Order } from './types';

const ORDERS_STORAGE_KEY = 'orders';

export function generateOrderId(): string {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function createOrder(
  serviceId: string,
  serviceName: string,
  packageId: string,
  packageLabel: string,
  quantity: number,
  price: number,
  instagramProfile?: string
): Order {
  const now = new Date();
  const order: Order = {
    orderId: generateOrderId(),
    serviceId,
    serviceName,
    packageId,
    packageLabel,
    quantity,
    price,
    instagramProfile,
    status: 'pending',
    timestamp: now.getTime(),
    date: now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  // Save to localStorage
  const orders = getAllOrders();
  orders.push(order);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));

  return order;
}

export function getAllOrders(): Order[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getOrderById(orderId: string): Order | undefined {
  const orders = getAllOrders();
  return orders.find((o) => o.orderId === orderId);
}

export function updateOrderStatus(
  orderId: string,
  status: 'pending' | 'processing' | 'completed'
): Order | undefined {
  if (typeof window === 'undefined') return undefined;

  const orders = getAllOrders();
  const orderIndex = orders.findIndex((o) => o.orderId === orderId);

  if (orderIndex !== -1) {
    orders[orderIndex].status = status;
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    return orders[orderIndex];
  }

  return undefined;
}

export function deleteOrder(orderId: string): boolean {
  if (typeof window === 'undefined') return false;

  const orders = getAllOrders();
  const filtered = orders.filter((o) => o.orderId !== orderId);

  if (filtered.length < orders.length) {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }

  return false;
}
