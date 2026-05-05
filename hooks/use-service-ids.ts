/**
 * useServiceIds — React hook for fetching the live SMM service ID map.
 * CLIENT ONLY — uses useState/useEffect.
 *
 * For Server Components, import fetchServiceIdMap from '@/lib/fetch-service-ids' instead.
 *
 * Usage:
 *   const { serviceIdMap, isLoading } = useServiceIds()
 *   const followersId = serviceIdMap.followers  // → live value from backend
 */

'use client'

import { useState, useEffect } from 'react'
import {
  type ServiceIdMap,
  type ServiceIdEntry,
  FALLBACK_SERVICE_ID_MAP,
  buildServiceIdMap,
} from '@/lib/fetch-service-ids'

export type { ServiceIdMap, ServiceIdEntry }

interface UseServiceIdsReturn {
  serviceIdMap: ServiceIdMap
  serviceIdEntries: ServiceIdEntry[]
  isLoading: boolean
  error: string | null
}

export function useServiceIds(): UseServiceIdsReturn {
  const [serviceIdEntries, setServiceIdEntries] = useState<ServiceIdEntry[]>([])
  const [serviceIdMap, setServiceIdMap] = useState<ServiceIdMap>(FALLBACK_SERVICE_ID_MAP)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        setIsLoading(true)
        // Fetch the simple map for quick lookup
        const resMap = await fetch('/api/service-ids/map', { cache: 'no-store' })
        const jsonMap = await resMap.json()

        if (!cancelled && jsonMap.success && jsonMap.data) {
          setServiceIdMap(jsonMap.data)
        }

        // Also fetch full entries if we need them (e.g. for a list)
        const resEntries = await fetch('/api/service-ids', { cache: 'no-store' })
        const jsonEntries = await resEntries.json()
        if (!cancelled && jsonEntries.success && Array.isArray(jsonEntries.data)) {
          setServiceIdEntries(jsonEntries.data)
        }
      } catch (err) {
        if (!cancelled) {
          setError('Could not load service IDs, using defaults.')
          console.warn('[useServiceIds] Falling back to hardcoded IDs:', err)
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return { serviceIdMap, serviceIdEntries, isLoading, error }
}
