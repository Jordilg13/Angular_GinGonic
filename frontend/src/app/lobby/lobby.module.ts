import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobbyComponent } from './lobby.component';
import { LobbyRoutingModule } from './lobby-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LobbyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LobbyRoutingModule,
  ]
})
export class LobbyModule { }
