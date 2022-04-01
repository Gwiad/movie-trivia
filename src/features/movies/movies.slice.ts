import {call, put, takeEvery} from '@redux-saga/core/effects';
import {Movie} from 'types';

const key = process.env.REACT_APP_IMDB_PUBLIC_API_KEY;
const url = `https://imdb-api.com/en/API/Top250Movies/${key}`;

export interface MovieStateI {
  movies: Movie[];
  loading: boolean;
  error: null | string;
}
const defaultMovieState: MovieStateI = {
  movies: [],
  loading: false,
  error: null,
};
export const FETCH_MOVIES = 'movies/fetchMovies';
export const RECEIVE_MOVIES_SUCCESS = 'movies/receiveMoviesSuccess';
export const RECEIVE_MOVIES_ERROR = 'movies/receiveMoviesError';

export interface MoviesActionI {
  type: typeof FETCH_MOVIES | typeof RECEIVE_MOVIES_SUCCESS | typeof RECEIVE_MOVIES_ERROR;
  payload?: Movie[] | string;
}

export const fetchMovies = () => ({type: FETCH_MOVIES});

export const receiveMoviesSuccess = (movies: Movie[]) => ({
  type: RECEIVE_MOVIES_SUCCESS,
  payload: movies,
});
export const receiveMoviesError = (errorMessage: string) => ({
  type: RECEIVE_MOVIES_ERROR,
  payload: errorMessage,
});

export default function moviesReducer(state = defaultMovieState, action: MoviesActionI) {
  if (action.type === FETCH_MOVIES) {
    return {...state, loading: true};
  }
  if (action.type === RECEIVE_MOVIES_SUCCESS) {
    return {...state, loading: false, movies: action.payload};
  }
  if (action.type === RECEIVE_MOVIES_ERROR) {
    return {...state, loading: false, error: action.payload};
  }
  return state;
}

export function* onFetchMovies(action: typeof FETCH_MOVIES) {
  try {
    // need to set types
    const response = yield call(fetch, url);
    const json = yield call([response, 'json']);
    if (json.items.length < 1 && json.errorMessage.length > 0) {
      yield put({type: RECEIVE_MOVIES_ERROR, payload: json.errorMessage});
    } else {
      yield put({type: RECEIVE_MOVIES_SUCCESS, payload: json.items});
    }
  } catch (error) {
    // need to set types
    yield put({type: RECEIVE_MOVIES_ERROR, payload: error.toString()});
  }
}

export function* moviesSaga() {
  // @ts-expect-error : need to set types
  yield takeEvery(FETCH_MOVIES, onFetchMovies);
}
