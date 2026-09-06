//(app root)/settings.jsx
import { useState, useCallback, useRef, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Switch, Modal, TextInput } from "react-native";
import { useAuth, useUser } from '@clerk/expo'
import { useFocusEffect,router } from 'expo-router'
import { Feather, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons'
import { COLORS } from '../../constant/colors.jsx'
import { createSettingsStyles } from '../../assets/styles/Settingsstyles .jsx'
import { useUserApi } from '../../Hooks/userHooks.js'
import { useErrorDialog } from '../../components/ErrorDialog.jsx'
import { usePharmacyAccess } from '../../Hooks/usePharmacyAccess.js'

// Placeholder content — edit these strings whenever you're ready with real copy.
const INFO_CONTENT = {
  privacy: {
    title: 'Privacy & Security',
    body: 'Your privacy matters to us. DermanGO is designed to keep your personal information secure and private. We only collect the information necessary to provide our services, such as your name, phone number, and medicine requests. Your information is not shared with third parties unless it is necessary to provide the requested service. We use appropriate security measures to help protect your data.',
  },
  about: {
    title: 'About DermanGo',
    body: ' DermanGO makes finding medicine easier.With DermanGO, you can search for the medicine you need and send a request to nearby pharmacies. Pharmacies can then respond and let you know whether the medicine is available, helping you save time and avoid visiting multiple pharmacies. ',
  },
  help: {
    title: 'Help & Support',
    body: 'Need help? Were here for you. If you are experiencing a problem with DermanGO, have a question, or want to report an issue, please contact our support team. We appreciate your feedback and will do our best to help you as quickly as possible.',
  },
  terms: {
    title: 'Terms & Privacy',
    body: 'By using DermanGO, you agree to use the application responsibly and provide accurate information when submitting requests. DermanGO helps users communicate medicine availability requests with pharmacies but does not guarantee that a requested medicine will be available. Your personal information will be handled according to our privacy practices and will only be used as necessary to provide and improve the DermanGO service.',
  },
  whoMade: {
    title: 'Who Made This?',
    body: 'DermanGO was created by Mohammed Mushtaq, a Computer Science student and mobile application developer from Kurdistan, Iraq. DermanGO was created with the goal of using technology to make finding medicines faster, easier, and more convenient for everyone',
  }
}

export default function Settings() {
  const styles = createSettingsStyles
  const { userId } = useAuth()
  const { user } = useUser()
  const { getUserProfile, updateUserProfile } = useUserApi()
  const { showError } = useErrorDialog()

  const [profile, setProfile] = useState(null)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)

  const [editField, setEditField] = useState(null) // 'name' | 'phone' | null
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)

  const [infoModal, setInfoModal] = useState(null) // 'privacy' | 'about' | 'help' | 'terms' | null

const { pharmacy, unlock, lock } = usePharmacyAccess()
const [pharmacyModalVisible, setPharmacyModalVisible] = useState(false)
const [accessCodeInput, setAccessCodeInput] = useState('')
const [unlocking, setUnlocking] = useState(false)

