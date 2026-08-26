// app/sign-in.jsx
import { useSignIn } from '@clerk/expo'
import { useState } from 'react'
import { View, TextInput,  Text,Image, TouchableOpacity} from 'react-native'
import { Link, useRouter } from 'expo-router'
import {createAuthStyles} from '../../assets/styles/authStyles.jsx'

export default function SignInScreen() {
  const { signIn } = useSignIn()
  const router = useRouter()
 const styles = createAuthStyles

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignIn = async () => {
    setErrorMessage('')

    try {
      // Clerk's current Expo flow requires an identifier before the password.
      const { error: identifierError } = await signIn.create({
        identifier: emailAddress.trim(),
      })

      if (identifierError) {
        setErrorMessage(identifierError.message || 'Enter a valid email address')
        return
      }

      const { error: passwordError } = await signIn.password({ password })
      if (passwordError) {
        setErrorMessage(passwordError.message || 'Invalid email or password')
        return
      }

      if (signIn.status !== 'complete') {
        setErrorMessage('Your sign-in needs an additional verification step.')
        return
      }

      const { error: finalizeError } = await signIn.finalize({
        navigate: () => router.replace('/'),
      })

      if (finalizeError) {
        setErrorMessage(finalizeError.message || 'Unable to complete sign-in')
      }
    } catch (error) {
      setErrorMessage(error?.errors?.[0]?.longMessage || error?.message || 'Invalid email or password')
    }
  }

  return (
    <View style={styles.Container}>

      <Image 
      source={require('../../assets/images/logo.png')}
      style={styles.logo}
      />

      <Text style={styles.pageText}>Welcome Back</Text>
       
      <TextInput
      style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        value={emailAddress}
        onChangeText={setEmailAddress}
      />
      <TextInput
      style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {errorMessage ? <Text>{errorMessage}</Text> : null}

         

     <TouchableOpacity 
     style={styles.signBtn}
     onPress={handleSignIn}
     
     >

      
      <Text style={styles.signBtnTxt}>Sign In</Text>
     </TouchableOpacity>

      <Link style={styles.link} href="/reset-pass">Forgot password?</Link>

 <View style={styles.haveAccView}>
      <Text>Don&apos;t have an account?</Text>
      <Link style={styles.link} href="/sign-up"> Sign Up</Link>
      </View>

    </View>
  )
}
