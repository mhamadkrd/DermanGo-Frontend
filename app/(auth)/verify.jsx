// app/verify.jsx
import { useSignUp } from '@clerk/expo'
import { useEffect, useState } from 'react'
import { View, TextInput, Button, Text,TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import {createAuthStyles} from '../../assets/styles/authStyles.jsx'
import { clearEmailVerification, isEmailVerificationInProgress } from '../../utils/verificationSession.jsx'
import { useErrorDialog } from '../../components/ErrorDialog.jsx'

export default function VerifyScreen() {
  const { signUp } = useSignUp()
  const router = useRouter()
 const styles = createAuthStyles
  const { showError } = useErrorDialog()

  const [code, setCode] = useState('')

  useEffect(() => {
    // Expo can restore the last route after a reload. Do not allow /verify to
    // become a startup screen when no sign-up was started in this app session.
    if (!isEmailVerificationInProgress()) {
      router.replace('/sign-in')
    }
  }, [router])

  const handleVerify = async () => {
    const { error } = await signUp.verifications.verifyEmailCode({ code })
    if (error) {
      showError('Verification Failed', error.message || 'Invalid code')
      return
    }

    const { error: finalizeError } = await signUp.finalize({
      navigate: ({ session }) => {
        clearEmailVerification()
        router.replace('/')
      },
    })

    if (finalizeError) {
      showError('Verification Failed', finalizeError.message || 'Failed to complete sign up')
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

      <TouchableOpacity
      onPress={handleVerify}
      style={styles.signBtn}
      >
        <Text style={styles.signBtnTxt}>Verify</Text>
      </TouchableOpacity>
      <Button title="Back" onPress={() => {
        clearEmailVerification()
        router.replace('/sign-in')
      }} />

    </View>
  )
}