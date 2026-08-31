import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons, Feather } from "react-native-vector-icons";
import { COLORS } from "../constant/colors.jsx";
import { scale, verticalScale, moderateScale } from '../utils/responsive.jsx';

const tabs = [
  {
    key: 'home',
    label: 'Home',
    path: '/',
    icon: (color) => <Ionicons name="home" size={22} color={color} />,
  },
  {
    key: 'requests',
    label: 'Requests',
    path: '/requests',
    icon: (color) => <Feather name="clipboard" size={22} color={color} />,
  },
  {
    key: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: (color) => <Feather name="settings" size={22} color={color} />,
  },
];

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        const color = isActive ? COLORS.primary : COLORS.placeholder;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabButton}
            activeOpacity={0.7}
            onPress={() => router.push(tab.path)}
          >
            {tab.icon(color)}
            <Text style={[styles.label, { color }]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = {
  container: {
    position: 'absolute',
    bottom: verticalScale(20),
    left: scale(16),
    right: scale(16),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: scale(24),
    paddingVertical: verticalScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: moderateScale(11),
    fontWeight: '600',
    marginTop: verticalScale(4),
  },
};