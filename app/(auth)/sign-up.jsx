// app/sign-up.jsx
import { useSignUp } from '@clerk/expo'
import { useState } from 'react'
import { View, TextInput, Text ,TouchableOpacity, Image } from 'react-native'
import { Link, useRouter } from 'expo-router'
import {createAuthStyles} from '../../assets/styles/authStyles.jsx'
import { startEmailVerification } from '../../utils/verificationSession.jsx'

export default function SignUpScreen() {
  const { signUp } = useSignUp()
  const router = useRouter()
  const styles = createAuthStyles

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignUp = async () => {
    const { error } = await signUp.password({ emailAddress, password })
    if (error) {
      setErrorMessage(error.message || 'Something went wrong')
      return
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode()
    if (sendError) {
      setErrorMessage(sendError.message || 'Failed to send verification code')
      return
    }

    // Verification is only available in the current app session.
    startEmailVerification()
    router.replace('/verify')
  }

  return (
    <View style={styles.Container}>

<Image 
source={require('../../assets/images/logo.png')}
style={styles.logo}
/>
      
       <Text style={styles.pageText}>Create Account</Text>

      <TextInput
      style={[styles.input, styles.email]}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        value={emailAddress}
        onChangeText={setEmailAddress}
      />
      <TextInput
      style={[styles.input , styles.password]}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {errorMessage ? <Text>{errorMessage}</Text> : null}

      <TouchableOpacity 
      style={styles.signBtn}
      onPress={handleSignUp}>
        <Text style={styles.signBtnTxt}>Sign Up</Text>
      </TouchableOpacity>

      <View nativeID="clerk-captcha" />
      <View style={styles.haveAccView}>
      <Text>Already have an account?</Text>
      <Link style={styles.link} href="/sign-in"> Sign in</Link>
      </View>

      <Link style={styles.link} href="/getStarted"> .</Link>
    </View>
  )
}
