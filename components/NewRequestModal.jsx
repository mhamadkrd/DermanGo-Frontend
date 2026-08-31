import { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { Feather } from 'react-native-vector-icons'
import { COLORS } from '../constant/colors.jsx'
import { scale, verticalScale, moderateScale } from '../utils/responsive.jsx'

export default function NewRequestModal({ visible, onClose, onSubmit, submitting }) {
  const [medicineName, setMedicineName] = useState('')

  const handleSubmit = () => {
    const trimmed = medicineName.trim()
    if (!trimmed) return
    onSubmit(trimmed)
    setMedicineName('')
  }

  const handleClose = () => {
    setMedicineName('')
    onClose()
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        style={styles.backdrop}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>

          <View style={styles.headerRow}>
            <Text style={styles.title}>New Request</Text>
            <TouchableOpacity onPress={handleClose} hitSlop={10}>
              <Feather name="x" size={20} color={COLORS.placeholder} />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Medicine name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Panadol 500mg"
            placeholderTextColor={COLORS.placeholder}
            value={medicineName}
            onChangeText={setMedicineName}
            autoFocus
          />

          <TouchableOpacity
            style={[styles.submitButton, (!medicineName.trim() || submitting) && styles.submitButtonDisabled]}
            activeOpacity={0.85}
            onPress={handleSubmit}
            disabled={!medicineName.trim() || submitting}
          >
            {submitting
              ? <ActivityIndicator color={COLORS.surface} />
              : <Text style={styles.submitText}>Send Request</Text>
            }
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = {
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    padding: scale(20),
    paddingBottom: verticalScale(32),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(18),
  },
  title: {
    fontSize: moderateScale(17),
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  label: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: COLORS.placeholder,
    marginBottom: verticalScale(8),
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: scale(12),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(14),
    color: COLORS.textPrimary,
    marginBottom: verticalScale(20),
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: scale(14),
    paddingVertical: verticalScale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitText: {
    color: COLORS.surface,
    fontWeight: '700',
    fontSize: moderateScale(14),
  },
};