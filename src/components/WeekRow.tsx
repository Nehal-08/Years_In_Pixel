import React from 'react';
import { View, StyleSheet } from 'react-native';
import DaySquare from './DaySquare';

interface WeekRowProps {
  dates: Date[];
}

const WeekRow: React.FC<WeekRowProps> = ({ dates }) => {
  // console.log('WeekRow', dates);
  return (
    <View style={styles.row}>
      {dates.map((date) => (
        <DaySquare
          key={date.toISOString()}
          date={date}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default WeekRow;
