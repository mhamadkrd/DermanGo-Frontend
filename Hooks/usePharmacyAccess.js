import { useCallback, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { useErrorDialog } from '../components/ErrorDialog.jsx'

const STORAGE_KEY = 'derman-go-pharmacy-access'
const API_URL = process.env.EXPO_PUBLIC_API_URL

export function usePharmacyAccess() {
  const { showError } = useErrorDialog()
  const [pharmacy, setPharmacy] = useState(null) // { id, name, accessCode } | null
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const saved = await SecureStore.getItemAsync(STORAGE_KEY)
        if (saved) setPharmacy(JSON.parse(saved))
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const unlock = useCallback(async (accessCode) => {
    try {
      const response = await fetch(`${API_URL}/pharmacies/verify-access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessCode }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Invalid access code')

      const record = { id: data.id, name: data.name, accessCode }
      await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(record))
      setPharmacy(record)
      return record
    } catch (error) {
      showError('Could not unlock dashboard', error.message || 'Check the code and try again.')
      return null
    }
  }, [showError])

  const lock = useCallback(async () => {
    await SecureStore.deleteItemAsync(STORAGE_KEY)
    setPharmacy(null)
  }, [])

  return { pharmacy, loading, unlock, lock }
}