import {ThunkAction, Action, combineReducers, createStore} from '@reduxjs/toolkit';
import timerReducer from 'features/timer/timer.slice';
import currentScoreReducer from '../features/currentScore/currentScore.slice';

const rootReducer = combineReducers({
  currentScore: currentScoreReducer,
  timer: timerReducer,
});

/* eslint-disable no-underscore-dangle */
export const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
