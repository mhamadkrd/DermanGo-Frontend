// app/verify.jsx
import { useSignUp } from '@clerk/expo'
import { useEffect, useState } from 'react'
import { View, TextInput, Button, Text } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import {createAuthStyles} from '../../assets/styles/authStyles.jsx'
import { clearEmailVerification, isEmailVerificationInProgress } from '../../utils/verificationSession.jsx'
import { useErrorDialog } from '../../components/ErrorDialog.jsx'
import LoadingButton from '../../components/LoadingButton.jsx'
import { useUserApi } from '../../Hooks/userHooks.js'

export default function VerifyScreen() {
  const { signUp } = useSignUp()
  const { createUser } = useUserApi()
  const router = useRouter()
  const { name, phone } = useLocalSearchParams()
  console.log('Received params:', { name, phone })
  const styles = createAuthStyles
  const { showError } = useErrorDialog()

  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isEmailVerificationInProgress()) {
      router.replace('/sign-in')
    }
  }, [router])

  const handleVerify = async () => {
    setLoading(true)
    try {
      const { error } = await signUp.verifications.verifyEmailCode({ code })
      if (error) {
        showError('Verification Failed', error.message || 'Invalid code')
        return
      }

      const { error: finalizeError } = await signUp.finalize({
        navigate: async () => {
          await createUser({
            clerkId: signUp.createdUserId,
            name: name || '',
            phone: phone || '',
          })
          clearEmailVerification()
          router.replace('/')
        },
      })

      if (finalizeError) {
        showError('Verification Failed', finalizeError.message || 'Failed to complete sign up')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!isEmailVerificationInProgress()) return null

  return (
    <View style={styles.Container}>

      <TextInput
      style={styles.input}
        placeholder="Enter verification code"
        keyboardType="numeric"
        value={code}
        onChangeText={setCode}
      />

      <LoadingButton
        loading={loading}
        onPress={handleVerify}
        style={styles.signBtn}
        textStyle={styles.signBtnTxt}
        title="Verify"
      />
      <Button title="Back" onPress={() => {
        clearEmailVerification()
        router.replace('/sign-in')
      }} />

    </View>
  )
}