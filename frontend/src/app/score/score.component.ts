import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ScoreService, RedisService } from "../core";

import { AppState } from '../store/state/app.state';
import { selectScoreList } from '../store/selectors/score.selector';
import { GetScores } from '../store/actions/score.actions';
@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  scores$ = this._store.pipe(select(selectScoreList))
  constructor(
    private scoreService: ScoreService,
    private _store: Store<AppState>,
    private redisService: RedisService
  ) { }

  ngOnInit() {
    this._store.dispatch(new GetScores());
    /*this.scoreService.getScores().subscribe((data) => {
      console.log(data);
    });*/
  }

}
