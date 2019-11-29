import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, UserService, JwtService, AuthGuard } from "./services";
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  imports: [
    CommonModule,

  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },,
    ApiService,
    UserService,
    AuthGuard,
    JwtService,
    HttpClientModule
  ],
  declarations: []
})
export class CoreModule { }
