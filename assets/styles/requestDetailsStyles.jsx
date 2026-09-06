import { StyleSheet } from 'react-native'

import { COLORS } from '../../constant/colors.jsx'
import { scale, verticalScale, moderateScale } from '../../utils/responsive.jsx'

export const requestDetailsStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    padding: scale(16),
    paddingBottom: verticalScale(40),
  },

  headerCard: {
    backgroundColor: COLORS.surface,
    borderRadius: scale(16),
    padding: scale(16),
    marginBottom: verticalScale(16),
  },

  medicineName: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginTop: verticalScale(8),
  },

  metaText: {
    fontSize: moderateScale(13),
    color: COLORS.textSecondary,
  },

  statusBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    borderRadius: scale(20),
    marginTop: verticalScale(10),
  },

  statusText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
  },

  sectionTitle: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: verticalScale(10),
  },

  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    marginBottom: verticalScale(12),
    paddingTop: verticalScale(4),
  },

  backText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: COLORS.textPrimary,
  },

  responseCard: {
    backgroundColor: COLORS.surface,
    borderRadius: scale(14),
    padding: scale(14),
    marginBottom: verticalScale(10),
  },

  responseTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  pharmacyName: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },

  pharmacyAddress: {
    fontSize: moderateScale(12),
    color: COLORS.textSecondary,
    marginTop: verticalScale(2),
  },

  availableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    backgroundColor: COLORS.statusTints.available,
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(3),
    borderRadius: scale(20),
  },

  availableText: {
    color: COLORS.successDark,
    fontSize: moderateScale(12),
    fontWeight: '700',
  },

  unavailableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    backgroundColor: COLORS.statusTints.unavailableLight,
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(3),
    borderRadius: scale(20),
  },

  unavailableText: {
    color: COLORS.errorDark,
    fontSize: moderateScale(12),
    fontWeight: '700',
  },

  priceText: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: verticalScale(8),
  },

  respondedAt: {
    fontSize: moderateScale(11),
    color: COLORS.placeholder,
    marginTop: verticalScale(6),
  },

  empty: {
    alignItems: 'center',
    paddingVertical: verticalScale(60),
    gap: scale(10),
  },

  emptyText: {
    color: COLORS.placeholder,
  },

})