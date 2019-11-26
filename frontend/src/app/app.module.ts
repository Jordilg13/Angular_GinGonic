import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketService } from "./services/socket.service";
import { GameModule } from "./game/game.module";
import { AuthModule } from './auth/auth.module';
//import { GameComponent } from './game/game.component';
//import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    GameModule,
    AuthModule,
    AppRoutingModule,
    // HttpModule

  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
