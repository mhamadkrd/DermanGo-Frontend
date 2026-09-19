import { useCallback } from 'react'
import { useAuth } from '@clerk/expo'
import { useErrorDialog } from '../components/ErrorDialog.jsx'

const RAW_API_URL = process.env.EXPO_PUBLIC_API_URL || ''
const BASE_URL = RAW_API_URL
  .replace(/\/api\/?$/, '')
  .replace(/\/+$/, '')

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

// Guarantees a request either resolves or fails within timeoutMs — this is
// what stops the app from ever feeling "frozen": if the network genuinely
// stalls, the user gets an error instead of an indefinite wait.
async function fetchWithTimeout(url, options, timeoutMs = 25000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

export const useRequestsApi = () => {
  const { getToken } = useAuth()
  const { showError } = useErrorDialog()

  const createRequest = useCallback(async ({ userId, medicineName, image }) => {
    try {
      const token = await getToken()

      const response = await fetchWithTimeout(`${BASE_URL}/api/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          medicineName,
          imageBase64: image?.base64 || null,
          imageMimeType: image?.mimeType || null,
        }),
      })

      const data = await parseJsonResponse(response)
      if (!response.ok) {
        console.log('createRequest failed:', response.status, JSON.stringify(data))
        throw new Error(data.error || `Failed to create request (status ${response.status})`)
      }
      return data
    } catch (error) {
      const isTimeout = error.name === 'AbortError'
      console.log('createRequest error:', isTimeout ? 'timed out' : error.message, 'BASE_URL:', BASE_URL)
      showError(
        'Could not send request',
        isTimeout ? 'The request took too long. Please check your connection and try again.' : 'Please try again.'
      )
    }
  }, [getToken, showError])

  const getUserRequests = useCallback(async (userId) => {
    try {
      const token = await getToken()

      const response = await fetchWithTimeout(`${BASE_URL}/api/requests?userId=${userId}`, {
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

      const response = await fetchWithTimeout(`${BASE_URL}/api/requests/${id}`, {
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