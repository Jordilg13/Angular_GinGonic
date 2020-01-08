import { createSelector } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { ScoreState } from '../state/score.state';

const selectScores = (state: AppState) => state.scores;

export const selectScoreList = createSelector(
  selectScores,
  (state: ScoreState) => {
    if (state.scores != null)
      state.scores = state.scores.sort((obj1, obj2) => {
        return parseInt(obj2.value) - parseInt(obj1.value)
      })
    return state.scores
  }
);