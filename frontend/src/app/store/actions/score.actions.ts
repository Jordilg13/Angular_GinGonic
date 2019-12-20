import { Action } from '@ngrx/store';

import { Score } from '../../core/models/score.model';

export enum EScoreActions {
  GetScores = '[Score] Get Scores',
  GetScoresSuccess = '[Score] Get Scores Success',
}
export class GetScores implements Action {
    public readonly type = EScoreActions.GetScores;
}

export class GetScoresSuccess implements Action {
public readonly type = EScoreActions.GetScoresSuccess;
  constructor(public payload: Score[]) {}
}

export type ScoreActions = GetScores | GetScoresSuccess;