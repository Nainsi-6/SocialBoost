'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { useOrderPolling } from '@/hooks/use-orders';
import {
    Loader,
    CheckCircle,
    XCircle,
    Zap,
    ArrowRight,
    RefreshCw,
    ArrowLeft,
    Timer,
} from 'lucide-react';

const PAYMENT_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

type Phase = 'loading' | 'redirecting' | 'waiting' | 'processing' | 'confirmed' | 'failed' | 'expired';

function PaymentStatusContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const orderId = searchParams.get('orderId');
    const [phase, setPhase] = useState<Phase>('loading');
    const [timeLeft, setTimeLeft] = useState<number>(PAYMENT_TIMEOUT_MS);

    const redirectKey = `zapupi-redirected-${orderId}`;
    const timerKey = `zapupi-timer-${orderId}`;
    const alreadyRedirected = typeof window !== 'undefined' && sessionStorage.getItem(redirectKey) === 'true';

    const { data: orderData } = useOrderPolling(orderId, !!orderId);

    // Persist creation timestamp so timer survives refresh
    useEffect(() => {
        if (!orderId || typeof window === 'undefined') return;

        const stored = sessionStorage.getItem(timerKey);
        if (!stored) {
            sessionStorage.setItem(timerKey, String(Date.now()));
        }
    }, [orderId, timerKey]);

    // Countdown timer — persisted across refreshes
    useEffect(() => {
        if (!orderId || typeof window === 'undefined') return;
        if (phase === 'confirmed' || phase === 'failed' || phase === 'expired') return;

        const interval = setInterval(() => {
            const startTime = Number(sessionStorage.getItem(timerKey) || Date.now());
            const elapsed = Date.now() - startTime;
            const remaining = PAYMENT_TIMEOUT_MS - elapsed;

            if (remaining <= 0) {
                setTimeLeft(0);
                // Only auto-expire if still in a pending phase
                if (phase === 'waiting' || phase === 'loading' || phase === 'redirecting') {
                    setPhase('expired');
                    sessionStorage.removeItem(redirectKey);
                    sessionStorage.removeItem(timerKey);
                }
                clearInterval(interval);
            } else {
                setTimeLeft(remaining);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [orderId, phase, timerKey, redirectKey]);

    // Derive phase from order data
    useEffect(() => {
        if (!orderData?.data) return;

        const orderStatus = orderData.data.status;
        const paymentStatus = orderData.data.payment?.status;
        const paymentUrl = orderData.data.payment?.paymentUrl;

        // Terminal states
        if (orderStatus === 'COMPLETED' || orderStatus === 'PROCESSING') {
            setPhase('confirmed');
            sessionStorage.removeItem(redirectKey);
            sessionStorage.removeItem(timerKey);
            return;
        }
        if (orderStatus === 'FAILED' || paymentStatus === 'FAILED') {
            setPhase('failed');
            sessionStorage.removeItem(redirectKey);
            sessionStorage.removeItem(timerKey);
            return;
        }

        // Payment successful → processing
        if (paymentStatus === 'SUCCESS') {
            setPhase('processing');
            return;
        }

        // Payment pending with URL → redirect to ZapUPI (only once)
        if (paymentStatus === 'PENDING' && paymentUrl && !alreadyRedirected) {
            sessionStorage.setItem(redirectKey, 'true');
            setPhase('redirecting');
            setTimeout(() => { window.location.href = paymentUrl; }, 800);
            return;
        }

        // Back from ZapUPI or still pending → waiting (but only if not already expired/redirecting)
        if (phase !== 'redirecting' && phase !== 'expired') {
            setPhase('waiting');
        }
    }, [orderData, phase, alreadyRedirected, redirectKey, timerKey]);

    const formatTime = (ms: number) => {
        const totalSec = Math.max(0, Math.floor(ms / 1000));
        const min = Math.floor(totalSec / 60);
        const sec = totalSec % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    if (!orderId) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <XCircle size={48} className="mx-auto text-red-400 mb-4" />
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Invalid Request</h2>
                    <p className="text-gray-500 mb-6">No order ID provided</p>
                    <button onClick={() => router.push('/')} className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2 rounded-lg transition">Go Home</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
            <div className="max-w-md w-full">

                {/* LOADING */}
                {phase === 'loading' && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg">
                        <Loader size={40} className="animate-spin text-amber-500 mx-auto mb-4" />
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Setting Up Payment</h2>
                        <p className="text-gray-500 text-sm">Preparing your UPI payment...</p>
                    </div>
                )}

                {/* REDIRECTING TO ZAPUPI */}
                {phase === 'redirecting' && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-50 flex items-center justify-center">
                            <Zap size={28} className="text-amber-500 animate-pulse" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Redirecting to Payment</h2>
                        <p className="text-gray-500 text-sm mb-4">Opening UPI payment page...</p>
                        <Loader size={16} className="animate-spin text-amber-500 mx-auto" />
                    </div>
                )}

                {/* WAITING (back from ZapUPI, waiting for confirmation) */}
                {phase === 'waiting' && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-50 flex items-center justify-center">
                            <Loader size={28} className="text-amber-500 animate-spin" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">Waiting for Payment</h2>
                        <p className="text-gray-500 text-sm mb-4">We&apos;re checking your payment status. This usually takes a few seconds.</p>

                        {/* Countdown timer */}
                        <div className="flex items-center justify-center gap-2 text-amber-600 font-mono text-lg font-bold mb-4">
                            <Timer size={18} />
                            {formatTime(timeLeft)}
                        </div>

                        <div className="flex items-center justify-center gap-2 text-gray-400 text-xs mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Auto-checking every 5 seconds
                        </div>

                        {/* Cancel / Go Back button */}
                        <button
                            onClick={() => router.push('/')}
                            className="text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center justify-center gap-2 mx-auto transition"
                        >
                            <ArrowLeft size={14} /> Cancel &amp; Go Back
                        </button>
                    </div>
                )}

                {/* PROCESSING (payment confirmed, SMM order being placed) */}
                {phase === 'processing' && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-50 flex items-center justify-center">
                            <Zap size={36} className="text-amber-500 animate-bounce" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Payment Received! 🎉</h2>
                        <p className="text-gray-500 text-sm mb-4">Your payment is confirmed. We&apos;re now placing your order...</p>
                        <div className="flex items-center justify-center gap-2 text-amber-600 text-sm">
                            <Loader size={16} className="animate-spin" />
                            Processing order...
                        </div>
                    </div>
                )}

                {/* CONFIRMED */}
                {phase === 'confirmed' && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-50 flex items-center justify-center">
                            <CheckCircle size={40} className="text-emerald-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Order Confirmed! 🚀</h2>
                        <p className="text-gray-500 text-sm mb-6">Your order has been placed successfully.</p>

                        {orderData?.data && (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 text-left">
                                <div className="grid grid-cols-2 gap-3 text-sm">
                                    <div><p className="text-gray-400 text-xs mb-1">Amount Paid</p><p className="text-emerald-600 font-bold">₹{orderData.data.amount}</p></div>
                                    <div><p className="text-gray-400 text-xs mb-1">Quantity</p><p className="text-gray-800">{orderData.data.quantity}</p></div>
                                    {orderData.data.payment?.utr && (
                                        <div className="col-span-2"><p className="text-gray-400 text-xs mb-1">UTR</p><code className="text-emerald-600 text-xs bg-gray-100 px-2 py-0.5 rounded font-mono">{orderData.data.payment.utr}</code></div>
                                    )}
                                </div>
                            </div>
                        )}

                        <button onClick={() => router.push('/my-orders')} className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-8 rounded-lg transition-all flex items-center justify-center gap-2 mx-auto">
                            View My Orders <ArrowRight size={18} />
                        </button>
                    </div>
                )}

                {/* EXPIRED (5 min timeout) */}
                {phase === 'expired' && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-50 flex items-center justify-center">
                            <Timer size={40} className="text-amber-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Payment Expired</h2>
                        <p className="text-gray-500 text-sm mb-2">The payment link has expired after 5 minutes.</p>
                        <p className="text-gray-400 text-xs mb-6">If you already paid, don&apos;t worry — we&apos;ll still detect it via webhook. Check My Orders shortly.</p>

                        <div className="flex flex-col gap-3">
                            <button onClick={() => router.push('/')} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition-all flex items-center justify-center gap-2 mx-auto">
                                <RefreshCw size={16} /> Start New Order
                            </button>
                            <button onClick={() => router.push('/my-orders')} className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                                Check My Orders
                            </button>
                        </div>
                    </div>
                )}

                {/* FAILED */}
                {phase === 'failed' && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
                            <XCircle size={40} className="text-red-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">Payment Failed</h2>
                        <p className="text-gray-500 text-sm mb-6">Your payment could not be processed.</p>
                        <button onClick={() => router.push('/')} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition-all flex items-center justify-center gap-2">
                            <RefreshCw size={16} /> Try Again
                        </button>
                    </div>
                )}

                {/* Order ID footer */}
                {phase !== 'loading' && phase !== 'redirecting' && (
                    <div className="mt-4 text-center">
                        <p className="text-gray-400 text-xs">Order: <code className="text-gray-500 font-mono">{orderId.substring(0, 12)}...</code></p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PaymentStatusPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader size={40} className="animate-spin text-amber-500" /></div>}>
            <PaymentStatusContent />
        </Suspense>
    );
}
