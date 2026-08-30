// components/ErrorDialog.jsx
import React, { createContext, useCallback, useContext, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constant/colors.jsx';
import { scale, verticalScale, moderateScale } from '../utils/responsive.jsx';

const ErrorDialogContext = createContext(null);

export function ErrorDialogProvider({ children }) {
  const [error, setError] = useState(null);
  const showError = useCallback((title, message) => setError({ title, message }), []);
  const closeError = useCallback(() => setError(null), []);

  return (
    <ErrorDialogContext.Provider value={{ showError }}>
      {children}
      <ErrorDialog error={error} onClose={closeError} />
    </ErrorDialogContext.Provider>
  );
}

export const useErrorDialog = () => {
  const context = useContext(ErrorDialogContext);
  if (!context) throw new Error('useErrorDialog must be used inside ErrorDialogProvider');
  return context;
};

function ErrorDialog({ error, onClose }) {
  return (
    <Modal visible={Boolean(error)} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.dialog} accessibilityViewIsModal>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>!</Text>
          </View>

          <Pressable style={styles.closeButton} onPress={onClose} accessibilityLabel="Close error message">
            <Text style={styles.closeText}>✕</Text>
          </Pressable>

          <Text style={styles.title}>{error?.title}</Text>
          <Text style={styles.message}>{error?.message}</Text>

          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Got it</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: scale(24),
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  dialog: {
    position: 'relative',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(24),
    padding: scale(24),
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  iconCircle: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDECEC',
  },
  iconText: {
    color: '#D32F2F',
    fontSize: moderateScale(26),
    fontWeight: '800',
  },
  closeButton: {
    position: 'absolute',
    top: scale(14),
    right: scale(14),
    padding: scale(5),
  },
  closeText: {
    fontSize: moderateScale(16),
    color: '#888',
  },
  title: {
    color: '#1A1A1A',
    fontSize: moderateScale(19),
    fontWeight: '800',
    marginTop: verticalScale(15),
  },
  message: {
    color: '#666',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    textAlign: 'center',
    marginTop: verticalScale(8),
  },
  button: {
    minWidth: '100%',
    alignItems: 'center',
    borderRadius: scale(13),
    backgroundColor: COLORS.primary,
    paddingVertical: verticalScale(13),
    marginTop: verticalScale(22),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(15),
    fontWeight: '800',
  },
});