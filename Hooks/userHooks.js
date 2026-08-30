// hooks/useUserApi.js
import { useCallback } from 'react'
import { useAuth } from '@clerk/expo'
import { useErrorDialog } from '../components/ErrorDialog.jsx'

const API_URL = process.env.EXPO_PUBLIC_API_URL

export const useUserApi = () => {
  const { getToken } = useAuth()
  const { showError } = useErrorDialog()

  const createUser = useCallback(async ({ clerkId, name, phone }) => {
    try {
      console.log('API_URL:', API_URL)
      console.log('Calling createUser with:', { clerkId, name, phone })

      const token = await getToken()
      console.log('Got token:', token ? 'yes' : 'NO TOKEN')

      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ clerkId, name, phone }),
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (!response.ok) throw new Error(data.msg || 'Failed to create user')

      return data
    } catch (error) {
      console.log('CREATE USER ERROR:', error.message, error)
      showError('Could not save your profile', 'Please try again from your profile page.')
    }
  }, [getToken, showError])

  return { createUser }
}