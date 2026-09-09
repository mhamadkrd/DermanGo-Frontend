import { useEffect, useState } from 'react'
import { View, Animated, StyleSheet, Dimensions } from 'react-native'
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import { COLORS } from '../constant/colors.jsx'

const { width, height } = Dimensions.get('window')

export default function AnimatedSplash({ onFinish }) {
  const [pillScale] = useState(() => new Animated.Value(0))
  const [pillRotate] = useState(() => new Animated.Value(0))
  const [pillOpacity] = useState(() => new Animated.Value(1))
  const [logoOpacity] = useState(() => new Animated.Value(0))
  const [logoScale] = useState(() => new Animated.Value(0.8))

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(pillScale, { toValue: 1, friction: 5, useNativeDriver: true }),
        Animated.timing(pillRotate, { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),
      Animated.delay(150),
      Animated.parallel([
        Animated.timing(pillOpacity, { toValue: 0, duration: 400, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(logoScale, { toValue: 1, friction: 6, useNativeDriver: true }),
      ]),
      Animated.delay(500),
    ]).start(() => onFinish?.())
  }, [])

  const rotateInterpolate = pillRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View style={styles.container} pointerEvents="none">
      <Animated.View
        style={[
          styles.iconWrap,
          { opacity: pillOpacity, transform: [{ scale: pillScale }, { rotate: rotateInterpolate }] },
        ]}
      >
        <MaterialCommunityIcons name="pill" size={80} color={COLORS.primary} />
      </Animated.View>

      <Animated.Image
        source={require('../assets/images/logo.png')}
        style={[styles.logo, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}
        resizeMode="contain"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    elevation: 999, // needed on Android for stacking
  },
  iconWrap: { position: 'absolute' },
  logo: { position: 'absolute', width: 400, height: 300 },
})