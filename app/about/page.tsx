'use client';

import { Award, Zap, Users, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-8 lg:pt-12 pb-12 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            About Fastxera
          </h1>
          <p className="text-xl text-slate-400">
            Empowering creators and businesses to grow their social media presence
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            At Fastxera, our mission is simple: help creators, entrepreneurs, and
            businesses achieve their social media goals. We believe that everyone
            deserves the opportunity to grow their online presence and reach their
            audience. We provide affordable, safe, and effective solutions to boost
            your engagement across all major social media platforms.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Users,
              number: '50K+',
              label: 'Happy Customers',
            },
            {
              icon: Award,
              number: '10M+',
              label: 'Followers Delivered',
            },
            {
              icon: Zap,
              number: '100%',
              label: 'Safe & Secure',
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 text-center hover:border-blue-500/50 transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-900/50 border border-blue-500/50 mb-4">
                  <Icon size={24} className="text-blue-400" />
                </div>
                <p className="text-3xl font-bold text-blue-400 mb-2">
                  {stat.number}
                </p>
                <p className="text-slate-300 font-semibold">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Values Section */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Quality First',
                description:
                  'We only provide high-quality, real followers and engagement that add genuine value to your account.',
              },
              {
                title: 'Transparency',
                description:
                  'We believe in honest communication. No hidden fees, no surprises - just straightforward pricing.',
              },
              {
                title: 'Customer Support',
                description:
                  'Your satisfaction is our priority. Our support team is available 24/7 to help you.',
              },
              {
                title: 'Innovation',
                description:
                  'We constantly update our services to meet the evolving needs of social media creators.',
              },
              {
                title: 'Safety & Security',
                description:
                  'Your account security is paramount. We never ask for passwords and use industry-best practices.',
              },
              {
                title: 'Affordability',
                description:
                  'High-quality services should be accessible to everyone. We offer competitive pricing for all budgets.',
              },
            ].map((value, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <CheckCircle size={24} className="text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-slate-400 text-sm">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-blue-900/30 to-slate-900/30 border border-blue-500/30 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Why Choose Fastxera?</h2>
          <div className="space-y-4">
            {[
              'Real, high-quality followers and engagement',
              'Fast delivery - see results within 1-3 days',
              'Completely safe - we never ask for your password',
              '100% satisfaction guarantee on all services',
              'Affordable pricing with flexible packages',
              '24/7 customer support',
              'No hidden fees or surprise charges',
              'Works across all major social platforms',
            ].map((reason, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                <span className="text-slate-300">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Our Journey</h2>
          <div className="space-y-6">
            {[
              {
                year: '2022',
                title: 'Founded',
                description: 'Fastxera was founded with a vision to democratize social media growth',
              },
              {
                year: '2023',
                title: 'Expansion',
                description:
                  'Expanded to support YouTube, Facebook, TikTok, and more platforms',
              },
              {
                year: '2024',
                title: 'Market Leader',
                description:
                  'Became a trusted platform with 50K+ satisfied customers',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-6 relative">
                <div className="absolute left-6 top-12 h-12 w-0.5 bg-blue-600/30" />
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white z-10">
                  {item.year.substring(2)}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Account?</h2>
          <p className="text-blue-100 mb-6">
            Join thousands of satisfied customers who have already boosted their social media presence
          </p>
          <a
            href="/"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-all duration-300"
          >
            Explore Our Services
          </a>
        </div>
      </div>
    </div>
  );
}
