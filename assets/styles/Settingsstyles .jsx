// assets/styles/settingsStyles.jsx

import { StyleSheet } from 'react-native'

import { scale, verticalScale, moderateScale } from '../../utils/responsive.jsx'
import { COLORS } from '../../constant/colors.jsx'

export const createSettingsStyles = StyleSheet.create({

  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  Container: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(90),
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalScale(20),
  },

  sectionTitle: {
    fontSize: moderateScale(28),
    fontWeight: '800',
    color: COLORS.textPrimary,
  },

  pageSubtitle: {
    fontSize: moderateScale(14),
    color: COLORS.placeholder,
    marginTop: verticalScale(4),
  },

  bellButton: {
    width: scale(44),
    height: verticalScale(44),
    borderRadius: scale(14),
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bellDot: {
    position: 'absolute',
    top: verticalScale(10),
    right: scale(11),
    width: scale(7),
    height: verticalScale(7),
    borderRadius: scale(4),
    backgroundColor: COLORS.surface,
  },

  sectionLabel: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: COLORS.placeholder,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(8),
    marginLeft: scale(4),
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: scale(18),
    paddingHorizontal: scale(14),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(14),
  },

  rowLast: {
    paddingBottom: verticalScale(14),
  },

  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },

  iconBadge: {
    width: scale(36),
    height: verticalScale(36),
    borderRadius: scale(10),
    backgroundColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },

  rowTextWrap: {
    flex: 1,
  },

  rowTitle: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  rowSubtitle: {
    fontSize: moderateScale(13),
    color: COLORS.placeholder,
    marginTop: verticalScale(2),
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(2),
  },

  actionText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.primary,
  },

  valueLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.primary,
  },

  divider: {
    height: verticalScale(1),
    backgroundColor: COLORS.border,
  },

  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: scale(18),
    padding: scale(18),
    marginTop: verticalScale(24),
  },

  footerLeft: {
    alignItems: 'center',
    marginRight: scale(14),
  },

  footerBrand: {
    fontSize: moderateScale(12),
    fontWeight: '800',
    color: COLORS.primary,
    marginTop: verticalScale(4),
  },

  footerTextWrap: {
    flex: 1,
  },

  footerTitle: {
    fontSize: moderateScale(15),
    fontWeight: '800',
    color: COLORS.textPrimary,
  },

  footerLine: {
    fontSize: moderateScale(12),
    color: COLORS.placeholder,
    marginTop: verticalScale(2),
  },

  footerMadeWithRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    marginTop: verticalScale(4),
  },

  footerMadeWith: {
    fontSize: moderateScale(12),
    color: COLORS.placeholder,
  },

  // ── Modal styles (Edit Profile / Phone + Info modals) ──────────────

  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: scale(24),
    backgroundColor: 'rgba(31, 41, 55, 0.55)', // dark overlay based on COLORS.textPrimary
  },

  modalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: scale(18),
    padding: scale(20),
  },

  infoModalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: scale(18),
    padding: scale(20),
    maxHeight: '75%',
  },

  modalTitle: {
    fontSize: moderateScale(17),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(12),
  },

  modalInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: scale(10),
    padding: scale(10),
    marginBottom: verticalScale(16),
    color: COLORS.textPrimary,
    fontSize: moderateScale(14),
  },

  modalActionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: scale(12),
  },

  modalCancelText: {
    color: COLORS.placeholder,
    fontWeight: '600',
    fontSize: moderateScale(14),
    padding: scale(10),
  },

  modalSaveText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: moderateScale(14),
    padding: scale(10),
  },

  infoModalBody: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(21),
    color: COLORS.placeholder,
  },

  modalCloseButton: {
    alignSelf: 'flex-end',
    marginTop: verticalScale(16),
  },

})