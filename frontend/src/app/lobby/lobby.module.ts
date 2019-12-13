import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby.component';
import { LobbyRoutingModule } from './lobby-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RedisService } from '../core';



@NgModule({
  declarations: [LobbyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LobbyRoutingModule,
  ],
  providers: [RedisService]
})
export class LobbyModule { }
