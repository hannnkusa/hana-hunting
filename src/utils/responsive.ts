import { Dimensions, Platform, PixelRatio } from 'react-native'

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const heightMobileUI = 812;
const widthMobileUI = 375;

const scale = SCREEN_WIDTH / widthMobileUI;

export const ResponsiveWidth = (width) => {
  return (SCREEN_WIDTH * width) / widthMobileUI;
};

export const ResponsiveHeight = (height) => {
  return (SCREEN_HEIGHT * height) / heightMobileUI;
};

export const ResponsiveFontSize = (size) => {
  const newSize = size * scale
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
}