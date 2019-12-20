import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ScoreService, RedisService } from "../core";

import { AppState } from '../store/state/app.state';
import { selectScoreList } from '../store/selectors/score.selector';
import { GetScores } from '../store/actions/score.actions';
import { Score } from '../core/models/score.model';
@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoresComponent implements OnInit {
    @Input()
    scores: Score[];
  constructor(
  ) { }

  ngOnInit() {
    
  }

}
