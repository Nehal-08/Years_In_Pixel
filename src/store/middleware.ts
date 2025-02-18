import { Middleware, applyMiddleware } from 'redux';
import { RootState } from './index';
import { saveStatuses } from '../utils/storage';

const persistMiddleware: Middleware<{}, RootState> =
  store => next => (action: any) => {
    const result = next(action);
    const state = store.getState();

    if (action.type === 'TOGGLE_DAY_STATUS' && !state.statuses.isLoading) {
      saveStatuses(state.statuses.dayStatuses);
    }

    return result;
  };

export default applyMiddleware(persistMiddleware);
