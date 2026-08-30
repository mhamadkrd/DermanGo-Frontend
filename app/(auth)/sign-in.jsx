// app/sign-in.jsx
import { useSignIn } from '@clerk/expo'
import { useState } from 'react'
import { View, TextInput,  Text,Image, TouchableOpacity} from 'react-native'
import { Link, useRouter } from 'expo-router'
import {createAuthStyles} from '../../assets/styles/authStyles.jsx'
import { useErrorDialog } from '../../components/ErrorDialog.jsx'


export default function SignInScreen() {
  const { signIn } = useSignIn()
  const router = useRouter()
  const styles = createAuthStyles
  const { showError } = useErrorDialog()
  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = async () => {
    console.log('SIGN IN TAPPED')

    try {
      const { error: identifierError } = await signIn.create({
        identifier: emailAddress.trim(),
      })
      console.log('after create, error:', identifierError, 'status:', signIn.status)

      if (identifierError) {
        if (identifierError.code === 'identifier_already_signed_in' || identifierError.message?.toLowerCase().includes('already signed in')) {
          router.replace('/')
          return
        }
        showError('Sign In Failed', identifierError.message || 'Enter a valid email address')
        return
      }

      const { error: passwordError } = await signIn.password({ password })
      console.log('after password, error:', passwordError, 'status:', signIn.status)

      if (passwordError) {
        showError('Sign In Failed', passwordError.message || 'Invalid email or password')
        return
      }

      if (signIn.status !== 'complete') {
        console.log('status not complete:', signIn.status)
        showError('Sign In Failed', 'Your sign-in needs an additional verification step.')
        return
      }

      const { error: finalizeError } = await signIn.finalize({
        navigate: () => router.replace('/'),
      })
      console.log('after finalize, error:', finalizeError)

      if (finalizeError) {
        showError('Sign In Failed', finalizeError.message || 'Unable to complete sign-in')
      }
    } catch (error) {
      console.log('SIGNIN ERROR:', JSON.stringify(error, null, 2))
      const msg = error?.errors?.[0]?.longMessage || error?.errors?.[0]?.message || error?.message || 'Invalid email or password'
      if (msg.toLowerCase().includes('already signed in')) {
        router.replace('/')
        return
      }
      showError('Sign In Failed', msg)
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

     <TouchableOpacity 
     style={styles.signBtn}
     onPress={handleSignIn}
     
     >

      
      <Text style={styles.signBtnTxt}>Sign In</Text>
     </TouchableOpacity>

      <Link style={styles.link} href="/reset-pass">Forgot password?</Link>

 <View style={styles.haveAccView}>
      <Text>Don&#39;t have an account?</Text>
      <Link style={styles.link} href="/sign-up"> Sign Up</Link>
      </View>

    </View>
  )
}