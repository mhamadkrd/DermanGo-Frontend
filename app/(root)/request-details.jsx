import { useState, useCallback } from 'react'
import { View, Text, ScrollView, ActivityIndicator,TouchableOpacity } from 'react-native'
import { useLocalSearchParams, useFocusEffect, router } from 'expo-router'
import { Feather, MaterialCommunityIcons } from 'react-native-vector-icons'
import { COLORS } from '../../constant/colors.jsx'
import { useRequestsApi } from '../../Hooks/requestsHooks.js'
import { requestDetailsStyles as styles } from '../../assets/styles/requestDetailsStyles.jsx'


export default function RequestDetails() {
  const { id } = useLocalSearchParams()
  const { getRequestById } = useRequestsApi()

  const [request, setRequest] = useState(null)
  const [loading, setLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      let active = true
      setLoading(true)
      getRequestById(id).then((data) => {
        if (active) {
          setRequest(data || null)
          setLoading(false)
        }
      })
      return () => { active = false }
    }, [id])
  )

  if (loading) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator color={COLORS.primary} />
      </View>
    )
  }

  if (!request) {
    return (
      <View style={styles.container}>
        <View style={styles.empty}>
          <MaterialCommunityIcons name="alert-circle-outline" size={48} color={COLORS.placeholder} />
          <Text style={styles.emptyText}>Request not found</Text>
        </View>
      </View>
    )
  }

  const createdDate = new Date(request.createdAt)
  const responses = request.responses || []

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.backRow}>
  <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
    <Feather name="arrow-left" size={20} color={COLORS.textPrimary} />
  </TouchableOpacity>
  <Text style={styles.backText}>Back</Text>
</View>
        <View style={styles.headerCard}>
          <Text style={styles.medicineName}>{request.medicineName}</Text>
          <View style={styles.metaRow}>
            <Feather name="calendar" size={12} color={COLORS.placeholder} />
            <Text style={styles.metaText}>
              {createdDate.toLocaleDateString()} • {createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Pharmacy Responses {responses.length > 0 ? `(${responses.length})` : ''}
        </Text>

        {responses.length === 0 ? (
          <View style={styles.empty}>
            <MaterialCommunityIcons name="clock-outline" size={48} color={COLORS.placeholder} />
            <Text style={styles.emptyText}>No pharmacies have responded yet</Text>
          </View>
        ) : (
          responses.map((r) => (
            <View key={r.id} style={styles.responseCard}>
              <View style={styles.responseTopRow}>
                <View>
                  <Text style={styles.pharmacyName}>{r.pharmacyName}</Text>
                  {!!r.address && <Text style={styles.pharmacyAddress}>{r.address}</Text>}
                </View>
                {r.available ? (
                  <View style={styles.availableBadge}>
                    <Feather name="check-circle" size={12} color={COLORS.success} />
                    <Text style={styles.availableText}>Available</Text>
                  </View>
                ) : (
                  <View style={styles.unavailableBadge}>
                    <Feather name="x-circle" size={12} color={COLORS.error} />
                    <Text style={styles.unavailableText}>Not Available</Text>
                  </View>
                )}
              </View>

              {r.available && r.price != null && (
                <Text style={styles.priceText}>${Number(r.price).toFixed(2)}</Text>
              )}

              <Text style={styles.respondedAt}>
                Responded {new Date(r.respondedAt).toLocaleDateString()} • {new Date(r.respondedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}