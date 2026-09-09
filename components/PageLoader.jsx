// components/PageLoader.jsx
import React, { useEffect, useState } from 'react'
import { View, Animated, Easing, StyleSheet } from 'react-native'
import { COLORS } from '../constant/colors.jsx'
import { scale, verticalScale, moderateScale } from '../utils/responsive.jsx';




// ↔️ scale = left/right
// ↕️ verticalScale = up/down
// 🔤 moderateScale = text/font

// Yes. Use this simple rule:

// padding / margin → scale()
// paddingHorizontal / marginHorizontal → scale()
// paddingVertical / marginVertical → verticalScale()
// paddingTop/Bottom / marginTop/Bottom → verticalScale()
// fontSize → moderateScale()

// width → scale() ↔️
// height → verticalScale() ↕️


export default function PageLoader() {
  const [rotation] = useState(() => new Animated.Value(0))

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    )
    animation.start()

    return () => animation.stop()
  }, [rotation])

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/pill_logo.png')}
        style={[styles.logo, { transform: [{ rotate: spin }] }]}
        resizeMode="contain"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  logo: {
    width: scale(100),
    height: verticalScale(100),
  },
})