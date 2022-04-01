import {call, put, takeEvery} from '@redux-saga/core/effects';
import {GENERATE_QUESTIONS} from 'features/questions/questions.slice';
import {TakeableChannel} from 'redux-saga';
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
    const moviesCache = localStorage.getItem('movies');
    const moviesCacheParsed = moviesCache ? JSON.parse(moviesCache) : null;
    let response;
    let json;
    if (!moviesCacheParsed) {
      // need to set types
      response = yield call(fetch, url);
      json = yield call([response, 'json']);
      if (json.items.length < 1 && json.errorMessage.length > 0) {
        yield put({type: RECEIVE_MOVIES_ERROR, payload: json.errorMessage});
      } else {
        localStorage.setItem('movies', JSON.stringify(json.items));
        yield put({type: RECEIVE_MOVIES_SUCCESS, payload: json.items});
      }
    } else {
      yield put({type: RECEIVE_MOVIES_SUCCESS, payload: moviesCacheParsed});
    }
  } catch (error) {
    // need to set types
    yield put({type: RECEIVE_MOVIES_ERROR, payload: error.toString()});
  }
}
export function* onReceiveMoviesSuccess({
  action,
  payload,
}: {
  action: typeof RECEIVE_MOVIES_SUCCESS;
  payload: Movie[];
}) {
  yield put({
    type: GENERATE_QUESTIONS,
    payload: payload,
  });
}

export function* moviesSaga() {
  yield takeEvery(FETCH_MOVIES as unknown as TakeableChannel<unknown>, onFetchMovies);
  yield takeEvery(
    RECEIVE_MOVIES_SUCCESS as unknown as TakeableChannel<unknown>,
    onReceiveMoviesSuccess
  );
}
