import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from '../../utils/responsive.jsx';
import { COLORS } from '../../constant/colors.jsx'

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

export const createmainStyles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

Container: {
  paddingHorizontal: scale(20),
  paddingTop: verticalScale(15),
  paddingBottom: verticalScale(120), // was 30 — now clears the floating NavBar
},

  Header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scale(10),
  },
  avatar: {
  width: scale(45),
  height: verticalScale(50),
  borderRadius: scale(22),   // exactly half of width/height = perfect circle
  resizeMode: 'cover',
},
  welcomeText: {
    fontSize: moderateScale(20),
    color: COLORS.placeholder,
    fontWeight: "500",
    lineHeight: verticalScale(25),
  },
  userName: {
    fontSize: moderateScale(15),
    color: COLORS.textPrimary,
    fontWeight: "700",
    marginTop: verticalScale(1),
  },
  notificationBackground: {
    width: scale(40),
    height: verticalScale(40),
    borderRadius: scale(25),
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  bellDot: {
    position: 'absolute',
    top: verticalScale(10),
    right: scale(7),
    width: scale(7),
    height: verticalScale(7),
    borderRadius: scale(4),
    backgroundColor: COLORS.surface,
  },
  leftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightHeader: {
    position: "relative",
  },
  WelcomeContainer: {
    marginLeft: scale(14),
    justifyContent: "center",
  },
  mainLogo: {
    width: scale(300),
    height: verticalScale(100),
    alignSelf: 'center',
  },
  mainLogoBackground: {
    padding: scale(10),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: COLORS.textSecondary,
    fontSize: moderateScale(13),
    fontWeight: '600',
  },

  sliderContainer: {
    width: '100%',
    marginTop: scale(20),
    position: 'relative',
  },

  slide: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  sliderImage: {
    width: '100%',
    height: verticalScale(190),
    borderRadius: 20,
  },

  dotsContainer: {
    position: 'absolute',
    bottom: verticalScale(14),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dot: {
    width: scale(7),
    height: verticalScale(7),
    borderRadius: 4,
    marginHorizontal: scale(4),
    backgroundColor: COLORS.placeholder,
  },

  activeDot: {
    width: scale(20),
    backgroundColor: COLORS.primary,
  },

  requestBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(16),
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(14),
    marginTop: verticalScale(20),
  },

  leftSide: {
    width: scale(48),
    height: verticalScale(48),
    borderRadius: scale(12),
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  btnMainText: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: COLORS.surface,
  },

  btnSecondaryText: {
    fontSize: moderateScale(11),
    fontWeight: '400',
    color: COLORS.surface,
    marginTop: verticalScale(2),
  },

  mostSearchedView: {
    marginTop: verticalScale(28),
  },

  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(14),
  },

  medicineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: scale(16),
    padding: scale(12),
    marginBottom: verticalScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  medicineIconBadge: {
    width: scale(44),
    height: verticalScale(44),
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },

  medicineTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  medicineName: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  medicineSubtitle: {
    fontSize: moderateScale(11),
    fontWeight: '400',
    color: COLORS.placeholder,
    marginTop: verticalScale(2),
  },

  medicineTrendBadge: {
    width: scale(32),
    height: verticalScale(32),
    borderRadius: scale(16),
    backgroundColor: '#E4F4E9',
    justifyContent: 'center',
    alignItems: 'center',
  },

})