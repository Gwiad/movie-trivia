import {
  ThunkAction,
  Action,
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import moviesReducer, {moviesSaga} from 'features/movies/movies.slice';
import timerReducer from 'features/timer/timer.slice';
import questionsReducer from 'features/questions/questions.slice';
import currentScoreReducer from '../features/currentScore/currentScore.slice';

const rootReducer = combineReducers({
  currentScore: currentScoreReducer,
  timer: timerReducer,
  movies: moviesReducer,
  questions: questionsReducer,
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = compose(
  applyMiddleware(sagaMiddleware),
  /* eslint-disable no-underscore-dangle */
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export const store = createStore(rootReducer, composeEnhancers);

sagaMiddleware.run(moviesSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
