import { StyleSheet } from 'react-native'

import { COLORS } from '../../constant/colors.jsx'
import { scale, verticalScale, moderateScale } from '../../utils/responsive.jsx'

export const pharmacyDashboardStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    padding: scale(16),
    paddingBottom: verticalScale(100),
  },

  // Header

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalScale(20),
  },

  welcomeText: {
    fontSize: moderateScale(14),
    color: COLORS.textSecondary,
  },

  pharmacyNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginTop: verticalScale(2),
  },

  pharmacyName: {
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  subtitle: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    marginTop: verticalScale(4),
  },

  bellBtn: {
    width: scale(42),
    height: verticalScale(42),
    borderRadius: scale(12),
    backgroundColor: COLORS.surfaceGreenLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bellDot: {
    position: 'absolute',
    top: verticalScale(8),
    right: scale(9),
    width: scale(8),
    height: verticalScale(8),
    borderRadius: scale(4),
    backgroundColor: COLORS.successDark,
    borderWidth: scale(1.5),
    borderColor: COLORS.surfaceGreenLight,
  },

  // Stat cards

  statsRow: {
    flexDirection: 'row',
    gap: scale(10),
    marginBottom: verticalScale(20),
  },

  statCard: {
    flex: 1,
    backgroundColor: COLORS.surfaceGreen,
    borderRadius: scale(14),
    padding: scale(12),
    gap: scale(8),
  },

  statIconBox: {
    width: scale(30),
    height: verticalScale(30),
    borderRadius: scale(8),
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statNumber: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  statLabel: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
  },

  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginBottom: verticalScale(14),
  },

  backText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  // Segmented control

  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: scale(12),
    padding: scale(4),
    marginBottom: verticalScale(16),
    gap: scale(4),
  },

  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(10),
    borderRadius: scale(9),
  },

  tabBtnActive: {
    backgroundColor: COLORS.primary,
  },

  tabText: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: COLORS.textSecondary,
  },

  tabTextActive: {
    color: COLORS.textOnPrimary,
  },

  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    marginLeft: 'auto',
    paddingHorizontal: scale(8),
  },

  filterText: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    fontWeight: '500',
  },

  // Request card

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: scale(16),
    padding: scale(14),
    marginBottom: verticalScale(12),
  },

  cardTopRow: {
    flexDirection: 'row',
    gap: scale(12),
  },

  iconBox: {
    width: scale(56),
    height: verticalScale(56),
    borderRadius: scale(14),
    backgroundColor: COLORS.surfaceGreenLight,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardInfo: {
    flex: 1,
  },

  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  medicineName: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    marginTop: verticalScale(6),
  },

  metaText: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
  },

  statusPillPending: {
    backgroundColor: COLORS.statusTints.pendingWarm,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(20),
  },

  statusPillPendingText: {
    color: COLORS.accentDark,
    fontWeight: '600',
    fontSize: moderateScale(12),
  },

  statusPillResponded: {
    backgroundColor: COLORS.statusTints.respondedLight,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(20),
  },

  statusPillRespondedText: {
    color: COLORS.successDark,
    fontWeight: '600',
    fontSize: moderateScale(12),
  },

  newBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.surfaceGreenLight,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(3),
    borderRadius: scale(8),
    marginTop: verticalScale(10),
  },

  newBadgeText: {
    fontSize: moderateScale(11),
    fontWeight: '700',
    color: COLORS.successDark,
  },

  actionsRow: {
    flexDirection: 'row',
    gap: scale(10),
    marginTop: verticalScale(12),
  },

  notAvailableBtn: {
    flex: 1,
    borderWidth: scale(1.5),
    borderColor: COLORS.primary,
    borderRadius: scale(10),
    paddingVertical: verticalScale(10),
    alignItems: 'center',
  },

  notAvailableText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: moderateScale(13),
  },

  availableBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: scale(10),
    paddingVertical: verticalScale(10),
    alignItems: 'center',
  },

  availableText: {
    color: COLORS.textOnPrimary,
    fontWeight: '700',
    fontSize: moderateScale(13),
  },

  responseSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginTop: verticalScale(6),
  },

  responseAvailableText: {
    color: COLORS.successDark,
    fontWeight: '600',
    fontSize: moderateScale(13),
  },

  responseUnavailableText: {
    color: COLORS.errorDark,
    fontWeight: '600',
    fontSize: moderateScale(13),
  },

  viewResponseBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceGreen,
    borderRadius: scale(10),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    marginTop: verticalScale(12),
  },

  viewResponseText: {
    color: COLORS.successDark,
    fontWeight: '700',
    fontSize: moderateScale(13),
  },

  // Empty state

  empty: {
    alignItems: 'center',
    paddingVertical: verticalScale(60),
    gap: scale(10),
  },

  emptyText: {
    color: COLORS.placeholder,
  },

  // Modal

  modalBackdrop: {
    flex: 1,
    backgroundColor: COLORS.modalOverlay,
    justifyContent: 'center',
    padding: scale(24),
  },

  modalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: scale(18),
    padding: scale(20),
  },

  modalTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(4),
  },

  modalSubtitle: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
    marginBottom: verticalScale(16),
  },

  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
  },

  modalLabel: {
    color: COLORS.textSecondary,
    fontSize: moderateScale(13),
  },

  modalValue: {
    color: COLORS.textPrimary,
    fontSize: moderateScale(13),
    fontWeight: '600',
  },

  toggleRow: {
    flexDirection: 'row',
    gap: scale(10),
    marginBottom: verticalScale(12),
  },

  toggleBtn: {
    flex: 1,
    paddingVertical: verticalScale(10),
    borderRadius: scale(10),
    backgroundColor: COLORS.disabled,
    alignItems: 'center',
  },

  toggleBtnAvailable: {
    backgroundColor: COLORS.primary,
  },

  toggleBtnUnavailable: {
    backgroundColor: COLORS.errorDark,
  },

  toggleText: {
    fontWeight: '600',
    color: COLORS.textSecondary,
  },

  toggleTextActive: {
    color: COLORS.textOnPrimary,
  },

  input: {
    borderWidth: scale(1),
    borderColor: COLORS.borderInput,
    borderRadius: scale(10),
    padding: scale(12),
    marginBottom: verticalScale(16),
    color: COLORS.textPrimary,
  },

  modalActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: scale(20),
  },

  cancelText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },

  saveText: {
    color: COLORS.primary,
    fontWeight: '700',
  },

  // Bottom tab bar

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingVertical: verticalScale(10),
    borderTopWidth: scale(1),
    borderTopColor: COLORS.borderLight,
  },

  bottomBarItem: {
    flex: 1,
    alignItems: 'center',
    gap: scale(4),
  },

  bottomBarLabel: {
    fontSize: moderateScale(12),
    color: COLORS.placeholder,
  },

  bottomBarLabelActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },


})