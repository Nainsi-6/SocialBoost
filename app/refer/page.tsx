'use client';

import { Copy, CheckCheck } from 'lucide-react';
import { useState } from 'react';

export default function ReferPage() {
  const referralCode = 'SOCIALBOOST2024';
  const referralLink = `https://socialboost.com/?ref=${referralCode}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-8 lg:pt-12 pb-12 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Refer & Earn
          </h1>
          <p className="text-xl text-slate-400">
            Share SocialBoost with your friends and earn rewards
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Referral Link Section */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Your Referral Link
            </h2>
            <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 flex items-center gap-4">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 bg-transparent text-slate-300 font-mono text-sm outline-none"
              />
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
              >
                {copied ? (
                  <>
                    <CheckCheck size={18} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
            <div className="space-y-4">
              {[
                {
                  number: '1',
                  title: 'Share Your Link',
                  description:
                    'Share your unique referral link with friends and on social media',
                },
                {
                  number: '2',
                  title: 'They Sign Up',
                  description:
                    'Your friends click on your link and place their first order',
                },
                {
                  number: '3',
                  title: 'You Earn',
                  description:
                    'Earn 10% commission from every order they make',
                },
                {
                  number: '4',
                  title: 'Withdraw Anytime',
                  description:
                    'Transfer your earnings to your bank account whenever you want',
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white">
                    {item.number}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '💰',
                title: '10% Commission',
                description: 'Earn 10% from every referral purchase',
              },
              {
                icon: '🎁',
                title: 'Bonus Rewards',
                description: 'Extra bonuses when reaching referral milestones',
              },
              {
                icon: '📈',
                title: 'Unlimited Earning',
                description: 'No cap on how much you can earn',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 text-center hover:border-blue-500/50 transition-all"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: 'How long do I have to wait for my commission?',
                  a: 'Commissions are credited to your account immediately after your referral completes their order.',
                },
                {
                  q: 'Is there a minimum withdrawal amount?',
                  a: 'Yes, the minimum withdrawal amount is ₹500. You can withdraw anytime once you reach this amount.',
                },
                {
                  q: 'Can I track my referrals?',
                  a: 'Yes, you will have access to a dashboard where you can track all your referrals and earnings.',
                },
                {
                  q: 'What payment methods do you support?',
                  a: 'We support bank transfers via NEFT/RTGS. You can add your bank details in your account settings.',
                },
              ].map((item, idx) => (
                <div key={idx} className="border-b border-slate-700 last:border-0 pb-6 last:pb-0">
                  <h3 className="font-semibold text-white mb-2">{item.q}</h3>
                  <p className="text-slate-400 text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
