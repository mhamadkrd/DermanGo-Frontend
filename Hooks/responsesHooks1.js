import { useCallback } from 'react'
import * as SecureStore from 'expo-secure-store'
import { useErrorDialog } from '../components/ErrorDialog.jsx'

const STORAGE_KEY = 'derman-go-pharmacy-access'
const API_URL = process.env.EXPO_PUBLIC_API_URL

async function authHeaders() {
  const saved = await SecureStore.getItemAsync(STORAGE_KEY)
  const { accessCode } = saved ? JSON.parse(saved) : {}
  return {
    'Content-Type': 'application/json',
    'x-access-code': accessCode || '',
  }
}

export function useResponsesApi() {
  const { showError } = useErrorDialog()

  const getOpenRequests = useCallback(async () => {
    try {
      const headers = await authHeaders()
      const response = await fetch(`${API_URL}/responses/open`, { headers })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to fetch open requests')
      return data
    } catch (error) {
      showError('Could not load requests', 'Please try again.')
      return []
    }
  }, [showError])

  const submitResponse = useCallback(async ({ requestId, available, price }) => {
    try {
      const headers = await authHeaders()
      const response = await fetch(`${API_URL}/responses`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ requestId, available, price }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to submit response')
      return data
    } catch (error) {
      showError('Could not send response', error.message || 'Please try again.')
      return null
    }
  }, [showError])

  const getResponseHistory = useCallback(async () => {
    try {
      const headers = await authHeaders()
      const response = await fetch(`${API_URL}/responses/history`, { headers })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to fetch history')
      return data
    } catch (error) {
      showError('Could not load history', 'Please try again.')
      return []
    }
  }, [showError])

  return { getOpenRequests, submitResponse, getResponseHistory }
}