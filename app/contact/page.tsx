'use client';

import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pt-8 lg:pt-12 pb-12 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-slate-400">
            We're here to help. Reach out to us anytime
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          {[
            {
              icon: Mail,
              title: 'Email',
              value: 'support@socialboost.com',
              description: 'We reply within 24 hours',
            },
            {
              icon: Phone,
              title: 'Phone',
              value: '+91 (123) 456-7890',
              description: 'Available 24/7',
            },
            {
              icon: MessageCircle,
              title: 'Live Chat',
              value: 'Chat with us',
              description: 'Instant support',
            },
          ].map((contact, idx) => {
            const Icon = contact.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 text-center hover:border-blue-500/50 transition-all"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-900/50 border border-blue-500/50 mb-4">
                  <Icon size={24} className="text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{contact.title}</h3>
                <p className="text-blue-400 font-semibold mb-1">{contact.value}</p>
                <p className="text-sm text-slate-400">{contact.description}</p>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

          {submitted && (
            <div className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-lg text-green-300 font-semibold">
              ✓ Message sent successfully! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm text-slate-300 mb-2">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="What is this about?"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm text-slate-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                placeholder="Tell us more..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-600/50"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/30 to-slate-900/30 border border-blue-500/30 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Fast Response Time',
                description:
                  'Our support team responds to all inquiries within 24 hours',
              },
              {
                title: 'Expert Support',
                description:
                  'Get help from specialists who know our platform inside out',
              },
              {
                title: 'Multiple Channels',
                description:
                  'Reach us via email, phone, or live chat - whatever works for you',
              },
              {
                title: 'Satisfaction Guaranteed',
                description:
                  'We stand behind our services with a 100% satisfaction guarantee',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/30 border border-blue-500/50 flex items-center justify-center mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
