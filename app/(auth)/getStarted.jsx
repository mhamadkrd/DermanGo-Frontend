import { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Image, Pressable, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';
import { createAuthStyles } from '../../assets/styles/authStyles.jsx';

const ONBOARDING_KEY = 'derman-go-onboarding-complete';
const slides = [
  { image: require('../../assets/images/slide_1.png'), title: 'Find Your Medicine', description: 'Search for the medicine you need, quickly and easily.' },
  { image: require('../../assets/images/slide_2.png'), title: 'Ask Nearby Pharmacies', description: 'Your request is sent to the nearest pharmacies at the same time.' },
  { image: require('../../assets/images/slide_3.png'), title: 'Know Before You Go', description: 'Get quick responses and know which pharmacy has your medicine available.' },
];

function OnboardingSlide({ item, isActive, width }) {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      animation.setValue(0);
      Animated.spring(animation, { toValue: 1, useNativeDriver: true, friction: 8, tension: 55 }).start();
    }
  }, [animation, isActive]);

  return (
    <View style={[createAuthStyles.getStartedSlide, { width }]}>
      <Animated.View style={{ opacity: animation, transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [28, 0] }) }, { scale: animation.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1] }) }] }}>
        <View style={createAuthStyles.getStartedImageWrap}>
          <Image source={item.image} style={createAuthStyles.getStartedImg} />
        </View>
        <View style={createAuthStyles.getStartedTextWrap}>
          <Text style={createAuthStyles.getStartedFirstText}>{item.title}</Text>
          <Text style={createAuthStyles.getStartedSecondText}>{item.description}</Text>
        </View>
      </Animated.View>
    </View>
  );
}

export default function GetStartedScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);

  const finishOnboarding = async () => {
    if (isFinishing) return;
    setIsFinishing(true);
    try {
      await SecureStore.setItemAsync(ONBOARDING_KEY, 'true');
    } finally {
      router.replace('/sign-in');
    }
  };

  const goToNextSlide = () => {
    if (activeIndex === slides.length - 1) return finishOnboarding();
    listRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
  };

  return (
    <View style={createAuthStyles.getStartedScreen}>
      <View style={createAuthStyles.getStartedHeader}>
        <TouchableOpacity onPress={finishOnboarding} disabled={isFinishing}>
          <Text style={createAuthStyles.getStartedSkip}>Skip</Text>
        </TouchableOpacity>
      </View>
      <FlatList ref={listRef} data={slides} horizontal pagingEnabled showsHorizontalScrollIndicator={false} keyExtractor={(item) => item.title} renderItem={({ item, index }) => <OnboardingSlide item={item} isActive={index === activeIndex} width={width} />} onMomentumScrollEnd={(event) => setActiveIndex(Math.round(event.nativeEvent.contentOffset.x / width))} />
      <View style={createAuthStyles.getStartedFooter}>
        <View style={createAuthStyles.getStartedPagination}>
          {slides.map((slide, index) => <View key={slide.title} style={[createAuthStyles.getStartedDot, index === activeIndex && createAuthStyles.getStartedDotActive]} />)}
        </View>
        <Pressable accessibilityRole="button" style={({ pressed }) => [createAuthStyles.getStartedButton, pressed && createAuthStyles.getStartedButtonPressed]} onPress={goToNextSlide} disabled={isFinishing}>
          <Text style={createAuthStyles.getStartedButtonText}>{activeIndex === slides.length - 1 ? 'Get Started' : 'Continue'}</Text>
        </Pressable>
      </View>
    </View>
  );
}
