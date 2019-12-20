import { RouterReducerState } from '@ngrx/router-store';

import { ScoreState, initialScoreState } from './score.state';


export interface AppState {
  router?: RouterReducerState;
  scores: ScoreState;
}

export const initialAppState: AppState = {
  scores: initialScoreState,
};

export function getInitialState(): AppState {
  return initialAppState;
}
