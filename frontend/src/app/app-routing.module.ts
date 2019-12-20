import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
//import { GameComponent } from './game/game.component';
//import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  //{ path: 'game', component: GameComponent },
  //{ path: '', component: AuthComponent },
  {
    path: 'game',
    loadChildren: './game/game.module#GameModule'
  },
  {
    path:'lobby',
    loadChildren: './lobby/lobby.module#LobbyModule'
  },
  {
    path:'social',
    loadChildren: './social/social.module#SocialModule'
  },
  {
    path:'score',
    loadChildren: './score/score.module#ScoreModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules (PRs welcome 😉)
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
