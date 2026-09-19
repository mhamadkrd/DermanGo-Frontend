//(app root)/requests.jsx
import { useState, useCallback, useRef, useEffect } from "react";

import { View, Text, FlatList, TouchableOpacity,Image } from "react-native";
import { useAuth } from '@clerk/expo'
import { useFocusEffect, router } from 'expo-router'
import { createRequestsStyles } from '../../assets/styles/requestsStyles.jsx'
import { useRequestsApi } from '../../Hooks/requestsHooks.js'

import PageLoader from '../../components/PageLoader.jsx'
import NewRequestModal from '../../components/NewRequestModal.jsx'
import ReloadButton from '../../components/ReloadButton.jsx'
import { Feather, Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons'
import { COLORS } from '../../constant/colors.jsx'

const TABS = [
  { key: 'all', label: 'All Requests', icon: 'list' },
  { key: 'pending', label: 'Pending', icon: 'clock' },
  { key: 'completed', label: 'Completed', icon: 'check-circle' },
];

const STATUS_CONFIG = {
  pending: { label: 'Pending', bg: '#FCEFDB', color: '#D9962E', icon: 'clock' },
  completed: { label: 'Completed', bg: '#DFF3E4', color: COLORS.primary, icon: 'check-circle' },
  cancelled: { label: 'Cancelled', bg: '#EDEDED', color: '#888888', icon: 'x-circle' },
};

const ICON_PALETTE = [
  { bg: '#FBE1E1', color: '#E05C5C' },
  { bg: '#DCEBFB', color: '#4A90D9' },
  { bg: '#FCF0D6', color: '#D9A93F' },
  { bg: '#EAE1FB', color: '#8B6FD9' },
];

export default function Requests() {
  const styles = createRequestsStyles
  const { userId } = useAuth()
  const { createRequest, getUserRequests } = useRequestsApi()

  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [sortOrder, setSortOrder] = useState('latest')
  const [modalVisible, setModalVisible] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // silent=true keeps the current list on screen and just spins the reload
  // control; silent=false (initial load) shows the full-screen skeleton.
  const loadRequests = useCallback(async ({ silent } = {}) => {
    if (!userId) return
    if (silent) setRefreshing(true)
    else setLoading(true)

    const data = await getUserRequests(userId)
    setRequests(Array.isArray(data) ? data : [])

    if (silent) setRefreshing(false)
    else setLoading(false)
  }, [userId, getUserRequests])

  const loadRequestsRef = useRef(loadRequests)
  useEffect(() => {
    loadRequestsRef.current = loadRequests
  }, [loadRequests])

  useFocusEffect(
    useCallback(() => {
      loadRequestsRef.current()
    }, [])
  )

  const handleReload = () => loadRequests({ silent: true })

const handleCreateRequest = async ({ medicineName, image }) => {
  setSubmitting(true)
  const result = await createRequest({ userId, medicineName, image })
  setSubmitting(false)
  if (result) {
    setModalVisible(false)
    loadRequests()
  }
}

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'latest' ? 'oldest' : 'latest'))
  }

  const filteredRequests = requests
    .filter((item) => activeTab === 'all' ? true : item.status === activeTab)
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sortOrder === 'latest' ? dateB - dateA : dateA - dateB
    })

  if (loading) return <PageLoader />

  return (
    <View style={styles.ScreenContainer}>

      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleReload}

        ListHeaderComponent={
          <View>

            <View style={styles.headerRow}>
              <View>
                <Text style={styles.title}>My Requests</Text>
                <Text style={styles.subtitle}>Track your medicine requests</Text>
              </View>

              <View style={{ flexDirection: 'row', gap: 8 }}>
                <ReloadButton
                  onReload={handleReload}
                  loading={refreshing}
                  style={styles.filterButton}
                />
                <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
                  <Feather name="filter" size={18} color={COLORS.primary} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.tabsRow}>
              {TABS.map((tab) => {
                const isActive = activeTab === tab.key
                return (
                  <TouchableOpacity
                    key={tab.key}
                    style={[styles.tab, isActive && styles.tabActive]}
                    activeOpacity={0.8}
                    onPress={() => setActiveTab(tab.key)}
                  >
                    <Feather
                      name={tab.icon}
                      size={14}
                      color={isActive ? COLORS.surface : COLORS.placeholder}
                    />
                    <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.newRequestButton}
                activeOpacity={0.85}
                onPress={() => setModalVisible(true)}
              >
                <Ionicons name="add-circle" size={18} color={COLORS.surface} />
                <Text style={styles.newRequestText}>New Request</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.sortButton} activeOpacity={0.7} onPress={toggleSortOrder}>
                <Text style={styles.sortText}>{sortOrder === 'latest' ? 'Latest' : 'Oldest'}</Text>
                <Feather name="chevron-down" size={16} color={COLORS.placeholder} />
              </TouchableOpacity>
            </View>

          </View>
        }

        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="clipboard-text-outline" size={48} color={COLORS.placeholder} />
            <Text style={styles.emptyTitle}>No requests yet</Text>
            <Text style={styles.emptySubtitle}>Tap &quot;New Request&quot; to send your first one</Text>
          </View>
        }

        renderItem={({ item, index }) => {
          const status = STATUS_CONFIG[item.status] || STATUS_CONFIG.pending
          const palette = ICON_PALETTE[index % ICON_PALETTE.length]
          const createdDate = item.createdAt ? new Date(item.createdAt) : null

          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => router.push({ pathname: '/request-details', params: { id: item.id } })}
            >

              <View style={styles.cardTopRow}>

                {/* <View style={[styles.iconBadge, { backgroundColor: palette.bg }]}>
                  <MaterialCommunityIcons name="pill" size={22} color={palette.color} />
                </View> */}
                {item.imageUrl ? (
  <Image
    source={{ uri: item.imageUrl }}
    style={{ width: 48, height: 48, borderRadius: 14, marginRight: 12 }}
  />
) : (
  <View style={[styles.iconBadge, { backgroundColor: palette.bg }]}>
    <MaterialCommunityIcons name="pill" size={22} color={palette.color} />
  </View>
)}

                <View style={styles.cardTextContainer}>
                  <Text style={styles.medicineName}>{item.medicineName}</Text>
                  {!!item.subtitle && (
                    <Text style={styles.medicineSubtitle}>{item.subtitle}</Text>
                  )}

                  {createdDate && (
                    <View style={styles.metaRow}>
                      <Feather name="calendar" size={12} color={COLORS.placeholder} />
                      <Text style={styles.metaText}>
                        {createdDate.toLocaleDateString()} • {createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Text>
                    </View>
                  )}

                  {!!item.location && (
                    <View style={styles.metaRow}>
                      <Feather name="map-pin" size={12} color={COLORS.primary} />
                      <Text style={styles.metaText}>{item.location}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.cardRightColumn}>
                  <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
                    <Feather name={status.icon} size={12} color={status.color} />
                    <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
                  </View>
                  <Feather name="chevron-right" size={18} color={COLORS.placeholder} />
                </View>

              </View>

              {typeof item.responseCount === 'number' && item.responseCount > 0 && (
                <View style={styles.responsesRow}>
                  <Text style={styles.responsesText}>
                    <Text style={styles.responsesLabel}>Responses  </Text>
                    {item.responseCount} pharmacies responded
                  </Text>
                  <View style={styles.viewResponsesButton}>
                    <Text style={styles.viewResponsesText}>View Responses</Text>
                    <Feather name="chevron-right" size={14} color={COLORS.primary} />
                  </View>
                </View>
              )}

            </TouchableOpacity>

          )
        }}

        ListFooterComponent={
          <TouchableOpacity
            style={styles.banner}
            activeOpacity={0.85}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.bannerIconWrap}>
              <MaterialCommunityIcons name="clipboard-check-outline" size={26} color={COLORS.primary} />
            </View>

            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerTitle}>Need a medicine?</Text>
              <Text style={styles.bannerSubtitle}>Send a new request to nearby pharmacies</Text>
            </View>

            <View style={styles.bannerPlusButton}>
              <Ionicons name="add" size={20} color={COLORS.surface} />
            </View>
          </TouchableOpacity>
        }
      />

      <NewRequestModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreateRequest}
        submitting={submitting}
      />

    </View>
  );
}