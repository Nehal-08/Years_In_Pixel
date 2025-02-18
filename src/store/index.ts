import { createStore, combineReducers, Store, AnyAction } from 'redux';
import { statusesReducer, StatusesState } from './statusesReducer';
import persistMiddleware from './middleware';

export interface RootState {
  statuses: StatusesState;
}

const rootReducer = combineReducers({
  statuses: statusesReducer,
});

export const store: Store<RootState, AnyAction> = createStore(
  rootReducer,
  undefined,
  persistMiddleware
); 