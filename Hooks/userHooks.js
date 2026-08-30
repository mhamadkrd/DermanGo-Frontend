// Hooks/userHooks.js
import { useCallback } from 'react'
import { useAuth } from '@clerk/expo'
import { useErrorDialog } from '../components/ErrorDialog.jsx'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export const useUserApi = () => {
  const { getToken } = useAuth()
  const { showError } = useErrorDialog()

  const createUser = useCallback(async ({ clerkId, name, phone }) => {
    try {
      const token = await getToken()

      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ clerkId, name, phone }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to create user')
      return data
    } catch (error) {
      showError('Could not save your profile', 'Please try again from your profile page.')
    }
  }, [getToken, showError])

  const getUserProfile = useCallback(async (clerkId) => {
    try {
      const token = await getToken()

      const response = await fetch(`${API_URL}/users/${clerkId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to fetch user')
      return data
    } catch (error) {
      showError('Could not load your profile', 'Please try again.')
    }
  }, [getToken, showError])

  const updateUserProfile = useCallback(async (clerkId, { name, phone }) => {
    try {
      const token = await getToken()

      const response = await fetch(`${API_URL}/users/${clerkId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, phone }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to update user')
      return data
    } catch (error) {
      showError('Could not update your profile', 'Please try again.')
    }
  }, [getToken, showError])

  return { createUser, getUserProfile, updateUserProfile }
}