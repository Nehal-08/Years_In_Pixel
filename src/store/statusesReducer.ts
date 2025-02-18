import { DayStatus } from '../types';
import { formatDateKey, isDatePassed } from '../utils/dateUtils';

export interface StatusesState {
  dayStatuses: Record<string, DayStatus>;
  isLoading: boolean;
}

const initialState: StatusesState = {
  dayStatuses: {},
  isLoading: true,
};

export type StatusesAction = 
  | { type: 'SET_STATUSES'; payload: Record<string, DayStatus> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'TOGGLE_DAY_STATUS'; payload: Date };

export const statusesReducer = (
  state: StatusesState = initialState,
  action: StatusesAction
): StatusesState => {
  switch (action.type) {
    case 'SET_STATUSES':
      return {
        ...state,
        dayStatuses: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'TOGGLE_DAY_STATUS': {
      const date = action.payload;
      const dateKey = formatDateKey(date);
      const passed = isDatePassed(new Date(date));
      const newStatuses = { ...state.dayStatuses };

      if (passed && newStatuses[dateKey] !== 'completed') {
        newStatuses[dateKey] = 'missed';
      } else {
        newStatuses[dateKey] = newStatuses[dateKey] === 'completed' ? 'blank' : 'completed';
      }

      return {
        ...state,
        dayStatuses: newStatuses,
      };
    }
    default:
      return state;
  }
};

// Action creators
export const setStatuses = (statuses: Record<string, DayStatus>) => ({
  type: 'SET_STATUSES' as const,
  payload: statuses,
});

export const setLoading = (loading: boolean) => ({
  type: 'SET_LOADING' as const,
  payload: loading,
});

export const toggleDayStatus = (date: Date) => ({
  type: 'TOGGLE_DAY_STATUS' as const,
  payload: date,
}); 