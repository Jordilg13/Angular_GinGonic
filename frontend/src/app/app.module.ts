import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketService } from "./core/services/socket.service";
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
      ToastrModule.forRoot()
   ],
   providers: [
      SocketService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
