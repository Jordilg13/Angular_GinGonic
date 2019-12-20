import { Score } from '../../core/models/score.model';

export interface ScoreState {
  scores: Score[];
}

export const initialScoreState: ScoreState = {
  scores: null,
};
