export const START_TIMER = 'timer/startTimer';
export const STOP_TIMER = 'timer/stopTimer';

export interface TimerActionI {
  type: typeof START_TIMER | typeof STOP_TIMER;
}

export const startTimer = () => ({type: START_TIMER});
export const stopTimer = () => ({type: STOP_TIMER});

export default function timerReducer(
  state = false,
  action: typeof START_TIMER | typeof STOP_TIMER
) {
  if (action === START_TIMER) {
    return true;
  }
  if (action === STOP_TIMER) {
    return false;
  }
  return state;
}
