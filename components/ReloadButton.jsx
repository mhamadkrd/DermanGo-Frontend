import { TouchableOpacity, ActivityIndicator } from 'react-native'
import { Feather } from 'react-native-vector-icons'
import { COLORS } from '../constant/colors.jsx'

export default function ReloadButton({ onReload, loading, style, size = 18, color = COLORS.primary }) {
  return (
    <TouchableOpacity
      style={style}
      activeOpacity={0.7}
      onPress={onReload}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator size="small" color={color} />
      ) : (
        <Feather name="refresh-cw" size={size} color={color} />
      )}
    </TouchableOpacity>
  )
}