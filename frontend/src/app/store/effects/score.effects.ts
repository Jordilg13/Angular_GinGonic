import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../state/app.state';
import {
  GetScoresSuccess,
  EScoreActions,
  GetScores,
} from '../actions/score.actions';
import { ScoreService } from '../../core/services/score.service';
import { ScoreHttp } from 'src/app/core/models/score-http.model';
//import { IUserHttp } from '../../models/http-models/user-http.interface';
//import { selectUserList } from '../selectors/user.selector';

@Injectable()
export class ScoreEffects {

  @Effect()
  getScores$ = this._actions$.pipe(
    ofType<GetScores>(EScoreActions.GetScores),
    switchMap(() => this._scoreService.getScores()),
    switchMap((score: ScoreHttp) => of(new GetScoresSuccess(score.scores))),
  );

  constructor(
    private _scoreService: ScoreService,
    private _actions$: Actions,
    private _store: Store<AppState>
  ) {}
}