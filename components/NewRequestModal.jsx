import { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Image, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { Feather } from 'react-native-vector-icons'
import { COLORS } from '../constant/colors.jsx'
import { scale, verticalScale, moderateScale } from '../utils/responsive.jsx'

export default function NewRequestModal({ visible, onClose, onSubmit, submitting }) {
  const [medicineName, setMedicineName] = useState('')
  const [imageUri, setImageUri] = useState(null)     // for the preview only
  const [imageBase64, setImageBase64] = useState(null) // actual payload sent to backend
  const [processingImage, setProcessingImage] = useState(false)

  const resetState = () => {
    setMedicineName('')
    setImageUri(null)
    setImageBase64(null)
  }

  const handleSubmit = () => {
    const trimmed = medicineName.trim()
    if (!trimmed) return
    onSubmit({
      medicineName: trimmed,
      image: imageBase64 ? { base64: imageBase64, mimeType: 'image/jpeg' } : null,
    })
    resetState()
  }

  const handleClose = () => {
    resetState()
    onClose()
  }

  // Resizes to max width 1080px, re-compresses as JPEG, and gets base64
  // straight from the native manipulator — no separate file read needed.
  const processPickedAsset = async (asset) => {
    setProcessingImage(true)
    try {
      const manipulated = await ImageManipulator.manipulateAsync(
        asset.uri,
        [{ resize: { width: 1080 } }],
        { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG, base64: true }
      )
      setImageUri(manipulated.uri)
      setImageBase64(manipulated.base64)
    } catch (err) {
      console.log('Image processing error:', err)
      Alert.alert('Error', 'Could not process the selected image.')
    } finally {
      setProcessingImage(false)
    }
  }

  const pickFromLibrary = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Allow photo library access to attach an image.')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    })

    if (!result.canceled && result.assets?.[0]) {
      await processPickedAsset(result.assets[0])
    }
  }

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync()
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Allow camera access to take a photo.')
      return
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    })

    if (!result.canceled && result.assets?.[0]) {
      await processPickedAsset(result.assets[0])
    }
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

          <Text style={styles.label}>Photo (optional)</Text>

          {processingImage ? (
            <View style={[styles.imageButtonsRow, { justifyContent: 'center', paddingVertical: verticalScale(20) }]}>
              <ActivityIndicator color={COLORS.primary} />
            </View>
          ) : imageUri ? (
            <View style={styles.previewWrap}>
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={() => { setImageUri(null); setImageBase64(null) }}
                hitSlop={10}
              >
                <Feather name="x" size={14} color={COLORS.surface} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.imageButtonsRow}>
              <TouchableOpacity style={styles.imageButton} activeOpacity={0.8} onPress={pickFromLibrary}>
                <Feather name="image" size={16} color={COLORS.primary} />
                <Text style={styles.imageButtonText}>Choose Photo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.imageButton} activeOpacity={0.8} onPress={takePhoto}>
                <Feather name="camera" size={16} color={COLORS.primary} />
                <Text style={styles.imageButtonText}>Take Photo</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={[styles.submitButton, (!medicineName.trim() || submitting || processingImage) && styles.submitButtonDisabled]}
            activeOpacity={0.85}
            onPress={handleSubmit}
            disabled={!medicineName.trim() || submitting || processingImage}
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
    borderColor: COLORS.border,
    borderRadius: scale(12),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(14),
    color: COLORS.textPrimary,
    marginBottom: verticalScale(20),
  },
  imageButtonsRow: {
    flexDirection: 'row',
    gap: scale(10),
    marginBottom: verticalScale(20),
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: scale(12),
    paddingVertical: verticalScale(12),
  },
  imageButtonText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: COLORS.primary,
  },
  previewWrap: {
    position: 'relative',
    alignSelf: 'flex-start',
    marginBottom: verticalScale(20),
  },
  previewImage: {
    width: scale(110),
    height: verticalScale(110),
    borderRadius: scale(14),
  },
  removeImageButton: {
    position: 'absolute',
    top: -scale(6),
    right: -scale(6),
    width: scale(22),
    height: scale(22),
    borderRadius: scale(11),
    backgroundColor: COLORS.error,
    alignItems: 'center',
    justifyContent: 'center',
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