import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
    AuthModule
  ],
  exports: [GameComponent]
})
export class GameModule { }
