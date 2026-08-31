import { useCallback } from 'react'
import { useAuth } from '@clerk/expo'
import { useErrorDialog } from '../components/ErrorDialog.jsx'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export const useResponsesApi = () => {
  const { getToken } = useAuth()
  const { showError } = useErrorDialog()

  const createResponse = useCallback(async ({ requestId, pharmacyId, available, price }) => {
    try {
      const token = await getToken()

      const response = await fetch(`${API_URL}/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ requestId, pharmacyId, available, price }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to send response')
      return data
    } catch (error) {
      showError('Could not send response', 'Please try again.')
    }
  }, [getToken, showError])

  const getOpenRequestsForPharmacy = useCallback(async (pharmacyId) => {
    try {
      const token = await getToken()

      const response = await fetch(`${API_URL}/responses/${pharmacyId}/requests/open`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to fetch open requests')
      return data
    } catch (error) {
      showError('Could not load open requests', 'Please try again.')
      return []
    }
  }, [getToken, showError])

  const getPharmacyResponseHistory = useCallback(async (pharmacyId) => {
    try {
      const token = await getToken()

      const response = await fetch(`${API_URL}/responses/${pharmacyId}/responses`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to fetch response history')
      return data
    } catch (error) {
      showError('Could not load response history', 'Please try again.')
      return []
    }
  }, [getToken, showError])

  return { createResponse, getOpenRequestsForPharmacy, getPharmacyResponseHistory }
}