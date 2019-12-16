import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialComponent } from './social.component';
import { SocialRoutingModule } from './social-routing.module';
import { RedisService } from '../core';

@NgModule({
  declarations: [SocialComponent],
  imports: [
    CommonModule,
    SocialRoutingModule,
  ],
  providers: [RedisService]
})
export class SocialModule { }
