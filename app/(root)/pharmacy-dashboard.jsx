import { useState, useCallback, useMemo } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, RefreshControl, Image } from 'react-native'
import { useFocusEffect, Redirect, router } from 'expo-router'
import { Feather, MaterialCommunityIcons, Ionicons } from 'react-native-vector-icons'
import { COLORS } from '../../constant/colors.jsx'
import { scale, verticalScale, moderateScale } from '../../utils/responsive.jsx'
import { usePharmacyAccess } from '../../Hooks/usePharmacyAccess.js'
import { useResponsesApi } from '../../Hooks/pharmaciesHooks.js'
import ReloadButton from '../../components/ReloadButton.jsx'
import { pharmacyDashboardStyles as styles } from '../../assets/styles/pharmacyDashboardStyles.jsx'

const TABS = [
  { key: 'all', label: 'All Requests', icon: 'view-list' },
  { key: 'pending', label: 'Pending', icon: 'clock-outline' },
  { key: 'responded', label: 'Responded', icon: 'check-circle-outline' },
]

const APP_LOAD_TIME = Date.now()

function formatDate(iso) {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
}
function formatTime(iso) {
  const d = new Date(iso)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function PharmacyDashboard() {
  const { pharmacy, loading: accessLoading, lock } = usePharmacyAccess()
  const { getOpenRequests, getResponseHistory, submitResponse } = useResponsesApi()

  const [pendingItems, setPendingItems] = useState([])
  const [respondedItems, setRespondedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [bottomTab, setBottomTab] = useState('dashboard')

  const [respondTarget, setRespondTarget] = useState(null)
  const [price, setPrice] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [viewingResponse, setViewingResponse] = useState(null)
  const [viewingImageUrl, setViewingImageUrl] = useState(null) // full-screen photo viewer

  const loadAll = useCallback(async ({ silent } = {}) => {
    if (silent) setRefreshing(true)
    else setLoading(true)

    const [open, history] = await Promise.all([getOpenRequests(), getResponseHistory()])
    setPendingItems(Array.isArray(open) ? open : [])
    setRespondedItems(Array.isArray(history) ? history : [])

    if (silent) setRefreshing(false)
    else setLoading(false)
  }, [getOpenRequests, getResponseHistory])

  useFocusEffect(
    useCallback(() => {
      if (pharmacy) loadAll()
    }, [pharmacy])
  )

  const handleReload = () => loadAll({ silent: true })

  const merged = useMemo(() => {
    const pending = pendingItems.map((r) => ({
      type: 'pending',
      id: r.id,
      medicineName: r.medicine_name,
      createdAt: r.created_at,
      imageUrl: r.image_url || null,
    }))
    const responded = respondedItems.map((r) => ({
      type: 'responded',
      id: r.id,
      requestId: r.request_id,
      medicineName: r.medicine_name,
      respondedAt: r.responded_at,
      available: r.available,
      price: r.price,
      imageUrl: r.image_url || null,
    }))
    const all = [...pending, ...responded].sort(
      (a, b) => new Date(b.createdAt || b.respondedAt) - new Date(a.createdAt || a.respondedAt)
    )
    if (activeTab === 'pending') return pending
    if (activeTab === 'responded') return responded
    return all
  }, [pendingItems, respondedItems, activeTab])

  if (!accessLoading && !pharmacy) {
    return <Redirect href="/settings" />
  }

  const openRespondModal = (item) => {
    setRespondTarget(item)
    setPrice('')
  }

  const handleQuickUnavailable = async (item) => {
    setSubmitting(true)
    const result = await submitResponse({ requestId: item.id, available: false, price: null })
    setSubmitting(false)
    if (result) loadAll()
  }

  const handleSubmit = async () => {
    if (!respondTarget) return
    setSubmitting(true)
    const result = await submitResponse({
      requestId: respondTarget.id,
      available: true,
      price: parseFloat(price),
    })
    setSubmitting(false)
    if (result) {
      setRespondTarget(null)
      loadAll()
    }
  }

  const isNew = (createdAt) => APP_LOAD_TIME - new Date(createdAt).getTime() < 60 * 60 * 1000

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleReload} tintColor={COLORS.primary} />
        }
      >
        <TouchableOpacity style={styles.backRow} onPress={() => router.push('/settings')} hitSlop={10}>
          <Feather name="arrow-left" size={20} color={COLORS.primary} />
          <Text style={styles.backText}>Back to Settings</Text>
        </TouchableOpacity>

        <View style={styles.headerRow}>
          <View>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <View style={styles.pharmacyNameRow}>
              <Text style={styles.pharmacyName}>{pharmacy?.name}</Text>
              <MaterialCommunityIcons name="check-decagram" size={18} color={COLORS.primary} />
            </View>
            <Text style={styles.subtitle}>Here are the latest medicine requests</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            <ReloadButton onReload={handleReload} loading={refreshing} style={styles.bellBtn} />
            <View style={styles.bellBtn}>
              <Feather name="bell" size={18} color={COLORS.primary} />
              <View style={styles.bellDot} />
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statIconBox}>
              <Feather name="clipboard" size={16} color={COLORS.primary} />
            </View>
            <Text style={styles.statNumber}>{pendingItems.length + respondedItems.length}</Text>
            <Text style={styles.statLabel}>Total Requests</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconBox}>
              <Feather name="clock" size={16} color={COLORS.primary} />
            </View>
            <Text style={styles.statNumber}>{pendingItems.length}</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconBox}>
              <Feather name="check" size={16} color={COLORS.primary} />
            </View>
            <Text style={styles.statNumber}>{respondedItems.length}</Text>
            <Text style={styles.statLabel}>Responded</Text>
          </View>
        </View>

        <View style={styles.tabsRow}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabBtn, activeTab === tab.key && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab.key)}
            >
              <MaterialCommunityIcons
                name={tab.icon}
                size={14}
                color={activeTab === tab.key ? COLORS.border : COLORS.textSecondary}
              />
              <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}

        </View>

        {!loading && merged.length === 0 && (
          <View style={styles.empty}>
            <MaterialCommunityIcons name="clipboard-check-outline" size={48} color={COLORS.placeholder} />
            <Text style={styles.emptyText}>No requests here yet</Text>
          </View>
        )}

        {merged.map((item) => (
          <View key={`${item.type}-${item.id}`} style={styles.card}>
            <View style={styles.cardTopRow}>
              <View style={styles.iconBox}>
                <MaterialCommunityIcons name="pill" size={24} color={COLORS.primary} />
              </View>
              <View style={styles.cardInfo}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.medicineName}>{item.medicineName}</Text>
                  {item.type === 'pending' ? (
                    <View style={styles.statusPillPending}>
                      <Text style={styles.statusPillPendingText}>Pending</Text>
                    </View>
                  ) : (
                    <View style={styles.statusPillResponded}>
                      <Text style={styles.statusPillRespondedText}>Responded</Text>
                    </View>
                  )}
                </View>

                <View style={styles.metaRow}>
                  <Feather name="calendar" size={12} color={COLORS.placeholder} />
                  <Text style={styles.metaText}>
                    {formatDate(item.createdAt || item.respondedAt)} • {formatTime(item.createdAt || item.respondedAt)}
                  </Text>
                </View>

                {item.type === 'responded' && (
                  <View style={styles.responseSummaryRow}>
                    {item.available ? (
                      <>
                        <Ionicons name="checkmark-circle" size={14} color={COLORS.success} />
                        <Text style={styles.responseAvailableText}>
                          Available • ${Number(item.price).toFixed(2)}
                        </Text>
                      </>
                    ) : (
                      <>
                        <Ionicons name="close-circle" size={14} color={COLORS.error} />
                        <Text style={styles.responseUnavailableText}>Not Available</Text>
                      </>
                    )}
                  </View>
                )}

                {item.type === 'pending' && isNew(item.createdAt) && (
                  <View style={styles.newBadge}>
                    <Text style={styles.newBadgeText}>New</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Tap to view the patient's attached photo full-screen */}
            {item.imageUrl && (
              <TouchableOpacity
                onPress={() => setViewingImageUrl(item.imageUrl)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: scale(6),
                  alignSelf: 'flex-start',
                  backgroundColor: COLORS.background,
                  borderRadius: scale(20),
                  paddingHorizontal: scale(12),
                  paddingVertical: verticalScale(7),
                  marginTop: verticalScale(10),
                }}
              >
                <Feather name="image" size={14} color={COLORS.primary} />
                <Text style={{ fontSize: moderateScale(12), fontWeight: '600', color: COLORS.primary }}>
                  View Photo
                </Text>
              </TouchableOpacity>
            )}

            {item.type === 'pending' ? (
              <View style={styles.actionsRow}>
                <TouchableOpacity
                  style={styles.notAvailableBtn}
                  disabled={submitting}
                  onPress={() => handleQuickUnavailable(item)}
                >
                  <Text style={styles.notAvailableText}>Not Available</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.availableBtn} onPress={() => openRespondModal(item)}>
                  <Text style={styles.availableText}>Available</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.viewResponseBtn} onPress={() => setViewingResponse(item)}>
                <Text style={styles.viewResponseText}>View Your Response</Text>
                <Feather name="chevron-right" size={16} color={COLORS.success} />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Respond modal — reply with a price */}
      <Modal visible={!!respondTarget} transparent animationType="fade" onRequestClose={() => setRespondTarget(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{respondTarget?.medicineName}</Text>

            <Text style={styles.modalSubtitle}>Confirm price to mark as available</Text>

            {respondTarget?.imageUrl && (
              <TouchableOpacity
                onPress={() => setViewingImageUrl(respondTarget.imageUrl)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: scale(6),
                  alignSelf: 'flex-start',
                  marginBottom: verticalScale(12),
                }}
              >
                <Feather name="image" size={14} color={COLORS.primary} />
                <Text style={{ fontSize: moderateScale(12), fontWeight: '600', color: COLORS.primary }}>
                  View attached photo
                </Text>
              </TouchableOpacity>
            )}

            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="Price"
              placeholderTextColor={COLORS.placeholder}
              keyboardType="decimal-pad"
              style={styles.input}
            />

            <View style={styles.modalActionsRow}>
              <TouchableOpacity onPress={() => setRespondTarget(null)} disabled={submitting}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit} disabled={submitting || !price}>
                <Text style={styles.saveText}>{submitting ? 'Sending...' : 'Send Response'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* View a past response */}
      <Modal visible={!!viewingResponse} transparent animationType="fade" onRequestClose={() => setViewingResponse(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{viewingResponse?.medicineName}</Text>
            <Text style={styles.modalSubtitle}>Your response</Text>

            {viewingResponse?.imageUrl && (
              <TouchableOpacity
                onPress={() => setViewingImageUrl(viewingResponse.imageUrl)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: scale(6),
                  alignSelf: 'flex-start',
                  marginBottom: verticalScale(12),
                }}
              >
                <Feather name="image" size={14} color={COLORS.primary} />
                <Text style={{ fontSize: moderateScale(12), fontWeight: '600', color: COLORS.primary }}>
                  View attached photo
                </Text>
              </TouchableOpacity>
            )}

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Status</Text>
              <Text style={styles.modalValue}>{viewingResponse?.available ? 'Available' : 'Not Available'}</Text>
            </View>
            {viewingResponse?.available && (
              <View style={styles.modalRow}>
                <Text style={styles.modalLabel}>Price</Text>
                <Text style={styles.modalValue}>${Number(viewingResponse?.price).toFixed(2)}</Text>
              </View>
            )}
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Responded</Text>
              <Text style={styles.modalValue}>
                {viewingResponse && formatDate(viewingResponse.respondedAt)}
              </Text>
            </View>
            <View style={[styles.modalActionsRow, { marginTop: 12 }]}>
              <TouchableOpacity onPress={() => setViewingResponse(null)}>
                <Text style={styles.saveText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Full-screen photo viewer — shared by all three "View Photo" buttons above */}
      <Modal
        visible={!!viewingImageUrl}
        transparent
        animationType="fade"
        onRequestClose={() => setViewingImageUrl(null)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.92)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => setViewingImageUrl(null)}
            hitSlop={12}
            style={{
              position: 'absolute',
              top: verticalScale(50),
              right: scale(20),
              zIndex: 1,
              width: scale(36),
              height: scale(36),
              borderRadius: scale(18),
              backgroundColor: 'rgba(255,255,255,0.15)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Feather name="x" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          {viewingImageUrl && (
            <Image
              source={{ uri: viewingImageUrl }}
              style={{ width: '100%', height: '70%' }}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBarItem} onPress={() => { setBottomTab('dashboard'); setActiveTab('all') }}>
          <MaterialCommunityIcons name="view-dashboard" size={20} color={bottomTab === 'dashboard' ? COLORS.primary : COLORS.textSecondary} />
          <Text style={[styles.bottomBarLabel, bottomTab === 'dashboard' && styles.bottomBarLabelActive]}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarItem} onPress={() => { setBottomTab('history'); setActiveTab('responded') }}>
          <Feather name="clock" size={20} color={bottomTab === 'history' ? COLORS.primary : COLORS.textSecondary} />
          <Text style={[styles.bottomBarLabel, bottomTab === 'history' && styles.bottomBarLabelActive]}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomBarItem} onPress={lock}>
          <Feather name="log-out" size={20} color={COLORS.textSecondary} />
          <Text style={styles.bottomBarLabel}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}