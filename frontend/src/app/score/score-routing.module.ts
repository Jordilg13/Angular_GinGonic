import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoreComponent } from './score.component';


const routes: Routes = [
  {
    path: '',
    component: ScoreComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoreRoutingModule {}