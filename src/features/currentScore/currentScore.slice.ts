export const ADD_POINT = 'currentScore/addPoint';
export const RESET_SCORE = 'currentScore/reset';

export interface CurrentScoreActionI {
  type: typeof ADD_POINT | typeof RESET_SCORE;
}

export const addPoint = () => ({type: ADD_POINT});
export const resetScore = () => ({type: RESET_SCORE});

export default function currentScoreReducer(state = 0, action: CurrentScoreActionI) {
  if (action.type === ADD_POINT) {
    return state + 1;
  }
  if (action.type === RESET_SCORE) {
    return 0;
  }
  return state;
}
