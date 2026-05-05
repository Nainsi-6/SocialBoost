/**
 * Server-side utility for resolving the live SMM service ID map.
 * This file has NO 'use client' directive — it is safe to import in Server Components.
 *
 * For client components, use the `useServiceIds` hook instead.
 */

import { BACKEND_URL } from '@/lib/api-config';
import { type ServiceIdMap } from '@/lib/services-data';

export type { ServiceIdMap };

export interface ServiceIdEntry {
  id: number;
  name: string;
  provider: string;
  category: string;
  platform: string;
  allowedQuantities: number[];
  description?: string;
}

/** Hardcoded fallback — site never breaks if the API is down */
export const FALLBACK_SERVICE_ID_MAP: ServiceIdMap = {
  followers: 10183,
  likes: 12587,
  views: 602,
  comments: 670,
};

/**
 * Builds a category → smmServiceId map from an array of ServiceIdEntry objects.
 * Instagram platform entries set the primary (unscoped) key;
 * all entries also get a `{platform}_{category}` scoped key.
 */
export function buildServiceIdMap(entries: ServiceIdEntry[]): ServiceIdMap {
  const map: ServiceIdMap = { ...FALLBACK_SERVICE_ID_MAP };
  for (const entry of entries) {
    if (entry.platform === 'instagram') {
      map[entry.category] = entry.id;
    }
    map[`${entry.platform}_${entry.category}`] = entry.id;
  }
  return map;
}

/**
 * Fetches the live service ID map directly from the Express backend.
 * Safe to call in Server Components, generateStaticParams, generateMetadata, etc.
 *
 * Uses Next.js ISR: revalidates every 60 seconds.
 * Falls back to FALLBACK_SERVICE_ID_MAP on any error.
 */
export async function fetchServiceIdMap(): Promise<ServiceIdMap> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/service-ids/map`, {
      next: { revalidate: 60 },
    });

    const json = await res.json();

    if (json.success && json.data) {
      return json.data as ServiceIdMap;
    }
  } catch (err) {
    console.warn('[fetchServiceIdMap] Using fallback IDs:', err);
  }

  return FALLBACK_SERVICE_ID_MAP;
}
