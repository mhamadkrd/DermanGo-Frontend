import { useEffect, useState, useRef } from "react";
import { Text, View, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { useClerk,useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import { createmainStyles } from '../../assets/styles/mainStyles.jsx'
import { useUserApi } from '../../Hooks/userHooks.js'
import AppSkeleton from '../../components/skeletons/AppSkeleton.jsx'
import { Ionicons, MaterialIcons, Feather, MaterialCommunityIcons } from 'react-native-vector-icons'
import { COLORS } from '../../constant/colors.jsx'


const ads = [
  {
    id: '1',
    image: require('../../assets/images/ad1.png'),
  },
  {
    id: '2',
    image: require('../../assets/images/ad2.png'),
  },
  {
    id: '3',
    image: require('../../assets/images/ad3.png'),
  },
];

const mostSearchedMedicines = [
  {
    id: '1',
    name: 'Panadol',
    subtitle: 'Pain relief and fever',
    iconBg: '#FBE1E1',
    iconColor: '#E05C5C',
  },
  {
    id: '2',
    name: 'Amoxicillin',
    subtitle: 'Antibiotic',
    iconBg: '#DCEBFB',
    iconColor: '#4A90D9',
  },
  {
    id: '3',
    name: 'Ventolin',
    subtitle: 'For asthma relief',
    iconBg: '#FCF0D6',
    iconColor: '#D9A93F',
  },
  {
    id: '4',
    name: 'Ibuprofen',
    subtitle: 'Pain relief and inflammation',
    iconBg: '#EAE1FB',
    iconColor: '#8B6FD9',
  },
];


export default function Index() {
  const { signOut } = useClerk();
  const router = useRouter();
  const styles = createmainStyles
  const { userId } = useAuth()
  const { getUserProfile } = useUserApi()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderWidth, setSliderWidth] = useState(0)
  const sliderRef = useRef(null)

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId) return
      const data = await getUserProfile(userId)
      setProfile(data)
      setLoading(false)
    }
    loadProfile()
  }, [userId])


  // Auto slider
  useEffect(() => {
    if (!sliderWidth) return

    const interval = setInterval(() => {
      setCurrentIndex((previousIndex) => {

        const nextIndex =
          previousIndex === ads.length - 1
            ? 0
            : previousIndex + 1

        sliderRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        })

        return nextIndex
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [sliderWidth])


  if (loading) return <AppSkeleton />

  const handleSignOut = async () => {
    await signOut();
    router.replace("/sign-in");
  };


  return (
    <View style={styles.ScreenContainer}>
      <ScrollView
        contentContainerStyle={styles.Container}
        showsVerticalScrollIndicator={false}
      >


        <View style={styles.Header}>
          <View style={styles.leftHeader}>
            <Image
              source={require('../../assets/images/avatarkurd.png')}
              style={styles.avatar}
            />

            <View style={styles.WelcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.userName}>{profile?.name || 'User'} 👋</Text>
            </View>
          </View>

          <View style={styles.rightHeader}>
            <TouchableOpacity style={styles.notificationBackground}>
              <Ionicons
                name="notifications"
                color={COLORS.surface}
                size={25}
              />
                <View style={styles.bellDot} />
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.mainLogoBackground}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.mainLogo}
          />

          <Text style={styles.logoText}>
            Your health, delivered faster
          </Text>
        </View>


        {/* IMAGE SLIDER */}

        <View
          style={styles.sliderContainer}
          onLayout={(event) => {
            const measuredWidth = event.nativeEvent.layout.width
            if (measuredWidth && measuredWidth !== sliderWidth) {
              setSliderWidth(measuredWidth)
            }
          }}
        >

          {sliderWidth > 0 && (
            <FlatList
              ref={sliderRef}
              data={ads}
              horizontal
              pagingEnabled
              snapToInterval={sliderWidth}
              snapToAlignment="start"
              decelerationRate="fast"
              disableIntervalMomentum
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}

              onScroll={(event) => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / sliderWidth
                )

                setCurrentIndex(index)
              }}

              scrollEventThrottle={16}

              getItemLayout={(_, index) => ({
                length: sliderWidth,
                offset: sliderWidth * index,
                index,
              })}

              renderItem={({ item }) => (
                <View style={[styles.slide, { width: sliderWidth }]}>

                  <Image
                    source={item.image}
                    style={styles.sliderImage}
                    resizeMode="cover"
                  />

                </View>
              )}
            />
          )}


          {/* SLIDER DOTS — overlaid on top of the image, not below it */}

          <View style={styles.dotsContainer}>

            {ads.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index && styles.activeDot
                ]}
              />
            ))}

          </View>

        </View>


        <TouchableOpacity
          style={styles.requestBtn}
          activeOpacity={0.8}
          onPress={() => router.push('/requests')}
        >

          <View style={styles.leftSide}>
            <MaterialIcons
              name="local-pharmacy"
              size={40}
              color={COLORS.primary}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.btnMainText}>Request Medicine</Text>
            <Text style={styles.btnSecondaryText}>Send a request to nearby pharmacies</Text>
          </View>

          <Feather
            name="chevron-right"
            size={24}
            color="white"
          />

        </TouchableOpacity>


        <View style={styles.mostSearchedView}>

          <Text style={styles.sectionTitle}>Most Searched Medicines</Text>

          {mostSearchedMedicines.map((medicine) => (
            <TouchableOpacity
              key={medicine.id}
              style={styles.medicineCard}
              activeOpacity={0.7}
            >

              <View style={[styles.medicineIconBadge, { backgroundColor: medicine.iconBg }]}>
                <MaterialCommunityIcons
                  name="pill"
                  size={22}
                  color={medicine.iconColor}
                />
              </View>

              <View style={styles.medicineTextContainer}>
                <Text style={styles.medicineName}>{medicine.name}</Text>
                <Text style={styles.medicineSubtitle}>{medicine.subtitle}</Text>
              </View>

              <View style={styles.medicineTrendBadge}>
                <Feather
                  name="trending-up"
                  size={16}
                  color={COLORS.primary}
                />
              </View>

            </TouchableOpacity>
          ))}

        </View>
    <TouchableOpacity onPress={handleSignOut}>
      <Text>Log out</Text>
    </TouchableOpacity>
      </ScrollView>
    </View>
  );
}