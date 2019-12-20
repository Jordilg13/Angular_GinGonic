import { createSelector } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { ScoreState } from '../state/score.state';

const selectScores = (state: AppState) => state.scores;

export const selectScoreList = createSelector(
  selectScores,
  (state: ScoreState) => {
    return state.scores
  }
);