const handleUnlockPharmacy = async () => {
  setUnlocking(true)
  const result = await unlock(accessCodeInput.trim())
  setUnlocking(false)
  if (result) {
    setPharmacyModalVisible(false)
    setAccessCodeInput('')
    router.push('/pharmacy-dashboard')
  }
}

  const loadProfile = useCallback(async () => {
    if (!userId) return
    const data = await getUserProfile(userId)
    if (data) setProfile(data)
  }, [userId, getUserProfile])

  // Stable ref pattern — see requests.jsx: getUserProfile's identity can
  // change across renders, so useFocusEffect must not depend on it directly
  // or it will refire on every render instead of just on real focus events.
  const loadProfileRef = useRef(loadProfile)
  useEffect(() => { loadProfileRef.current = loadProfile }, [loadProfile])

  useFocusEffect(
    useCallback(() => {
      loadProfileRef.current()
    }, [])
  )

  const openEdit = (field) => {
    setEditField(field)
    setEditValue(field === 'name' ? (profile?.name || '') : (profile?.phone || ''))
  }

  const closeEdit = () => {
    setEditField(null)
    setEditValue('')
  }

  const handleSaveEdit = async () => {
    if (!userId) return
    setSaving(true)
    try {
      const payload = editField === 'name'
        ? { name: editValue.trim(), phone: profile?.phone }
        : { name: profile?.name, phone: editValue.trim() }

      const data = await updateUserProfile(userId, payload)
      if (data) {
        setProfile(data)
        closeEdit()
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <View style={styles.ScreenContainer}>
      <ScrollView
        contentContainerStyle={styles.Container}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.headerRow}>
          <View>
            <Text style={styles.sectionTitle}>Settings</Text>
            <Text style={styles.pageSubtitle}>Manage your account and preferences</Text>
          </View>
          <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
            <Feather name="bell" size={20} color={COLORS.textOnPrimary} />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>Pharmacy</Text>
<View style={styles.card}>
  {pharmacy ? (
    <>
      <NavRow
        styles={styles}
        icon={<MaterialCommunityIcons name="store" size={18} color={COLORS.primary} />}
        title="Pharmacy Dashboard"
        subtitle={`Connected: ${pharmacy.name}`}
        onPress={() => router.push('/pharmacy-dashboard')}
      />
      <Divider styles={styles} />
      <NavRow
        styles={styles}
        icon={<Feather name="log-out" size={18} color={COLORS.primary} />}
        title="Disconnect Pharmacy"
        subtitle="Remove this device's dashboard access"
        isLast
        onPress={lock}
      />
    </>
  ) : (
    <NavRow
      styles={styles}
      icon={<MaterialCommunityIcons name="store" size={18} color={COLORS.primary} />}
      title="Pharmacy Portal"
      subtitle="Enter your access code to unlock the dashboard"
      isLast
      onPress={() => setPharmacyModalVisible(true)}
    />
  )}
</View>

        <Text style={styles.sectionLabel}>Account</Text>
        <View style={styles.card}>
          <NavRow
            styles={styles}
            icon={<Feather name="user" size={18} color={COLORS.primary} />}
            title="Edit Profile"
            subtitle="Update your personal information"
            onPress={() => openEdit('name')}
          />
          <Divider styles={styles} />
          <NavRow
            styles={styles}
            icon={<Feather name="phone" size={18} color={COLORS.primary} />}
            title="Phone Number"
            subtitle="Update your phone number"
            onPress={() => openEdit('phone')}
          />
          <Divider styles={styles} />
          <NavRow
            styles={styles}
            icon={<Feather name="shield" size={18} color={COLORS.primary} />}
            title="Privacy & Security"
            subtitle="Manage your privacy and security"
            isLast
            onPress={() => setInfoModal('privacy')}
          />
        </View>

        <Text style={styles.sectionLabel}>Preferences</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={styles.iconBadge}>
                <Feather name="bell" size={18} color={COLORS.primary} />
              </View>
              <View style={styles.rowTextWrap}>
                <Text style={styles.rowTitle}>Notifications</Text>
                <Text style={styles.rowSubtitle}>Manage app notifications</Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: COLORS.disabled, true: COLORS.primary }}
              thumbColor={COLORS.surface}
            />
          </View>
          <Divider styles={styles} />
          <NavRow
            styles={styles}
            icon={<Ionicons name="color-palette-outline" size={18} color={COLORS.primary} />}
            title="App Theme"
            subtitle="Choose your preferred theme"
            valueLabel="Light"
          />
          <Divider styles={styles} />
          <NavRow
            styles={styles}
            icon={<Feather name="globe" size={18} color={COLORS.primary} />}
            title="Language"
            subtitle="Select your preferred language"
            valueLabel="English"
          />
          <Divider styles={styles} />
          <NavRow
            styles={styles}
            icon={<Feather name="map-pin" size={18} color={COLORS.primary} />}
            title="Location"
            subtitle="Manage your location settings"
            isLast
          />
        </View>

        <Text style={styles.sectionLabel}>Support & Info</Text>
        <View style={styles.card}>
          <NavRow
            styles={styles}
            icon={<Feather name="info" size={18} color={COLORS.primary} />}
            title="About DermanGo"
            subtitle="Learn more about the app"
            onPress={() => setInfoModal('about')}
          />
          <Divider styles={styles} />
          <NavRow
            styles={styles}
            icon={<Ionicons name="people-outline" size={18} color={COLORS.primary} />}
            title="Who Made This?"
            subtitle="Meet the developer"
            onPress={() => setInfoModal('whoMade')}
          />
          <Divider styles={styles} />
          <NavRow
            styles={styles}
            icon={<Feather name="headphones" size={18} color={COLORS.primary} />}
            title="Help & Support"
            subtitle="Get help and contact support"
            onPress={() => setInfoModal('help')}
          />
          <Divider styles={styles} />
          <NavRow
            styles={styles}
            icon={<MaterialCommunityIcons name="file-document-outline" size={18} color={COLORS.primary} />}
            title="Terms & Privacy"
            subtitle="Read our terms and privacy policy"
            isLast
            onPress={() => setInfoModal('terms')}
          />
        </View>

        <View style={styles.footerCard}>
          <View style={styles.footerLeft}>
            <MaterialCommunityIcons name="pill" size={32} color={COLORS.primary} />
            <Text style={styles.footerBrand}>DermanGo</Text>
          </View>
          <View style={styles.footerTextWrap}>
            <Text style={styles.footerTitle}>DermanGo</Text>
            <Text style={styles.footerLine}>Your medicines, delivered with care.</Text>
            <Text style={styles.footerLine}>© 2025 DermanGo. All rights reserved.</Text>
            <View style={styles.footerMadeWithRow}>
              <Feather name="heart" size={12} color={COLORS.primary} />
              <Text style={styles.footerMadeWith}>Made with care for your health</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      <Modal
  visible={pharmacyModalVisible}
  transparent
  animationType="fade"
  onRequestClose={() => setPharmacyModalVisible(false)}
