'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trash2, Edit, Plus } from 'lucide-react';

interface Banner {
  id: number;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  backgroundColor: string;
  order: number;
  active: boolean;
}

export default function BannersAdmin() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/banners');
      const result = await response.json();
      if (result.success) {
        setBanners(result.data);
      } else {
        setError('Failed to load banners');
      }
    } catch (err) {
      setError('Error fetching banners');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;

    try {
      const response = await fetch(`/api/banners/${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        setBanners(banners.filter((b) => b.id !== id));
      } else {
        setError('Failed to delete banner');
      }
    } catch (err) {
      setError('Error deleting banner');
      console.error(err);
    }
  };

  const toggleActive = async (id: number, active: boolean) => {
    try {
      const response = await fetch(`/api/banners/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active }),
      });
      const result = await response.json();
      if (result.success) {
        fetchBanners();
      }
    } catch (err) {
      console.error('Error updating banner:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Manage Banners
            </h1>
            <p className="text-slate-400">Create and manage promotional banners for your homepage</p>
          </div>
          <Link
            href="/admin/banners/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            New Banner
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {/* Banners Table */}
        {banners.length > 0 ? (
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 border-b border-slate-700">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-slate-200">
                      Title
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-slate-200">
                      Order
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-sm font-semibold text-slate-200">
                      Status
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-right text-sm font-semibold text-slate-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {banners.map((banner) => (
                    <tr
                      key={banner.id}
                      className="hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-4 sm:px-6 py-4">
                        <div>
                          <p className="font-medium text-white text-sm sm:text-base">
                            {banner.title}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-400 mt-1">
                            {banner.subtitle.substring(0, 50)}...
                          </p>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-sm text-slate-300">
                        {banner.order}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <button
                          onClick={() => toggleActive(banner.id, banner.active)}
                          className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                            banner.active
                              ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                              : 'bg-slate-600/50 text-slate-300 hover:bg-slate-600'
                          }`}
                        >
                          {banner.active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/banners/${banner.id}`}
                            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} className="text-blue-400" />
                          </Link>
                          <button
                            onClick={() => handleDelete(banner.id)}
                            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} className="text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-900/50 border border-slate-700 rounded-lg">
            <p className="text-slate-400 text-lg mb-4">No banners yet</p>
            <Link
              href="/admin/banners/new"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <Plus size={20} />
              Create Your First Banner
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
