import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base design size (iPhone 11 / common reference)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export const scale = (size) => {
  return (width / BASE_WIDTH) * size;
};

export const verticalScale = (size) => {
  return (height / BASE_HEIGHT) * size;
};

export const moderateScale = (size, factor = 0.5) => {
  return size + (scale(size) - size) * factor;
};

export const fontScale = (size) => {
  return PixelRatio.getFontScale() * size;
};