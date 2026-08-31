import { StyleSheet } from "react-native";
import { scale, verticalScale, moderateScale } from '../../utils/responsive.jsx';
import { COLORS } from '../../constant/colors.jsx'

export const createRequestsStyles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  listContent: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(15),
    paddingBottom: verticalScale(120), // clears floating NavBar
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: verticalScale(10),
  },

  title: {
    fontSize: moderateScale(24),
    fontWeight: '800',
    color: COLORS.textPrimary,
  },

  subtitle: {
    fontSize: moderateScale(13),
    color: COLORS.placeholder,
    marginTop: verticalScale(2),
  },

  filterButton: {
    width: scale(40),
    height: verticalScale(40),
    borderRadius: scale(20),
    backgroundColor: '#EAF6EE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: scale(14),
    padding: scale(4),
    marginTop: verticalScale(20),
  },

  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(10),
    borderRadius: scale(10),
    gap: scale(6),
  },

  tabActive: {
    backgroundColor: COLORS.primary,
  },

  tabText: {
    fontSize: moderateScale(11),
    fontWeight: '600',
    color: COLORS.placeholder,
  },

  tabTextActive: {
    color: COLORS.surface,
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(16),
  },

  newRequestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: scale(12),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(14),
    gap: scale(6),
  },

  newRequestText: {
    color: COLORS.surface,
    fontWeight: '700',
    fontSize: moderateScale(13),
  },

  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },

  sortText: {
    color: COLORS.placeholder,
    fontSize: moderateScale(13),
    fontWeight: '500',
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: scale(16),
    padding: scale(14),
    marginTop: verticalScale(16),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  iconBadge: {
    width: scale(48),
    height: verticalScale(48),
    borderRadius: scale(14),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },

  cardTextContainer: {
    flex: 1,
  },

  medicineName: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  medicineSubtitle: {
    fontSize: moderateScale(11),
    color: COLORS.placeholder,
    marginTop: verticalScale(1),
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(5),
    gap: scale(5),
  },

  metaText: {
    fontSize: moderateScale(11),
    color: COLORS.placeholder,
  },

  cardRightColumn: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: verticalScale(48),
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(20),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    gap: scale(4),
  },

  statusText: {
    fontSize: moderateScale(11),
    fontWeight: '700',
  },

  responsesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F9F3',
    borderRadius: scale(10),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(8),
    marginTop: verticalScale(12),
  },

  responsesText: {
    fontSize: moderateScale(11),
    color: COLORS.textPrimary,
  },

  responsesLabel: {
    color: COLORS.primary,
    fontWeight: '700',
  },

  viewResponsesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(3),
  },

  viewResponsesText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: moderateScale(11),
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(60),
  },

  emptyTitle: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: verticalScale(12),
  },

  emptySubtitle: {
    fontSize: moderateScale(12),
    color: COLORS.placeholder,
    marginTop: verticalScale(4),
    textAlign: 'center',
  },

  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF6EE',
    borderRadius: scale(16),
    padding: scale(14),
    marginTop: verticalScale(20),
  },

  bannerIconWrap: {
    width: scale(48),
    height: verticalScale(48),
    borderRadius: scale(14),
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(12),
  },

  bannerTextContainer: {
    flex: 1,
  },

  bannerTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  bannerSubtitle: {
    fontSize: moderateScale(11),
    color: COLORS.placeholder,
    marginTop: verticalScale(2),
  },

  bannerPlusButton: {
    width: scale(36),
    height: verticalScale(36),
    borderRadius: scale(18),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

})