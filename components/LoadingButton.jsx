// components/LoadingButton.jsx
import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'

export default function LoadingButton({ loading, onPress, style, textStyle, title }) {
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}