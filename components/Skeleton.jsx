// components/Skeleton.jsx
import React, { useEffect, useRef } from 'react'
import { Animated, View, StyleSheet } from 'react-native'

// Single shimmering block — use this to build any skeleton shape you need
export function SkeletonBox({ width = '100%', height = 16, borderRadius = 8, style }) {
  const opacity = useRef(new Animated.Value(0.3)).current

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.3, duration: 700, useNativeDriver: true }),
      ])
    )
    loop.start()
    return () => loop.stop()
  }, [opacity])

  return (
    <Animated.View
      style={[
        styles.box,
        { width, height, borderRadius, opacity },
        style,
      ]}
    />
  )
}

// Ready-made list-item skeleton — avatar + two lines of text
export function SkeletonListItem() {
  return (
    <View style={styles.row}>
      <SkeletonBox width={48} height={48} borderRadius={24} />
      <View style={styles.rowText}>
        <SkeletonBox width="70%" height={14} style={{ marginBottom: 8 }} />
        <SkeletonBox width="40%" height={12} />
      </View>
    </View>
  )
}

// Repeats SkeletonListItem N times — drop this straight in as your loading state
export function SkeletonList({ count = 5 }) {
  return (
    <View>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonListItem key={i} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#E1E1E1',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  rowText: {
    marginLeft: 12,
    flex: 1,
  },
})