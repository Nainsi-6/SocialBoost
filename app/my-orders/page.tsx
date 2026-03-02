'use client';

import { useEffect, useState, Suspense } from 'react';
import { getAllOrders, updateOrderStatus } from '@/lib/order-manager';
import { Order } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle,
  Clock,
  Loader,
  Copy,
  CheckCheck,
  AlertCircle,
} from 'lucide-react';

function OrdersContent() {
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    // Load orders from localStorage
    const loadedOrders = getAllOrders();
    setOrders(loadedOrders.sort((a, b) => b.timestamp - a.timestamp));
    setIsLoading(false);

    // Show success message if redirected from checkout
    if (searchParams.get('success') === 'true') {
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 5000);
    }
  }, [searchParams]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900/30 border-green-500/50 text-green-400';
      case 'processing':
        return 'bg-blue-900/30 border-blue-500/50 text-blue-400';
      case 'pending':
        return 'bg-yellow-900/30 border-yellow-500/50 text-yellow-400';
      default:
        return 'bg-slate-900/30 border-slate-500/50 text-slate-400';
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
        <Loader size={40} className="animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-8 lg:pt-12 pb-12 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">My Orders</h1>
          <p className="text-slate-400 mt-2">
            Track your service orders and delivery status
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-lg flex items-center gap-3 text-green-300">
            <CheckCircle size={20} />
            <span className="font-semibold">
              Order created successfully! You can track it below.
            </span>
          </div>
        )}

        {/* Orders List */}
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all duration-300"
              >
                {/* Desktop View */}
                <div className="hidden md:grid md:grid-cols-5 gap-4 p-6 items-center">
                  {/* Order ID */}
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                      Order ID
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono text-blue-400 bg-slate-800 px-3 py-1 rounded">
                        {order.orderId.substring(0, 12)}...
                      </code>
                      <button
                        onClick={() => handleCopyOrderId(order.orderId)}
                        className="text-slate-400 hover:text-slate-200 p-1"
                        title="Copy full Order ID"
                      >
                        {copiedId === order.orderId ? (
                          <CheckCheck size={16} className="text-green-400" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Service & Package */}
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                      Service
                    </p>
                    <div>
                      <p className="font-semibold text-white">
                        {order.serviceName}
                      </p>
                      <p className="text-sm text-slate-400">
                        {order.packageLabel}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                      Price
                    </p>
                    <p className="text-lg font-bold text-blue-400">
                      ₹{order.price}
                    </p>
                  </div>

                  {/* Date */}
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                      Date
                    </p>
                    <p className="text-sm text-slate-300">{order.date}</p>
                  </div>

                  {/* Status */}
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
                    {/* Header Row */}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-white">
                          {order.serviceName}
                        </p>
                        <p className="text-sm text-slate-400">
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

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500 uppercase text-xs mb-1">
                          Price
                        </p>
                        <p className="font-bold text-blue-400">₹{order.price}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 uppercase text-xs mb-1">
                          Date
                        </p>
                        <p className="text-slate-300">{order.date}</p>
                      </div>
                    </div>

                    {/* Order ID */}
                    <div className="pt-4 border-t border-slate-700">
                      <p className="text-slate-500 uppercase text-xs mb-2">
                        Order ID
                      </p>
                      <div className="flex items-center gap-2">
                        <code className="text-xs font-mono text-blue-400 bg-slate-800 px-2 py-1 rounded flex-1 truncate">
                          {order.orderId}
                        </code>
                        <button
                          onClick={() => handleCopyOrderId(order.orderId)}
                          className="text-slate-400 hover:text-slate-200 p-1"
                        >
                          {copiedId === order.orderId ? (
                            <CheckCheck size={14} className="text-green-400" />
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
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-12 text-center">
            <AlertCircle size={48} className="mx-auto text-slate-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No Orders Yet
            </h3>
            <p className="text-slate-400 mb-6">
              Start by selecting a service and placing your first order
            </p>
            <a
              href="/"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300"
            >
              Explore Services
            </a>
          </div>
        )}

        {/* Info Section */}
        {orders.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-blue-900/30 to-slate-900/30 border border-blue-500/30 rounded-lg p-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              Delivery Status Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="text-yellow-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Pending</p>
                  <p className="text-slate-400">Order is being processed</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-blue-400 mt-0.5 animate-spin" />
                <div>
                  <p className="font-semibold text-white">Processing</p>
                  <p className="text-slate-400">Delivery is in progress</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCheck size={18} className="text-green-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Completed</p>
                  <p className="text-slate-400">Order has been delivered</p>
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
        <Loader size={40} className="animate-spin text-blue-400" />
      </div>
    }>
      <OrdersContent />
    </Suspense>
  );
}
