import { ActionReducerMap } from '@ngrx/store';

import { routerReducer } from '@ngrx/router-store';
import { AppState } from '../state/app.state';
import { ScoreReducers } from './score.reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
  router: routerReducer,
  scores: ScoreReducers,
};
