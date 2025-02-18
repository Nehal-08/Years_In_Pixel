import AsyncStorage from '@react-native-async-storage/async-storage';
import { DayStatus } from '../types';

const STORAGE_KEY = 'year_grid_statuses';

export const saveStatuses = async (statuses: Record<string, DayStatus>): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
  } catch (error) {
    console.error('Error saving statuses:', error);
  }
};

export const loadStatuses = async (): Promise<Record<string, DayStatus>> => {
  try {
    const savedStatuses = await AsyncStorage.getItem(STORAGE_KEY);
    return savedStatuses ? JSON.parse(savedStatuses) : {};
  } catch (error) {
    console.error('Error loading statuses:', error);
    return {};
  }
};
