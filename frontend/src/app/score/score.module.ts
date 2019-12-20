import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreComponent } from './score.component';
import { ScoreRoutingModule } from './score-routing.module';
import { ScoreService } from '../core';
import { ScoresComponent } from './scores.component';



@NgModule({
  declarations: [ScoreComponent,ScoresComponent],
  imports: [
    CommonModule,
    ScoreRoutingModule,
  ],
  providers: [ScoreService]
})
export class ScoreModule { }