>
  <View style={styles.modalBackdrop}>
    <View style={styles.modalCard}>
      <Text style={styles.modalTitle}>Enter Access Code</Text>
      <TextInput
        value={accessCodeInput}
        onChangeText={setAccessCodeInput}
        placeholder="Access code"
        placeholderTextColor={COLORS.placeholder}
        autoCapitalize="characters"
        style={styles.modalInput}
      />
      <View style={styles.modalActionsRow}>
        <TouchableOpacity onPress={() => setPharmacyModalVisible(false)} disabled={unlocking}>
          <Text style={styles.modalCancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUnlockPharmacy} disabled={unlocking}>
          <Text style={styles.modalSaveText}>
            {unlocking ? 'Checking...' : 'Unlock'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

      {/* Edit modal — used for both Full Name and Phone Number */}
      <Modal
        visible={editField !== null}
        transparent
        animationType="fade"
        onRequestClose={closeEdit}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {editField === 'name' ? 'Edit Full Name' : 'Edit Phone Number'}
            </Text>

            <TextInput
              value={editValue}
              onChangeText={setEditValue}
              placeholder={editField === 'name' ? 'Full name' : 'Phone number'}
              placeholderTextColor={COLORS.placeholder}
              keyboardType={editField === 'phone' ? 'phone-pad' : 'default'}
              autoCapitalize={editField === 'name' ? 'words' : 'none'}
              style={styles.modalInput}
            />

            <View style={styles.modalActionsRow}>
              <TouchableOpacity onPress={closeEdit} disabled={saving}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveEdit} disabled={saving}>
                <Text style={styles.modalSaveText}>
                  {saving ? 'Saving...' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Info modal — Privacy & Security / About / Help & Support / Terms & Privacy / Who Made This */}
      <Modal
        visible={infoModal !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setInfoModal(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.infoModalCard}>
            <Text style={styles.modalTitle}>
              {infoModal ? INFO_CONTENT[infoModal].title : ''}
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.infoModalBody}>
                {infoModal ? INFO_CONTENT[infoModal].body : ''}
              </Text>
            </ScrollView>

            <TouchableOpacity onPress={() => setInfoModal(null)} style={styles.modalCloseButton}>
              <Text style={styles.modalSaveText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function Divider({ styles }) {
  return <View style={styles.divider} />
}

function NavRow({ styles, icon, title, subtitle, valueLabel, isLast, onPress }) {
  return (
    <TouchableOpacity style={[styles.row, isLast && styles.rowLast]} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.rowLeft}>
        <View style={styles.iconBadge}>{icon}</View>
        <View style={styles.rowTextWrap}>
          <Text style={styles.rowTitle}>{title}</Text>
          <Text style={styles.rowSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <View style={styles.rowRight}>
        {!!valueLabel && <Text style={styles.valueLabel}>{valueLabel}</Text>}
        <Feather name="chevron-right" size={18} color={COLORS.placeholder} />
      </View>
    </TouchableOpacity>
  )
}