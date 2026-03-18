'use client';

import { useEffect, useState, Suspense } from 'react';
import { getAllOrders } from '@/lib/order-manager';
import { Order } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle,
  Clock,
  Loader,
  Copy,
  CheckCheck,
  AlertCircle,
  XCircle,
} from 'lucide-react';

function OrdersContent() {
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    async function loadOrders() {
      const localOrders = getAllOrders().sort((a, b) => b.timestamp - a.timestamp);

      const enriched = await Promise.all(
        localOrders.map(async (order) => {
          if (!order.backendOrderId) return order;
          try {
            const res = await fetch(`/api/orders/${order.backendOrderId}`);
            if (!res.ok) return order;
            const data = await res.json();
            if (data?.data) {
              const backendStatus = (data.data.status || '').toLowerCase() as Order['status'];
              const validStatuses: Order['status'][] = ['pending', 'processing', 'completed', 'failed'];
              return {
                ...order,
                status: validStatuses.includes(backendStatus) ? backendStatus : order.status,
              };
            }
          } catch {
            // keep localStorage status
          }
          return order;
        })
      );

      setOrders(enriched);
      setIsLoading(false);

      if (searchParams.get('success') === 'true') {
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 5000);
      }
    }

    loadOrders();
  }, [searchParams]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'processing':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'failed':
        return 'bg-red-50 border-red-200 text-red-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCheck size={16} />;
      case 'processing':
        return <Clock size={16} className="animate-spin" />;
      case 'pending':
        return <AlertCircle size={16} />;
      case 'failed':
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  const handleCopyOrderId = (orderId: string) => {
    navigator.clipboard.writeText(orderId);
    setCopiedId(orderId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size={40} className="animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 lg:pt-12 pb-12 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          <p className="text-gray-500 mt-2">
            Track your service orders and delivery status
          </p>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 text-emerald-700">
            <CheckCircle size={20} />
            <span className="font-semibold">
              Order created successfully! You can track it below.
            </span>
          </div>
        )}

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
              >
                {/* Desktop View */}
                <div className="hidden md:grid md:grid-cols-5 gap-4 p-6 items-center">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Order ID
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono text-amber-600 bg-amber-50 px-3 py-1 rounded">
                        {order.orderId.substring(0, 12)}...
                      </code>
                      <button
                        onClick={() => handleCopyOrderId(order.orderId)}
                        className="text-gray-400 hover:text-gray-600 p-1"
                        title="Copy full Order ID"
                      >
                        {copiedId === order.orderId ? (
                          <CheckCheck size={16} className="text-emerald-500" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Service
                    </p>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {order.serviceName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.packageLabel}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Price
                    </p>
                    <p className="text-lg font-bold text-amber-600">
                      ₹{order.price}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Date
                    </p>
                    <p className="text-sm text-gray-600">{order.date}</p>
                  </div>

                  <div className="flex justify-end">
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(
                        order.status
                      )} text-sm font-semibold`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </div>
                </div>

                {/* Mobile View */}
                <div className="md:hidden p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {order.serviceName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.packageLabel}
                        </p>
                      </div>
                      <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400 uppercase text-xs mb-1">
                          Price
                        </p>
                        <p className="font-bold text-amber-600">₹{order.price}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 uppercase text-xs mb-1">
                          Date
                        </p>
                        <p className="text-gray-600">{order.date}</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-400 uppercase text-xs mb-2">
                        Order ID
                      </p>
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono text-amber-600 bg-amber-50 px-2 py-1 rounded flex-1 truncate">
                          {order.orderId}
                        </code>
                        <button
                          onClick={() => handleCopyOrderId(order.orderId)}
                          className="text-gray-400 hover:text-gray-600 p-1"
                        >
                          {copiedId === order.orderId ? (
                            <CheckCheck size={14} className="text-emerald-500" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center shadow-sm">
            <AlertCircle size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No Orders Yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start by selecting a service and placing your first order
            </p>
            <a
              href="/"
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300"
            >
              Explore Services
            </a>
          </div>
        )}

        {orders.length > 0 && (
          <div className="mt-12 bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Delivery Status Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">Pending</p>
                  <p className="text-gray-500">Awaiting payment</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-amber-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">Processing</p>
                  <p className="text-gray-500">Delivery in progress</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCheck size={18} className="text-emerald-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">Completed</p>
                  <p className="text-gray-500">Order delivered</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <XCircle size={18} className="text-red-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-800">Failed</p>
                  <p className="text-gray-500">Payment or order failed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyOrdersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader size={40} className="animate-spin text-amber-500" />
      </div>
    }>
      <OrdersContent />
    </Suspense>
  );
}
