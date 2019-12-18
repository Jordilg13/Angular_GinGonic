import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { UserService } from '../core/services/user.service';
import { NoAuthGuard } from './no-auth-guard.service';
import { LogoutComponent } from '../logout/logout.component';


@NgModule({
  declarations: [AuthComponent, LogoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  providers: [
    NoAuthGuard,
    UserService
  ],
  exports: [AuthComponent, LogoutComponent]
})
export class AuthModule { }
