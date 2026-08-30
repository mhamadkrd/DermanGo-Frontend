// app/reset-pass.jsx
import { useSignIn } from '@clerk/expo'
import { useState } from 'react'
import { View, TextInput, Button, Text,TouchableOpacity } from 'react-native'
import { Link, useRouter } from 'expo-router'
import {createAuthStyles} from '../../assets/styles/authStyles.jsx'
import { useErrorDialog } from '../../components/ErrorDialog.jsx'

export default function ResetPasswordScreen() {
  const {  signIn } = useSignIn()
  const router = useRouter()
  const styles = createAuthStyles
  const { showError } = useErrorDialog()

  const [emailAddress, setEmailAddress] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [codeSent, setCodeSent] = useState(false)

  // Step 1: send the reset code to the user's email
  const sendCode = async () => {
  

    const { error: createError } = await signIn.create({ identifier: emailAddress })
    if (createError) {
      showError('Reset Failed', createError.message || 'Email not found')
      return
    }

    const { error: sendError } = await signIn.resetPasswordEmailCode.sendCode()
    if (sendError) {
      showError('Reset Failed', sendError.message || 'Failed to send code')
      return
    }

    setCodeSent(true)
  }

  // Step 2: verify the code the user received
  const verifyCode = async () => {
    const { error } = await signIn.resetPasswordEmailCode.verifyCode({ code })
    if (error) {
      showError('Reset Failed', error.message || 'Invalid code')
    }
  }

  // Step 3: submit the new password
  const submitNewPassword = async () => {
    const { error } = await signIn.resetPasswordEmailCode.submitPassword({
      password: newPassword,
      signOutOfOtherSessions: true,
    })

    if (error) {
      showError('Reset Failed', error.message || 'Failed to reset password')
      return
    }

    if (signIn.status === 'complete') {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          router.replace('/')
        },
      })
    }
  }

  // Step 3 UI — shown once the code has been verified
  if ((signIn.status === 'needs_new_password')) {
    return (
      <View style={styles.Container}>
        <TextInput
        style={styles.input}
          placeholder="Enter new password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <TouchableOpacity 
        onPress={submitNewPassword}
        style={styles.signBtn}>
          <Text style={styles.signBtnTxt}>Set New Password</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // Step 2 UI — shown after the code has been sent
  if (codeSent) {
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
        onPress={verifyCode}
        style={styles.signBtn}
        >
          <Text style={styles.signBtnTxt}>Verify Code</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // Step 1 UI — collect email
  return (
    <View style={styles.Container}>
      <TextInput
      style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Enter your email"
        value={emailAddress}
        onChangeText={setEmailAddress}
      />

      <TouchableOpacity
      onPress={sendCode}
      style={styles.signBtn}
      >
        <Text style={styles.signBtnTxt}>Send Request Code</Text>
      </TouchableOpacity>


<View style={styles.haveAccView}>
      <Text>Remember your password? </Text>
          <Link style={styles.link} href="/sign-in">Sign in</Link>
      </View>
  
    </View>
  )
}