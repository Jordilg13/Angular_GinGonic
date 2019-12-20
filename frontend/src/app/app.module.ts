import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketService } from "./core/services/socket.service";
import { AuthModule } from './auth/auth.module';
import { CoreModule, RedisService, ScoreService } from './core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
//import { reducers, metaReducers } from './reducers';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
//import { AppEffects } from './app.effects';
import { appReducers } from './store/reducers/app.reducers';
import { ScoreEffects } from './store/effects/score.effects';


@NgModule({
   declarations: [
      AppComponent
   ],
   imports: [
      BrowserModule,
      AuthModule,
      AppRoutingModule,
      CoreModule,
      HttpClientModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      StoreModule.forRoot(appReducers),
      StoreRouterConnectingModule.forRoot(),
      EffectsModule.forRoot([ScoreEffects]),
      StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
   ],
   providers: [
      SocketService,
      RedisService,
      ScoreService,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
