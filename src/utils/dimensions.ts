import { Dimensions } from 'react-native';

const DAYS_IN_WEEK = 7;
const MARGIN = 2; // Margin between squares

export const getSquareDimension = () => {
  const screenWidth = Dimensions.get('window').width;
  const totalMargins = MARGIN * 2 * DAYS_IN_WEEK; // Account for left and right margins of each square
  const availableWidth = screenWidth - totalMargins;
  return Math.floor(availableWidth / DAYS_IN_WEEK);
}; 