import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constant/colors.jsx";

export default function SafeScreen({ children }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      {children}
    </SafeAreaView>
  );
}