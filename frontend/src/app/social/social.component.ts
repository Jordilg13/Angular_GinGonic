import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { UserService, RedisService, JwtService} from '../core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html'
})
export class SocialComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private userService: UserService,
    private jwtService: JwtService,
    private router: Router
  ){}
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const token = params.get('token');
      this.jwtService.saveToken(token);

      this.apiService.get('/users/')
      .subscribe(
        data => {
          this.userService.setAuth(data.user);
          this.router.navigateByUrl('/lobby');
        },
        err => {
          this.userService.purgeAndRedirectToLogin();
        }
      );
    });
  }

}
