import { useCallback } from 'react'
import { useAuth } from '@clerk/expo'
import { useErrorDialog } from '../components/ErrorDialog.jsx'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export const useRequestsApi = () => {
  const { getToken } = useAuth()
  const { showError } = useErrorDialog()

  const createRequest = useCallback(async ({ userId, medicineName }) => {
    try {
      const token = await getToken()

      const response = await fetch(`${API_URL}/api/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, medicineName }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to create request')
      return data
    } catch (error) {
      showError('Could not send request', 'Please try again.')
    }
  }, [getToken, showError])

  const getUserRequests = useCallback(async (userId) => {
    try {
      const token = await getToken()

      const response = await fetch(`${API_URL}/api/requests?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to fetch requests')
      return data
    } catch (error) {
      showError('Could not load your requests', 'Please try again.')
      return []
    }
  }, [getToken, showError])

  const getRequestById = useCallback(async (id) => {
    try {
      const token = await getToken()

      const response = await fetch(`${API_URL}/api/requests/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to fetch request')
      return data
    } catch (error) {
      showError('Could not load request details', 'Please try again.')
    }
  }, [getToken, showError])

  return { createRequest, getUserRequests, getRequestById }
}