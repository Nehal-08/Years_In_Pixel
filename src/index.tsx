/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import YearGrid from './components/YearGrid';
import { loadStatuses } from './utils/storage';
import { setStatuses, setLoading } from './store/statusesReducer';
import { theme } from './utils/theme';

function AppContent(): React.JSX.Element {
  useEffect(() => {
    const loadSavedStatuses = async () => {
      try {
        const savedStatuses = await loadStatuses();
        store.dispatch(setStatuses(savedStatuses || {}));
        store.dispatch(setLoading(false));
      } catch (error) {
        console.error('Error loading statuses:', error);
        store.dispatch(setLoading(false));
      }
    };

    loadSavedStatuses();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Year in Pixels</Text>
      <YearGrid />
    </SafeAreaView>
  );
}

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />
      <AppContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
    color: theme.colors.text.primary,
  },
});

export default App;
