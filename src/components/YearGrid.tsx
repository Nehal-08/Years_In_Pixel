import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import WeekRow from './WeekRow';
import { RootState } from '../store';
import { generateYearDates } from '../utils/dateUtils';
import { theme } from '../utils/theme';

const YearGrid = () => {
  const isLoading = useSelector((state: RootState) => state.statuses.isLoading);
  const [, setDimensions] = useState(Dimensions.get('window'));
  const allDates = generateYearDates();

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  // Group dates into weeks
  const weeks: Date[][] = [];
  for (let i = 0; i < allDates.length; i += 7) {
    weeks.push(allDates.slice(i, i + 7));
  }

  if (isLoading) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <View style={styles.gridContainer}>
          {weeks.map((weekDates, index) => (
            <WeekRow
              key={`week-${index}`}
              dates={weekDates}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 10,
  },
  gridContainer: {
    alignItems: 'center',
    width: '100%',
  },
});

export default YearGrid; 