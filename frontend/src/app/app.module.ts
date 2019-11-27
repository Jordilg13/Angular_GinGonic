import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketService } from "./core/services/socket.service";
import { GameModule } from "./game/game.module";
import { AuthModule } from './auth/auth.module';

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
