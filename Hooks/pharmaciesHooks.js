import { useCallback } from 'react'
import { useAuth } from '@clerk/expo'
import { useErrorDialog } from '../components/ErrorDialog.jsx'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export const usePharmaciesApi = () => {
  const { getToken } = useAuth()
  const { showError } = useErrorDialog()

  const createPharmacy = useCallback(async ({ clerkId, name, phone, address, latitude, longitude }) => {
    try {
      const token = await getToken()

      const response = await fetch(`${API_URL}/api/pharmacies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ clerkId, name, phone, address, latitude, longitude }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to create pharmacy')
      return data
    } catch (error) {
      showError('Could not create pharmacy', 'Please try again.')
    }
  }, [getToken, showError])

  const getPharmacyProfile = useCallback(async (clerkId) => {
    try {
      const token = await getToken()

      const response = await fetch(`${API_URL}/api/pharmacies/${clerkId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to fetch pharmacy')
      return data
    } catch (error) {
      showError('Could not load pharmacy profile', 'Please try again.')
    }
  }, [getToken, showError])

  const updatePharmacyProfile = useCallback(async (clerkId, { phone, address, latitude, longitude }) => {
    try {
      const token = await getToken()

      const response = await fetch(`${API_URL}/api/pharmacies/${clerkId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone, address, latitude, longitude }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to update pharmacy')
      return data
    } catch (error) {
      showError('Could not update pharmacy profile', 'Please try again.')
    }
  }, [getToken, showError])

  return { createPharmacy, getPharmacyProfile, updatePharmacyProfile }
}