import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DaySquareProps } from '../types';
import { toggleDayStatus } from '../store/statusesReducer';
import { RootState } from '../store';
import { formatDateKey, isDatePassed } from '../utils/dateUtils';
import { getSquareDimension } from '../utils/dimensions';
import { theme } from '../utils/theme';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DaySquare: React.FC<Pick<DaySquareProps, 'date'>> = ({ date }) => {
  const SQUARE_SIZE = getSquareDimension();
  const dispatch = useDispatch();
  const dateKey = formatDateKey(date);
  const status = useSelector((state: RootState) => 
    state.statuses.dayStatuses[dateKey] || 'blank'
  );
  const passed = isDatePassed(new Date(date));
  const isCurrentYear = date.getFullYear() === new Date().getFullYear();
  const isDisabled = !isCurrentYear || (passed && status !== 'completed');

  const getBackgroundColor = () => {
    if (!isCurrentYear) {
      return theme.colors.status.disabled;
    }
    if (isDisabled && passed && status !== 'completed') {
      return theme.colors.status.missed;
    }
    switch (status) {
      case 'completed':
        return theme.colors.status.completed;
      case 'missed':
        return theme.colors.status.missed;
      default:
        return theme.colors.status.blank;
    }
  };

  const isRedBackground = () => {
    const bgColor = getBackgroundColor();
    return bgColor === theme.colors.status.missed;
  };

  const handlePress = () => {
    console.log('handlePress', date.toLocaleDateString());
    dispatch(toggleDayStatus(date));
  };

  const styles = StyleSheet.create({
    touchable: {
      width: SQUARE_SIZE,
      height: SQUARE_SIZE,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 2,
    },
    square: {
      width: SQUARE_SIZE - 2,
      height: SQUARE_SIZE - 2,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
    },
    dateText: {
      fontSize: SQUARE_SIZE * 0.3,
      fontWeight: '500',
      color: theme.colors.text.primary,
    },
    monthText: {
      fontSize: SQUARE_SIZE * 0.25,
      color: theme.colors.text.primary,
      marginTop: -2,
    },
    whiteText: {
      color: theme.colors.text.primary,
    },
    disabledText: {
      color: theme.colors.text.disabled,
    },
    disabled: {
      opacity: 0.7,
    },
  });

  return (
    <TouchableOpacity
      style={styles.touchable}
      onPress={handlePress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.square,
          { backgroundColor: getBackgroundColor() },
          isDisabled && styles.disabled,
        ]}
      >
        <Text style={[
          styles.dateText,
          !isCurrentYear && styles.disabledText,
          isRedBackground() && styles.whiteText
        ]}>
          {date.getDate()}
        </Text>
        <Text style={[
          styles.monthText,
          !isCurrentYear && styles.disabledText,
          isRedBackground() && styles.whiteText
        ]}>
          {MONTHS[date.getMonth()]}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DaySquare; 