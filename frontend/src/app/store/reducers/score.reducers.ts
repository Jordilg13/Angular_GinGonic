import { EScoreActions } from './../actions/score.actions';
import { ScoreActions } from '../actions/score.actions';
import { initialScoreState, ScoreState } from '../state/score.state';

export const ScoreReducers = (
  state = initialScoreState,
  action: ScoreActions
): ScoreState => {
  switch (action.type) {
    case EScoreActions.GetScoresSuccess: {
      return {
        ...state,
        scores: action.payload
      };
    }
    default:
      return state;
  }
};
