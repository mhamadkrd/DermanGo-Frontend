import { useCallback } from 'react'
import { useAuth } from '@clerk/expo'
import { useErrorDialog } from '../components/ErrorDialog.jsx'

// EXPO_PUBLIC_API_URL might be set to "https://dermango.netlify.app",
// "https://dermango.netlify.app/api" or "https://dermango.netlify.app/api/".
// Normalize it down to just the domain root so we can safely append
// "/api/requests..." exactly once, no matter how the env var is set.
const RAW_API_URL = process.env.EXPO_PUBLIC_API_URL || ''
const BASE_URL = RAW_API_URL
  .replace(/\/api\/?$/, '') // strip a trailing /api or /api/
  .replace(/\/+$/, '')      // strip any remaining trailing slash

// Safely parse a fetch Response as JSON, giving a clear error instead of
// "Unexpected character: <" when the server returns HTML (e.g. a 404 page).
async function parseJsonResponse(response) {
  const text = await response.text()
  try {
    return JSON.parse(text)
  } catch (e) {
    throw new Error(
      `Server returned non-JSON response (status ${response.status}) from ${response.url}`
    )
  }
}

export const useRequestsApi = () => {
  const { getToken } = useAuth()
  const { showError } = useErrorDialog()

  const createRequest = useCallback(async ({ userId, medicineName }) => {
    try {
      const token = await getToken()

      const response = await fetch(`${BASE_URL}/api/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, medicineName }),
      })

      const data = await parseJsonResponse(response)
      if (!response.ok) {
        console.log('createRequest failed:', response.status, JSON.stringify(data))
        throw new Error(data.error || `Failed to create request (status ${response.status})`)
      }
      return data
    } catch (error) {
      console.log('createRequest error:', error.message, 'BASE_URL:', BASE_URL)
      showError('Could not send request', 'Please try again.')
    }
  }, [getToken, showError])

  const getUserRequests = useCallback(async (userId) => {
    try {
      const token = await getToken()

      const response = await fetch(`${BASE_URL}/api/requests?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await parseJsonResponse(response)
      if (!response.ok) throw new Error(data.error || 'Failed to fetch requests')
      return data
    } catch (error) {
      console.log('getUserRequests error:', error.message, 'BASE_URL:', BASE_URL)
      showError('Could not load your requests', 'Please try again.')
      return []
    }
  }, [getToken, showError])

  const getRequestById = useCallback(async (id) => {
    try {
      const token = await getToken()

      const response = await fetch(`${BASE_URL}/api/requests/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await parseJsonResponse(response)
      if (!response.ok) throw new Error(data.error || 'Failed to fetch request')
      return data
    } catch (error) {
      console.log('getRequestById error:', error.message, 'BASE_URL:', BASE_URL)
      showError('Could not load request details', 'Please try again.')
    }
  }, [getToken, showError])

  return { createRequest, getUserRequests, getRequestById }
}